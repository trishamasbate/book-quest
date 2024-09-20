const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// Define the secret key and token expiration time
const secret = 'mysecretssshhhhhh';
const expiration = '2h';

module.exports = {
  // Define a custom GraphQL error for authentication failures
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  
  // Middleware function to authenticate requests
  authMiddleware: function ({ req }) {
    // Allow token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token is sent via the authorization header, extract the actual token value
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is found, return the request object as is
    if (!token) {
      return req;
    }

    // Verify the token and add the decoded user's data to the request object
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // Return the request object so it can be passed to the resolver as `context`
    return req;
  },

  // Function to sign a new token with user data
  signToken: function ({ email, name, _id }) {
    // Create a payload with the user's email, name, and ID
    const payload = { email, name, _id };
    // Sign the token with the secret key and set the expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};