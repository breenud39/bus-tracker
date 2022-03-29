const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
<<<<<<< HEAD
<<<<<<< HEAD
const bookSchema = require('./Book');
=======
const buyTicketSchema = require('./buyTicket');
>>>>>>> 61154fa (add authn and buy ticket)
=======
const buyTicketSchema = require('./buyTicket');
>>>>>>> 61154fa (add authn and buy ticket)

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
<<<<<<< HEAD
<<<<<<< HEAD
    savedBooks: [bookSchema],
=======
    savedbuyTicket: [buyTicketSchema],
>>>>>>> 61154fa (add authn and buy ticket)
=======
    savedbuyTicket: [buyTicketSchema],
>>>>>>> 61154fa (add authn and buy ticket)
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
<<<<<<< HEAD
<<<<<<< HEAD
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
=======
userSchema.virtual('buyTicketCount').get(function () {
  return this.savedbuyTicket.length;
>>>>>>> 61154fa (add authn and buy ticket)
=======
userSchema.virtual('buyTicketCount').get(function () {
  return this.savedbuyTicket.length;
>>>>>>> 61154fa (add authn and buy ticket)
});

const User = model('User', userSchema);

module.exports = User;
<<<<<<< HEAD
<<<<<<< HEAD
=======


>>>>>>> 61154fa (add authn and buy ticket)
=======


>>>>>>> 61154fa (add authn and buy ticket)
