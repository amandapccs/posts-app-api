const fakeId = '632130d41623c49bf7b1c7e9';
const fakeId2 = '632130d41623c49bf7b1c7e1';

const fakePosts = [
  { 
    id: fakeId,
    title: 'Post Fake 1',
    content: 'This is my fake post 1',
    insertedAt: '2021-03-01T00:00:00.000Z',
    updatedAt: ['2021-03-01T00:00:00.000Z'],
  },
  { 
    id: fakeId2,
    title: 'Post Fake 2',
    content: 'This is my fake post 2',
    insertedAt: '2021-03-01T00:00:00.000Z',
    updatedAt: ['2021-03-01T00:00:00.000Z'],
  }
]

const updatedPost = {
  title: "Hello World",
  content: ["This is my fake post"],
  updatedAt: ["2022-10-16T20:31:22.334Z", "2022-10-18T20:31:22.334Z"],
  insertedAt: "2022-10-16T20:31:22.334Z",
}


module.exports = { fakePosts, updatedPost };
