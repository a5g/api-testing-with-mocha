import { expect } from 'chai'
import Comments from '../src/apis/CommentsAPI'
let schema = require('../src/model/comments-schema')

const comments = new Comments()

describe('JSON placeholder /comments tests ==> ', () => {
  describe('GET /comments test', () => {
    let res: any = null
    before(() => {
      return comments.getAllComments().then((response) => {
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
        maxItems: 500,
        items: schema,
      }

      comments.validate(responseSchema, res.body)
    })
  })

  describe('GET /comments/{id} test', () => {
    let res: any = null
    let id: number = 1
    before(() => {
      return comments.getCommentById(id).then((response) => {
        res = response
      })
    })

    it('should have status code 200', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('should have valid json response', () => {
      comments.validate(schema, res.body)
    })

    it('should match comment id', () => {
      expect(res.body.id).to.eq(id)
    })
  })

  describe('GET /comments/{invalid_id} test', () => {
    let res: any = null
    let id: number = 9978
    before(() => {
      return comments.getCommentById(id).then((response) => {
        res = response
      })
    })

    it('should have status code 404 {}', () => {
      expect(res.statusCode).to.eq(404)
    })

    it('should have valid json response', () => {
      comments.validate({}, res.body)
    })
  })
})
