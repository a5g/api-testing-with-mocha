# api-testing-with-mocha

This is a boilerplate project that uses Typescript, Mocha, Chai and Request for api testing in Node.js. This project is useful not only as an example of api testing in Node.js, but it also includes examples of the ServiceObject pattern, JSON Schema Validation (using ajv) and some practical examples for using Request to build an automated test suite with Mocha & Chai.

This covers testing of all possible methods of request like GET, POST, PUT, PATCH and DELETE. There are multiple user friendly reporters integrated to easily analyse the results.

Not just that, it also provides the debugging support in VSCode.

## Prerequisites

- Node.js latest (Install Nodejs 8.x using [nvm](https://github.com/creationix/nvm) or [Node.js](https://nodejs.org/en/))
- gulp-cli [ \> npm install -g gulp-cli ]
- allure-commandline [ \> npm install -g allure-commandline ]
- [Java 1.8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

Optional

- [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

## Preferred Editor

[VSCode](https://code.visualstudio.com/download) with extensions

- Prettier - Code Formatter

## Getting Started

\> git clone git@github.com:a5g/api-testing-with-mocha.git <br />
\> cd api-testing-with-mocha <br />
\> npm install<br />
\> gulp test <br />

## Why TypeScript

TypeScript offers the benefit of types, but you won't find them in this project. I have found TypeScript to be great because of the IDE intellisense and support for the latest JavaScript features:

![typescript](https://github.com/a5g/api-testing-with-mocha/blob/master/assets/typescript.png)

You no longer need to explicitly compile your TypeScript to JavaScript using the command `tsc`. This project uses ts-node/register and tsconfig-paths.

## Gulp

[gulp](https://gulpjs.com/) has been integrated to simplify the task execution.

## JSONPlaceholder

[JSONPlaceholder](https://jsonplaceholder.typicode.com) provides a set of apis that can be used for testing. Examples in this test refers to some of APIs from JSONPlaceholder.

## AJV

JSON Schema Validation in all tests are done with the help of [ajv](https://github.com/epoberezkin/ajv).

## Service Objects

Service Objects are a really good abstraction for the api endpoints that you interact with your tests. Create methods for GET, POST, PUT and DELETE requests for a given API.

##### `src/apis/PostsAPI.ts`

```typescript
import Base from './Base'
import API from './API'
const globals = require('../../config/globals')

const api = new API()
const headers = {
  'Content-type': 'application/json; charset=UTF-8',
}

export default class PostsAPI extends Base {
  getAllPosts() {
    const options = {
      url: `${globals.baseURL}/posts`,
      headers,
    }

    return api.get(options)
  }

  getPostById(id = 1) {
    const options = {
      url: `${globals.baseURL}/posts/${id}`,
      headers,
    }

    return api.get(options)
  }

  createPost(body) {
    const options = {
      url: `${globals.baseURL}/posts`,
      headers,
      body,
    }

    return api.post(options)
  }

  updatePost(body) {
    const options = {
      url: `${globals.baseURL}/posts/${body.id}`,
      headers,
      body,
    }

    return api.put(options)
  }

  updatePostAttribute(id, body) {
    const options = {
      url: `${globals.baseURL}/posts/${id}`,
      headers,
      body,
    }

    return api.patch(options)
  }

  deletePost(id) {
    const options = {
      url: `${globals.baseURL}/posts/${id}`,
      headers,
    }

    return api.delete(options)
  }
}
```

##### `test/posts.spec.ts`

```typescript
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
})
```

## Reports

To view the HTML Test reports <br />
allure: <br />
\> gulp report

junit: <br />
\> gulp report:junit

mochawesome: <br />
\> open target/mochawesome/report.html

## Allure Reports (sample) <br />

![allure-01](https://github.com/a5g/api-testing-with-mocha/blob/master/assets/allure-01.png)

![allure-02](https://github.com/a5g/api-testing-with-mocha/blob/master/assets/allure-02.png)

Junit Reports
![allure-01](https://github.com/a5g/api-testing-with-mocha/blob/master/assets/junit.png)

Mochawesome Reports
![mochawesome](https://github.com/a5g/api-testing-with-mocha/blob/master/assets/mochawesome.png)

## Debugging

- open the project in vscode
- add a break point in {test/comments.spec.ts} or {test/posts.spec.ts}
- click on debug icon on the left panel
- choose api tests from dropdown
- click on play button

![debug](https://github.com/a5g/api-testing-with-mocha/blob/master/assets/debug.png)

## Test Summary

![summary](https://github.com/a5g/api-testing-with-mocha/blob/master/assets/summary.png)

## Acknowledgements

[JSONPlaceholder](https://jsonplaceholder.typicode.com)
[ajv](https://github.com/epoberezkin/ajv)
