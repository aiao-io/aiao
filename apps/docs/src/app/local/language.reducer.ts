import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { changeLanguageAction } from './language.actions';

export const CHANGE_LANGUAGE_Key = 'changeLanguage';

export interface ChangeLanguageState {
  language: string;
}

export const initialState: ChangeLanguageState = {
  language: 'cn'
};

export interface LocalState {
  [CHANGE_LANGUAGE_Key]: ChangeLanguageState;
}

const _changeLanguageReducer = createReducer(
  initialState,
  on(changeLanguageAction, (state, { language }) => ({ ...state, language }))
);

export function changeLanguageReducer(state: any, action: any) {
  return _changeLanguageReducer(state, action);
}

export const selectFeature = createFeatureSelector<LocalState, ChangeLanguageState>(CHANGE_LANGUAGE_Key);

export const selectLanguage = createSelector(
  selectFeature,
  (state: ChangeLanguageState) => state.language
);
