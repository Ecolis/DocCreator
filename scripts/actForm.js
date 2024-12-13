const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const employee = document.getElementById('employee');
const submenu = document.getElementById('employee-submenu');
const steps = document.querySelectorAll('.step');
const formContent = document.getElementById('form-content');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

employee.addEventListener('click', () => {
    submenu.classList.toggle('active');
});

const formData = {
    objectName: '',
    developerName: '',
    builderName: '',
    description: '',
    repDeveloper: '',
    repBuilder: '',
    repBuilderControl: '',
    repDesigner: '',
    repExecutor: '',
    workPerformed: '',
    inspectionWorks: '',
    projectDocumentation: '',
    materialsUsed: '',
    supportingDocuments: '',
    agreeDeveloper: '',
    agreeBuilder: '',
    agreeBuilderControl: '',
    agreeDesigner: '',
    agreeExecutor: '',
    docTitle: '',
    docNumber: '',
    docDate: '',
    docCopies: ''
};

function updateFormData() {
    const inputs = formContent.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        formData[input.id] = input.value;
    });
}

function populateForm(stepId) {
    formContent.innerHTML = '';
    switch (stepId) {
        case 'step1':
            formContent.innerHTML = `
                        <h2>Общее</h2>
                        <form id="step1Form">
                            <label>Объект капитального строительства:</label><br>
                            <input id="objectName" type="text" placeholder="Введите название объекта капитального строительства" value="${formData.objectName}"><br><br>

                            <label>Застройщик или технический заказчик:</label><br>
                            <input id="developerName" type="text" placeholder="Введите имя застройщика или технического заказчика" value="${formData.developerName}"><br><br>

                            <label>Лицо, осуществляющее строительство:</label><br>
                            <input id="builderName" type="text" placeholder="Введите имя лица, осуществляющего строительство" value="${formData.builderName}"><br><br>

                            <label>Описание:</label><br>
                            <textarea id="description" placeholder="Введите описание">${formData.description}</textarea><br><br>
                        </form>
                    `;
                    break;

                case 'step2':
                    formContent.innerHTML = `
                        <h2>Представители</h2>
                        <form id="step2Form">
                            <label>Представитель застройщика или технического заказчика по вопросам строительного контроля:</label><br>
                            <input id="repDeveloper" type="text" placeholder="Введите ФИО" value="${formData.repDeveloper}"><br><br>

                            <label>Представитель лица, осуществляющего строительство:</label><br>
                            <input id="repBuilder" type="text" placeholder="Введите ФИО" value="${formData.repBuilder}"><br><br>

                            <label>Представитель лица, осуществляющего строительство по вопросам строительного контроля:</label><br>
                            <input id="repBuilderControl" type="text" placeholder="Введите ФИО" value="${formData.repBuilderControl}"><br><br>

                            <label>Представитель лица, осуществляющего подготовку проектной документации:</label><br>
                            <input id="repDesigner" type="text" placeholder="Введите ФИО" value="${formData.repDesigner}"><br><br>

                            <label>Представитель лица, выполнившего работы, подлежащие освидетельствованию:</label><br>
                            <input id="repExecutor" type="text" placeholder="Введите ФИО" value="${formData.repExecutor}"><br><br>
                        </form>
                    `;
                    break;

                case 'step3':
                    formContent.innerHTML = `
                        <h2>Результаты</h2>
                        <form id="step3Form">
                            <label>Работы выполнены:</label><br>
                            <textarea id="workPerformed" placeholder="Введите описание выполненных работ">${formData.workPerformed}</textarea><br><br>

                            <label>К освидетельствованию предъявлены следующие работы:</label><br>
                            <textarea id="inspectionWorks" placeholder="Введите работы, предъявленные к освидетельствованию">${formData.inspectionWorks}</textarea><br><br>

                            <label>Работы выполнены по проектной документации:</label><br>
                            <textarea id="projectDocumentation" placeholder="Введите описание работ по проектной документации">${formData.projectDocumentation}</textarea><br><br>

                            <label>При выполнении работ применены:</label><br>
                            <textarea id="materialsUsed" placeholder="Введите примененные материалы или методы">${formData.materialsUsed}</textarea><br><br>

                            <label>Предъявлены документы, подтверждающие соответствие работ предъявляемым требованиям:</label><br>
                            <textarea id="supportingDocuments" placeholder="Введите описание документов">${formData.supportingDocuments}</textarea><br><br>
                        </form>
                    `;
                    break;

                case 'step4':
                    formContent.innerHTML = `
                        <h2>Согласующие</h2>
                        <form id="step4Form">
                            <div class="representative-group">
                                <label>Представитель застройщика или технического заказчика по вопросам строительного контроля:</label><br>
                                <input id="agreeDeveloper" type="text" placeholder="Введите ФИО" value="${formData.agreeDeveloper}"><br><br>
                            </div>

                            <div class="representative-group">
                                <label>Представитель лица, осуществляющего строительство:</label><br>
                                <input id="agreeBuilder" type="text" placeholder="Введите ФИО" value="${formData.agreeBuilder}"><br><br>
                            </div>

                            <div class="representative-group">
                                <label>Представитель лица, осуществляющего строительство по вопросам строительного контроля:</label><br>
                                <input id="agreeBuilderControl" type="text" placeholder="Введите ФИО" value="${formData.agreeBuilderControl}"><br><br>
                            </div>

                            <div class="representative-group">
                                <label>Представитель лица, осуществляющего подготовку проектной документации:</label><br>
                                <input id="agreeDesigner" type="text" placeholder="Введите ФИО" value="${formData.agreeDesigner}"><br><br>
                            </div>

                            <div class="representative-group">
                                <label>Представитель лица, выполнившего работы, подлежащие освидетельствованию:</label><br>
                                <input id="agreeExecutor" type="text" placeholder="Введите ФИО" value="${formData.agreeExecutor}"><br><br>
                            </div>

                            <button type="button" class="btn" onclick="addRepresentativeField()">Добавить еще одного представителя</button><br><br>
                        </form>
                    `;
                    break;

                case 'step5':
                    formContent.innerHTML = `
                        <h2>Реквизиты</h2>
                        <form id="step5Form">
                            <div>
                                <label>Название:</label><br>
                                <input id="docTitle" type="text" placeholder="Введите название документа" value="${formData.docTitle}"><br><br>
                            </div>

                            <div>
                                <label>Номер:</label><br>
                                <input id="docNumber" type="text" placeholder="Введите номер документа" value="${formData.docNumber}"><br><br>
                            </div>

                            <div>
                                <label>Дата составления:</label><br>
                                <input id="docDate" type="date" placeholder="Выберите дату составления документа" value="${formData.docDate}"><br><br>
                            </div>

                            <div>
                                <label>Количество экземпляров документов:</label><br>
                                <input id="docCopies" type="number" placeholder="Введите количество экземпляров" min="1" value="${formData.docCopies}"><br><br>
                            </div>
                        </form>
                    `;
                    break;

                case 'step6':
                    formContent.innerHTML = `
                        <h2>Просмотр</h2>
                        <div id="previewContent">
                            <p>Заполните все данные в предыдущих шагах, чтобы увидеть их в предварительном просмотре.</p>
                            <button type="button" onclick="generatePreview()">Обновить просмотр</button>
                        </div>
                    `;
                    break;

                default:
                    formContent.innerHTML = `<p>Выберите шаг.</p>`;
            }
        }

        steps.forEach(step => {
            step.addEventListener('click', () => {
                steps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');

                updateFormData();
                populateForm(step.id);
            });
        });

        function addRepresentativeField() {
            const newRepresentativeGroup = document.createElement('div');
            newRepresentativeGroup.classList.add('representative-group');
            newRepresentativeGroup.innerHTML = `
                <label>Представитель:</label><br>
                <input type="text" placeholder="Введите ФИО"><br><br>
            `;
            document.getElementById('step4Form').appendChild(newRepresentativeGroup);
        }

        function generatePreview() {
            updateFormData();
            const previewContent = document.getElementById("previewContent");

            previewContent.innerHTML = `
                <h3>Предварительный просмотр</h3>
                <p><strong>Объект капитального строительства:</strong> ${formData.objectName}</p>
                <p><strong>Застройщик или технический заказчик:</strong> ${formData.developerName}</p>
                <p><strong>Лицо, осуществляющее строительство:</strong> ${formData.builderName}</p>
                <p><strong>Описание:</strong> ${formData.description}</p>
                <hr>
                <h4>Представители:</h4>
                <p><strong>Застройщик:</strong> ${formData.repDeveloper}</p>
                <p><strong>Лицо, осуществляющее строительство:</strong> ${formData.repBuilder}</p>
                <p><strong>Контроль строительства:</strong> ${formData.repBuilderControl}</p>
                <p><strong>Подготовка документации:</strong> ${formData.repDesigner}</p>
                <p><strong>Исполнитель:</strong> ${formData.repExecutor}</p>
                <hr>
                <h4>Результаты:</h4>
                <p><strong>Работы выполнены:</strong> ${formData.workPerformed}</p>
                <p><strong>Предъявлены работы:</strong> ${formData.inspectionWorks}</p>
                <p><strong>Проектная документация:</strong> ${formData.projectDocumentation}</p>
                <p><strong>Материалы:</strong> ${formData.materialsUsed}</p>
                <p><strong>Документы:</strong> ${formData.supportingDocuments}</p>
                <hr>
                <h4>Согласующие:</h4>
                <p><strong>Застройщик:</strong> ${formData.agreeDeveloper}</p>
                <p><strong>Лицо, осуществляющее строительство:</strong> ${formData.agreeBuilder}</p>
                <p><strong>Контроль строительства:</strong> ${formData.agreeBuilderControl}</p>
                <p><strong>Подготовка документации:</strong> ${formData.agreeDesigner}</p>
                <p><strong>Исполнитель:</strong> ${formData.agreeExecutor}</p>
                <hr>
                <h4>Реквизиты:</h4>
                <p><strong>Название документа:</strong> ${formData.docTitle}</p>
                <p><strong>Номер документа:</strong> ${formData.docNumber}</p>
                <p><strong>Дата составления:</strong> ${formData.docDate}</p>
                <p><strong>Количество экземпляров:</strong> ${formData.docCopies}</p>
                <button type="button" onclick="uploadAct()" class="btn1">Сохранить</button>
            `;
        }


document.getElementById('exit-form').addEventListener('click', () => {
    window.location.href = './dashboard.html';
});

async function uploadAct() {
    let data = {
        name: "Акт выполненных работ",
        email: ""
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        data.email = user.email;
    }

    const act = { ...data, ...formData };

    try {
        const response = await fetch('http://localhost:3000/api/NewAct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ act }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('OK');

            window.location.href = './dashboard.html';
        } else {
            const errorText = await response.text();
            console.log('Error');
        }
    } catch (err) {
        console.error('Ошибка при добавлении акта:', err);
        console.log('Server error');
    }
}
