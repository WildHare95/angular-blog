import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";

@NgModule({
  imports:[
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    QuillModule
  ]
})
export class SharedModule {
}
