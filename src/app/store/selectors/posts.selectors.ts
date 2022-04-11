import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostsState} from "../reducers/posts.reducers";


export const featureSelector = createFeatureSelector<PostsState>('posts')

export const selectPosts = createSelector(
  featureSelector,
  state => state.posts
)

export const isLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoading
)

export const selectPostById = createSelector(
  featureSelector,
  state => state.postById
)

export const submitted = createSelector(
  featureSelector,
  state => state.submitted
)
