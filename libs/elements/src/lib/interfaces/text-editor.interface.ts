export enum TextEditorAcitons {
  backColor = 'backColor',
  bold = 'bold',
  createLink = 'createLink',
  fontSize = 'fontSize',
  foreColor = 'foreColor',
  heading = 'heading',
  indent = 'indent',
  insertHorizontalRule = 'insertHorizontalRule',
  insertHTML = 'insertHTML',
  insertImage = 'insertImage',
  insertOrderedList = 'insertOrderedList',
  insertUnorderedList = 'insertUnorderedList',
  italic = 'italic',
  justifyCenter = 'justifyCenter',
  justifyFull = 'justifyFull',
  justifyLeft = 'justifyLeft',
  justifyRight = 'justifyRight',
  outdent = 'outdent',
  paragraph = 'paragraph',
  quote = 'blockquote',
  redo = 'redo',
  strikeThrough = 'strikeThrough',
  underline = 'underline',
  undo = 'undo',
  unlink = 'unlink'
}

export interface TextEditorOptions {
  action: TextEditorAcitons;
  icon: string;
  title: string;
}

export interface TextActionState {
  [TextEditorAcitons.backColor]?: boolean;
  [TextEditorAcitons.bold]?: boolean;
  [TextEditorAcitons.createLink]?: string;
  [TextEditorAcitons.fontSize]?: number;
  [TextEditorAcitons.foreColor]?: string;
  [TextEditorAcitons.heading]?: number;
  [TextEditorAcitons.indent]?: boolean;
  [TextEditorAcitons.insertHorizontalRule]?: boolean;
  [TextEditorAcitons.insertHTML]?: boolean;
  [TextEditorAcitons.insertImage]?: boolean;
  [TextEditorAcitons.insertOrderedList]?: boolean;
  [TextEditorAcitons.insertUnorderedList]?: boolean;
  [TextEditorAcitons.italic]?: boolean;
  [TextEditorAcitons.justifyCenter]?: boolean;
  [TextEditorAcitons.justifyFull]?: boolean;
  [TextEditorAcitons.justifyLeft]?: boolean;
  [TextEditorAcitons.justifyRight]?: boolean;
  [TextEditorAcitons.outdent]?: boolean;
  [TextEditorAcitons.paragraph]?: boolean;
  [TextEditorAcitons.quote]?: boolean;
  [TextEditorAcitons.redo]?: boolean;
  [TextEditorAcitons.strikeThrough]?: boolean;
  [TextEditorAcitons.underline]?: boolean;
  [TextEditorAcitons.undo]?: boolean;
  [TextEditorAcitons.unlink]?: boolean;
}
