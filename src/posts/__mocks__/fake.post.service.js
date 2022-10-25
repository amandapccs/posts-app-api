const { fakePosts } = require("./fake.post");

const fakePostService = {
    getAll: () => Promise.resolve(fakePosts),
    getById: () => Promise.resolve(fakePosts[0]),
    create: () => Promise.resolve(fakePosts[0]),
    update: () => Promise.resolve(fakePosts[0]),
    delete: () => Promise.resolve(fakePosts[0]),
}

module.exports = { fakePostService }