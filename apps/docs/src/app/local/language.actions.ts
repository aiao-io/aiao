import { createAction, props } from '@ngrx/store';

export const changeLanguageAction = createAction('[Change Language] change language', props<{ language: string }>());
