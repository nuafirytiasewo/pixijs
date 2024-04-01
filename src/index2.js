// Импортируем библиотеку PIXI.js
import * as PIXI from 'pixi.js';

// Получаем ссылку на HTML-элемент канваса
const canvas = document.createElement('canvas');
canvas.style.display = 'block'; // Убираем внешние отступы

// Создаем новый экземпляр приложения PixiJS с настройками канваса
const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    background: '#1099bb',
    resizeTo: window,
});

// Добавляем канвас на страницу
document.body.appendChild(canvas);

// Загружаем текстуру для мухи
const flyTexture = PIXI.Texture.from('./src/images/fly.png');

// Создаем спрайт для мухи
const flySprite = new PIXI.Sprite(flyTexture);

// Устанавливаем "якорь" для мухи в центр
flySprite.anchor.set(0.5);

// Устанавливаем размер мухи
const scaleEye = 0.8;
flySprite.scale.set(scaleEye, scaleEye);

// Устанавливаем начальную позицию мухи
flySprite.x = app.view.width / 2;
flySprite.y = app.view.height / 2;

// Добавляем контейнер на сцену приложения
app.stage.addChild(flySprite);

// Начальные параметры анимации
let time = 0;
const amplitude = 20; // Амплитуда колебаний мухи
const frequency = 0.02; // Частота колебаний мухи

// Функция анимации
function animate() {
    // Изменяем вертикальную позицию мухи по синусоиде
    flySprite.y = app.view.height / 2 + Math.sin(time) * amplitude;
    
    // Увеличиваем время для следующего шага анимации
    time += frequency;
    
    // Повторяем анимацию на следующем кадре
    requestAnimationFrame(animate);
}

// Запускаем анимацию
animate();
