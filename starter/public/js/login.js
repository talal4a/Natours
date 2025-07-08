// ✅ ALERT FUNCTION
const showAlert = (type, msg) => {
  const el = document.querySelector('.alert');
  if (el) el.remove();

  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  setTimeout(() => {
    const alert = document.querySelector('.alert');
    if (alert) alert.remove();
  }, 3000);
};

// ✅ LOGIN FUNCTION
const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
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

// ✅ LOGOUT FUNCTION
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/users/logout',
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      window.location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};

// ✅ EVENT LISTENERS
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Logout button clicked');
    logout();
  });
}
