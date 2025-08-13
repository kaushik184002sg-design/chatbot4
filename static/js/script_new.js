// PROJ-BLE Chatbot JavaScript with Glassmorphism Theme Support
class ProjBleChatbot {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.characterCount = document.getElementById('characterCount');
        this.statusDot = document.getElementById('statusDot');
        this.statusText = document.getElementById('statusText');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.themeToggle = document.getElementById('themeToggle');
        
        this.isTyping = false;
        this.messageHistory = [];
        
        this.initializeEventListeners();
        this.initializeTheme();
        this.updateWelcomeTime();
        this.checkServerStatus();
    }
    
    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Character counter
        this.messageInput.addEventListener('input', () => {
            const length = this.messageInput.value.length;
            this.characterCount.textContent = `${length}/500`;
            
            if (length > 450) {
                this.characterCount.style.color = '#ef4444';
            } else if (length > 400) {
                this.characterCount.style.color = '#f59e0b';
            } else {
                this.characterCount.style.color = 'var(--text-muted)';
            }
        });
        
        // Theme toggle
        this.themeToggle.addEventListener('change', () => this.toggleTheme());
        
        // Quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                this.messageInput.value = question;
                this.sendMessage();
            });
        });
    }
    
    initializeTheme() {
        const savedTheme = localStorage.getItem('projble-theme') || 'light';
        this.setTheme(savedTheme);
        this.themeToggle.checked = savedTheme === 'dark';
    }
    
    toggleTheme() {
        const newTheme = this.themeToggle.checked ? 'dark' : 'light';
        this.setTheme(newTheme);
        localStorage.setItem('projble-theme', newTheme);
    }
    
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }
    
    updateWelcomeTime() {
        const welcomeTime = document.getElementById('welcomeTime');
        if (welcomeTime) {
            welcomeTime.textContent = this.formatTime(new Date());
        }
    }
    
    formatTime(date) {
        return date.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }
    
    async checkServerStatus() {
        try {
            const response = await fetch('/health');
            if (response.ok) {
                this.updateStatus('online', 'Ready');
            } else {
                this.updateStatus('warning', 'Issues detected');
            }
        } catch (error) {
            this.updateStatus('offline', 'Offline');
        }
    }
    
    updateStatus(status, text) {
        this.statusText.textContent = text;
        
        switch (status) {
            case 'online':
                this.statusDot.style.background = 'var(--status-online)';
                this.statusDot.style.boxShadow = '0 0 10px var(--status-online)';
                break;
            case 'warning':
                this.statusDot.style.background = 'var(--status-warning)';
                this.statusDot.style.boxShadow = '0 0 10px var(--status-warning)';
                break;
            case 'offline':
                this.statusDot.style.background = 'var(--status-offline)';
                this.statusDot.style.boxShadow = '0 0 10px var(--status-offline)';
                break;
        }
    }
    
    async sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message || this.isTyping) {
            return;
        }
        
        this.addMessage(message, 'user');
        this.messageHistory.push({ role: 'user', content: message });
        
        this.messageInput.value = '';
        this.characterCount.textContent = '0/500';
        this.characterCount.style.color = 'var(--text-muted)';
        
        this.showTyping();
        
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            this.addMessage(data.response, 'bot', data.type);
            this.messageHistory.push({ role: 'assistant', content: data.response });
            
            if (data.error) {
                this.updateStatus('warning', 'Error occurred');
            } else {
                this.updateStatus('online', 'Ready');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage(
                'I apologize, but I\'m having trouble connecting right now. Please check your internet connection and try again.',
                'bot',
                'error'
            );
            this.updateStatus('offline', 'Connection error');
        } finally {
            this.hideTyping();
        }
    }
    
    addMessage(content, sender, type = '') {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const avatarElement = document.createElement('div');
        avatarElement.className = 'message-avatar';
        
        if (sender === 'user') {
            avatarElement.innerHTML = '<i class="fas fa-user"></i>';
        } else {
            avatarElement.innerHTML = '<i class="fas fa-robot"></i>';
        }
        
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        
        const textElement = document.createElement('div');
        textElement.className = 'message-text';
        
        if (type === 'error') {
            textElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${content}`;
            textElement.style.background = 'rgba(239, 68, 68, 0.1)';
            textElement.style.borderLeft = '4px solid #ef4444';
        } else {
            const formattedContent = this.formatMessage(content);
            textElement.innerHTML = formattedContent;
        }
        
        const timeElement = document.createElement('div');
        timeElement.className = 'message-time';
        timeElement.textContent = this.formatTime(new Date());
        
        contentElement.appendChild(textElement);
        contentElement.appendChild(timeElement);
        
        messageElement.appendChild(avatarElement);
        messageElement.appendChild(contentElement);
        
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    formatMessage(content) {
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
        content = content.replace(/^• (.+)$/gm, '<li>$1</li>');
        content = content.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
        content = content.replace(/\n/g, '<br>');
        return content;
    }
    
    showTyping() {
        this.isTyping = true;
        this.typingIndicator.style.display = 'flex';
        this.sendButton.disabled = true;
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.isTyping = false;
        this.typingIndicator.style.display = 'none';
        this.sendButton.disabled = false;
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
    
    clearChat() {
        const messages = this.chatMessages.querySelectorAll('.message');
        messages.forEach((message, index) => {
            if (index > 0) {
                message.remove();
            }
        });
        this.messageHistory = [];
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.chatbot = new ProjBleChatbot();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const messageInput = document.getElementById('messageInput');
            messageInput.value = '';
            messageInput.focus();
        }
        
        if (event.altKey && event.key === 't') {
            event.preventDefault();
            const themeToggle = document.getElementById('themeToggle');
            themeToggle.click();
        }
        
        if (event.ctrlKey && event.key === 'l') {
            event.preventDefault();
            if (window.chatbot) {
                window.chatbot.clearChat();
            }
        }
    });
    
    // Add glassmorphism hover effects
    const glassElements = document.querySelectorAll('.header, .chat-container, .input-area, .quick-action-btn');
    
    glassElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 40px var(--shadow)';
        });
        
        element.addEventListener('mouseleave', (e) => {
            e.target.style.transform = '';
            e.target.style.boxShadow = '';
        });
    });
    
    // Focus input on page load
    window.addEventListener('load', () => {
        document.getElementById('messageInput').focus();
    });
    
    // Add theme transition styles
    const style = document.createElement('style');
    style.textContent = `
        .theme-transition * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎨 PROJ-BLE Chatbot with Glassmorphism UI initialized');
    console.log('✨ Keyboard shortcuts: ESC (clear), Alt+T (theme), Ctrl+L (clear chat)');
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});
