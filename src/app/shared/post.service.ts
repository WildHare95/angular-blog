import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "./Interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class PostService {
  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.FbDbUrl}/posts.json`, post)
      .pipe(map((response: any) => { // response must have type FbCreateResponse
        // console.log(response) will return {name: "string"}
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        }
      }))
  }
}
