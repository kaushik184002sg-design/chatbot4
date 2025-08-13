from flask import Flask, render_template, request, jsonify
import requests
import json
import re
from datetime import datetime

app = Flask(__name__)

# PROJ-BLE Information Database
PROJ_BLE_INFO = {
    "company_name": "PROJ-BLE",
    "mission": "To redefine K-12 education by integrating blended learning models that provide students with adaptive, engaging, & personalized learning experiences. We leverage technology, foster critical thinking, and ensure equal access to quality education for all students.",
    "vision": "We envision a future where every student experiences personalised, high-quality learning. While resources may come from various providers, teachers remain essential as facilitators and coordinators. By combining technology, expert instruction, and diverse learning solutions through an advanced LMS, we empower educators to focus on mentoring and fostering critical thinking, ensuring every child thrives.",
    "core_values": {
        "Innovation": "We embrace technology to enhance learning outcomes.",
        "Equity": "Quality education should be accessible to all students.",
        "Collaboration": "A thriving educational environment is built on teamwork.",
        "Lifelong Learning": "Education is about cultivating a growth mindset.",
        "Student-Centred Approach": "Every decision is driven by what benefits students the most."
    },
    "careers": "Join a movement to transform learning. We offer an innovative work environment with cutting-edge technology, opportunities for professional growth through training and certifications, the chance to make a meaningful impact, and competitive compensation."
}

# Ollama API configuration
OLLAMA_BASE_URL = "https://ollama.vedardha.shop"

class ProjBleChatbot:
    def __init__(self):
        self.default_response = "I do not have that specific information. For the most accurate details, I recommend visiting the official PROJ-BLE website."
    
    def is_projble_question(self, question):
        """Determine if the question is about PROJ-BLE specifically"""
        projble_keywords = [
            "proj-ble", "proj ble", "projble", "company", "mission", "vision", 
            "values", "career", "work", "job", "employment", "organization"
        ]
        question_lower = question.lower()
        return any(keyword in question_lower for keyword in projble_keywords)
    
    def search_projble_info(self, question):
        """Search for information about PROJ-BLE in the knowledge base"""
        question_lower = question.lower()
        
        # Check for mission-related keywords
        if any(word in question_lower for word in ["mission", "goal", "purpose", "objective"]):
            return f"**PROJ-BLE Mission:**\n{PROJ_BLE_INFO['mission']}"
        
        # Check for vision-related keywords
        if any(word in question_lower for word in ["vision", "future", "envision"]):
            return f"**PROJ-BLE Vision:**\n{PROJ_BLE_INFO['vision']}"
        
        # Check for values-related keywords
        if any(word in question_lower for word in ["values", "principles", "beliefs"]):
            values_text = "**PROJ-BLE Core Values:**\n"
            for value, description in PROJ_BLE_INFO['core_values'].items():
                values_text += f"• **{value}:** {description}\n"
            return values_text
        
        # Check for career-related keywords
        if any(word in question_lower for word in ["career", "job", "work", "employment", "hiring"]):
            return f"**Why Work With PROJ-BLE:**\n{PROJ_BLE_INFO['careers']}"
        
        # Check for company name
        if any(word in question_lower for word in ["name", "called", "company"]):
            return f"The company name is **{PROJ_BLE_INFO['company_name']}**."
        
        # If no specific match found, return default response
        return self.default_response
    
    def call_ollama_api(self, prompt):
        """Call Ollama API for general education questions"""
        try:
            # Format the prompt for educational context
            formatted_prompt = f"""You are an expert in education. Please provide a comprehensive and professional answer to this education-related question: {prompt}
            
            Please structure your response clearly and focus on educational concepts, theories, and practical applications."""
            
            payload = {
                "model": "qwen2:7b",  # Using available Qwen2 model
                "prompt": formatted_prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "max_tokens": 500
                }
            }
            
            response = requests.post(
                f"{OLLAMA_BASE_URL}/api/generate",
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get('response', 'I apologize, but I could not generate a response at this time.')
            else:
                return "I'm currently experiencing technical difficulties. Please try again later."
                
        except requests.exceptions.RequestException as e:
            return "I'm currently unable to connect to the AI service. However, I can still help you with questions about PROJ-BLE! Try asking about our mission, vision, values, or careers."
        except Exception as e:
            return "I apologize for the technical difficulty. Please try asking a question about PROJ-BLE, or try your general education question again in a moment."
    
    def process_question(self, question):
        """Main method to process user questions"""
        if self.is_projble_question(question):
            # Handle PROJ-BLE specific questions
            return self.search_projble_info(question)
        else:
            # Handle general education questions using Ollama
            return self.call_ollama_api(question)

# Initialize chatbot
chatbot = ProjBleChatbot()

@app.route('/')
def index():
    """Main chat interface"""
    return render_template('index.html')

@app.route('/test')
def test():
    """Test page"""
    with open('test.html', 'r') as f:
        return f.read()

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                'response': 'Please ask me a question about PROJ-BLE or education in general.',
                'timestamp': datetime.now().isoformat()
            })
        
        # Process the question
        response = chatbot.process_question(user_message)
        
        return jsonify({
            'response': response,
            'timestamp': datetime.now().isoformat(),
            'type': 'projble' if chatbot.is_projble_question(user_message) else 'general'
        })
        
    except Exception as e:
        return jsonify({
            'response': 'I apologize, but I encountered an error processing your request. Please try again.',
            'timestamp': datetime.now().isoformat(),
            'error': True
        }), 500

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'PROJ-BLE Chatbot'
    })

if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=5001)
