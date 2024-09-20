// Define the GraphQL schema using the SDL (Schema Definition Language)
const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        bookId: String!
        image: String
        link: String
        title: String!
        description: String
    }

    input BookInput {
        authors: [String]
        bookId: String!
        image: String
        link: String
        title: String!
        description: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(book: BookInput!): User
        deleteBook(bookId: String!): User
    }
`;

// Export the type definitions for use in the GraphQL server setup
module.exports = typeDefs;