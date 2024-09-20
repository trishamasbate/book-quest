const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Resolver for querying the logged-in user's data
        me: async (parent, args, context) => {
            console.log('QUERYING ME', context.user);
            if (context.user) {
                // Find the user by ID and populate the savedBooks field
                const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');
                return userData;
            }
            throw new Error('Unable to find user data.');
        },
    },

    Mutation: {
        // Resolver for creating a new user
        createUser: async (parent, { username, email, password }) => {
            try {
                // Check for missing required fields
                if (!username || !email || !password) {
                    throw new Error('Missing required fields.');
                }
                // Create a new user with the provided details
                const user = await User.create({ username, email, password });

                // Generate a token for the new user
                const token = signToken(user);

                return { token, user };

            } catch (error) {
                console.error('Error creating user', error);
                throw new Error('Failed to create a user.');
            }
        },
        // Resolver for logging in a user
        login: async (parent, { email, password }) => {
            try {
                // Find the user by email
                const user = await User.findOne({ email });

                if (!user) {
                    throw new Error('Incorrect email or password.');
                }

                // Check if the provided password is correct
                const correctPassword = await user.isCorrectPassword(password);

                if (!correctPassword) {
                    throw new Error('Incorrect email or password.');
                }

                // Generate a token for the logged-in user
                const token = signToken(user);

                return { token, user };
            } catch (error) {
                console.error('Login error', error.message);
            }
        },
        // Resolver for saving a book to the user's savedBooks
        saveBook: async (parent, { book }, context) => {
            // Check if the user is logged in
            if (context.user) {
                // Add the book to the user's savedBooks
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                ).populate('savedBooks');
                console.log('UPDATED USER:', updatedUser);
                return updatedUser;
            }
            throw new Error('Error updating user with saved book information.');
        },
        // Resolver for deleting a book from the user's savedBooks
        deleteBook: async (parent, { bookId }, context) => {
            console.log('DELETING BOOK TRYING TO', context, bookId);
            // Check if the user is logged in
            if (context.user) {
                // Remove the book from the user's savedBooks
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                ).populate('savedBooks');
                return updatedUser;
            }
            throw new Error('Error removing book data from user.');
        },
    },
};

module.exports = resolvers;