import './chat.css';

export function setupChat(element) {
  element.insertAdjacentHTML('beforeend', `
    <div id="chat-widget" class="chat-widget">
      <button id="chat-toggle" class="chat-toggle">
        <i class="ph ph-chat-circle-dots"></i>
      </button>
      
      <div id="chat-window" class="chat-window hidden">
        <div class="chat-header">
          <div class="chat-title">
            <span class="status-dot"></span> Unizol AI
          </div>
          <button id="chat-close"><i class="ph ph-x"></i></button>
        </div>
        <div id="chat-messages" class="chat-messages">
          <div class="message bot">
            Hello! I can help you with questions about Unizol's services and AI solutions. How can I assist you today?
          </div>
        </div>
        <form id="chat-form" class="chat-input-area">
          <input type="text" id="chat-input" placeholder="Type your message..." autocomplete="off">
          <button type="submit"><i class="ph ph-paper-plane-right"></i></button>
        </form>
      </div>
    </div>
  `);

  const toggleBtn = element.querySelector('#chat-toggle');
  const chatWindow = element.querySelector('#chat-window');
  const closeBtn = element.querySelector('#chat-close');
  const chatForm = element.querySelector('#chat-form');
  const chatInput = element.querySelector('#chat-input');
  const messagesContainer = element.querySelector('#chat-messages');

  let messages = [];

  const toggleChat = () => {
    chatWindow.classList.toggle('hidden');
    chatWindow.classList.toggle('open');
  };

  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  const addMessage = (role, content) => {
    const div = document.createElement('div');
    div.classList.add('message', role);
    div.textContent = content;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return div;
  };

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = chatInput.value.trim();
    if (!prompt) return;

    // Add user message
    addMessage('user', prompt);
    chatInput.value = '';
    messages.push({ role: 'user', content: prompt });

    // Create bot message container for streaming
    const botMessageDiv = addMessage('bot', '...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botText = '';

      botMessageDiv.textContent = ''; // Clear loading dots

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        // Vercel AI SDK stream format parsing might be needed depending on precise streamText output
        // For simplicity assuming raw text or data parts. 
        // Actual streamText usually sends parts. simple text decode often works for simple text streams.
        // Let's assume standard text stream for this basic implementation.

        // NOTE: standard streamText returns a stream of parts. 
        // For a simple fetch implementation without the `useChat` hook (React), 
        // we might get raw text if we used `streamText` directly piped.
        // Let's treat it as text for now.

        botText += chunk;
        botMessageDiv.textContent = botText; // Use textContent for safety
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }

      messages.push({ role: 'assistant', content: botText });

    } catch (error) {
      console.error('Chat error:', error);
      botMessageDiv.textContent = "Sorry, I'm having trouble connecting right now.";
    }
  });
}
