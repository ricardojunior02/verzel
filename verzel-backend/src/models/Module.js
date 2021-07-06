import { model, Schema } from "mongoose";

const ModuleSchema = new Schema({
  name: String,
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'class'
    }
  ]
}, { collection: 'modules' });

const Module = model('modules', ModuleSchema)


export default Module;