import { Post } from "../interfaces";

export class PostDto {
    public title;
    public content;
    constructor(post: Post) {
        this.title = post.title;
        this.content = post.content;
    }
}