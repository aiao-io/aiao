import { createAction, props } from '@ngrx/store';

export const changeLanguage = createAction('[Change Language] switch language', props<{ lang: string }>());
