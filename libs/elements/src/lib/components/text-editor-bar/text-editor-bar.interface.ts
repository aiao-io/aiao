import { TextEditorAcitons as TA } from '../text-editor/text-editor.interface';

export interface TextActionState {
  [TA.backColor]?: boolean;
  [TA.bold]?: boolean;
  [TA.createLink]?: string;
  [TA.fontSize]?: number;
  [TA.foreColor]?: string;
  [TA.heading]?: number;
  [TA.insertHorizontalRule]?: boolean;
  [TA.insertHTML]?: boolean;
  [TA.insertImage]?: boolean;
  [TA.insertOrderedList]?: boolean;
  [TA.insertUnorderedList]?: boolean;
  [TA.italic]?: boolean;
  [TA.justifyCenter]?: boolean;
  [TA.justifyFull]?: boolean;
  [TA.justifyLeft]?: boolean;
  [TA.justifyRight]?: boolean;
  [TA.paragraph]?: boolean;
  [TA.quote]?: boolean;
  [TA.redo]?: boolean;
  [TA.strikeThrough]?: boolean;
  [TA.underline]?: boolean;
  [TA.undo]?: boolean;
  [TA.unlink]?: boolean;
  [name: string]: any;
}

export interface TextEditorBarOptions {
  action: TA;
  iconName?: string;
  iconSrc?: string;
  title?: string;
  value?: string | number;
}
