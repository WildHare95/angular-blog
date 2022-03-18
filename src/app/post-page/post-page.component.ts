import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../shared/Interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {PostService} from "../shared/post.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>

  constructor(
    private rout: ActivatedRoute,
    private postService: PostService
    ) { }

  ngOnInit() {
    this.post$ = this.rout.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      }))
  }

}
