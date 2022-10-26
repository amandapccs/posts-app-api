class PostDto {
    constructor(post) {
        this.title = post.title;
        this.content = post.content;
    }
}

module.exports = { PostDto };