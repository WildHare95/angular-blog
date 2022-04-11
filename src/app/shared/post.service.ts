import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "./Interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Actions} from "@ngrx/effects";
import {Action} from "@ngrx/store";

@Injectable({providedIn: "root"})
export class PostService {

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<any> {
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

  getAll() {
    return this.http.get(`${environment.FbDbUrl}/posts.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))
      }))
  }

  getById(id: string ): Observable<Post> {
    return this.http.get<Post>(`${environment.FbDbUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post, id,
          date: new Date(post.date)
        }
      }))
  }

  remove(id: string): Observable<any> {
     return this.http.delete<void>(`${environment.FbDbUrl}/posts/${id}.json`)
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.FbDbUrl}/posts/${post.id}.json`, post)
  }

}
