const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Import the book schema from Book.js
const bookSchema = require('./Book');

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure the username is unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure the email is unique
      match: [/.+@.+\..+/, 'Must use a valid email address'], // Validate the email format
    },
    password: {
      type: String,
      required: true, // Password is required
    },
    // Set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema],
  },
  // Enable virtual fields to be included in JSON output
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Middleware to hash the user password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10; // Define the number of salt rounds for bcrypt
    this.password = await bcrypt.hash(this.password, saltRounds); // Hash the password
  }

  next(); // Proceed to the next middleware or save operation
});

// Custom method to compare and validate the password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
};

// Virtual field to get the number of saved books
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length; // Return the length of the savedBooks array
});

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;