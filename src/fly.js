// fly.js
import * as PIXI from 'pixi.js';

let flySprite; // Переменная для хранения ссылки на спрайт мухи

export function startFlyGame(app) {
    const flyTexture = PIXI.Texture.from('./src/images/fly.png');

    // Создаем спрайт для мухи
    flySprite = new PIXI.Sprite(flyTexture);

    // Устанавливаем "якорь" для мухи в центр
    flySprite.anchor.set(0.5);

    // Устанавливаем размер мухи
    const scaleEye = 0.07;
    flySprite.scale.set(scaleEye, scaleEye);

    // Устанавливаем начальную позицию мухи
    flySprite.x = app.view.width / 2;
    flySprite.y = app.view.height / 2;

    // Добавляем контейнер на сцену приложения
    app.stage.addChild(flySprite);

    // Начальные параметры анимации
    let time = 0;
    const amplitude = 50; // Амплитуда колебаний мухи
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
}

export function hideFly(app) {
    if (flySprite && app.stage.children.includes(flySprite)) {
        app.stage.removeChild(flySprite);
    }
}