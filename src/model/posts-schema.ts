module.exports = {
  type: 'object',
  properties: {
    userId: { type: 'number', maximum: 1000 },
    id: { type: 'number', maximum: 1000 },
    title: { type: 'string' },
    body: { type: 'string' },
  },
  required: ['userId', 'id', 'title', 'body'],
}
