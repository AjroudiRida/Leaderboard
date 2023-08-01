import './css/style.css';

const scores = [
  {
    name: 'Jhon',
    score: 12,
  },
  {
    name: 'Hannah',
    score: 18,
  },
  {
    name: 'dave',
    score: 18,
  },
];

const scoreContainer = document.querySelector('.score-list');
let currentColor = '#9D9D9D';

scores.forEach((score) => {
  const scoreItem = `
    <p class="score-text">${score.name} ${score.score}</p>
  `;
  const ele = document.createElement('div');
  ele.setAttribute('class', 'score-item');
  ele.innerHTML = scoreItem;
  if (ele.style.backgroundColor !== currentColor) {
    ele.style.backgroundColor = currentColor;
    currentColor = '';
  } else {
    currentColor = '#9D9D9D';
  }
  scoreContainer.appendChild(ele);
});