import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/Interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AlertService} from "../shared/services/alert.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Store} from "@ngrx/store";
import {login, successCheck} from "../../store/actions/admin.actions";
import {submitted} from "../../store/selectors/posts.selectors";

@UntilDestroy()
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  form!: FormGroup
  submitted!: boolean
  message: string | undefined

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private store: Store
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain'])
      {
        this.message = "Something went wrong, please login again."
      }else if(params['authFailed']){
        this.message = "This session has ended. Sign in again."
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    })

    this.store.select(submitted).subscribe(requestSubmitted =>
    this.submitted = requestSubmitted
    )

  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const user: User ={
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.store.dispatch(login({user: user}))
    this.store.dispatch(successCheck({submitted: true}))
  }
}
