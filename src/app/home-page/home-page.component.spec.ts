import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {By} from '@angular/platform-browser';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { PostService } from "../shared/post.service";
import { metaReducers, reducers } from "../store/reducers";
import { HomePageComponent } from "./home-page.component"

describe("HomePageComponent", () => {

    let component: HomePageComponent
    let el: DebugElement
    let fixture: ComponentFixture<HomePageComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
                StoreModule.forRoot(reducers, {
                    metaReducers
                  }),
                ],
            declarations: [HomePageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(HomePageComponent)
        component = fixture.componentInstance
        el = fixture.debugElement


    })


    

})