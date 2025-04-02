import {getData, getUserData} from './helper.js';

const msgEl = document.querySelector('.welcome-message');

document.addEventListener('DOMContentLoaded', async () => {
    const response = await getUserData()
    msgEl.textContent = `Hello ${response.user.username}`;

})