/**
 * 编辑模式
 */
export type EditMode = 'add' | 'edit' | 'move' | 'resize' | 'view';

/**
 * 编辑器配置
 */
export interface ElementsEditOptions {
  editMode: EditMode;
}

/**
 * form 标识符
 */
export const ELEMENTS_FORM_ITEM = 'elements-form_item';
/**
 * editor 标识符
 */
export const ELEMENTS_EDIT_ITEM = 'elements-edit_item';
