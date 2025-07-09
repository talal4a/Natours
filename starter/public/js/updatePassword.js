// Use global axios
const axios = window.axios;

export const updatePassword = async (currentPassword, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMyPassword',
      data: {
        currentPassword,
        password,
        passwordConfirm
      },
      withCredentials: true
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password updated successfully!');
      
      // Clear the form fields
      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || 'Error updating password. Please try again.');
  } finally {
    // Re-enable the button
    const btn = document.querySelector('.btn--save-password');
    if (btn) {
      btn.textContent = 'Save password';
      btn.disabled = false;
    }
  }
};

// DOM Elements
const domElements = () => ({
  passwordForm: document.querySelector('.form-user-password'),
  btnSavePassword: document.querySelector('.btn--save-password')
});

// Initialize the password update functionality
const initPasswordUpdate = () => {
  const { passwordForm, btnSavePassword } = domElements();
  
  if (!passwordForm || !btnSavePassword) return;
  
  passwordForm.addEventListener('submit', async e => {
    e.preventDefault();
    
    // Disable the button and show loading state
    btnSavePassword.textContent = 'Updating...';
    btnSavePassword.disabled = true;
    
    // Get form values
    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    
    // Validate passwords match
    if (password !== passwordConfirm) {
      showAlert('error', 'Passwords do not match!');
      btnSavePassword.textContent = 'Save password';
      btnSavePassword.disabled = false;
      return;
    }
    
    // Update password
    await updatePassword(currentPassword, password, passwordConfirm);
  });
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPasswordUpdate);
} else {
  initPasswordUpdate();
}
