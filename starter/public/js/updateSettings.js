/* eslint-disable */
// public/js/settings.js
// Utility function to show alerts
if (typeof showAlert === 'undefined') {
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
}

// Update user data (name, email, photo)
const updateSettings = async (formData) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: formData,
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Profile updated successfully!');
      // Update the photo in the UI if it exists in the response
      const userPhoto = document.querySelector('.form__user-photo');
      if (res.data.data?.user?.photo && userPhoto) {
        // Create a new URL to force image reload
        const timestamp = new Date().getTime();
        userPhoto.src = `/img/users/${res.data.data.user.photo}?t=${timestamp}`;
      }
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || 'Update failed');
  }
};

// Event listener - only attach if not already attached
if (!document.querySelector('.form-user-data')?.hasListener) {
  const userDataForm = document.querySelector('.form-user-data');
  if (userDataForm) {
    userDataForm.hasListener = true; // Mark as having a listener
    userDataForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const form = new FormData();
      form.append('name', document.getElementById('name').value);
      form.append('email', document.getElementById('email').value);
      const photo = document.getElementById('photo').files[0];
      if (photo) form.append('photo', photo);

      await updateSettings(form);
    });
  }
}
