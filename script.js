// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn and change title messages

let noHoverCount = 0;

const noMessages = [
    null,                                    // hover 1: just move
    null,                                    // hover 2: just move
    "Are you sure NO?",                      // hover 3
    "Pakka pakka sure?",                     // hover 4
    "Pakaaaaaaa??!",                         // hover 5
    "Ab NO try kra to gayab kr dunga",       // hover 6 jyada hora hai ab no gyab kr dunga
];

function handleNoInteraction(e) {
    if (e.type === "touchstart") e.preventDefault();
    noHoverCount++;

    // Always move the NO button (clamped to viewport)
    const rect = noBtn.getBoundingClientRect();
    const btnW = rect.width;
    const btnH = rect.height;
    const padding = 10;

    // Calculate random position within viewport bounds
    const minX = padding;
    const maxX = window.innerWidth - btnW - padding;
    const minY = padding;
    const maxY = window.innerHeight - btnH - padding;

    const targetX = Math.random() * (maxX - minX) + minX;
    const targetY = Math.random() * (maxY - minY) + minY;

    // Convert to translate offset relative to button's original position
    const originalRect = noBtn.parentElement.getBoundingClientRect();
    const moveX = targetX - originalRect.left;
    const moveY = targetY - originalRect.top;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // After first 2 hovers, start changing title messages
    if (noHoverCount >= 2 && noHoverCount <= 5) {
        title.textContent = noMessages[noHoverCount];
    }

    // After hover 6, hide NO and center YES
    if (noHoverCount > 5) {
        noBtn.parentElement.style.display = "none";
        yesBtn.style.margin = "0 auto";
        title.textContent = "hehe 🥰🥰";
    }
}

noBtn.addEventListener("mouseover", handleNoInteraction);
noBtn.addEventListener("touchstart", handleNoInteraction, { passive: false });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.innerHTML = 'Lezz goooooooooo!<br><span style="font-size: 0.8em;";>see you always make right choices 🥰</span>';

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});
