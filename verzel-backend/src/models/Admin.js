import { model, Schema } from 'mongoose';

const AdminSchema = new Schema({
  email: String,
  password: String,
  isAdmin: Boolean
}, { collection: 'admin'});

const Admin = model('admin', AdminSchema);


export default Admin;