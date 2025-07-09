/**
 * Wraps an async function to catch errors and pass them to Express's error handling middleware
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - A new function that handles errors
 */
export default (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
