// Use global axios instance
const axios = window.axios;

// Show alert utility (assumes showAlert is globally available)
export const updatePassword = async (
  currentPassword,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMyPassword',
      data: { currentPassword, password, passwordConfirm },
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password updated successfully!');

      // Clear the form fields
      ['password-current', 'password', 'password-confirm'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    }
  } catch (err) {
    showAlert(
      'error',
      err.response?.data?.message ||
        'Error updating password. Please try again.'
    );
  } finally {
    // Re-enable the button
    const btn = document.querySelector('.btn--save-password');
    if (btn) {
      btn.textContent = 'Save password';
      btn.disabled = false;
    }
  }
};

// DOM Selectors
const getDOMElements = () => ({
  passwordForm: document.querySelector('.form-user-password'),
  btnSavePassword: document.querySelector('.btn--save-password'),
});

// Initialize form functionality
const initPasswordUpdate = () => {
  const { passwordForm, btnSavePassword } = getDOMElements();
  if (!passwordForm || !btnSavePassword) return;

  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Loading state
    btnSavePassword.textContent = 'Updating...';
    btnSavePassword.disabled = true;

    // Get input values
    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    // Client-side validation
    if (password !== passwordConfirm) {
      showAlert('error', 'Passwords do not match!');
      btnSavePassword.textContent = 'Save password';
      btnSavePassword.disabled = false;
      return;
    }

    // Call API
    await updatePassword(currentPassword, password, passwordConfirm);
  });
};

// Run when DOM is ready
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', initPasswordUpdate)
  : initPasswordUpdate();
