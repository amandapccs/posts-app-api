const { fakePosts } = require("./fake.post");

const fakePostRepository = {
    getAll: () => Promise.resolve(fakePosts),
    getById: () => Promise.resolve(fakePosts[0]),
    create: () => Promise.resolve(fakePosts[0]),
    update: () => Promise.resolve(updatedCar),
    delete: () => Promise.resolve(fakePosts[0]),
}

module.exports = { fakePostRepository }