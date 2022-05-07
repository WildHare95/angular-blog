import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  CREATE_POST,
  LOGIN,
  REMOVE_POST,
  successCheck,
  UPDATE_POST
} from "../actions/admin.actions";
import {concatMap, map, switchMap} from "rxjs/operators";
import {PostService} from "../../shared/post.service";
import {AuthService} from "../../admin/shared/services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../admin/shared/services/alert.service";
import { of } from "rxjs";


@Injectable()
export class AdminEffects {

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) {
  }

  removePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(REMOVE_POST),
      concatMap(({id}) => {
        of(this.alert.warning("Post was successfully removed!"))
       return this.postService.remove(id)
      })
    )
  )

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CREATE_POST),
      switchMap(({payload}) => this.postService.create(payload).pipe(
        map(() => {
          this.alert.success("Post was created")
          return successCheck({submitted: false})
        })
      )
      )
    )
    )

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_POST),
      switchMap(({payload}) => this.postService.update(payload).pipe(
        map(() => {
          this.alert.danger("Post was successfully changed")
          return successCheck({submitted: false})
        })
      ))
    )
  )

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN),
      switchMap(({user, submitted}) =>
        this.auth.login(user).pipe(
          map(() => {
            this.router.navigate(["/admin", "dashboard"]).then(r => {
              this.alert.success("Logged in successfully")
            })
            return successCheck({submitted: false})
          })
        )
      )
    )
  )

}
