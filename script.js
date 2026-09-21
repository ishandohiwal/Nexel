// ==========================================
// NEXEL — FRONTEND INTERACTIONS
// ==========================================


// ---------- ELEMENTS ----------

const sidebar = document.querySelector(".sidebar");
const mobileMenu = document.getElementById("mobileMenu");
const newChatBtn = document.getElementById("newChatBtn");
const promptInput = document.getElementById("promptInput");
const sendBtn = document.getElementById("sendBtn");

const navItems = document.querySelectorAll(".nav-item");
const quickCards = document.querySelectorAll(".quick-card");


// ---------- MOBILE SIDEBAR ----------

if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });
}


// Close mobile sidebar when clicking outside it

document.addEventListener("click", (event) => {

    if (!sidebar || !mobileMenu) return;

    const clickedInsideSidebar = sidebar.contains(event.target);
    const clickedMenuButton = mobileMenu.contains(event.target);

    if (
        window.innerWidth <= 900 &&
        !clickedInsideSidebar &&
        !clickedMenuButton
    ) {
        sidebar.classList.remove("open");
    }
});


// ---------- NAVIGATION ----------

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        // Ignore buttons that are not navigation items
        if (
            item.classList.contains("new-chat") ||
            item.closest(".sidebar-bottom")
        ) {
            return;
        }

        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        // Close sidebar on mobile
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
        }
    });

});


// ---------- NEW CHAT ----------

if (newChatBtn) {

    newChatBtn.addEventListener("click", () => {

        if (promptInput) {
            promptInput.value = "";
            promptInput.focus();
        }

        showNotification("New chat started");
    });

}


// ---------- PROMPT AUTO RESIZE ----------

if (promptInput) {

    promptInput.addEventListener("input", () => {

        promptInput.style.height = "auto";

        promptInput.style.height =
            Math.min(promptInput.scrollHeight, 150) + "px";

    });

}


// ---------- SEND BUTTON ----------

if (sendBtn) {

    sendBtn.addEventListener("click", sendMessage);

}


// ---------- ENTER TO SEND ----------

if (promptInput) {

    promptInput.addEventListener("keydown", (event) => {

        // Enter sends the message
        // Shift + Enter creates a new line

        if (event.key === "Enter" && !event.shiftKey) {

            event.preventDefault();

            sendMessage();

        }

    });

}


// ---------- SEND MESSAGE ----------

function sendMessage() {

    if (!promptInput) return;

    const message = promptInput.value.trim();

    if (!message) {

        showNotification("Type something first");

        promptInput.focus();

        return;
    }

    /*
        AI BACKEND WILL BE CONNECTED HERE LATER.

        For now we only demonstrate that
        Nexel received the user's message.
    */

    showNotification("Nexel received your message");

    console.log("Nexel prompt:", message);

}


// ---------- QUICK ACTIONS ----------

quickCards.forEach((card) => {

    card.addEventListener("click", () => {

        const title = card.querySelector("strong");

        if (!title) return;

        const action = title.textContent;

        showNotification(action);

    });

});


// ---------- NOTIFICATION ----------

function showNotification(message) {

    const existing = document.querySelector(".nexel-notification");

    if (existing) {
        existing.remove();
    }

    const notification = document.createElement("div");

    notification.className = "nexel-notification";

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("hide");

        setTimeout(() => {
            notification.remove();
        }, 250);

    }, 1800);

}


// ---------- NOTIFICATION STYLES ----------

const notificationStyles = document.createElement("style");

notificationStyles.textContent = `

    .nexel-notification {

        position: fixed;

        left: 50%;
        bottom: 25px;

        transform: translateX(-50%);

        padding: 11px 17px;

        border: 1px solid rgba(255,255,255,0.1);

        border-radius: 10px;

        background: rgba(20,20,26,0.94);

        color: #f5f5f7;

        font-size: 12px;

        box-shadow:
            0 10px 35px rgba(0,0,0,0.35);

        backdrop-filter: blur(15px);

        z-index: 9999;

        animation: nexelNotificationIn 0.25s ease;

    }

    .nexel-notification.hide {

        opacity: 0;

        transform:
            translate(-50%, 10px);

        transition: 0.25s ease;

    }

    @keyframes nexelNotificationIn {

        from {

            opacity: 0;

            transform:
                translate(-50%, 10px);

        }

        to {

            opacity: 1;

            transform:
                translate(-50%, 0);

        }

    }

`;

document.head.appendChild(notificationStyles);


// ---------- CONSOLE ----------

console.log(
    "%cNEXEL",
    "font-size: 28px; font-weight: bold;"
);

console.log(
    "%cIntelligence, reimagined.",
    "font-size: 13px;"
);
