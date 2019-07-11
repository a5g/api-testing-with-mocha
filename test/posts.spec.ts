import { expect } from 'chai'
import Posts from '../src/apis/PostsAPI'
let schema = require('../src/model/posts-schema')

const posts = new Posts()

describe('JSON placeholder /posts tests ==> ', () => {
  describe('GET /posts test', () => {
    let res: any = null
    before(() => {
      return posts.getAllPosts().then((response) => {
        res = response
      })
    })

    it('should have status code 200', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('should have valid json response', () => {
      let responseSchema = {
        type: 'array',
        minItems: 10,
        maxItems: 100,
        items: schema,
      }

      posts.validate(responseSchema, res.body)
    })
  })

  describe('GET /posts/{id} test', () => {
    let res: any = null
    let id: number = 7
    before(() => {
      return posts.getPostById(id).then((response) => {
        res = response
      })
    })

    it('should have status code 200', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('should have valid json response', () => {
      posts.validate(schema, res.body)
    })

    it('should match post id', () => {
      expect(res.body.id).to.eq(id)
    })
  })

  describe('GET /posts/{invalid_id} test', () => {
    let res: any = null
    let id: number = 9978
    before(() => {
      return posts.getPostById(id).then((response) => {
        res = response
      })
    })

    it('should have status code 404 {}', () => {
      expect(res.statusCode).to.eq(404)
    })

    it('should have valid json response', () => {
      posts.validate({}, res.body)
    })
  })

  describe('POST /posts test', () => {
    let res: any = null
    let data = {
      userId: 1,
      title: 'foo',
      body: 'bar',
    }

    before(() => {
      return posts.createPost(data).then((response) => {
        res = response
      })
    })

    it('should have status code 201', () => {
      expect(res.statusCode).to.eq(201)
    })

    it('should have valid json response', () => {
      posts.validate(schema, res.body)
    })

    it('should match userId', () => {
      expect(res.body.userId).to.eq(data.userId)
    })

    it(`should create id as '101'`, () => {
      expect(res.body.id).to.eq(101)
    })

    it('should match title', () => {
      expect(res.body.title).to.eq(data.title)
    })

    it('should match body', () => {
      expect(res.body.body).to.eq(data.body)
    })
  })

  describe('PUT /posts/{id} test', () => {
    let res: any = null
    let data = {
      userId: 1,
      id: 1,
      title: 'foo',
      body: 'bar',
    }

    before(() => {
      return posts.updatePost(data).then((response) => {
        res = response
      })
    })

    it('should have status code 200', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('should have valid json response', () => {
      posts.validate(schema, res.body)
    })

    it('should match userId', () => {
      expect(res.body.userId).to.eq(data.userId)
    })

    it(`should update id as '${data.id}'`, () => {
      expect(res.body.id).to.eq(data.id)
    })

    it('should match title', () => {
      expect(res.body.title).to.eq(data.title)
    })

    it('should match body', () => {
      expect(res.body.body).to.eq(data.body)
    })
  })

  describe('PATCH /posts/{id} test', () => {
    let res: any = null
    let id: number = 1
    let data = {
      title: 'foo',
    }

    before(() => {
      return posts.updatePostAttribute(id, data).then((response) => {
        res = response
      })
    })

    it('should have status code 200', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('should have valid json response', () => {
      posts.validate(schema, res.body)
    })

    it(`should have userId as '1'`, () => {
      expect(res.body.userId).to.eq(1)
    })

    it(`should match id`, () => {
      expect(res.body.id).to.eq(id)
    })

    it('should match title', () => {
      expect(res.body.title).to.eq(data.title)
    })

    it(`should have 'quia et suscipit' in body`, () => {
      expect(res.body.body).to.contain(`quia et suscipit`)
    })
  })

  describe('DELETE /posts/{id} test', () => {
    let res: any = null
    let id: number = 1

    before(() => {
      return posts.deletePost(id).then((response) => {
        res = response
      })
    })

    it('should have status code 200', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('should have valid json response', () => {
      posts.validate({}, res.body)
    })
  })
})
