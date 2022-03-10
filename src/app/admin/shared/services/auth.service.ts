import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../shared/Interfaces";
import {Observable, Subject ,throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {FbAuthResponse} from "../../../../environments/interface";


@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expDate = new Date(Number(localStorage.getItem('fb-token-exp')))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(res => this.setToken(res)),
        catchError(err => this.handleError(err))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case "EMAIL_NOT_FOUND":
        this.error$.next("Email not found")
        break
      case "INVALID_PASSWORD":
        this.error$.next("Invalid password")
        break
      case "INVALID_EMAIL":
        this.error$.next("Invalid email")
        break
    }
    return throwError(error)
  }

  private setToken(response: any | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
