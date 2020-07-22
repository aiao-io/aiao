/**
 * 获取选中的元素
 * @param doc 文档
 */
export const docGetSelection = (doc: Document | ShadowRoot) => {
  const selection = doc.getSelection();
  if (!selection) {
    throw new Error('selection Not found');
  }
  return selection;
};
export const getSelectionElements = (doc: Document | ShadowRoot): HTMLElement[] => {
  const selection = docGetSelection(doc);

  const selectElement: any[] = [];
  for (let index = 0; index < selection.rangeCount; index++) {
    const range = selection.getRangeAt(index);
    switch (range.commonAncestorContainer.nodeType) {
      case 1:
        const nodes = Array.from(range.commonAncestorContainer.childNodes);
        const rangeStart: any =
          range.startContainer.nodeType === 3 ? range.startContainer.parentElement : range.startContainer;
        const rangeEnd: any = range.endContainer.nodeType === 3 ? range.endContainer.parentElement : range.endContainer;
        const i1 = nodes.indexOf(rangeStart);
        const i2 = nodes.indexOf(rangeEnd);
        for (let i = i1; i <= i2; i++) {
          selectElement.push(nodes[i]);
        }
        break;
      case 3:
        selectElement.push(range.commonAncestorContainer.parentElement);
        break;
      default:
        break;
    }
  }
  return selectElement;
};

// 记录指针位置
export const saveRange = (doc: Document | ShadowRoot) => {
  const selection = docGetSelection(doc);
  const range = selection.getRangeAt(0);
  range.detach();
  return range;
};

// 恢复指针
export const restoreRange = (doc: Document | ShadowRoot, range: Range) => {
  const selection = docGetSelection(doc);
  selection.removeAllRanges();
  selection.addRange(range);
};

/**
 * 用户是否选中
 * @param doc 文档
 */
export const hasRange = (doc: Document | ShadowRoot) => docGetSelection(doc).focusOffset > 0;
