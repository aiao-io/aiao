import { createReducer, on } from '@ngrx/store';
import { changeLanguage } from './language.actions';

export interface LocalLanguage {
  language: string;
}

export const initialLang: LocalLanguage = {
  language: 'zh-cn'
};

const _languageReducer = createReducer(
  initialLang,
  on(changeLanguage, (state, { lang }) => ({ language: lang }))
);

export function languageReducer(state, action) {
  return _languageReducer(state, action);
}
