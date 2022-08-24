const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

refreshTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));


// Записывает значение инпутов в LocalStorage
function onInput(e) {
  // console.log(e.target.name);
  // console.log(e.target.value);
  formData[e.target.name] = e.target.value;
  // console.log(formData);
  const formDatatoStringify = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDatatoStringify);
}


//  Чистит LocalStorage и инпуты после события submit
function onFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { email, message },
  } = e.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Все поля должны быть заполнены!');
  }

  JSON.parse(localStorage.getItem(STORAGE_KEY));

  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}


// Обновляет значение инпутов при перезагрузке страницы
function refreshTextarea() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const savedInputs = localStorage.getItem(STORAGE_KEY);
    formData = JSON.parse(savedInputs);

    console.log(savedInputs);
    refs.form.email.value = formData.email ? formData.email : '';
    refs.form.message.value = formData.message ? formData.message : '';
  }
}