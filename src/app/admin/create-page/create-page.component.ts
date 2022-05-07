import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/Interfaces";
import {PostService} from "../../shared/post.service";
import {AlertService} from "../shared/services/alert.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Store} from "@ngrx/store";
import {createPost} from "../../store/actions/admin.actions";
import {submitted} from "../../store/selectors/posts.selectors";


@UntilDestroy()
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup
  submitted!: boolean

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(submitted).subscribe((requestSuccess ) =>
      this.submitted = requestSuccess
    )

    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    })
  }

  get isValid(): boolean {
    return this.form.invalid || !this.form.touched || !this.form.dirty
  }

  submit() {
    if (this.form.invalid){
      return
    }

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    }

    this.store.dispatch(createPost({payload: post}))
    this.form.reset()

  }
}
