# PROJ-BLE Educational Chatbot 🎓

A beautiful glassmorphism-styled educational chatbot for PROJ-BLE, featuring AI integration and modern UI/UX design.

## 🌐 Live Demo

**GitHub Pages:** [https://kaushik184002sg-design.github.io/chatbot4/](https://kaushik184002sg-design.github.io/chatbot4/)

## ✨ Features

### 🎨 Modern Glassmorphism Design
- Frosted glass effects with backdrop blur
- Semi-transparent elements with subtle shadows
- Smooth hover animations and transitions
- Beautiful gradient backgrounds

### 🌓 Theme Support
- Light mode (default)
- Dark mode with toggle switch
- Smooth theme transitions
- Persistent theme preferences

### 🤖 Intelligent Responses
- **GitHub Pages Version**: Pre-programmed responses about PROJ-BLE
- **Flask Version**: Full AI integration with Ollama
- PROJ-BLE knowledge base
- Educational topic discussions

### 📱 Responsive Design
- Mobile-friendly interface
- Touch-optimized controls
- Cross-browser compatibility
- Accessible design principles

## 🚀 Quick Start

### GitHub Pages (Static Version)
Simply visit: [https://kaushik184002sg-design.github.io/chatbot4/](https://kaushik184002sg-design.github.io/chatbot4/)

### Local Flask Version (Full AI Features)

1. **Clone the repository**
   ```bash
   git clone https://github.com/kaushik184002sg-design/chatbot4.git
   cd chatbot4
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Install Ollama (for AI features)**
   - Download from: https://ollama.ai/
   - Install the qwen2:7b model: `ollama pull qwen2:7b`

4. **Run the Flask application**
   ```bash
   python app.py
   ```

5. **Access the chatbot**
   Open: `http://localhost:5001`

## 📋 Project Structure

```
chatbot4/
├── index.html              # GitHub Pages main file
├── app.py                  # Flask backend (local use)
├── requirements.txt        # Python dependencies
├── templates/
│   └── index.html         # Flask template
├── static/
│   ├── css/
│   │   └── style.css      # Glassmorphism styling
│   └── js/
│       ├── script.js      # Flask version JavaScript
│       └── script-static.js # GitHub Pages version
└── README.md
```

## 🎯 PROJ-BLE Knowledge Base

The chatbot can answer questions about:

- **Mission & Vision**: PROJ-BLE's educational goals and objectives
- **Core Values**: Innovation, Accessibility, Excellence, Collaboration
- **Career Opportunities**: Working with PROJ-BLE
- **Blended Learning**: Modern educational approaches
- **Educational Technology**: AI and digital learning tools
- **Student Support**: Personalized learning experiences
- **Teacher Resources**: Professional development and tools

## 🎨 UI/UX Features

### Glassmorphism Effects
- `backdrop-filter: blur(10px)` for frosted glass
- Semi-transparent backgrounds with rgba colors
- Subtle borders and soft shadows
- Smooth hover animations

### Theme System
- CSS custom properties for easy theme switching
- Persistent storage using localStorage
- Smooth transitions between themes
- Accessible color contrasts

### Interactive Elements
- Real-time typing indicators
- Character counters
- Quick action buttons
- Keyboard shortcuts (ESC, Alt+T, Ctrl+L)

## 🔧 Customization

### Adding New Responses (GitHub Pages)
Edit `static/js/script-static.js` and update the `knowledgeBase` object:

```javascript
this.knowledgeBase = {
    newTopic: "Your response about the new topic...",
    // Add more responses
};
```

### Styling Changes
Modify `static/css/style.css` to customize:
- Colors and themes
- Glassmorphism effects
- Layout and spacing
- Animations and transitions

## 🚀 Deployment Options

### 1. GitHub Pages (Current)
- Automatic deployment from main branch
- Static version with pre-programmed responses
- No server costs, instant global availability

### 2. Local Development
- Full Flask application with AI integration
- Real-time AI responses via Ollama
- Complete backend functionality

### 3. Cloud Deployment
- Deploy Flask app to Heroku, Vercel, or similar
- Requires backend hosting for AI features
- Full functionality with live AI responses

## 💡 Usage Tips

### GitHub Pages Version
- Click quick action buttons for common questions
- Use the theme toggle in the header
- Try questions about PROJ-BLE mission, values, careers
- Use keyboard shortcuts for faster navigation

### Flask Version (Local)
- Supports full AI conversations
- Real-time responses from language models
- More dynamic and contextual conversations
- Complete backend API functionality

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)
- **Backend**: Python Flask (local version)
- **AI Integration**: Ollama with qwen2:7b model
- **Styling**: CSS Custom Properties, Font Awesome icons
- **Fonts**: Google Fonts (Poppins)
- **Deployment**: GitHub Pages

## 📞 Support

For questions or support regarding PROJ-BLE Educational Chatbot:

- **GitHub Issues**: [Report bugs or request features](https://github.com/kaushik184002sg-design/chatbot4/issues)
- **Email**: Contact through GitHub profile
- **Documentation**: Check this README for setup instructions

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for PROJ-BLE Educational Initiative**

*Empowering education through innovative technology and beautiful design.*
