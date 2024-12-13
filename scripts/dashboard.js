const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
}

document.getElementById('employeeButton').addEventListener('click', function() {
    document.getElementById('employeeMenu').classList.toggle('active');
});

document.addEventListener('click', function(event) {
    const employeeButton = document.getElementById('employeeButton');
    const employeeMenu = document.getElementById('employeeMenu');
    if (!employeeButton.contains(event.target)) {
        employeeMenu.classList.remove('active');
    }
});

document.getElementById('exit').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = './index.html';
});

document.getElementById('create-act').addEventListener('click', () => {
    window.location.href = './act_form.html';
});

document.getElementById('act-work').addEventListener('click', () => {
    window.location.href = './act_form.html';
});

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('acts-container');

    try {
        // Получаем данные с сервера
        const response = await fetch('http://localhost:3000/api/acts');
        if (!response.ok) throw new Error('Ошибка при получении данных');
        const acts = await response.json();

        // Добавляем акты в DOM
        acts.forEach((act) => {
            const actElement = document.createElement('div');
            actElement.className = 'file-item';

            actElement.innerHTML = `
                <img src="../img/icon.png" class="file-icon"/>
                <div class="file-name">${act.name}</div>
            `;

            container.appendChild(actElement);
        });
    } catch (err) {
        console.error('Ошибка:', err);
    }
});
