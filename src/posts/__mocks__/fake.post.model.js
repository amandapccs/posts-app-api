const { fakePosts } = require('./../__mocks__/fake.post');

const fakePostModel = {
  find: () => Promise.resolve(fakePosts),
  findById: () => Promise.resolve(fakePosts[0]),
  create: () => Promise.resolve(fakePosts[0]),
  findByIdAndUpdate: () => Promise.resolve(fakePosts[0]),
  findByIdAndDelete: () => Promise.resolve(),
};

module.exports = { fakePostModel };
