import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../shared/Interfaces";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {PostService} from "../shared/post.service";
import {Store} from "@ngrx/store";
import {selectPostById} from "../store/selectors/posts.selectors";
import {getPostById} from "../store/actions/posts.actions";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  post$ = this.store.select(selectPostById)

  constructor(
    private rout: ActivatedRoute,
    private postService: PostService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.store.dispatch(getPostById({id: this.rout.snapshot.params['id']}))
  }

  ngOnDestroy() {
  }
}
