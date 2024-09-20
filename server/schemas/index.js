// Import the GraphQL type definitions
const typeDefs = require('./typeDefs');
// Import the GraphQL resolvers
const resolvers = require('./resolvers');

// Export the type definitions and resolvers for use in the GraphQL server setup
module.exports = { typeDefs, resolvers };