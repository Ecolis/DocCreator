document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Останавливаем стандартную отправку формы

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // Перенаправляем пользователя при успешном входе
            const { name, email } = await response.json();
            localStorage.setItem('user', JSON.stringify({ name, email }));
            window.location.href = './dashboard.html';
        } else {
            // Показываем сообщение об ошибке
            const errorText = await response.text();
            errorMessage.textContent = errorText;
            errorMessage.style.display = 'block';
        }
    } catch (err) {
        console.error('Ошибка входа:', err);
        errorMessage.textContent = 'Ошибка сервера. Попробуйте позже.';
        errorMessage.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user) {
        window.location.href = './dashboard.html';
    }
});
