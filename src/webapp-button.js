export function setTelegramMainButton(text, onClickHandler) {
    if (window.Telegram.WebApp) {
        const mainButton = window.Telegram.WebApp.MainButton;

        // Логирование для дебага
        console.log('Setting main button:', text);

        if (text) {
            mainButton.setText(text);
            mainButton.show();
        } else {
            mainButton.hide();
        }

        if (onClickHandler) {
            mainButton.offClick(); // Убираем старые обработчики
            mainButton.onClick(onClickHandler);
        } else {
            mainButton.offClick();
        }
    }
}
