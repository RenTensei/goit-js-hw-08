// 03-feedback.js
import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('[name="email"]');
const messageInput = feedbackForm.querySelector('[name="message"]');

const FORM_KEY = 'feedback-form-state';

// load data
const savedFeedback = JSON.parse(localStorage.getItem(FORM_KEY));
if (savedFeedback) {
  emailInput.value = savedFeedback.email;
  messageInput.value = savedFeedback.message;
}

// input handler
const handleInput = throttle(event => {
  if (event.target.matches('input, textarea')) {
    const feedbackState = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem(FORM_KEY, JSON.stringify(feedbackState));
  }
}, 500);

// submit handler
const handleSubmit = event => {
  event.preventDefault();
  const feedbackState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(feedbackState);
  localStorage.removeItem(FORM_KEY);
  emailInput.value = '';
  messageInput.value = '';
};

feedbackForm.addEventListener('input', handleInput);
feedbackForm.addEventListener('submit', handleSubmit);
