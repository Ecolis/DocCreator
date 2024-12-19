// Получаем элементы
const sendNotificationBtn = document.getElementById('send-notification-btn');
const notificationTitleInput = document.getElementById('notification-title');
const notificationBodyInput = document.getElementById('notification-body');
const notificationDateInput = document.getElementById('notification-date');
const notificationTimeInput = document.getElementById('notification-time');
const employeeMenu = document.getElementById('employee');
const employeeSubmenu = document.getElementById('employee-submenu');

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
