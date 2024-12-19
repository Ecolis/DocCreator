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
    window.location.href = './dashboard.html';
});

document.getElementById('add-notification').addEventListener('click', () => {
    window.location.href = './notification.html';
});

// Получаем элементы
const sendNotificationBtn = document.getElementById('send-notification-btn');
const notificationTitleInput = document.getElementById('notification-title');
const notificationBodyInput = document.getElementById('notification-body');
const notificationDateInput = document.getElementById('notification-date');
const notificationTimeInput = document.getElementById('notification-time');
const employeeMenu = document.getElementById('employee');
const employeeSubmenu = document.getElementById('employee-submenu');

const notiData = {
    title: '',
    description: '',
    dateN: '',
    timeN: ''
};

// Проверяем, что элементы найдены
if (!sendNotificationBtn) {
    console.error("Элементы не найдены в DOM!");
}

sendNotificationBtn.addEventListener('click', () => {
    const title = notificationTitleInput.value;
    const body = notificationBodyInput.value;
    const date = notificationDateInput.value;  // Это строка в формате "YYYY-MM-DD"
    const time = notificationTimeInput.value;  // Это строка в формате "HH:mm"

    // Проверка на пустые поля
    if (!title || !body || !date || !time) {
        alert('Пожалуйста, заполните все поля для уведомления.');
        return;
    }

    // Создаём строку с датой и временем для преобразования
    const notificationTimeString = `${date}T${time}:00`;  // Формат для объекта Date
    const notificationDate = new Date(notificationTimeString);

    // Получаем текущее время
    const currentTime = new Date();

    // Проверяем, что время уведомления не в прошлом
    if (notificationDate <= currentTime) {
        alert('Время уведомления должно быть в будущем.');
        return;
    }

    notiData.title = title;
    notiData.description = body;
    notiData.dateN = date;
    notiData.timeN = time;
    uploadNoti();

    // Разница в миллисекундах между текущим временем и временем уведомления
    const timeToWait = notificationDate - currentTime;

    // Логируем дату и время, когда будет показано уведомление
    console.log(`Уведомление будет показано через ${timeToWait / 1000} секунд`);

    // Устанавливаем таймер
    setTimeout(() => {
        // Отправляем уведомление
        const notification = new Notification(title, {
            body: `${body}\nДата: ${date}\nВремя: ${time}`,
            icon: './img/icon.png',
        });

        // Действие при клике на уведомление
        notification.onclick = () => {
            console.log('Уведомление было нажато!');
        };
    }, timeToWait);
});

async function uploadNoti() {
    let data = {
        userId: ""
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        data.email = user.email;
    }

    const notification = { ...data, ...notiData };

    try {
        const response = await fetch('http://localhost:3000/api/newNotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notification }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('OK');
        } else {
            const errorText = await response.text();
            console.log('Error');
        }
    } catch (err) {
        console.error('Ошибка при добавлении:', err);
        console.log('Server error');
    }
}