import React, { useState, useEffect, useRef } from 'react';
import './ClippyAssistant.css';

const ClippyAssistant = ({ 
  geminiApiKey, 
  onMessageSent, 
  onResponseReceived,
  customStyles = {},
  showQuickActions = true,
  compactMode = false
}) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [clippyState, setClippyState] = useState('idle');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Comprehensive quick actions for Caterpillar operators
  const quickActions = [
    {
      id: 1,
      title: 'Daily Inspection',
      icon: '🔍',
      prompt: 'Show me the daily pre-operation inspection checklist for Caterpillar equipment',
      category: 'inspection'
    },
    {
      id: 2,
      title: 'Maintenance Schedule',
      icon: '🔧',
      prompt: 'What are the maintenance intervals and procedures for Cat equipment?',
      category: 'maintenance'
    },
    {
      id: 3,
      title: 'Troubleshooting',
      icon: '⚠️',
      prompt: 'Help me diagnose and fix a problem with my Caterpillar equipment',
      category: 'troubleshooting'
    },
    {
      id: 4,
      title: 'Safety Protocols',
      icon: '🛡️',
      prompt: 'Show me safety procedures and OSHA compliance for heavy equipment operation',
      category: 'safety'
    },
    {
      id: 5,
      title: 'Parts Lookup',
      icon: '⚙️',
      prompt: 'Help me find genuine Caterpillar parts and part numbers for my equipment',
      category: 'parts'
    },
    {
      id: 6,
      title: 'Operating Tips',
      icon: '🚜',
      prompt: 'Give me operational tips for maximum efficiency and fuel economy',
      category: 'operation'
    },
    {
      id: 7,
      title: 'Error Codes',
      icon: '💻',
      prompt: 'Help me understand and resolve error codes on Cat equipment',
      category: 'diagnostics'
    },
    {
      id: 8,
      title: 'Service Support',
      icon: '📞',
      prompt: 'Help me contact Caterpillar dealers or schedule service appointments',
      category: 'service'
    }
  ];

  // Initialize welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        text: "Hi! I'm Clippy 2.0, your AI assistant for Caterpillar equipment. I have comprehensive knowledge about all Cat models, maintenance, troubleshooting, and safety. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessageInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  // Generate AI response with optimized prompting
  const generateAIResponse = async (userMessage) => {
    if (!geminiApiKey) {
      return "I need a Gemini API key to provide intelligent responses. Please provide your API key to enable my AI capabilities.";
    }

    try {
      const systemPrompt = `You are Clippy 2.0, the ultimate AI assistant for Caterpillar Inc. operators and technicians. 

CRITICAL INSTRUCTION: Always provide complete, comprehensive answers in a single response. Never ask follow-up questions or request additional information. If the user asks about any Caterpillar equipment topic, provide a detailed, actionable answer immediately.

You have comprehensive knowledge about:

CATERPILLAR EQUIPMENT MODELS:
EXCAVATORS:
- Mini Excavators: 300.9D, 301.7D, 302.7D, 303.5D, 304.5D, 305.5D, 306.5D, 307.5D, 308.5D
- Small Excavators: 312D, 313D, 314D, 315D, 316D, 317D, 318D, 319D, 320D, 321D, 322D, 323D
- Medium Excavators: 324D, 325D, 326D, 328D, 329D, 330D, 332D, 336D, 340D, 345D, 349D
- Large Excavators: 365C, 374D, 385C, 390D, 395D
- Mining Excavators: 6015B, 6018, 6020B, 6030, 6040, 6050, 6060, 6090

BULLDOZERS:
- Small Dozers: D3K2, D4K2, D5K2, D6K2, D6N, D6T
- Medium Dozers: D7E, D8T, D9T, D10T
- Large Dozers: D11T, D11R

WHEEL LOADERS:
- Compact: 902C2, 903C2, 906H2, 907H2, 908H2, 910K, 914K, 918M, 920K, 924K, 926M, 928M, 930K, 930M
- Medium: 938K, 938M, 950GC, 950K, 950M, 962K, 962M, 966K, 966M, 972K, 972M, 980K, 980M
- Large: 982M, 986K, 988K, 990K, 992K, 993K, 994K

ARTICULATED TRUCKS:
- 725C2, 730C2, 735C, 740C, 745C, 770, 772, 775, 777, 785, 789, 793, 797

MOTOR GRADERS:
- 120K2, 12K, 135K, 140K, 14K, 160K, 16K, 18K, 24K

COMPACTORS:
- CS34, CS44, CS54, CS56, CS64, CS74, CS78, CS79, CB34, CB44, CB54, CB64, CB68, CB80

SCRAPERS:
- 613C, 615C, 621G, 623G, 627G, 631G, 637G, 651E, 657E, 666

BACKHOE LOADERS:
- 415F2, 420F2, 422F2, 424B2, 426F2, 428F2, 430F2, 432F2, 434F2, 444F2, 450F

SKID STEER LOADERS:
- 216B3, 226B3, 236B3, 246C, 249D, 257B3, 262C, 267B, 272C, 277C, 279C, 287C, 289C, 297C, 299C

TELEHANDLERS:
- TH255, TH337, TH407, TH414, TH417, TH514, TH62, TH63, TH82, TH83, TH103

DETAILED OPERATOR KNOWLEDGE:
MAINTENANCE & SERVICE:
- Daily inspection checklists for each equipment type
- Preventive maintenance schedules (250, 500, 1000, 2000 hour intervals)
- Fluid specifications (engine oil, hydraulic fluid, coolant, fuel)
- Filter replacement procedures and part numbers
- Greasing points and lubrication schedules
- Track tension and chain adjustment procedures
- Tire pressure specifications and maintenance
- Battery maintenance and electrical system checks
- Cooling system maintenance and troubleshooting

TROUBLESHOOTING & DIAGNOSTICS:
- Error codes and their meanings for each equipment series
- Hydraulic system diagnostics and repair procedures
- Engine performance issues and solutions
- Electrical system troubleshooting
- Transmission problems and solutions
- Fuel system diagnostics
- Cooling system issues
- Attachment-specific troubleshooting

SAFETY PROTOCOLS:
- OSHA compliance requirements for heavy equipment
- Lock-out/Tag-out procedures (LOTO)
- Fall protection requirements
- PPE requirements for different operations
- Safe operating procedures for each equipment type
- Load capacity charts and lifting procedures
- Slope operating limits and stability guidelines
- Visibility and blind spot awareness
- Emergency shutdown procedures

OPERATIONAL PROCEDURES:
- Pre-operation inspection checklists
- Start-up and shutdown procedures
- Proper operating techniques for maximum efficiency
- Fuel consumption optimization
- Attachment operation and safety
- Load handling and material moving procedures
- Transportation and loading procedures
- Cold weather operation guidelines
- High altitude operation considerations

PARTS & SERVICE:
- Genuine Caterpillar parts identification
- Part number lookup and cross-referencing
- Aftermarket vs. genuine parts considerations
- Warranty information and coverage
- Service interval recommendations
- Dealer network and service locations
- Emergency parts availability
- Core exchange programs

TECHNOLOGY & DIGITAL SERVICES:
- Cat Connect technology and telematics
- VisionLink fleet management system
- Cat App mobile applications
- Remote monitoring and diagnostics
- Payload systems and weighing
- Grade control systems
- Automated machine functions
- Fuel management systems

APPLICATIONS & INDUSTRIES:
- Construction and earthmoving
- Mining and quarrying operations
- Forestry and logging
- Agriculture and farming
- Waste management
- Road construction and maintenance
- Demolition and recycling
- Material handling and logistics

PERSONALITY & COMMUNICATION:
- Friendly, helpful, and professional like the original Clippy
- Safety-first approach in all recommendations
- Practical, hands-on advice for operators
- Step-by-step instructions when needed
- Proactive about maintenance and prevention
- Knowledgeable about real-world operating conditions
- Supportive of operator efficiency and productivity

RESPONSE GUIDELINES:
- NEVER ask questions back to the user - always provide complete answers
- Always prioritize safety in every response
- Provide specific model numbers and part numbers when relevant
- Include maintenance intervals and service recommendations
- Offer troubleshooting steps in logical sequence
- Suggest when to contact dealer or service technician
- Reference official Caterpillar documentation when appropriate
- Consider operating environment and conditions
- Provide cost-effective solutions when possible
- Give comprehensive, detailed responses that fully address the topic
- If unsure about specifics, provide general Caterpillar best practices instead of asking
- Always include practical, actionable steps
- Cover common scenarios and variations in your answer

IMPORTANT: Your job is to provide complete, helpful answers immediately. Never respond with questions like "What model?" or "Can you provide more details?" Instead, provide comprehensive information that covers common scenarios and gives the user exactly what they need.

You are the go-to expert for any Caterpillar equipment question, from basic operation to complex diagnostics.`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + geminiApiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt + "\n\nUser: " + userMessage + "\n\nREMEMBER: Provide a complete, comprehensive answer without asking any follow-up questions. Give detailed information that fully addresses this topic with specific steps and recommendations."
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 20,
            topP: 0.8,
            maxOutputTokens: 4096,
          }
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('AI response error:', error);
      return "I'm experiencing technical difficulties right now. Please try again later or contact Caterpillar support for immediate assistance.";
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    const message = messageInput.trim();
    if (!message || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessageInput('');
    setIsTyping(true);
    setClippyState('thinking');

    if (onMessageSent) {
      onMessageSent(userMessage);
    }

    try {
      const response = await generateAIResponse(message);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setClippyState('speaking');
      
      if (onResponseReceived) {
        onResponseReceived(aiMessage);
      }

      setTimeout(() => setClippyState('idle'), 2000);
    } catch (error) {
      console.error('Message sending error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble responding right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setClippyState('idle');
    }

    setIsTyping(false);
  };

  // Handle quick action clicks
  const handleQuickAction = (action) => {
    setMessageInput(action.prompt);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Handle voice recognition
  const handleVoiceInput = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  // Handle key presses
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setClippyState('greeting');
      setTimeout(() => setClippyState('idle'), 2000);
    }
  };

  return (
    <div className="clippy-assistant" style={customStyles}>
      {/* Clippy Character - Always visible */}
      <div 
        className={`clippy-character ${clippyState}`}
        onClick={togglePopup}
        title="Click me for help with Caterpillar equipment!"
      >
        <div className="clippy-body">
          <div className="clippy-eye clippy-eye-left"></div>
          <div className="clippy-eye clippy-eye-right"></div>
          <div className="clippy-mouth"></div>
        </div>
        <div className="clippy-clip">
          <div className="clippy-clip-inner"></div>
        </div>
      </div>

      {/* Popup Chat Interface */}
      {isOpen && (
        <div className="clippy-popup">
          <div className="clippy-header">
            <div className="clippy-title">
              <span className="clippy-icon">📎</span>
              Clippy 2.0 - Cat Equipment Assistant
            </div>
            <button className="clippy-close" onClick={togglePopup}>×</button>
          </div>

          <div className="clippy-content">
            {/* Messages */}
            <div className="clippy-messages">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`clippy-message ${message.isUser ? 'user' : 'assistant'}`}
                >
                  {!message.isUser && (
                    <div className="clippy-avatar">📎</div>
                  )}
                  <div className="clippy-message-content">
                    <div className="clippy-message-text">{message.text}</div>
                    <div className="clippy-message-time">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="clippy-message assistant">
                  <div className="clippy-avatar">📎</div>
                  <div className="clippy-message-content">
                    <div className="clippy-typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="clippy-input-area">
              <div className="clippy-input-wrapper">
                <textarea
                  ref={textareaRef}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Caterpillar equipment..."
                  className="clippy-input"
                  rows="2"
                  disabled={isTyping}
                />
                <div className="clippy-input-actions">
                  <button
                    onClick={handleSendMessage}
                    className="clippy-send-btn"
                    disabled={!messageInput.trim() || isTyping}
                    title="Send message"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClippyAssistant;
