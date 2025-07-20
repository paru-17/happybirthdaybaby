// Scene Switcher
function nextScene(num) {
  document.querySelectorAll('.scene').forEach(s => {
    s.classList.remove('show');
    s.classList.add('hidden');
  });

  if (num === 1) {
    document.getElementById('scene1').classList.remove('hidden');
    document.getElementById('scene1').classList.add('show');
    typeText("Are you ready to get your birthday wish?", "scene1text");
  } else if (num === 2) {
    document.getElementById('scene2').classList.remove('hidden');
    document.getElementById('scene2').classList.add('show');
    typeText("Say you love me first!", "scene2text");
  } else if (num === 3) {
    document.getElementById('scene3').classList.remove('hidden');
    document.getElementById('scene3').classList.add('show');
    startConfetti();
    document.getElementById('clickMeText').classList.remove('hidden'); // Show "Click Me!"
  }
}

function showSecret() {
  document.querySelectorAll('.scene').forEach(s => {
    s.classList.remove('show');
    s.classList.add('hidden');
  });
  document.getElementById('secretScene').classList.remove('hidden');
  document.getElementById('secretScene').classList.add('show');
}

function typeText(text, elementId) {
  let i = 0;
  const el = document.getElementById(elementId);
  el.innerHTML = '';
  const interval = setInterval(() => {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 80);
}

window.onload = () => {
  document.getElementById('scene0').classList.add('show');
};

// Footprint trail
document.addEventListener("mousemove", function(e) {
  const foot = document.createElement("div");
  foot.classList.add("footprint");
  foot.style.left = e.pageX + "px";
  foot.style.top = e.pageY + "px";
  document.body.appendChild(foot);
  setTimeout(() => foot.remove(), 1000);
});

// Confetti
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let confettiPieces = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfettiPiece() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.floor(Math.random() * 6 + 4),
    speed: Math.random() * 2 + 1,
  };
}

function startConfetti() {
  confettiPieces = [];
  for (let i = 0; i < 100; i++) {
    confettiPieces.push(createConfettiPiece());
  }
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
    p.y += p.speed;
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(updateConfetti);
}

// Gift box + kiss + video
function openGift() {
  const box = document.getElementById('giftbox');
  const kiss = document.getElementById('kiss');
  const videoPopup = document.getElementById('videoPopup');
  const clickMeText = document.getElementById('clickMeText'); // Get the "Click Me!" element

  if (!box.classList.contains('open')) {
    box.classList.add('open');
    clickMeText.classList.add('hidden'); // Hide "Click Me!" when opened

    kiss.classList.remove('hidden');
    kiss.classList.remove('kiss-anim');
    void kiss.offsetWidth;
    kiss.classList.add('kiss-anim');
    setTimeout(() => {
      kiss.classList.add('hidden');
    }, 2000);

    videoPopup.classList.remove('hidden');
  }
}

// Play VHS sound once on button click
function playVHSSound() {
  const audio = document.getElementById("vhsSound");
  audio.play();
}