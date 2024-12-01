document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', () => {
      const items = button.nextElementSibling;
      if (items) {
        items.style.display = items.style.display === 'block' ? 'none' : 'block';
      }
    });
  });