// Use global axios
const axios = window.axios;

// Signup function
const signup = async function(name, email, password, passwordConfirm) {
  try {
    // Show loading state
    const submitBtn = document.querySelector('.form--signup button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';

    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        passwordConfirm: passwordConfirm
      },
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Account created successfully! You are now logged in.');
      window.setTimeout(() => {
        window.location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.error('Signup error:', err);
    const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
    showAlert('error', errorMessage);
    
    // Re-enable the submit button
    const submitBtn = document.querySelector('.form--signup button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign up';
    }
  }
};

// DOM Elements
const signupForm = document.querySelector('.form--signup');

// Event Listeners
if (signupForm) {
  signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    
    // Basic validation
    if (!name || !email || !password || !passwordConfirm) {
      showAlert('error', 'All fields are required');
      return;
    }
    
    if (password.length < 8) {
      showAlert('error', 'Password must be at least 8 characters long');
      return;
    }
    
    if (password !== passwordConfirm) {
      showAlert('error', 'Passwords do not match!');
      return;
    }
    
    // Call the signup function
    await signup(name, email, password, passwordConfirm);
  });
}

// Add password strength validation
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');

if (passwordInput) {
  passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const passwordError = document.getElementById('password-error');
    
    // Check password strength
    if (password.length > 0 && password.length < 8) {
      if (!passwordError) {
        const errorEl = document.createElement('div');
        errorEl.id = 'password-error';
        errorEl.className = 'form__error';
        errorEl.textContent = 'Password must be at least 8 characters long';
        passwordInput.parentNode.insertBefore(errorEl, passwordInput.nextSibling);
      }
    } else if (passwordError) {
      passwordError.remove();
    }
  });
}

// Add password match validation
if (passwordConfirmInput) {
  passwordConfirmInput.addEventListener('input', function() {
    const password = document.getElementById('password')?.value;
    const confirmPassword = passwordConfirmInput.value;
    const confirmError = document.getElementById('confirm-error');
    
    if (confirmPassword && password !== confirmPassword) {
      if (!confirmError) {
        const errorEl = document.createElement('div');
        errorEl.id = 'confirm-error';
        errorEl.className = 'form__error';
        errorEl.textContent = 'Passwords do not match';
        passwordConfirmInput.parentNode.insertBefore(errorEl, passwordConfirmInput.nextSibling);
      }
    } else if (confirmError) {
      confirmError.remove();
    }
  });
}
