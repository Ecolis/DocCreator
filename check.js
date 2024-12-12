let warning = document.getElementById('warning');

const submitBtn = document.getElementById('submitBtn');

// Привязка функции к кнопке
submitBtn.addEventListener('click', () => {
    // Получение данных из полей
    const name = document.getElementById('name').value.trim();
    const mail = document.getElementById('mail').value.trim();
    const password = document.getElementById('password').value.trim();
    const sec_password = document.getElementById('sec_password').value.trim();

    // Валидация формы
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

    warning.textContent = "Вы зарегестрированы";
    warning.style.color = "green";
    
    // Заполнение объекта user
    const user = {
        name,
        mail,
        password,
        sec_password,
        printData() {
            console.log(`Имя: ${this.name}`);
            console.log(`E-mail: ${this.mail}`);
            console.log(`Пароль: ${this.password}`);
            console.log(`Повтор пароля: ${this.sec_password}`);
        }
    };

    user.printData(); // Вывод данных в консоль
});



