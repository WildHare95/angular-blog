import { PostService } from "./post.service"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { Post } from "./Interfaces";
import { environment } from "src/environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { of } from "rxjs";

describe("PostService", () => {
    let postService: PostService,
        httpTestingController: HttpTestingController,
        httpClient: HttpClient

    let dummyPost: Post = {
        author: 'Admin',
        date: new Date('2022-03-15T10:41:39.679Z'),
        text: "<p>this.post = post</p>",
        title: "SWISH_PISHQQQ",
        id: '-MyC9oratuKjaLIgsIBq'
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostService]
        })

        postService = TestBed.inject(PostService)
        httpTestingController = TestBed.inject(HttpTestingController)
        httpClient = TestBed.inject(HttpClient)
    })

    it("should get all posts", () => {

        postService.getAll().subscribe((posts: Post[]) => {

            console.log("post.service.spec.ts");
            
            expect(posts).toBeTruthy()

            expect(posts.length).toBe(33)

            const postById = posts.find((post) => post.id === dummyPost.id)

            expect(postById?.id).toBe(dummyPost.id)
            expect(postById?.author).toBe(dummyPost.author)
            expect(postById?.title).toBe(dummyPost.title)
        })

        const req = httpTestingController.expectOne(`${environment.FbDbUrl}/posts.json`)

        expect(req.request.method).toBe("GET")

    })

    it("should update post", () => {

        const changes: Partial<Post> = {
            title: "Test title",
            author: "Test author",
            text: "Test text",
            id: dummyPost.id
        }

        postService.update(changes).subscribe((post) => {

            expect(post.id).toBe(dummyPost.id)

        })

        const req = httpTestingController.expectOne(`${environment.FbDbUrl}/posts/${changes.id}.json`);

        expect(req.request.method).toEqual("PATCH");

        expect(req.request.body.title).toEqual(changes.title);
    })

    it("123", () => {

        //spyOn(postService, "create").and.returnValue(of(dummyPost))

        postService.create(dummyPost).subscribe((data: Post) => {
            expect(data).toEqual(dummyPost)
        }
        )

        const req = httpTestingController.expectOne({ 
            url:`https://angular-blog-2ba8a-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
            method: "POST"
        })
        expect(req.request.method).toEqual("POST")
        expect(req.request.body).toEqual(dummyPost)

        req.flush({name: dummyPost.id})
    })
})