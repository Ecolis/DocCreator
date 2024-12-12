let warning = document.getElementById('warning');

const submitBtn = document.getElementById('submitBtn');

// Привязка функции к кнопке
submitBtn.addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    const mail = document.getElementById('mail').value.trim();
    const password = document.getElementById('password').value.trim();
    const sec_password = document.getElementById('sec_password').value.trim();

    if (!name || !mail || !password || !sec_password) {
        warning.textContent = "Заполните поля";
        warning.style.color = "red";
        return;
    }

    if (password !== sec_password) {
        warning.textContent = "Пароли не совпадают";
        warning.style.color = "red";
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email: mail, password }),
        });

        if (response.ok) {
            warning.textContent = "Вы успешно зарегистрированы!";
            warning.style.color = "green";

            window.location.href = './dashboard.html';
        } else {
            const error = await response.text();
            warning.textContent = error;
            warning.style.color = "red";
        }
    } catch (error) {
        console.error('Ошибка:', error);
        warning.textContent = "Ошибка сервера.";
        warning.style.color = "red";
    }
});
