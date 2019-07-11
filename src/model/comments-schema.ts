module.exports = {
  type: 'object',
  properties: {
    postId: { type: 'number', maximum: 1000 },
    id: { type: 'number', maximum: 1000 },
    email: { type: 'string', format: 'email' },
    body: { type: 'string' },
  },
  required: ['postId', 'id', 'email', 'body'],
}
