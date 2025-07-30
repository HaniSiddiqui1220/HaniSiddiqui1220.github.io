const countdownEl = document.getElementById("countdown");
const startDate = new Date("2022-08-03T09:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = now - startDate;

  if (diff <= 0) {
    countdownEl.innerText = "Starting time hasn't arrived yet!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s elapsed`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

function openVideo(url) {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoIframe");
  iframe.src = url + "?autoplay=1";
  modal.style.display = "flex";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoIframe");
  iframe.src = "";
  modal.style.display = "none";
}

// Close on background click
document.getElementById("videoModal").addEventListener("click", function (e) {
  if (e.target === this) closeVideo();
});
const questions = [
  {
    text: "Agr main worm 🪱 hoti tb bhi mjh sey pyar krty? (❁´◡`❁)",
    yesLabel: "Han Zahir hai!",
    noLabel: "Nope 😅",
    img: "bd5.webp",
  },
  {
    text: "Doosri lrkion ko dekhen gyy? 😒",
    yesLabel: "Kbhi bhi nhi",
    noLabel: "kbhi kbhi...",
    img: "bd2.gif",
  },
  {
    text: "Sari zindagi mery nakhry brdhst kr len gy? 🥺",
    yesLabel: "Ji Meri Jaan!",
    noLabel: "nakhry km dikhaya kro",
    img: "bd3.gif",
  },
  {
    text: "Jo main Bolun gi wo kren gyy na ? 😾",
    yesLabel: "Han jo mera bacha boly!",
    noLabel: "Kuch kuch ap meri bhi sunna",
    img: "bd4.gif",
  },
];

let currentQuestion = 0;

function openQuestionModal() {
  currentQuestion = 0;
  renderQuestion();
  const modal = document.getElementById("questionModal");
  document.getElementById("closeQuestionBtn").style.display = "none";
  document.getElementById("yesBtn").style.display = "inline-block";
  document.getElementById("noBtn").style.display = "inline-block";
  modal.style.display = "block";
  centerModal();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questionText").innerText = q.text;
  document.getElementById("yesBtn").innerText = q.yesLabel;
  document.getElementById("noBtn").innerText = q.noLabel;
  document.getElementById("questionImg").src = q.img;
}

function handleYesClick() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
    centerModal();
  } else {
    showFinalMessage();
  }
}

function handleNoClick() {
  const modal = document.getElementById("questionModal");
  const top = Math.floor(Math.random() * 80) + 10;
  const left = Math.floor(Math.random() * 80) + 10;
  modal.style.top = `${top}%`;
  modal.style.left = `${left}%`;
  modal.style.transform = "translate(-50%, -50%)";
}

function showFinalMessage() {
  const modal = document.getElementById("questionModal");
  document.getElementById("questionText").innerText =
    "Yayy! You passed the test! 🎉❤️";
  document.getElementById("yesBtn").style.display = "none";
  document.getElementById("noBtn").style.display = "none";
  document.getElementById("questionImg").src = "bd6.webp";
  document.getElementById("closeQuestionBtn").style.display = "inline-block";

  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
}

function centerModal() {
  const modal = document.getElementById("questionModal");
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
}
function closeQuestionModal() {
  document.getElementById("questionModal").style.display = "none";
}
const gameModal = document.getElementById("catchHeartsModal");
const gameContainer = document.getElementById("gameContainer");
const player = document.getElementById("player");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("timeLeft");
const finalScoreEl = document.getElementById("finalScore");
const gameOverModal = document.getElementById("gameOverModal");

let score = 0;
let playerX = 0;
let heartInterval;
let gameTimer;
let timeLeft = 30;

const popSound = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

function startGame(gameKey) {
  if (gameKey === "catchHearts") {
    openCatchHeartsModal();
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    playerX = gameContainer.offsetWidth / 2 - 40;
    player.style.left = `${playerX}px`;
    clearInterval(heartInterval);
    clearInterval(gameTimer);
    heartInterval = setInterval(spawnHeart, 800);
    gameTimer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        endCatchHearts();
      }
    }, 1000);
  }

  if (gameKey === "truthDare") {
    tdCounter = 0;
    document.getElementById("truthDarePrompt").innerText =
      "Choose Truth or Dare!";
    document.getElementById("truthDareOptions").style.display = "block";
    document.getElementById("truthDareActionButtons").style.display = "none";
    document.getElementById("truthDareModal").style.display = "block";
  }
  if (gameKey === "puzzleSlider") {
    document.getElementById("puzzleModal").style.display = "flex";

    openPuzzleModal();
    initPuzzle();
  }
  if (gameKey === "memoryGame") {
    document.getElementById("memoryGameModal").style.display = "flex";
    buildMemoryGrid();
    document.getElementById("memoryCompleteMessage").style.display = "none";
    matchedPairs = 0;
  }
  if (gameKey === "typeRacer") {
    document.getElementById("typeRacerModal").style.display = "flex";
    currentQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    document.getElementById("quoteDisplay").textContent = currentQuote;
    document.getElementById("quoteInput").value = "";
    document.getElementById("resultMessage").textContent = "";
    document.getElementById("timer").textContent = "⏱ Time: 0s";
    clearInterval(timerInterval);
    startTime = null;
  }
  if (gameKey === "popBalloon") {
    document.getElementById("balloonGameModal").style.display = "flex";
    balloonScore = 0;
    balloonTime = 30;
    document.getElementById("balloonScore").textContent = balloonScore;
    document.getElementById("balloonTime").textContent = balloonTime;
    startBalloonGame();
  }
}

function openCatchHeartsModal() {
  gameModal.style.display = "flex";
}

function closeCatchHeartsModal() {
  gameModal.style.display = "none";
  clearInterval(heartInterval);
  clearInterval(gameTimer);
}

function endCatchHearts() {
  clearInterval(heartInterval);
  clearInterval(gameTimer);
  finalScoreEl.textContent = score;
  gameOverModal.style.display = "block";
}

function restartCatchHearts() {
  gameOverModal.style.display = "none";
  startGame("catchHearts");
}

document.addEventListener("keydown", (e) => {
  if (!gameModal || gameModal.style.display !== "flex") return;
  if (e.key === "ArrowLeft") {
    playerX -= 20;
  } else if (e.key === "ArrowRight") {
    playerX += 20;
  }
  playerX = Math.max(0, Math.min(playerX, gameContainer.offsetWidth - 80));
  player.style.left = `${playerX}px`;
});

function spawnHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left =
    Math.floor(Math.random() * (gameContainer.offsetWidth - 30)) + "px";
  heart.style.position = "absolute";
  heart.style.width = "30px";
  heart.style.height = "30px";
  heart.style.background =
    "url('https://cdn-icons-png.flaticon.com/512/833/833472.png') no-repeat center/cover";
  gameContainer.appendChild(heart);

  let heartTop = 0;
  const fallInterval = setInterval(() => {
    heartTop += 5;
    heart.style.top = heartTop + "px";

    if (heartTop > gameContainer.offsetHeight) {
      clearInterval(fallInterval);
      heart.remove();
    }

    const heartRect = heart.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      heartRect.bottom >= playerRect.top &&
      heartRect.left < playerRect.right &&
      heartRect.right > playerRect.left &&
      heartRect.top < playerRect.bottom
    ) {
      score++;
      scoreEl.textContent = score;
      popSound.play();
      heart.remove();
      clearInterval(fallInterval);
      if (score % 10 === 0) showConfetti();
    }
  }, 20);
}

function closeCatchHearts() {
  document.getElementById("catchHeartsModal").style.display = "none";
  document.getElementById("gameOverModal").style.display = "none";
  clearInterval(heartInterval);
  clearInterval(timerInterval);
  resetCatchHeartsGame();
}
const truthPrompts = [
  "What's the most romantic thing you've ever done?",
  "When did you know you loved me?",
  "What's your biggest fear of losing me?",
  "If you could go anywhere with me, where would it be?",
  "What do you love most about us?",
];

const darePrompts = [
  "Send me a voice note saying 'I love you' 💌",
  "Give me 3 compliments right now 😍",
  "Take a selfie making a heart shape 💓",
  "Text me your favorite memory with me 🥰",
  "Do a cute dance and record it 💃",
];

let tdCounter = 0;
let tdTimerInterval;

function chooseTruth() {
  nextTruthDarePrompt("truth");
}

function chooseDare() {
  nextTruthDarePrompt("dare");
}

function nextTruthDarePrompt(type) {
  const prompt =
    type === "truth"
      ? truthPrompts[Math.floor(Math.random() * truthPrompts.length)]
      : darePrompts[Math.floor(Math.random() * darePrompts.length)];

  document.getElementById("truthDarePrompt").innerText =
    (type === "truth" ? "Truth: " : "Dare: ") + prompt;
  document.getElementById("truthDareOptions").style.display = "none";
  document.getElementById("truthDareActionButtons").style.display = "block";
  startTruthDareTimer();
}

function completeTruthDare() {
  saveAnswer(document.getElementById("truthDarePrompt").innerText);
  tdCounter++;
  if (tdCounter >= 5) {
    document.getElementById("truthDarePrompt").innerText =
      "🎉 You completed 5 challenges! You're adorable!";
    document.getElementById("truthDareActionButtons").style.display = "none";
    showConfetti();
  } else {
    document.getElementById("truthDareOptions").style.display = "block";
    document.getElementById("truthDareActionButtons").style.display = "none";
    document.getElementById("truthDareTimer").innerText = "";
  }
  stopTruthDareTimer();
}

function closeTruthDareModal() {
  document.getElementById("truthDareModal").style.display = "none";
  stopTruthDareTimer();
}

function startTruthDareTimer() {
  let timeLeft = 30;
  document.getElementById(
    "truthDareTimer"
  ).innerText = `⏱ Time left: ${timeLeft}s`;
  tdTimerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById(
      "truthDareTimer"
    ).innerText = `⏱ Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(tdTimerInterval);
      document.getElementById("truthDarePrompt").innerText =
        "⏰ Time's up! Choose again.";
      document.getElementById("truthDareActionButtons").style.display = "none";
      document.getElementById("truthDareOptions").style.display = "block";
    }
  }, 1000);
}

function stopTruthDareTimer() {
  clearInterval(tdTimerInterval);
  document.getElementById("truthDareTimer").innerText = "";
}

function saveAnswer(answer) {
  const saved = JSON.parse(localStorage.getItem("truthDareAnswers") || "[]");
  saved.push(answer);
  localStorage.setItem("truthDareAnswers", JSON.stringify(saved));
}

function showConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti(
      Object.assign({}, defaults, {
        particleCount: 50,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount: 50,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
      })
    );
  }, 250);
}
let puzzleTiles = [];
const puzzleModal = document.getElementById("puzzleModal");
const puzzleGrid = document.getElementById("puzzleGrid");

function openPuzzleModal() {
  puzzleModal.style.display = "flex";
  renderPuzzle();
}

function closePuzzleModal() {
  puzzleModal.style.display = "none";
}

function initPuzzle() {
  puzzleTiles = [...Array(8).keys()].map((n) => n); // 0 to 7
  puzzleTiles.push(null); // empty tile
  shuffleArray(puzzleTiles);
  renderPuzzle();
}

function renderPuzzle() {
  puzzleGrid.innerHTML = "";
  puzzleTiles.forEach((tile, index) => {
    const div = document.createElement("div");
    div.classList.add("tile");

    if (tile === null) {
      div.classList.add("empty");
    } else {
      const row = Math.floor(tile / 3);
      const col = tile % 3;
      div.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
      div.addEventListener("click", () => moveTile(index));
    }

    puzzleGrid.appendChild(div);
  });
}

function moveTile(index) {
  const emptyIndex = puzzleTiles.indexOf(null);
  const validMoves = [index - 1, index + 1, index - 3, index + 3];

  if (validMoves.includes(emptyIndex) && isAdjacent(index, emptyIndex)) {
    [puzzleTiles[index], puzzleTiles[emptyIndex]] = [
      puzzleTiles[emptyIndex],
      puzzleTiles[index],
    ];
    renderPuzzle();

    if (checkSolved()) {
      setTimeout(() => {
        showConfetti();
        alert("🎉 Puzzle Completed!");
      }, 300);
    }
  }
}

function isAdjacent(i1, i2) {
  const row1 = Math.floor(i1 / 3),
    col1 = i1 % 3;
  const row2 = Math.floor(i2 / 3),
    col2 = i2 % 3;
  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

function checkSolved() {
  const solved = [...Array(8).keys()].concat(null);
  return puzzleTiles.every((val, i) => val === solved[i]);
}

function resetPuzzle() {
  initPuzzle();
}

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

const memoryEmojis = ["💖", "🌹", "💍", "😍", "🎁", "💕", "🧸", "😘"];
let flippedCards = [];
let matchedPairs = 0;

function buildMemoryGrid() {
  const grid = document.getElementById("memoryGrid");
  grid.innerHTML = ""; // clear previous grid
  const cards = [...memoryEmojis, ...memoryEmojis].sort(
    () => 0.5 - Math.random()
  );

  cards.forEach((emoji) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.emoji = emoji;
    card.addEventListener("click", () => flipCard(card));
    grid.appendChild(card);
  });
}

function flipCard(card) {
  if (card.classList.contains("flipped") || flippedCards.length >= 2) return;

  card.textContent = card.dataset.emoji;
  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === memoryEmojis.length) {
        setTimeout(() => {
          document.getElementById("memoryCompleteMessage").style.display =
            "block";
          showConfetti();
        }, 500);
      }
    } else {
      setTimeout(() => {
        first.textContent = "";
        first.classList.remove("flipped");
        second.textContent = "";
        second.classList.remove("flipped");
        flippedCards = [];
      }, 800);
    }
  }
}

function closeMemoryGame() {
  document.getElementById("memoryGameModal").style.display = "none";
}
const loveQuotes = [
  "Hani ki kbhi koi ghlti nhi hoti.",
  "Main blkl hi pagal hoon.",
  "Main hamesha jhoot bolta hoon",
  "Main hameha hani ko jhoot jhoot btata hoon sb.",
  "Main call pr facebook chlata hoon.",
];

let currentQuote = "";
let startTime;
let timerInterval;

document.getElementById("quoteInput").addEventListener("input", function () {
  const input = this.value;
  if (!startTime) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }

  if (input === currentQuote) {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    clearInterval(timerInterval);
    document.getElementById(
      "resultMessage"
    ).textContent = `🎉 You typed it in ${timeTaken}s! You're amazing! 💖`;
    showConfetti();
  }
});

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("timer").textContent = `⏱ Time: ${elapsed}s`;
}

function closeTypeRacerModal() {
  document.getElementById("typeRacerModal").style.display = "none";
  clearInterval(timerInterval);
}
let balloonInterval;
let balloonTimer;
let balloonScore = 0;
let balloonTime = 30;

function startBalloonGame() {
  clearInterval(balloonInterval);
  clearInterval(balloonTimer);

  balloonInterval = setInterval(spawnBalloon, 800);
  balloonTimer = setInterval(() => {
    balloonTime--;
    document.getElementById("balloonTime").textContent = balloonTime;
    if (balloonTime <= 0) endBalloonGame();
  }, 1000);
}

function spawnBalloon() {
  const gameArea = document.getElementById("balloonGameArea");
  const balloon = document.createElement("img");
  balloon.src = "me1.jpg"; // Replace with your transparent balloon image
  balloon.classList.add("balloon");
  balloon.style.left = Math.floor(Math.random() * 260) + "px";

  balloon.addEventListener("click", () => {
    balloon.classList.add("popped"); // Optional pop animation
    balloonScore++;
    document.getElementById("balloonScore").textContent = balloonScore;
    if (balloonScore % 10 === 0) showConfetti();

    setTimeout(() => {
      if (balloon.parentNode) balloon.remove();
    }, 200); // short delay to show pop
  });

  gameArea.appendChild(balloon);

  setTimeout(() => {
    if (balloon.parentNode) balloon.remove();
  }, 3000);
}

function endBalloonGame() {
  clearInterval(balloonInterval);
  clearInterval(balloonTimer);
  alert(`🎉 Time's up! You popped ${balloonScore} balloons!`);
  showConfetti();
}

function closeBalloonGame() {
  document.getElementById("balloonGameModal").style.display = "none";
  clearInterval(balloonInterval);
  clearInterval(balloonTimer);
  document.getElementById("balloonGameArea").innerHTML = "";
}
window.addEventListener("load", () => {
  const start = Date.now();
  const duration = 3000; // 3 seconds
  const heartEmoji = ["💖", "💕", "🫰", "❤️", "😘", "💞", "🫶", "😍"];

  const interval = setInterval(() => {
    const now = Date.now();
    if (now - start > duration) {
      clearInterval(interval);
      setTimeout(() => {}, 3000);
      return;
    }

    const heart = document.createElement("div");
    heart.className = "heart-rain";
    heart.innerText = heartEmoji[Math.floor(Math.random() * heartEmoji.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 24 + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 3500);
  }, 100);
});
const pages = document.querySelectorAll(".love-page");
let current = 0;

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle("active", i === index);
  });
  document.getElementById("pageIndicator").innerText = `${index + 1} / ${
    pages.length
  }`;
}

function nextPage() {
  current = (current + 1) % pages.length;
  showPage(current);
}

function prevPage() {
  current = (current - 1 + pages.length) % pages.length;
  showPage(current);
}

// Show first page initially
showPage(current);
function openGiftModal() {
  document.getElementById("giftModal").style.display = "flex";
  typeLetter(
    "The time we have spent is preciouss and there is a life ahead which will spend together happily, all the moments i have spent with you are so memorable and are the best memories of my life, i can't wait to get married with you so we can be stay together all time and end this long distance. My feeling for you are beyond any limits i can't even tell you how i feel about you,it seems a very short time when we have met and now see we have come so far and Insha Allah we will be together till death. I have no words to tell about my love my love fr you can never be express in words. I love you so much Meri Jann 🥺😘🫶"
  );
}

function closeGiftModal() {
  document.getElementById("giftModal").style.display = "none";
  document.getElementById("typewriterText").innerText = "";
  document.getElementById("yourName").style.opacity = 0;
}

function typeLetter(text) {
  const el = document.getElementById("typewriterText");
  el.innerText = "";
  let i = 0;
  const speed = 50;

  function type() {
    if (i < text.length) {
      el.innerText += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      document.getElementById("yourName").style.opacity = 1;
    }
  }

  type();
}
const quizData = [
  {
    question: "My favorite time to talk?",
    options: ["Morning", "2am", "Evening", "Anytime you're free"],
    answer: "Anytime you're free",
  },
  {
    question: "Which dessert melts my heart?",
    options: ["Chocolate", "Ice cream", "Gulab Jamun", "Your smile"],
    answer: "Your smile",
  },
  {
    question: "When I angry Most?",
    options: [
      "when you talk about others 😴",
      "when i miss you",
      "when you come late",
      "All of these",
    ],
    answer: "All of these",
  },
  {
    question: "Where would I love to go with you?",
    options: ["Cafe", "restaurent", "long drive", "Anywhere with you"],
    answer: "Anywhere with you",
  },
];

let currentQuiz = 0;
let scoreQ = 0;

function openQuizModal() {
  document.getElementById("quizModal").style.display = "flex";
  currentQuiz = 0;
  scoreQ = 0;
  document.getElementById("quizResult").innerText = "";
  showQuizQuestion();
}

function closeQuizModal() {
  document.getElementById("quizModal").style.display = "none";
}

function showQuizQuestion() {
  const questionEl = document.getElementById("quizQuestion");
  const optionsEl = document.getElementById("quizOptions");
  const quiz = quizData[currentQuiz];

  questionEl.innerText = quiz.question;
  optionsEl.innerHTML = "";

  quiz.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkQuizAnswer(option);
    optionsEl.appendChild(btn);
  });
}

function checkQuizAnswer(selected) {
  if (selected === quizData[currentQuiz].answer) {
    scoreQ++;
  }

  currentQuiz++;
  if (currentQuiz < quizData.length) {
    showQuizQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const resultEl = document.getElementById("quizResult");
  document.getElementById("quizQuestion").innerText = "";
  document.getElementById("quizOptions").innerHTML = "";

  if (scoreQ === quizData.length) {
    resultEl.innerText = "💘 Pass hogae wrna kalesh krtii!";
    showConfetti(); // If you already have confetti
  } else if (scoreQ >= 2) {
    resultEl.innerText = `😊 Hmm shi jawab sary nhi aye wow ${scoreQ}/${quizData.length}.`;
  } else {
    resultEl.innerText = `😅 Hmm... only ${scoreQ}/${quizData.length}. Kalesh k lye ready 😉`;
  }
}
const doodles = [
  "bd1.gif", // Replace with your own image paths
  "bd2.gif",
  "bd5.webp",
  "bd7.gif",
  "bd8.gif",
  "bd9.gif",
  "bd10.gif",
  "bd11.gif",
  "bd12.gif",
  "bd13.gif",
  "bd14.gif",
  "bd15.gif",
  "bd17.gif",
  "bd18.gif",
  "bd19.gif",
  "bd20.png",
  "bd16.png",
  "bd21.gif",
  "bd22.gif",
  "bd23.png",
  "bd24.gif",
  "bd25.gif",
  "bd26.gif",
  "bd27.gif",
  "bd29.gif",
  "bd30.gif",
  "bd31.gif",
  "bd32.gif",
  "bd28.gif",
  "bd33.gif"
];

for (let i = 0; i < 30; i++) {
  const img = document.createElement("img");
  img.src = doodles[Math.floor(Math.random() * doodles.length)];
  img.className = "doodle-img";

  img.style.top = Math.random() * 100 + "%";
  img.style.left = Math.random() * 100 + "%";
  img.style.transform = `rotate(${Math.random() * 360}deg) scale(${
    0.8 + Math.random() * 0.6
  })`;
  img.style.animationDelay = `${Math.random() * 5}s`;

  document.querySelector("header").appendChild(img);
}
