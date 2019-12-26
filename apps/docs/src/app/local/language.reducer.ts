import { createSelector, createFeatureSelector, on, createReducer } from '@ngrx/store';
import { changeLanguageAction } from './language.actions';

export const CHANGE_LANGUAGE_Key = 'changeLanguage';

export interface ChangeLanguageState {
  language: string;
}

export interface LocalState {
  changeLanguage: ChangeLanguageState;
}

export const initialState: ChangeLanguageState = {
  language: 'cn'
};

const _changeLanguageReducer = createReducer(
  initialState,
  on(changeLanguageAction, (state, { language }) => ({ ...state, language }))
);

export function changeLanguageReducer(state, action) {
  return _changeLanguageReducer(state, action);
}

export const selectFeature = createFeatureSelector<LocalState, ChangeLanguageState>(CHANGE_LANGUAGE_Key);

export const selectLanguage = createSelector(selectFeature, (state: ChangeLanguageState) => state.language);
