import axios from 'axios';

export default () => {
const formConteiner = document.querySelector('.form-container')
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
</form>`
formConteiner.innerHTML = formHTML;

const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const post = await axios.post('/users', {})
   try { 
    document.body.innerHTML = `<p>${post.data.message}</p>`
   } catch (error) {
    console.log(error)
   }
})
}