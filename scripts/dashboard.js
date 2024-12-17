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
    const actsContainer = document.getElementById('acts-container');

    try {
        const response = await fetch('http://localhost:3000/api/acts');
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const acts = await response.json();

        // Очистка контейнера и отображение актов
        actsContainer.innerHTML = '';
        acts.forEach(act => {
            const actElement = document.createElement('div');
            actElement.className = 'file-item';
            actElement.innerHTML = `
                <img src="../img/icon.png" class="file-icon"/>
                <div class="file-name">#${act.id}: ${act.name}</div>
            `;
            actsContainer.appendChild(actElement);
        });
    } catch (err) {
        console.error('Ошибка:', err);
        actsContainer.innerHTML = '<p>Ошибка при загрузке актов. Попробуйте позже.</p>';
    }
});

// Функция для сохранения категорий в LocalStorage
function saveCategories() {
    const categories = Array.from(document.querySelectorAll('.categoty_accordion')).map(btn => {
        const div = btn.nextElementSibling; // Сохранение содержимого div, связанного с кнопкой
        return { name: btn.innerHTML, content: div.innerHTML };
    });
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Функция для загрузки категорий из LocalStorage
function loadCategories() {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const list = document.getElementById('list_of_categoties');
    list.innerHTML = ''; // Очищаем список перед загрузкой

    categories.forEach(category => {
        // Создаём кнопку
        let button = document.createElement('button');
        button.className = "categoty_accordion";
        button.innerHTML = category.name;

        // Создаём div
        let div = document.createElement('div');
        div.className = "files_into_cat";
        div.innerHTML = category.content;

        // Добавляем обработчик для аккордеона
        button.addEventListener('click', () => {
            div.classList.toggle('visible'); // Переключаем видимость
        });

        // Добавляем элементы в DOM
        list.appendChild(button);
        list.appendChild(div);
    });
}

// Переключение отображения для удаления категории
document.getElementById('btn_del').addEventListener('click', () => {
    let del_category = document.getElementById("one_line_text");
    del_category.style.display = del_category.style.display === 'none' ? 'flex' : 'none';
});

// Переключение отображения для создания категории
document.getElementById('btn_cre').addEventListener('click', () => {
    let create_category = document.getElementById("form_create_categories");
    create_category.style.display = create_category.style.display === 'none' ? 'flex' : 'none';
});

// Добавление новой категории
document.getElementById('add_cat_btm').addEventListener('click', () => {
    const name_of_cat = document.getElementById('Name_of_categories').value.trim();
    let p = document.getElementById("text_bottom");

    if (name_of_cat) { // Проверяем, что значение не пустое
        // Создаём кнопку
        let button = document.createElement('button');
        button.className = "categoty_accordion";
        button.innerHTML = name_of_cat;

        // Создаём div
        let div = document.createElement('div');
        div.className = "files_into_cat";
        div.innerHTML = ""; // Оставляем пустым для новых элементов

        // Добавляем обработчик для аккордеона
        button.addEventListener('click', () => {
            div.classList.toggle('visible'); // Переключаем видимость
        });

        // Добавляем элементы в DOM
        const list = document.getElementById('list_of_categoties');
        list.appendChild(button);
        list.appendChild(div);

        // Сохраняем в LocalStorage
        saveCategories();

        // Очищаем input после добавления
        document.getElementById('Name_of_categories').value = '';
        p.innerHTML = " ";
    } else {
        p.innerHTML = "Введите название категории";
        p.style.color = "red";
    }
});

// Удаление категории
document.getElementById('delete_button_cat').addEventListener('click', () => {
    const name_to_delete = document.getElementById('Name_delete_cat').value.trim();
    let p = document.getElementById("text_bottom");

    if (name_to_delete) {
        const buttons = document.querySelectorAll('.categoty_accordion');
        let found = false;

        buttons.forEach(button => {
            if (button.innerHTML === name_to_delete) {
                const div = button.nextElementSibling; // Получаем связанный div
                button.remove(); // Удаляем кнопку
                div.remove(); // Удаляем div
                found = true;
            }
        });

        if (found) {
            // Обновляем LocalStorage
            saveCategories();
            p.innerHTML = "Категория удалена.";
            p.style.color = "green";
        } else {
            p.innerHTML = "Категория не найдена.";
            p.style.color = "red";
        }

        // Очищаем поле ввода
        document.getElementById('Name_delete_cat').value = '';
    } else {
        p.innerHTML = "Введите название категории для удаления.";
        p.style.color = "red";
    }
});

// Добавление файла в категорию
document.getElementById('add_file_btm').addEventListener('click', () => {
    const categoryName = document.getElementById('Name_of_categories_in_add').value.trim();
    const fileName = document.getElementById('Name_of_file').value.trim();
    let p = document.getElementById("text_bottom");

    if (!categoryName || !fileName) { // Проверяем, что оба поля заполнены
        p.innerHTML = "Не все поля заполнены!";
        p.style.color = "red";
        return;
    }

    const buttons = document.querySelectorAll('.categoty_accordion');
    let categoryFound = false;

    buttons.forEach(button => {
        if (button.innerHTML === categoryName) {
            categoryFound = true;
            const div = button.nextElementSibling; // Связанный div с содержимым категории

            // Создаём div для файла
            const fileElement = document.createElement('div');
            fileElement.className = 'item_into_cat';

            // Кнопка-крестик для удаления
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-file-button';
            deleteButton.innerHTML = '×';
            deleteButton.style.position = 'absolute';
            deleteButton.style.top = '5px';
            deleteButton.style.right = '5px';

            // Добавляем текст в div
            const fileText = document.createElement('span');
            fileText.textContent = fileName;

            // Добавляем обработчик для удаления файла
            deleteButton.addEventListener('click', () => {
                fileElement.remove();
                saveCategories(); // Сохраняем изменения
            });

            // Добавляем крестик и текст в div
            fileElement.appendChild(deleteButton);
            fileElement.appendChild(fileText);
            fileElement.style.position = 'relative';
            fileElement.style.width = '100px';
            fileElement.style.height = '100px';
            fileElement.style.border = '1px solid #ccc';
            fileElement.style.margin = '5px';
            fileElement.style.display = 'inline-block';
            fileElement.style.textAlign = 'center';
            fileElement.style.verticalAlign = 'middle';
            fileElement.style.lineHeight = '100px';

            div.appendChild(fileElement); // Добавляем в содержимое категории

            // Сохраняем изменения в LocalStorage
            saveCategories();
        }
    });

    if (categoryFound) {
        p.innerHTML = "Файл добавлен.";
        p.style.color = "green";
    } else {
        p.innerHTML = "Категория не найдена.";
        p.style.color = "red";
    }

    // Очищаем поля ввода
    document.getElementById('Name_of_categories_in_add').value = '';
    document.getElementById('Name_of_file').value = '';
});

// Переключение отображения для добавления файла в категорию
document.getElementById('btn_add_file_in_cat').addEventListener('click', () => {
    let create_category = document.getElementById("add_file_in_cat");
    create_category.style.display = create_category.style.display === 'none' ? 'block' : 'none';
});

// Загружаем категории при загрузке страницы
window.addEventListener('load', loadCategories);
