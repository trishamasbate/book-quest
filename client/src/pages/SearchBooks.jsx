import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
// Import mutation hook from Apollo Client
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SearchBooks = () => {
  // State to hold the books returned from the Google Books API
  const [searchedBooks, setSearchedBooks] = useState([]);

  // State to hold the user's search input
  const [searchInput, setSearchInput] = useState('');

  // State to hold the IDs of books that have been saved
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // Set up the saveBook mutation
  const [saveBook] = useMutation(SAVE_BOOK);

  // useEffect hook to save the list of saved book IDs to localStorage when the component unmounts
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // Function to handle form submission and search for books
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      // Fetch books from Google Books API using the search input
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
      if (!response.ok) {
        throw new Error('Error fetching book data');
      }

      const data = await response.json();
      // Map the response data to a format suitable for the state
      const bookData = data.items.map(item => ({
        authors: item.volumeInfo.authors || [],
        bookId: item.id,
        image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
        link: item.volumeInfo.title,
        title: item.volumeInfo.title,
        description: item.volumeInfo.description || '',
      }));

      // Update the state with the fetched book data
      setSearchedBooks(bookData);
      // Clear the search input field
      setSearchInput('');

    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle saving a book to the database
  const handleSaveBook = async (bookId) => {
    // Find the book in the searchedBooks state by its ID
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    if (!bookToSave) return;

    // Get the user's token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

    try {
      // Save the book using the saveBook mutation
      await saveBook({ variables: { book: { ...bookToSave } } });

    } catch (error) {
      console.error('Error saving book', error);
    }

    // Update the state with the new list of saved book IDs
    setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;