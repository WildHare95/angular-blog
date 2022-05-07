import {createReducer, on, Action} from "@ngrx/store";
import {Post} from "../../shared/Interfaces";
import {getAllPostsSuccess, getPostByIdSuccess} from "../actions/posts.actions";
import {removePost, successCheck} from "../actions/admin.actions";




export interface PostsState {
  posts: Post[] | null
  postById: Post | null
  isLoading: boolean,
  submitted: boolean
}

export const initialState: PostsState = {
  posts: null,
  postById: null,
  isLoading: false,
  submitted: false
}


export const postsReducer = createReducer(
  initialState,
  on(getAllPostsSuccess, (state, {payload}) => ({
    ...state,
    posts: payload,
    isLoading: true
  })),
  on(getPostByIdSuccess, (state, {payload}) => ({
    ...state,
    postById: payload
    })),
  on(removePost, (state,{id}) => {
    const payload = state.posts!.filter((post) => post.id !== id)
    return {
      ...state,
      posts: payload
    }
    }
  ),
  on(successCheck, (state, {submitted}) => {
    return {
      ...state,
      submitted: submitted
    }
  })
)


export function reducer(state: PostsState | undefined, action: Action) {
  return postsReducer(state, action);
}
