const day = document.querySelector('.day');
const date = document.querySelector('.date');

day.textContent = new Date().toLocaleDateString('en', { weekday: 'long' });
date.textContent = new Date().toLocaleDateString('en-US').replaceAll('/', '-');

