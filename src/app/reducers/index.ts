import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';

import { localStorageSync } from 'ngrx-store-localstorage';

import { features } from '../store/features/features';

export interface State {}

export const reducers: ActionReducerMap<State> = {
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: Object.values(features), rehydrate: true })(reducer);
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
