/* eslint-disable */
import { showAlert } from './alerts.js'; // This is fine if alerts.js is also a module

export const login = async (email, password) => {
  try {
    const res = await window.axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: { email, password },
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      setTimeout(() => location.assign('/'), 1500);
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || 'Login failed');
  }
};

// Logout
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      window.location.reload(true);
    }
  } catch (err) {
    console.error(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};

// Add login form listener
const loginForm = document.querySelector('.form--login');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
