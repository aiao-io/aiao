import isArray from 'lodash/isArray';
import sortBy from 'lodash/sortBy';

import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { TreeNode } from '../tree-node/tree-node';
import { TreeDataState, TreeNodeData, TreeNodeEvent } from '../tree-node/tree-node.interface';
import { TreeNodeConfig } from './tree.interface';
import { findTreeNodeElement, treeNodeDateToTreeState } from './util';

@Component({
  tag: 'aiao-tree',
  styleUrl: 'tree.scss',
  shadow: true
})
export class Tree implements ComponentInterface {
  @Element() private el!: HTMLAiaoTreeElement;

  refMap: Map<string, HTMLAiaoTreeNodeElement> = new Map();
  dataMap: Map<string, TreeNodeData> = new Map();
  private dragNode?: TreeNode;
  // private selectedKeys: Set<Id> = new Set();
  // private checkedKeys: Set<Id> = new Set();
  // private halfCheckedKeys: Set<Id> = new Set();
  // private expandedKeys: Set<Id> = new Set();
  // private loadedKeys: Set<Id> = new Set();
  // private loadingKeys: Set<Id> = new Set();

  // --------------------------------------------------------------[ Event ]
  /**
   * change
   */
  @Event() aiaoChange!: EventEmitter<void>;

  /**
   * 改变的数据节点
   */
  @Event() aiaoTreeNodeChange!: EventEmitter<TreeNodeData[]>;

  /**
   * tree drop
   */
  @Event() aiaoTreeDrop!: EventEmitter<any>;

  // --------------------------------------------------------------[ State ]
  /**
   * 使用的 tree 数据
   */
  @State() private dataState?: TreeDataState[];

  // --------------------------------------------------------------[ Prop ]

  /**
   * 显示模式
   */
  @Prop() showMode: 'list' | 'tree' = 'tree';

  /**
   * 显示线
   */
  @Prop() showLine = false;
  /**
   * 显示图标
   */
  @Prop() showIcon = true;

  /**
   * 可选模式
   */
  @Prop() selectable = true;

  /**
   * 是否多选
   */
  @Prop() multiple = false;

  /**
   * 是否可检查
   */
  @Prop() checkable = false;

  /**
   * 是否禁用
   */
  @Prop() disabled = false;

  /**
   * 可拖动
   */
  @Prop() canDrag = true;

  /**
   * 默认展开父级
   */
  @Prop() defaultExpandParent = true;

  /**
   * 是否自动展开父级
   */
  @Prop() autoExpandParent = false;

  /**
   * 默认展开级别
   */
  @Prop() defaultExpandLevel = 1;

  /**
   * 默认展开的 key 表
   */
  @Prop() defaultExpandedKeys: string[] = [];

  /**
   * 默认选中的 key 表
   */
  @Prop() defaultSelectedKeys: string[] = [];

  /**
   * 节点配置
   */
  @Prop() config?: TreeNodeConfig[];

  /**
   * 节点数据
   */
  @Prop({ mutable: true }) data?: TreeNodeData[];
  @Watch('data')
  dataChanged(data: TreeNodeData[] = []) {
    this.dataMap.clear();
    data.forEach(d => this.dataMap.set(`${d.id}`, d));
    this.dataState = treeNodeDateToTreeState(data);
  }

  // --------------------------------------------------------------[ Method ]

  /**
   * 是否可以拖进来
   */
  @Method()
  async canDrop(dragNodeData: TreeNodeData, dropNode: TreeNode) {
    // config 守卫
    let allow = true;
    const dropNodeData = this.dataMap.get(`${dropNode.value}`);

    if (!dropNodeData) {
      throw new Error('dropNodeData');
    }
    // 禁止拖入叶子节点
    // 禁止拖入自身
    if (dropNode.dropType === 'in' && (dropNodeData.isLeaf || dragNodeData === dropNodeData)) {
      return false;
    }

    if (this.config) {
      const configId = dragNodeData.configId;
      if (dropNode.dropType === 'top' || dropNode.dropType === 'bottom') {
        const dropParentNodeData = this.dataMap.get(`${dropNodeData.parentId}`);
        if (dropParentNodeData) {
          const parentConfig = this.config.find(conf => conf.id === dropParentNodeData.configId);
          if (parentConfig && parentConfig.childConfigIds) {
            allow = parentConfig.childConfigIds.includes(`${configId}`);
          }
        }
      } else if (dropNode.dropType === 'in') {
        const config = this.config.find(conf => conf.id === dropNodeData.configId);
        if (config && config.childConfigIds) {
          allow = config.childConfigIds.includes(`${configId}`);
        }
      }
    }
    return allow;
  }

  @Method()
  async select(id: string) {
    // tslint:disable-next-line: triple-equals
    this.refMap.forEach((d, refId) => (d.selected = refId == id));
  }

  @Method()
  async overElement(elementId: string) {
    //
    console.log('over', elementId);
  }

  @Method()
  async outElement(elementId: string) {
    // const btn = this.refMap.get(`${elementId}`);
    console.log('out', elementId);
  }

  // --------------------------------------------------------------[ Listen ]
  @Listen('aiaoTreeNodeDragStart')
  onNodeDragStart(e: CustomEvent<TreeNodeEvent>) {
    const { node } = e.detail;
    this.dragNode = node;
  }

  @Listen('aiaoTreeNodeDragEnter')
  onNodeDragEnter(e: CustomEvent<TreeNodeEvent>) {
    const { node } = e.detail;
    if (node !== this.dragNode) {
      node.dragOver = true;
      if (!node.isLeaf) {
        node.expanded = true;
      }
    }
  }

  @Listen('aiaoTreeNodeDragOver')
  onNodeDragOver(e: CustomEvent<TreeNodeEvent>) {
    const { ev, node } = e.detail;
    if (node !== this.dragNode) {
      node.dragOver = true;
    }
    const treeNode = findTreeNodeElement(ev.target as any);
    if (treeNode) {
      const { top, height } = treeNode.getBoundingClientRect();
      if (node.isLeaf) {
        const act = Math.floor((ev.y - top) / (height / 2));
        switch (act) {
          case 0:
            node.dropType = 'top';
            break;
          case 1:
            node.dropType = 'bottom';
            break;
        }
      } else {
        const act = Math.floor((ev.y - top) / (height / 3));
        switch (act) {
          case 0:
            node.dropType = 'top';
            break;
          case 1:
            node.dropType = 'in';
            break;
          case 2:
            node.dropType = 'bottom';
            break;
        }
      }
    }
  }

  @Listen('aiaoTreeNodeDragLeave')
  onNodeDragLeave(_: CustomEvent<TreeNodeEvent>) {
    //
  }

  @Listen('aiaoTreeNodeDrop')
  async onNodeDrop(_: CustomEvent<TreeNodeEvent>) {
    const { node } = _.detail;
    const dropNodeData = this.dataMap.get(`${node.value}`);
    const dragNodeData = this.dragNode && this.dataMap.get(`${this.dragNode.value}`);

    // 数据验证
    if (!dragNodeData) {
      return;
    }

    const canDrop = await this.canDrop(dragNodeData, node);
    // 守卫
    if (canDrop === false) {
      return;
    }

    // 判断那些改变
    const changeIds = new Set<string>();

    const dragOldParentId = dragNodeData.parentId;
    const dragOldOld = dragNodeData.sort;

    // 根据 drop 类型操作数据
    switch (node.dropType) {
      case 'top':
        dragNodeData.parentId = dropNodeData!.parentId;
        dragNodeData.sort = dropNodeData!.sort - 0.5;
        break;
      case 'bottom':
        dragNodeData.parentId = dropNodeData!.parentId;
        dragNodeData.sort = dropNodeData!.sort + 0.5;
        break;
      case 'in':
        dragNodeData.parentId = node.value;
        dragNodeData.sort = Number.MAX_SAFE_INTEGER;
        break;
    }

    // 父级不一样加入变化
    if (dragOldParentId !== dragNodeData.parentId) {
      changeIds.add(`${dragNodeData.id}`);
      // 排序原始父级的 children 数据
      const needSortNodes1 = this.data!.filter(d => d.parentId === dragOldParentId);
      sortBy(needSortNodes1, 'sort').forEach((d, i) => {
        if (d.sort !== i) {
          changeIds.add(`${d.id}`);
          d.sort = i;
        }
      });
    }

    // 排序新父级数据
    const needSortNodes = this.data!.filter(d => d.parentId === dragNodeData.parentId);
    sortBy(needSortNodes, 'sort').forEach((d, i) => {
      if (d.id === dragNodeData.id) {
        if (dragOldOld !== i) {
          changeIds.add(`${d.id}`);
        }
      } else if (d.sort !== i) {
        changeIds.add(`${d.id}`);
      }
      d.sort = i;
    });

    if (changeIds.size > 0) {
      this.data = [...this.data!];
      const changedData = Array.from(changeIds).map(id => this.dataMap.get(id)) as TreeNodeData[];
      this.aiaoTreeNodeChange.emit(changedData);
      this.aiaoChange.emit();
    }
  }

  @Listen('aiaoTreeNodeDragEnd')
  onNodeDragEnd(_: CustomEvent<TreeNodeEvent>) {
    this.dragNode = undefined;
  }

  // --------------------------------------------------------------[ private function ]
  private renderNode(node: TreeDataState, needId = false, allowChildConfigIds?: (string | number)[], level = 0) {
    const { children, configId, isLeaf, id, name } = node;

    if (configId && isArray(allowChildConfigIds)) {
      const allow = allowChildConfigIds.includes(configId);
      if (!allow) {
        return undefined;
      }
    }

    let childConfigIds: string[] | undefined;
    if (this.config) {
      const conf = this.config.find(d => d.id === configId);
      if (conf) {
        childConfigIds = conf.childConfigIds;
      }
    }
    const attrs: any = {
      showMode: this.showMode,
      showLine: this.showLine,
      showIcon: this.showIcon,
      canDrag: this.canDrag,
      checkable: this.checkable,
      disabled: this.disabled,
      expanded: this.defaultExpandLevel > level,
      name,
      isLeaf
    };

    const hasChildren = !isLeaf;
    const nextLevel = level + 1;

    let eleId: string | undefined;
    if (needId) {
      attrs.ref = (r: any) => this.refMap.set(`${id}`, r);
      attrs.value = id;
      eleId = `tree-node-${id}`;
    }

    return (
      <aiao-tree-node id={eleId} {...attrs}>
        {hasChildren && (
          <div class="children">
            {sortBy(children || [], 'sort').map(n => this.renderNode(n, needId, childConfigIds, nextLevel))}
          </div>
        )}
      </aiao-tree-node>
    );
  }

  /**
   * 获取实体 map
   */
  @Method()
  async nodeRefMap() {
    return this.refMap;
  }

  // --------------------------------------------------------------[ lifecycle ]
  componentWillLoad() {
    this.dataChanged(this.data);
  }

  componentDidLoad() {
    this.el.ondrop = ev => this.aiaoTreeDrop.emit({ ev, tree: this });
    this.el.ondragover = e => e.preventDefault();
  }

  render() {
    this.refMap.clear();
    const needId = this.selectable || this.canDrag || this.checkable;
    return this.dataState && sortBy(this.dataState, 'sort').map(node => this.renderNode(node, needId));
  }
}
