import * as PIXI from 'pixi.js';
import { startFlyGame, hideFly } from './fly.js';
import { startEyesGame, hideEyes } from './eyes.js';
// Создаем приложение Pixi
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
});

// Добавляем приложение на страницу
document.body.appendChild(app.view);

// Создаем текст для кнопок
const buttonTextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // градиент
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

let isFlyVisible = false; // Переменная для отслеживания видимости мухи
let isEyesVisible = false; // Переменная для отслеживания видимости глаз

// Создаем кнопки
const fly_button = new PIXI.Text('Муха', buttonTextStyle);
fly_button.interactive = true;
fly_button.buttonMode = true;
fly_button.on('pointerdown', () => {
    if (isEyesVisible) {
        hideEyes(app);
        isEyesVisible = false;
    }
    if (!isFlyVisible) {
        startFlyGame(app);
        isFlyVisible = true;
    }
});

const eyes_button = new PIXI.Text('Глаза', buttonTextStyle);
eyes_button.interactive = true;
eyes_button.buttonMode = true;
eyes_button.on('pointerdown', () => {
    console.log('Глаза');
    if (isFlyVisible) {
        hideFly(app);
        isFlyVisible = false;
    }
    if (!isEyesVisible) {
        startEyesGame(app);
        isEyesVisible = true;
    }
});

// Позиционируем кнопки
fly_button.x = (app.screen.width - fly_button.width) / 2 - 100;
fly_button.y = (app.screen.height - fly_button.height) / 10;

eyes_button.x = (app.screen.width - eyes_button.width) / 2 + 100;
eyes_button.y = (app.screen.height - eyes_button.height) / 10;

// Добавляем кнопки на сцену
app.stage.addChild(fly_button);
app.stage.addChild(eyes_button);