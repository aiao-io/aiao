import { createReducer, on } from '@ngrx/store';

import { changeLanguageAction } from './language.actions';

export interface ChangeLanguageState {
  language: string;
}

export const initialState: ChangeLanguageState = {
  language: 'cn'
};

const _changeLanguageReducer = createReducer(
  initialState,
  on(changeLanguageAction, (state, { language }) => ({ ...state, language }))
);

export function changeLanguageReducer(state: ChangeLanguageState, action: any) {
  return _changeLanguageReducer(state, action);
}
