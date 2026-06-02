// Utility functions
const Utils = {
  // Local storage
  localStorage: {
    get: (key) => JSON.parse(localStorage.getItem(key) || '{}'),
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => localStorage.removeItem(key)
  },

  // Switch sections
  switchSection: (sectionName) => {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionName).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Format code
  formatCode: (code) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = code;
    return textarea.value;
  },

  // Highlight code
  highlightCode: (code, language) => {
    // Simple syntax highlighting
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  // Debounce
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Show notification
  showNotification: (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
