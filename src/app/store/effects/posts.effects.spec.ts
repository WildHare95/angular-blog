import { TestBed } from "@angular/core/testing"
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from "rxjs";
import { PostsEffects } from "./posts.effects";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PostService } from "src/app/shared/post.service";
import { TestScheduler } from "rxjs/testing";
import { getAllPosts, getAllPostsSuccess, getPostById, getPostByIdSuccess } from "../actions/posts.actions";
import { Post } from "src/app/shared/Interfaces";
import { createPost } from "../actions/admin.actions";
import { AdminEffects } from "./admin.effects";
import { AuthService } from "src/app/admin/shared/services/auth.service";

describe("Effects", () => {

    let actions: Observable<any>
    let effects: PostsEffects
    const initialState = {posts: []}
    const postService = jasmine.createSpyObj('postService', [
        'getAll',
        'getById',
        'createPost'
    ])

    let store: MockStore<any>
    let testScheduler: TestScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PostsEffects,
                AdminEffects,
                provideMockStore({initialState}),
                provideMockActions(() => actions),
                {provide: PostService, useValue: postService}
            ]
        })

        effects = TestBed.inject(PostsEffects)
        store = TestBed.inject(MockStore)
        store.setState({})

        testScheduler = new TestScheduler((actual,expected) => {
            expect(actual).toEqual(expected)         
        })
    })

    it("should be create", () => {
        expect(effects).toBeTruthy()
    })

    it("getAllPosts$ should handle appLoaded and return a getAllSuccess action", () => {
        const posts: Post[] = [{
            author: "asd",
            date: new Date(Date.now()),
            text: "asdasd",
            title: "asdasd"
        }]
        const action = getAllPosts()
        const outcome = getAllPostsSuccess({payload: posts})

        testScheduler.run(({ hot, cold, expectObservable }) => {            
            actions = hot('-a', { a: action });
            const response = cold('-b|', { b: posts });
            postService.getAll.and.returnValue(response);
                        
            expectObservable(effects.getAllPosts$).toBe('--b', { b: outcome });
          });
    })

    it("getAllPostById$ should handle appLoaded and return a getPostByIdSuccess action", () => {
        const posts: Post = {
            author: "asd",
            date: new Date(Date.now()),
            text: "asdasd",
            title: "asdasd"
        }
        const action = getPostById({id: "123"})
        const outcome = getPostByIdSuccess({payload: posts})

        testScheduler.run(({ hot, cold, expectObservable }) => {            
            actions = hot('-a', { a: action });
            const response = cold('-b|', { b: posts });
            postService.getById.and.returnValue(response);

            expectObservable(effects.getPostById$).toBe('--b', { b: outcome });
          });
    })
})