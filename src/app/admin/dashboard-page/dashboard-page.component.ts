import {Component, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {AlertService} from "../shared/services/alert.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {selectPosts, submitted} from "../../store/selectors/posts.selectors";
import {Store} from "@ngrx/store";
import {getAllPosts} from "../../store/actions/posts.actions";
import {removePost} from "../../store/actions/admin.actions";

@UntilDestroy()
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  posts$ = this.store.select(selectPosts)
  submitted!: boolean
  searchStr = ""

  constructor(
    private alert: AlertService,
    private postService: PostService,
    private store: Store) {

  }

  ngOnInit() {
    this.store.dispatch(getAllPosts())
  }

  remove(id: string) {
    this.alert.warning("Post was successfully removed")
    this.store.dispatch(removePost({id}))
  }
}
