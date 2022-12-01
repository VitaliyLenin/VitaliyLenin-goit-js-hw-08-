import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const savedData = localStorage.getItem('feedback-form-state');
let parsedData = JSON.parse(savedData) || {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

onReloadPage();

function onFormInput(e) {
  parsedData[e.target.name] = e.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(parsedData));
}

function onReloadPage() {
  if (parsedData) {
    refs.input.value = parsedData.email || '';
    refs.textarea.value = parsedData.message || '';
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log(parsedData);
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  parsedData = {};
}
