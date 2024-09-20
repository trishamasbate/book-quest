import { gql } from '@apollo/client';

// Query to retrieve the current user's information
export const GET_ME = gql`
    query GetMe {
        me {
            _id
            username
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