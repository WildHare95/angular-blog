import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./shared/services/auth.service";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./shared/services/auth.guard";
import {PostService} from "../shared/post.service";
import {AuthInterceptor} from "../shared/auth.interceptor";
import {SearchPipe} from "./shared/search.pipe";
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: "",component: AdminLayoutComponent, children: [
          {path: "", redirectTo: "/admin/login", pathMatch: "full"},
          {path: "login", component: LoginPageComponent},
          {path: "dashboard", component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: "create", component: CreatePageComponent, canActivate: [AuthGuard]},
          {path: "post/:id/edit", component: EditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent
  ],
  providers: [AuthGuard]
  }
)
export class AdminModule {

}
