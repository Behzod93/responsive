
    // DOM Elements
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendBtn = document.getElementById("send-btn");
    const themeToggle = document.getElementById("theme-toggle");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const settingsBtn = document.getElementById("settings-btn");
    const settingsModal = document.getElementById("settings-modal");
    const modalClose = document.getElementById("modal-close");
    const suggestions = document.querySelectorAll(".suggestion");
    const contextMenu = document.getElementById("context-menu");

    // Initialize with dark mode if preferred
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add("dark-mode");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      darkModeToggle.checked = true;
    }

    // Toggle Dark/Light Mode
    function toggleDarkMode() {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      darkModeToggle.checked = isDark;
    }

    themeToggle.addEventListener("click", toggleDarkMode);
    darkModeToggle.addEventListener("change", toggleDarkMode);

    // Auto-resize textarea
    messageInput.addEventListener("input", function() {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    });

    // Send Message Function
    function sendMessage() {
      const message = messageInput.value.trim();
      if (!message) return;

      // Add user message to chat
      addMessage(message, "user");
      messageInput.value = "";
      messageInput.style.height = "auto";

      // Simulate bot typing
      simulateTyping();
    }

    // Add Message to Chat
    function addMessage(text, sender) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message", `${sender}-message`);
      
      messageDiv.innerHTML = `
        <div class="message-options">
          <button class="option-btn" title="Copy"><i class="fas fa-copy"></i></button>
          <button class="option-btn" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
        ${text}
        <div class="message-time">Today, ${timeString}</div>
      `;
      
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Add event listeners to the new message options
      const optionBtns = messageDiv.querySelectorAll(".option-btn");
      optionBtns[0].addEventListener("click", () => copyToClipboard(text));
      optionBtns[1].addEventListener("click", () => messageDiv.remove());
      
      // Add context menu to message
      messageDiv.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        showContextMenu(e, text);
      });
    }

    // Copy text to clipboard
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast("Copied to clipboard!");
      });
    }

    // Show toast notification
    function showToast(message) {
      const toast = document.createElement("div");
      toast.textContent = message;
      toast.style.position = "fixed";
      toast.style.bottom = "20px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      toast.style.backgroundColor = body.classList.contains("dark-mode") ? "#333" : "#f1f1f1";
      toast.style.color = body.classList.contains("dark-mode") ? "white" : "black";
      toast.style.padding = "10px 20px";
      toast.style.borderRadius = "5px";
      toast.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
      toast.style.zIndex = "1000";
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s";
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.opacity = "1";
      }, 10);
      
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, 2000);
    }

    // Simulate Bot Typing
    function simulateTyping() {
      const typingDiv = document.createElement("div");
      typingDiv.classList.add("typing-indicator");
      typingDiv.innerHTML = `
        <div class="typing-text">AI is typing</div>
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
      
      chatMessages.appendChild(typingDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate AI response after a delay
      setTimeout(() => {
        typingDiv.remove();
        const responses = [
          "I'm an AI, so I don't have feelings, but I'm here to help!",
          "Interesting question! Let me think about that...",
          "I can provide information on many topics. What else would you like to know?",
          "Thanks for chatting with me! How can I assist you further?",
          "I'm constantly learning. Can you ask me something else?",
          "That's a great question! Here's what I know about that topic...",
          "I've processed your request. Here's the information you need.",
          "Let me break that down for you in simple terms..."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, "bot");
      }, 1500 + Math.random() * 2000); // Random delay between 1.5-3.5s
    }

    // Show context menu
    function showContextMenu(e, text) {
      contextMenu.style.display = "flex";
      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.style.top = `${e.clientY}px`;
      
      // Set up menu items
      const menuItems = contextMenu.querySelectorAll(".context-item");
      menuItems[0].addEventListener("click", () => copyToClipboard(text));
      menuItems[3].addEventListener("click", () => {
        const messageElement = e.target.closest(".message");
        if (messageElement) messageElement.remove();
      });
    }

    // Hide context menu when clicking elsewhere
    document.addEventListener("click", () => {
      contextMenu.style.display = "none";
    });

    // Suggestion click handler
    suggestions.forEach(suggestion => {
      suggestion.addEventListener("click", () => {
        messageInput.value = suggestion.textContent;
        messageInput.focus();
      });
    });

    // Modal controls
    settingsBtn.addEventListener("click", () => {
      settingsModal.classList.add("active");
    });

    modalClose.addEventListener("click", () => {
      settingsModal.classList.remove("active");
    });

    // Close modal when clicking outside
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.remove("active");
      }
    });

    // Event Listeners
    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Initial bot greeting
    setTimeout(() => {
      addMessage("I can answer questions, help with tasks, and even tell jokes! What would you like to know?", "bot");
    }, 1000);