document.addEventListener('DOMContentLoaded', () => {
    const accessCodeInput = document.getElementById('accessCode');
    const submitCodeButton = document.getElementById('submitCode');
    const errorMessage = document.getElementById('errorMessage');
    const accessSection = document.getElementById('access-section');
    const keySection = document.getElementById('key-section');
    const outlineKeyDisplay = document.getElementById('outlineKey');
    const copyKeyButton = document.getElementById('copyKey');

    const tabButtons = document.querySelectorAll('.tab-button');
    const iosInstructions = document.getElementById('ios-instructions');
    const androidInstructions = document.getElementById('android-instructions');

    // --- НАСТРОЙКИ ---
    // ЗАМЕНИТЕ ЭТО НА ВАШ 6-ЗНАЧНЫЙ КОД
    const CORRECT_CODE = "123456"; 
    // ЗАМЕНИТЕ ЭТО НА ВАШ РЕАЛЬНЫЙ КЛЮЧ OUTLINE
    const OUTLINE_SERVER_KEY = "ss://YOUR_OUTLINE_KEY_GOES_HERE"; 
    // --- КОНЕЦ НАСТРОЕК ---


    // Логика проверки кода
    submitCodeButton.addEventListener('click', () => {
        const enteredCode = accessCodeInput.value.trim();
        if (enteredCode === CORRECT_CODE) {
            outlineKeyDisplay.textContent = OUTLINE_SERVER_KEY;
            accessSection.classList.add('hidden');
            keySection.classList.remove('hidden');
            errorMessage.textContent = '';
        } else {
            errorMessage.textContent = 'Неверный код. Попробуйте еще раз.';
            accessCodeInput.value = '';
        }
    });

    // Логика копирования ключа
    copyKeyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(OUTLINE_SERVER_KEY).then(() => {
            alert('Ключ скопирован в буфер обмена!');
        }).catch(err => {
            console.error('Не удалось скопировать ключ:', err);
            alert('Не удалось скопировать ключ. Пожалуйста, скопируйте его вручную: ' + OUTLINE_SERVER_KEY);
        });
    });

    // Логика переключения вкладок инструкций
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс со всех кнопок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к нажатой кнопке
            button.classList.add('active');

            // Скрываем все инструкции
            iosInstructions.classList.add('hidden');
            androidInstructions.classList.add('hidden');

            // Показываем нужные инструкции
            const platform = button.dataset.platform;
            if (platform === 'ios') {
                iosInstructions.classList.remove('hidden');
            } else if (platform === 'android') {
                androidInstructions.classList.remove('hidden');
            }
        });
    });

    // Убедимся, что при загрузке страницы активна вкладка iOS
    document.querySelector('.tab-button[data-platform="ios"]').click();
});
