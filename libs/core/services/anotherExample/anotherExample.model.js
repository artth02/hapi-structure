const mongoose = require('mongoose')

module.exports = () => {
  const Schema = mongoose.Schema

  const anotherExampleSchema = new Schema({
    id: {
      type: Schema.ObjectId
    },
    __v: {
      type: Number,
      select: false
    },
    name: {
      type: String
    }
  }, { versionKey: false })

  anotherExampleSchema.set('toJSON', {
    transform: function (doc, ret, options) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  })

  return mongoose.model('AnotherExample', anotherExampleSchema, 'anotherExample')
}
