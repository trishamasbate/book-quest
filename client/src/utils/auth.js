// Import the jwt-decode library to decode JWT tokens
import decode from 'jwt-decode';

// Create a new class to handle authentication-related tasks
class AuthService {
  // Retrieve user profile information by decoding the token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is currently logged in
  loggedIn() {
    // Get the token from localStorage
    const token = this.getToken();
    // Check if the token exists and is not expired
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Check if the token has expired
  isTokenExpired(token) {
    // Decode the token to get its payload
    const decoded = decode(token);
    // Check if the token's expiration time is less than the current time
    if (decoded.exp < Date.now() / 1000) {
      // If the token is expired, remove it from localStorage
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  // Retrieve the token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Save the token to localStorage and redirect to the homepage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Remove the token from localStorage and reload the page
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

// Export an instance of the AuthService class
export default new AuthService();