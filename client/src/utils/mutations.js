import { gql } from '@apollo/client';

// Mutation to create a new user
export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                savedBooks {
                    authors
                    bookId
                    image
                    link
                    title
                    description
                }
            }
        }     
    }
`;

// Mutation to log in a user
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                savedBooks {
                    title
                    authors
                    bookId
                    image
                    link
                    description
                }
            }
        }
    }
`;

// Mutation to save a book to the user's saved books
export const SAVE_BOOK = gql`
    mutation saveBook($book: BookInput!) {
        saveBook(book: $book) {
            _id
            username
            email
            savedBooks {
                title
                authors
                bookId
                image
                link
                description
            }
        }
    }
`;

// Mutation to delete a book from the user's saved books
export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                title
                authors
                description
                image
                link
                bookId
            }
        }
    }
`;