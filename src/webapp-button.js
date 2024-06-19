export function setTelegramMainButton(text, onClickHandler) {
    if (window.Telegram.WebApp) {
        const mainButton = window.Telegram.WebApp.MainButton;

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
