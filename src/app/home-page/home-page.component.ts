import {Component, OnInit} from '@angular/core';
import {PostService} from "../shared/post.service";
import {Store} from "@ngrx/store";
import {selectPosts} from "../store/selectors/posts.selectors";
import {getAllPosts} from "../store/actions/posts.actions";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$ = this.store.select(selectPosts)

  constructor(
    private postService: PostService,
    private store: Store
    ) { }

  ngOnInit() {
    this.store.dispatch(getAllPosts())
  }
}
