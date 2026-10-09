```javascript
const params = new URLSearchParams(window.location.search);

const recipientName = params.get("name") || "Birthday Star";
const senderName = params.get("from") || "Someone who cares about you";

document.getElementById("mainHeading").textContent =
  `A Magical Birthday, ${recipientName}!`;

document.getElementById("recipient").textContent =
  `💖 Made extra special for ${recipientName} 💖`;

document.getElementById("letterName").textContent = recipientName;
document.getElementById("senderName").textContent = senderName;

const stage = document.getElementById("giftStage");
const modal = document.getElementById("giftModal");
const modalEmoji = document.getElementById("modalEmoji");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

const colors = [
  "#ff477e", "#7b2ff7", "#00b4d8",
  "#ff8c42", "#d946ef", "#06b6d4"
];

const wishes = [
  ["💖", "A Little Love", `May your life be filled with love, laughter, and beautiful memories, ${recipientName}!`],
  ["🌟", "You Are Amazing!", "Never forget how special you are. Keep shining brighter every day!"],
  ["🎂", "Birthday Wishes!", "May all your sweetest dreams slowly turn into wonderful realities."],
  ["🦋", "A Fresh Beginning", "May this new year of your life bring courage, happiness, and exciting adventures."],
  ["💝", "A Gift of Happiness", "Sending you a thousand smiles, a million good wishes, and endless reasons to celebrate!"],
  ["🎉", "Time to Celebrate!", "Today is all about you! Eat cake, laugh loudly, and make beautiful memories."]
];

let activeGifts = 0;
let giftCounter = 0;
let modalOpen = false;
let lastFocusedElement = null;

function launchConfetti(amount = 55) {
  const colors = ["#ff4dca", "#ffd166", "#4cc9f0", "#ffffff", "#ff477e"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.7 + "s";
    piece.style.animationDuration = 1.8 + Math.random() * 2 + "s";
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 4500);
  }
}

function openGift(gift) {
  if (gift.dataset.opened === "true" || modalOpen) return;

  gift.dataset.opened = "true";
  modalOpen = true;
  lastFocusedElement = gift;

  const wish = wishes[Math.floor(Math.random() * wishes.length)];

  modalEmoji.textContent = wish[0];
  modalTitle.textContent = wish[1];
  modalMessage.textContent = wish[2];

  modal.classList.add("show");
  document.getElementById("closeModalBtn").focus();

  launchConfetti();

  gift.style.transition = "opacity .35s, transform .35s";
  gift.style.opacity = "0";
  gift.style.transform = "scale(0) rotate(35deg)";

  setTimeout(() => {
    gift.remove();
    activeGifts = Math.max(0, activeGifts - 1);
  }, 400);
}

function createGift() {
  if (activeGifts >= 9) return;

  const gift = document.createElement("button");
  gift.type = "button";
  gift.className = "gift";
  gift.setAttribute("aria-label", "Open a birthday gift");

  const color = colors[Math.floor(Math.random() * colors.length)];
  const duration = 6 + Math.random() * 4;

  gift.style.left = Math.max(1, Math.random() * 88) + "%";
  gift.style.setProperty("--gift-color", color);
  gift.style.setProperty("--duration", duration + "s");
  gift.style.animationDelay = "0s";

  gift.innerHTML = `
    <span class="gift-box">
      <span class="bow"></span>
    </span>
  `;

  gift.addEventListener("click", () => openGift(gift));

  gift.addEventListener("animationend", () => {
    if (gift.dataset.opened !== "true") {
      gift.remove();
      activeGifts = Math.max(0, activeGifts - 1);
    }
  });

  stage.appendChild(gift);
  activeGifts++;
  giftCounter++;
}

function closeModal() {
  modal.classList.remove("show");
  modalOpen = false;

  if (lastFocusedElement && lastFocusedElement.isConnected) {
    lastFocusedElement.focus();
  }
}

document.getElementById("closeModalBtn").addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modalOpen) closeModal();
});

document.getElementById("newGiftBtn").addEventListener("click", () => {
  createGift();
  launchConfetti(20);
});

document.getElementById("wishBtn").addEventListener("click", () => {
  modalEmoji.textContent = "🌠";
  modalTitle.textContent = "Make a Beautiful Wish!";
  modalMessage.textContent =
    `Close your eyes, ${recipientName}, and wish for something wonderful. May happiness find its way to you!`;

  modal.classList.add("show");
  modalOpen = true;
  lastFocusedElement = document.getElementById("wishBtn");
  document.getElementById("closeModalBtn").focus();

  launchConfetti(65);
});

document.getElementById("letterBtn").addEventListener("click", () => {
  const letter = document.getElementById("letter");
  letter.classList.toggle("show");

  if (letter.classList.contains("show")) {
    letter.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

document.getElementById("cakeBtn").addEventListener("click", () => {
  const cake = document.getElementById("cake");

  cake.textContent = "🎂";
  cake.style.animation = "none";
  void cake.offsetWidth;
  cake.style.animation = "cakeFloat 1s ease-in-out 3";

  modalEmoji.textContent = "🕯️";
  modalTitle.textContent = "Wish Made!";
  modalMessage.textContent =
    `May your wish come true, ${recipientName}! Keep smiling and enjoy your special day!`;

  modal.classList.add("show");
  modalOpen = true;
  lastFocusedElement = document.getElementById("cakeBtn");
  document.getElementById("closeModalBtn").focus();

  launchConfetti(75);
});

// Start with several gifts, then keep introducing new ones.
for (let i = 0; i < 5; i++) {
  setTimeout(createGift, i * 650);
}

setInterval(() => {
  if (activeGifts < 5) createGift();
}, 1800);
```
