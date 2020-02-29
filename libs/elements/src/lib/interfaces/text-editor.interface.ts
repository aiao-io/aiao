export enum TextEditorAcitons {
  Bold = 'bold',
  Italic = 'italic'
}

export interface TextEditorOptions {
  action: TextEditorAcitons;
  icon: string;
  title: string;
}
