import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';

import { TreeNodeEvent } from './tree-node.interface';

@Component({
  tag: 'mlab-tree-node',
  styleUrl: 'tree-node.scss',
  shadow: true
})
export class TreeNode implements ComponentInterface {
  @Element() el!: HTMLMlabTreeNodeElement;

  /**
   * 唯一值
   */
  @Prop() value: string | number;

  /**
   * 显示线
   */
  @Prop() showLine = false;
  /**
   * 显示图标
   */
  @Prop() showIcon = false;

  /**
   * 是否可检查
   */
  @Prop() checkable = false;

  /**
   * 可选模式
   */
  @Prop() selectable = false;

  /**
   * 是否禁用
   */
  @Prop() disabled = false;

  /**
   * 可拖放
   */
  @Prop() canDrag = false;

  /**
   * 是否是叶子节点
   */
  @Prop() isLeaf = false;

  /**
   * 图标名
   */
  @Prop() icon: { icon?: string; src?: string };
  /**
   * 标题
   */
  @Prop() name: string;

  /**
   * 是否展开
   */
  @Prop({ mutable: true }) expanded = false;

  /*
   * 是否被选中
   */
  @Prop({ mutable: true }) selected = false;

  /**
   * hover
   */
  @Prop({ mutable: true }) hover = false;

  /**
   * drag
   */
  @Event() mlabTreeNodeDragStart: EventEmitter<TreeNodeEvent>;
  /**
   * drag
   */
  @Event() mlabTreeNodeDragEnter: EventEmitter<TreeNodeEvent>;
  /**
   * drag
   */
  @Event() mlabTreeNodeDragOver: EventEmitter<TreeNodeEvent>;

  /**
   * drag
   */
  @Event() mlabTreeNodeDragLeave: EventEmitter<TreeNodeEvent>;
  /**
   * drag
   */
  @Event() mlabTreeNodeDrop: EventEmitter<TreeNodeEvent>;
  /**
   * drag
   */
  @Event() mlabTreeNodeDragEnd: EventEmitter<TreeNodeEvent>;
  /**
   * 节点 click
   */
  @Event() mlabTreeNodeClick: EventEmitter<TreeNodeEvent>;
  @Event() mlabTreeNodeOver: EventEmitter<TreeNodeEvent>;
  @Event() mlabTreeNodeOut: EventEmitter<TreeNodeEvent>;

  @State() dragOver = false;
  @State() dropType: 'in' | 'top' | 'bottom' = 'in';
  @State() dragging = false;

  onExpand = () => (this.expanded = !this.expanded);

  onClick = (ev: MouseEvent) => this.mlabTreeNodeClick.emit({ ev, node: this, value: this.value });
  onMouseOver = (ev: MouseEvent) => {
    this.mlabTreeNodeOver.emit({ ev, node: this, value: this.value });
  };
  onMouseOut = (ev: MouseEvent) => {
    this.hover = false;
    this.mlabTreeNodeOut.emit({ ev, node: this, value: this.value });
  };

  onDragStart = (ev: DragEvent) => {
    ev.stopPropagation();
    this.dragging = true;
    if (this.isLeaf === false) {
      this.expanded = false;
    }
    const labelEle = (ev.target as HTMLElement).querySelector('.tree-node-content');
    // 设置拖放图标
    if (labelEle) {
      ev.dataTransfer.setDragImage(labelEle, labelEle.clientWidth, labelEle.clientHeight);
    }
    this.mlabTreeNodeDragStart.emit({ ev, node: this, value: this.value });
  };

  protected onDragEnter = (ev: DragEvent) => {
    this.mlabTreeNodeDragEnter.emit({ ev, node: this, value: this.value });
  };

  protected onDragOver = (ev: DragEvent) => {
    ev.preventDefault();
    this.mlabTreeNodeDragOver.emit({ ev, node: this, value: this.value });
  };

  protected onDragLeave = (ev: DragEvent) => {
    this.dragOver = false;
    this.mlabTreeNodeDragLeave.emit({ ev, node: this, value: this.value });
  };

  protected onDrop = (ev: DragEvent) => {
    this.dragOver = false;
    this.mlabTreeNodeDrop.emit({ ev, node: this, value: this.value });
  };

  protected onDragEnd = (ev: DragEvent) => {
    this.dragging = false;
    this.mlabTreeNodeDragEnd.emit({ ev, node: this, value: this.value });
  };

  render() {
    const renders = this.treeRender();
    return (
      <Host
        class={{
          'drag-over': this.dragOver,
          expanded: this.expanded,
          dragging: this.dragging,
          [`drop-${this.dropType}`]: this.dragOver,
          selected: this.selected,
          hover: this.hover
        }}
        onClick={this.onClick}
      >
        {...renders}
      </Host>
    );
  }

  protected treeRender() {
    const dragAttrs = this.canDrag
      ? {
          onDragStart: this.onDragStart,
          onDragEnter: this.onDragEnter,
          onDragOver: this.onDragOver,
          onDragLeave: this.onDragLeave,
          onDrop: this.onDrop,
          onDragEnd: this.onDragEnd
        }
      : {};

    return [
      <div
        class="tree-node-native tree-drag-node"
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        {...dragAttrs}
        draggable={this.canDrag}
      >
        {!this.isLeaf && (
          <ion-icon onClick={this.onExpand} name={this.expanded ? 'caret-down-outline' : 'caret-forward-outline'} />
        )}
        {this.selectable && <ion-checkbox />}
        <span class="tree-node-content">
          {this.showIcon && this.icon && <ion-icon {...this.icon} />}
          <span>{this.name}</span>
        </span>
        <slot name="end"></slot>
      </div>,
      <slot />
    ];
  }
}
