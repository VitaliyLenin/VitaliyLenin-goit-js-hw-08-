import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
  parsedData[e.target.name] = e.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(parsedData));
}

const savedData = localStorage.getItem('feedback-form-state');
const parsedData = JSON.parse(savedData) || {};

onReloadPage();

function onReloadPage() {
  if (parsedData) {
    refs.input.value = parsedData.email || '';
    refs.textarea.value = parsedData.message || '';
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(parsedData);
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
}
