import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const SignupForm = () => {
  // Initialize form state with empty fields
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // State to track form validation status
  const [validated] = useState(false);
  // State to control the visibility of the alert
  const [showAlert, setShowAlert] = useState(false);

  // Handle changes in form inputs and update state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields as per react-bootstrap documentation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Call createUser API with form data
      const response = await createUser(userFormData);

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // Extract token and user data from response
      const { token, user } = await response.json();
      console.log(user);
      // Log in the user with the received token
      Auth.login(token);
    } catch (err) {
      console.error(err);
      // Show alert if there is an error
      setShowAlert(true);
    }

    // Reset form fields after submission
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };