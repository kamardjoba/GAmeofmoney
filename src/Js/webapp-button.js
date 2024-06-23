export function setTelegramMainButton(text, onClickHandler) {
    if (window.Telegram.WebApp) {
        const mainButton = window.Telegram.WebApp.MainButton;

        console.log('Setting main button:', text);

        if (text) {
            mainButton.setText(text);
            mainButton.show();
        } else {
            mainButton.hide();
        }

        if (onClickHandler) {
            mainButton.offClick();
            mainButton.onClick(onClickHandler);
        } else {
            mainButton.offClick();
        }
    }
}
