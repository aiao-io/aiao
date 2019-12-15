export type EditMode = 'add' | 'edit' | 'move' | 'resize' | 'view';

export interface ElementsEditOptions {
  editMode: EditMode;
}

export const ELEMENTS_FORM_ITEM = 'elements-form_item';
export const ELEMENTS_EDIT_ITEM = 'elements-edit_item';
