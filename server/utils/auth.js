// Import GraphQLError for handling GraphQL-specific errors
const { GraphQLError } = require('graphql');
// Import jsonwebtoken to handle JWT creation and verification
const jwt = require('jsonwebtoken');

// Define a secret key for signing JWTs and set token expiration time
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  // Define a custom GraphQL error for authentication failures
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED', // Set a specific error code for unauthenticated access
    },
  }),
  
  // Middleware function to authenticate a user based on a JWT
  authMiddleware: function ({ req }) {
    // Retrieve token from request body, query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token is in the authorization header, extract it from the "Bearer <token>" format
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is found, return the request object unmodified
    if (!token) {
      return req;
    }

    // Verify the token and attach the decoded user data to the request object
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Attach user data to the request for access in resolvers
    } catch {
      console.log('Invalid token'); // Log an error if the token is invalid
    }

    // Return the modified request object with user data (if authenticated) to be used in GraphQL resolvers
    return req;
  },

  // Function to sign a JWT with user data
  signToken: function ({ email, name, _id }) {
    // Create a payload with user-specific data
    const payload = { email, name, _id };
    // Sign the token with the secret key and set expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
