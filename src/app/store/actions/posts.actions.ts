import {createAction, props} from "@ngrx/store";
import {Post} from "../../shared/Interfaces";


export const GET_ALL_POSTS ='[POSTS] GET_ALL_POSTS'
export const GET_ALL_POSTS_SUCCESS ='[POSTS] GET_ALL_POSTS_SUCCESS'
export const GET_POSTS_FAILURE ='[POSTS] GET_POSTS_FAILURE'
export const GET_POST_BY_ID ='[POSTS] GET_POST_BY_ID'
export const GET_POST_BY_ID_SUCCESS ='[POSTS] GET_POST_BY_ID_SUCCESS'

export const getAllPosts = createAction(
  GET_ALL_POSTS
)
export const getAllPostsSuccess = createAction(
  GET_ALL_POSTS_SUCCESS,
  props<{payload: Array<Post>}>()
)

export const getPostById = createAction(
  GET_POST_BY_ID,
  props<{id: string | null}>()
)

export const getPostByIdSuccess = createAction(
  GET_POST_BY_ID_SUCCESS,
  props<{ payload: Post | null}>()
)

export const postsFailure = createAction(
  GET_POSTS_FAILURE,
  props<any>()
)
