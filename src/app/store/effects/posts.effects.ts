import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  getAllPostsSuccess, getPostByIdSuccess,
  postsFailure
} from "../actions/posts.actions";
import {PostService} from "../../shared/post.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {Post} from "../../shared/Interfaces";
import {of} from "rxjs";

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private postsService: PostService,
  ) {
  }

  getAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_ALL_POSTS),
      mergeMap(() =>
        this.postsService.getAll().pipe(
          map((response: Post[]) => {
           return  getAllPostsSuccess({payload: response})
          }),
          catchError(() => of(postsFailure))
        )
      )
    )
  )



  getPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_POST_BY_ID),
      mergeMap( ({id}) =>
        this.postsService.getById(id).pipe(
          map((response: Post) => {
            return getPostByIdSuccess({payload: response})
          }),
          catchError(() => of(postsFailure))
        )
      )
    )

  )


  

}
