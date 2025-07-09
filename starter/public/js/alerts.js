/* eslint-disable */
// Check if the functions are already defined to prevent redeclaration
if (typeof window.showAlert === 'undefined') {
  // Make hideAlert available only within this scope
  const hideAlert = function () {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  };

  // Make showAlert available globally
  window.showAlert = function (type, msg) {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
  };
}
