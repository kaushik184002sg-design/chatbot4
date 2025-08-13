// PROJ-BLE Chatbot JavaScript - Static Version for GitHub Pages
class ProjBleChatbotStatic {
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
        
        // PROJ-BLE Knowledge Base for static responses
        this.knowledgeBase = {
            mission: "PROJ-BLE's mission is to revolutionize education through innovative blended learning experiences that combine the best of traditional and digital education methods.",
            vision: "To become the leading educational technology company that empowers learners worldwide with personalized, engaging, and effective learning experiences.",
            values: "Our core values include Innovation, Accessibility, Excellence, Collaboration, and Student-Centered Learning. We believe in making quality education accessible to everyone.",
            careers: "Working with PROJ-BLE offers opportunities to impact education globally, work with cutting-edge technology, collaborate with passionate educators, and grow in a supportive environment focused on learning and development.",
            blended: "Blended learning combines face-to-face instruction with online learning components, creating a more flexible, personalized, and effective educational experience.",
            education: "Education is the foundation of progress. At PROJ-BLE, we focus on creating engaging, interactive learning experiences that adapt to individual student needs.",
            technology: "We leverage the latest educational technology including AI, adaptive learning systems, virtual reality, and data analytics to enhance the learning experience.",
            students: "Students are at the center of everything we do. We design our programs to meet diverse learning styles, provide personalized feedback, and support student success.",
            teachers: "We support educators with professional development, innovative teaching tools, and resources that help them create more effective and engaging classrooms.",
            future: "The future of education is personalized, technology-enhanced, and globally accessible. PROJ-BLE is leading this transformation."
        };
        
        this.initializeEventListeners();
        this.initializeTheme();
        this.updateWelcomeTime();
        this.updateStatus('online', 'Ready');
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
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
        
        this.themeToggle.addEventListener('change', () => this.toggleTheme());
        
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
        
        // Simulate processing delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            this.messageHistory.push({ role: 'assistant', content: response });
            this.hideTyping();
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific keywords and return relevant responses
        if (lowerMessage.includes('mission')) {
            return this.knowledgeBase.mission;
        } else if (lowerMessage.includes('vision')) {
            return this.knowledgeBase.vision;
        } else if (lowerMessage.includes('value') || lowerMessage.includes('core')) {
            return this.knowledgeBase.values;
        } else if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
            return this.knowledgeBase.careers;
        } else if (lowerMessage.includes('blend') || lowerMessage.includes('learning')) {
            return this.knowledgeBase.blended;
        } else if (lowerMessage.includes('education') || lowerMessage.includes('teach')) {
            return this.knowledgeBase.education;
        } else if (lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
            return this.knowledgeBase.technology;
        } else if (lowerMessage.includes('student')) {
            return this.knowledgeBase.students;
        } else if (lowerMessage.includes('teacher') || lowerMessage.includes('instructor')) {
            return this.knowledgeBase.teachers;
        } else if (lowerMessage.includes('future')) {
            return this.knowledgeBase.future;
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! Welcome to PROJ-BLE. I'm here to help you learn more about our educational initiatives. How can I assist you today?";
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! I'm always here to help with any questions about PROJ-BLE or education in general.";
        } else if (lowerMessage.includes('help')) {
            return "I can help you with information about PROJ-BLE including our mission, values, career opportunities, and educational approaches. You can also ask about blended learning, educational technology, and more!";
        } else {
            // Generic educational response
            return `That's a great question about "${message}"! While I have specific knowledge about PROJ-BLE's mission, values, and educational approach, I'd recommend exploring our full knowledge base or contacting us directly for more detailed information on this topic. Is there anything specific about PROJ-BLE I can help you with?`;
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
    window.chatbot = new ProjBleChatbotStatic();
    
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
    
    console.log('🎨 PROJ-BLE Chatbot (GitHub Pages Version) initialized');
    console.log('✨ Keyboard shortcuts: ESC (clear), Alt+T (theme), Ctrl+L (clear chat)');
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});
