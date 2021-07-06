require('dotenv/config');
require('../src/database')
const { model, Schema } = require('mongoose');
const { hash } = require('bcrypt');

const AdminSchema = new Schema({
  email: String,
  password: String,
  isAdmin: Boolean
}, { collection: 'admin'});

const Admin = model('admin', AdminSchema);

const email = process.env.ADMIN_MAIL;
const password = process.env.ADMIN_PASSWORD;

const populateDb = async () => {
  const passwordHash = await hash(password, 8);

  const adminCreate = {
    email,
    password: passwordHash,
    isAdmin: true,
  }

  await Admin.create(adminCreate)

  process.exit()
}

populateDb();