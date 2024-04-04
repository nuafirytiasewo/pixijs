// Импорт всего содержимого модуля pixi.js под псевдонимом PIXI
import * as PIXI from 'pixi.js';

// Импорт функций startFlyGame и hideFly из модуля './fly.js'
import { startFlyGame, hideFly } from './fly.js';

// Импорт функций startEyesGame и hideEyes из модуля './eyes.js'
import { startEyesGame, hideEyes } from './eyes.js';

// Создаем стиль для текста кнопок
const buttonTextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // Градиент для заливки текста
    stroke: '#4a1850', // Цвет обводки текста
    strokeThickness: 5, // Толщина обводки текста
    dropShadow: true, // Включение тени
    dropShadowColor: '#000000', // Цвет тени
    dropShadowBlur: 4, // Размытие тени
    dropShadowAngle: Math.PI / 6, // Угол тени (в радианах)
    dropShadowDistance: 6, // Расстояние тени от текста
    wordWrap: true, // Включение переноса слов
    wordWrapWidth: 440, // Максимальная ширина текста до переноса
});

// Создаем приложение Pixi
const app = new PIXI.Application({
    backgroundColor: 0x1099bb, // Цвет фона приложения
    resizeTo: window, // Указываем, что размеры канваса будут автоматически подстраиваться под размер окна
});

// Добавляем холст приложения на страницу в тег <body>
document.body.appendChild(app.view);

let isFlyVisible = false; // Переменная для отслеживания видимости мухи
let isEyesVisible = false; // Переменная для отслеживания видимости глаз

// Создаем кнопку для запуска игры с мухой
const fly_button = new PIXI.Text('Муха', buttonTextStyle);
fly_button.interactive = true; // Включаем интерактивность (реагирование на события)
fly_button.buttonMode = true; // Включаем режим кнопки
fly_button.on('pointerdown', () => { // Добавляем обработчик события "нажатие"
    if (isEyesVisible) { // Если глаза видимы, скрываем их
        hideEyes(app);
        isEyesVisible = false;
    }
    if (!isFlyVisible) { // Если муха не видима, запускаем игру с мухой
        startFlyGame(app);
        isFlyVisible = true;
    }
});

// Создаем кнопку для запуска игры с глазами
const eyes_button = new PIXI.Text('Глаза', buttonTextStyle);
eyes_button.interactive = true; // Включаем интерактивность (реагирование на события)
eyes_button.buttonMode = true; // Включаем режим кнопки
eyes_button.on('pointerdown', () => { // Добавляем обработчик события "нажатие"
    console.log('Глаза'); // Выводим в консоль сообщение "Глаза" (для отладки)
    if (isFlyVisible) { // Если муха видима, скрываем ее
        hideFly(app);
        isFlyVisible = false;
    }
    if (!isEyesVisible) { // Если глаза не видимы, запускаем игру с глазами
        startEyesGame(app);
        isEyesVisible = true;
    }
});

// Позиционируем кнопки на экране
fly_button.x = (app.screen.width - fly_button.width) / 2 - 100; // X координата кнопки "Муха"
fly_button.y = (app.screen.height - fly_button.height) / 10; // Y координата кнопки "Муха"

eyes_button.x = (app.screen.width - eyes_button.width) / 2 + 100; // X координата кнопки "Глаза"
eyes_button.y = (app.screen.height - eyes_button.height) / 10; // Y координата кнопки "Глаза"

// Добавляем кнопки на сцену приложения
app.stage.addChild(fly_button);
app.stage.addChild(eyes_button);
