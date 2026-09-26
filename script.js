const envelope = document.querySelector("#envelope");
const noteButton = document.querySelector("#noteButton");
const openedMessage = document.querySelector("#openedMessage");
const shareButton = document.querySelector("#shareButton");
const toast = document.querySelector("#toast");

noteButton.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("open");
  noteButton.innerHTML = isOpen ? "Close your letter <span>♡</span>" : "Tap to open your letter <span>♡</span>";
  openedMessage.classList.toggle("visible", isOpen);
});

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: "For XiaoYun, with love",
    text: "A little love note for XiaoYun ♡",
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showToast();
    }
  } catch (error) {
    if (error.name !== "AbortError") showToast("Copy the address above to share it ♡");
  }
});

function showToast(message = "Link copied — now send it to XiaoYun ♡") {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3000);
}

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > .25 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${12 + Math.random() * 15}px`;
  heart.style.animationDuration = `${5 + Math.random() * 4}s`;
  document.querySelector(".floating-hearts").appendChild(heart);
  window.setTimeout(() => heart.remove(), 9000);
}

window.setInterval(createHeart, 1300);
