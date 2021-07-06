import { model, Schema } from "mongoose";


const ClassSchema = new Schema({
  name: String,
  class_date: Date,
  module: {
    type: Schema.Types.ObjectId,
    ref: 'modules'
  }
}, { collection: 'class'});

const Class = model('class', ClassSchema)


export default Class;