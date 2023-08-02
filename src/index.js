import './css/style.css';

const display = (data) => {
  const scores = data.result;
  const scoreContainer = document.querySelector('.score-list');
  let currentColor = '#9D9D9D';
  scoreContainer.innerHTML = '';
  scores.forEach((score) => {
    const scoreItem = `
      <p class="score-text">${score.user} ${score.score}</p>
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
};

let id = '';
let apiPath = '';

const gameId = async () => {
  const data = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'leaderboard',
      }),
    },
  )
    .then((res) => res.json())
    .then((data) => data);

  [, , , id] = data.result.split(' ');
};

window.addEventListener('load', async () => {
  await gameId();
  apiPath = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
});

const refresh = async () => {
  await fetch(apiPath)
    .then((res) => res.json())
    .then((data) => {
      display(data);
    });
};

const submitForm = async (name, score) => {
  await fetch(apiPath, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      user: name.value,
      score: score.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

document.querySelector('.refresh-btn').addEventListener('click', () => {
  refresh();
});

document.querySelector('.form-score').addEventListener('submit', (e) => {
  e.preventDefault();
  const { name } = document.querySelector('.form-score').elements;
  const { score } = document.querySelector('.form-score').elements;
  submitForm(name, score);
  document.querySelector('.form-score').reset();
});
