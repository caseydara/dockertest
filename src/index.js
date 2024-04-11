import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

let time = 0;
setInterval(() => {
  time += 1;
  document.getElementById('main').textContent = `You've been on this page for ${time} seconds.`;
}, 1000);
