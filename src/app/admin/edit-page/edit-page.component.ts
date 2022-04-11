import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {switchMap} from "rxjs";
import {Post} from "../../shared/Interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../shared/services/alert.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {selectPostById, submitted} from "../../store/selectors/posts.selectors";
import {Store} from "@ngrx/store";
import {getPostById} from "../../store/actions/posts.actions";
import {successCheck, updatePost} from "../../store/actions/admin.actions";


@UntilDestroy()
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form!: FormGroup;
  post!: Post
  post$ = this.store.select(selectPostById)
  submitted!: boolean

  constructor(
    private alert: AlertService,
    private route: ActivatedRoute,
    private store: Store,
  ) {
  }

  get isValid(): boolean {
    return this.form.invalid
  }


  ngOnInit() {
    this.store.select(submitted).subscribe((requestSuccess ) =>
      this.submitted = requestSuccess
    )

    this.store.dispatch(getPostById({id: this.route.snapshot.params['id']}))
    this.post$.pipe(untilDestroyed(this)).subscribe((post: Post | null) => {
      this.post = post!
      this.form = new FormGroup({
        title: new FormControl(post?.title, Validators.required),
        text: new FormControl(post?.text, Validators.required)
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    }

    this.store.dispatch(updatePost({payload: post}))
    this.store.dispatch(successCheck({submitted: true}))

  }
}
