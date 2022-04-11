import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {postsReducer, PostsState} from "./posts.reducers";

export interface State {
  posts: PostsState
}

export const reducers: ActionReducerMap<State> = {
  posts: postsReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
