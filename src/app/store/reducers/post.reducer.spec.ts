import { TestBed } from "@angular/core/testing"
import { Post } from "src/app/shared/Interfaces"
import { PostService } from "src/app/shared/post.service"
import { initialState, PostsState, reducer } from "./posts.reducers"
import * as PostsActions from "../actions/posts.actions"
import * as PostsAdminActions from "../actions/admin.actions"
import { HttpClientModule } from "@angular/common/http"
import { of } from "rxjs"

describe("PostReducer", () => {
    let state: PostsState
    let service: PostService

    let dummyPost: Post[] = [{
        author: 'Admin',
        date: new Date('2022-03-15T10:41:39.679Z'),
        text: "<p>this.post = post</p>",
        title: "SWISH_PISHQQQ",
        id: '-MyC9oratuKjaLIgsIBq'
    }]

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [PostService]
        })

        service = TestBed.inject(PostService)
        state = initialState
    })


    xit("sould load all posts to store, and remove post from store", () => {

        spyOn(service, "getAll").and.returnValue(of(dummyPost))

        service.getAll().subscribe((data) => {
  
        const action = PostsActions.getAllPostsSuccess({payload: data})
        const result = reducer(state, action)

        expect(result.posts).toBeTruthy()
        expect(result.posts?.length).toBe(1)

        const actionRemove = PostsAdminActions.removePost({id: '-MyC9oratuKjaLIgsIBq'})

        reducer(state, actionRemove)
        
        expect(result.posts?.length).toBe(0)

        expect(actionRemove.type).toBe(PostsAdminActions.REMOVE_POST)
        expect(action.type).toBe(PostsActions.GET_ALL_POSTS_SUCCESS)
    })   
    })

    it("sould load post by ID", () => {

        const actionById = PostsActions.getPostById({id: '-MyC9oratuKjaLIgsIBq'})        

        spyOn(service, "getById").and.returnValue(of(...dummyPost))

        service.getById(actionById.id!).subscribe((data) => {

            const action = PostsActions.getPostByIdSuccess({payload: data})
            const result = reducer(state, action)

            expect(result.postById).toBeTruthy()
            expect(result.postById?.id).toBe(dummyPost[0].id)             
        }
        )

        expect(PostsActions.GET_POST_BY_ID).toBe(actionById.type)
    })
})