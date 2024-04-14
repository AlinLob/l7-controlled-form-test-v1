import axios from 'axios';
import onChange from 'on-change';
import _ from 'lodash';

const validName = (name) => (name.trim().length ? [] : ['invalid name']);
const validEmail = (email) => (/\w+@\w+/.test(email) ? [] : ['invalid email']);
const validForm = (name, data) => (name === 'name' ? validName(data) : validEmail(data));

export default () => {
  const formConteiner = document.querySelector('.form-container');
  const formHTML = `
<form id="registrationForm">
<div class="form-group">
    <label for="inputName">Name</label>
    <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
</div>
<div class="form-group">
    <label for="inputEmail">Email</label>
    <input type="text" class="form-control" id="inputEmail" placeholder="Введите email" name="email" required>
</div>
<input type="submit" value="Submit" class="btn btn-primary">
</form>`;
  formConteiner.innerHTML = formHTML;

  const form = document.querySelector('form');
  const submit = document.querySelector('[type="submit"]');

  const status = {
    values: {
      name: '',
      email: '',
    },
    errors: {
      name: [],
      email: [],
    },
  };
  const hasErrors = () => (_.values(status.errors).reduce((acc, curr) => (curr.length > 0
    ? acc.concat(curr)
    : acc), [])
    .length > 0);

  const watchedState = onChange(status, (path) => {
    const selector = path.split('.')[1];
    const input = document.querySelector(`[name="${selector}"]`);
    const isValidForm = validForm(selector, status.values[selector]).length === 0;
    if (!isValidForm) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    }
    submit.disabled = hasErrors(status);
  });

  form.addEventListener('input', (e) => {
    e.preventDefault();
    const targetName = e.target.name;
    const formData = new FormData(form).get(targetName);
    watchedState.values[targetName] = formData;
    watchedState.errors[targetName] = (validForm(targetName, formData));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const post = await axios.post('/users', {});
    try {
      document.body.innerHTML = `<p>${post.data.message}</p>`;
    } catch (error) {
      console.log(error);
    }
  });
};
