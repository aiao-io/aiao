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
