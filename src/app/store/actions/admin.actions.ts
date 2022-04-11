import {createAction, props} from "@ngrx/store";
import {Post, User} from "../../shared/Interfaces";


export const REMOVE_POST = "[ADMIN ACTIONS] REMOVE_POST"
export const CREATE_POST = "[ADMIN ACTIONS] CREATE_POST"
export const UPDATE_POST = "[ADMIN ACTIONS] UPDATE_POST"
export const LOGIN = "[ADMIN ACTIONS] LOGIN"
export const SUCCESS_CHECK = "[ADMIN ACTIONS] SUCCESS_CHECK"

export const removePost = createAction(
  REMOVE_POST,
  props<{id: string}>()
)

export const createPost = createAction(
  CREATE_POST,
  props<{payload: Post}>()
)


export const updatePost = createAction(
  UPDATE_POST,
  props<{payload: Post}>()
)

export const login = createAction(
  LOGIN,
  props<{user: User}>()
)

export const successCheck = createAction(
  SUCCESS_CHECK,
  props<{submitted: boolean}>()
)
