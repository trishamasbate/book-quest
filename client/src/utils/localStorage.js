// Function to retrieve saved book IDs from localStorage
export const getSavedBookIds = () => {
  // Check if 'saved_books' exists in localStorage and parse it, otherwise return an empty array
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

// Function to save an array of book IDs to localStorage
export const saveBookIds = (bookIdArr) => {
  // If the array is not empty, save it to localStorage
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    // If the array is empty, remove 'saved_books' from localStorage
    localStorage.removeItem('saved_books');
  }
};

// Function to remove a specific book ID from the saved books in localStorage
export const removeBookId = (bookId) => {
  // Retrieve the saved book IDs from localStorage and parse it, otherwise return null
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  // If there are no saved book IDs, return false
  if (!savedBookIds) {
    return false;
  }

  // Filter out the book ID to be removed and update localStorage
  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};