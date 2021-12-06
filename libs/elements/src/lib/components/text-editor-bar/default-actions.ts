import { TextEditorAcitons as TA } from '../text-editor/text-editor.interface';
import { TextEditorBarOptions } from './text-editor-bar.interface';

export const TEXT_EDITOR_DEFAULT_SETTINGS: TextEditorBarOptions[] = [
  {
    action: TA.bold,
    iconSrc: 'assets/text-editor-bar/bold.svg',
    title: 'Bold'
  },
  {
    action: TA.italic,
    iconSrc: 'assets/text-editor-bar/italic.svg',
    title: 'italic'
  },
  {
    action: TA.underline,
    iconSrc: 'assets/text-editor-bar/underline.svg',
    title: 'underline'
  },
  {
    action: TA.strikeThrough,
    iconSrc: 'assets/text-editor-bar/strike-through.svg',
    title: 'strikeThrough'
  },
  {
    action: TA.heading,
    iconSrc: 'assets/text-editor-bar/h1.svg',
    title: 'h1',
    value: 1
  },
  {
    action: TA.heading,
    iconSrc: 'assets/text-editor-bar/h2.svg',
    title: 'h2',
    value: 2
  },
  {
    action: TA.heading,
    iconSrc: 'assets/text-editor-bar/h3.svg',
    title: 'h3',
    value: 3
  },
  {
    action: TA.paragraph,
    iconSrc: 'assets/text-editor-bar/paragraph.svg',
    title: 'paragraph'
  },
  {
    action: TA.insertOrderedList,
    iconSrc: 'assets/text-editor-bar/list-ol.svg',
    title: 'list-ol'
  },
  {
    action: TA.insertUnorderedList,
    iconSrc: 'assets/text-editor-bar/list-ul.svg',
    title: 'list-ul'
  },
  {
    action: TA.quote,
    iconSrc: 'assets/text-editor-bar/quote.svg',
    title: 'quote'
  },
  {
    action: TA.indent,
    iconSrc: 'assets/text-editor-bar/indent.svg',
    title: 'indent'
  },
  {
    action: TA.outdent,
    iconSrc: 'assets/text-editor-bar/outdent.svg',
    title: 'outdent'
  },
  {
    action: TA.justifyLeft,
    iconSrc: 'assets/text-editor-bar/align-left.svg',
    title: 'align-left'
  },
  {
    action: TA.justifyCenter,
    iconSrc: 'assets/text-editor-bar/align-center.svg',
    title: 'align-center'
  },
  {
    action: TA.justifyRight,
    iconSrc: 'assets/text-editor-bar/align-right.svg',
    title: 'align-right'
  },
  {
    action: TA.justifyFull,
    iconSrc: 'assets/text-editor-bar/align-justify.svg',
    title: 'align-justify'
  },
  {
    action: TA.undo,
    iconSrc: 'assets/text-editor-bar/undo.svg',
    title: 'undo'
  },
  {
    action: TA.redo,
    iconSrc: 'assets/text-editor-bar/redo.svg',
    title: 'redo'
  }
];
