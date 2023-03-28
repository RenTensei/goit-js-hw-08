import throttle from 'lodash.throttle';

const INPUT_VALUES = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const formEmailRef = formRef.querySelector('[name="email"]');
const formMessageRef = formRef.querySelector('[name="message"]');

// restore input values
(() => {
  const temp = JSON.parse(localStorage.getItem(INPUT_VALUES));

  if (temp) {
    formEmailRef.value = temp['email'];
    formMessageRef.value = temp['message'];
  }
})();

// save input data to local storage
function handleInput(e) {
  const temp = JSON.parse(localStorage.getItem(INPUT_VALUES)) || {};

  if (e.target.name === 'email') {
    temp['email'] = e.target.value;
  }

  if (e.target.name === 'message') {
    temp['message'] = e.target.value;
  }

  localStorage.setItem(INPUT_VALUES, JSON.stringify(temp));
}

// log formdata + clear form
function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  console.log(formProps);

  formRef.reset();

  localStorage.removeItem('feedback-form-state');
}

formRef.addEventListener('input', throttle(handleInput, 500));
formRef.addEventListener('submit', handleSubmit);
