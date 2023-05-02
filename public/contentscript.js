/* global chrome */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'PASTE_QUERY') {
      console.log(request.query)  
      const chatGptTextArea = document.querySelector('textarea[placeholder="Send a message."]');
      if (chatGptTextArea) {
        console.log('here')  
        chatGptTextArea.value = request.query;
      }
    }
  });
  