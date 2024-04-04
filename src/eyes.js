// Импортируем библиотеку PIXI.js
import * as PIXI from 'pixi.js';

let eyeContainer; // Переменная для хранения ссылки на контейнер, содержащий глаза

// Функция для запуска игры с глазами
export function startEyesGame(app) {
    // Создаем контейнер для глаз
    eyeContainer = new PIXI.Container();

    // Загружаем текстуры для глаз и зрачков
    const eyeTexture = PIXI.Texture.from('./src/images/eye.png'); // Текстура глаза
    const pupilTexture = PIXI.Texture.from('./src/images/pupil.png'); // Текстура зрачка

    // Создаем спрайты для зрачков
    const leftPupil = new PIXI.Sprite(pupilTexture); // Спрайт левого зрачка
    const rightPupil = new PIXI.Sprite(pupilTexture); // Спрайт правого зрачка

    // Устанавливаем "якорь" для зрачков в центр
    leftPupil.anchor.set(0.5); // Устанавливаем якорь в центр для левого зрачка
    rightPupil.anchor.set(0.5); // Устанавливаем якорь в центр для правого зрачка

    // Создаем спрайты для левого и правого глаза
    const leftEye = new PIXI.Sprite(eyeTexture); // Спрайт левого глаза
    const rightEye = new PIXI.Sprite(eyeTexture); // Спрайт правого глаза

    // Устанавливаем "якорь" для глаз в центр
    leftEye.anchor.set(0.5); // Устанавливаем якорь в центр для левого глаза
    rightEye.anchor.set(0.5); // Устанавливаем якорь в центр для правого глаза

    // Устанавливаем размер глаз
    const scaleEye = 0.2; // Масштаб глаза
    leftEye.scale.set(scaleEye, scaleEye); // Устанавливаем масштаб для левого глаза
    rightEye.scale.set(scaleEye, scaleEye); // Устанавливаем масштаб для правого глаза

    // Расстояние между глазами
    const distance = 650; // Расстояние между глазами в пикселях

    // Отношение размера глаза к расстоянию между ними
    const relation_distance = distance * scaleEye; // Отношение размера глаза к расстоянию между ними

    // Размещаем глаза рядом, по центру канваса
    leftEye.x = app.view.width / 2 - relation_distance; // Позиция левого глаза по оси X
    rightEye.x = app.view.width / 2 + relation_distance; // Позиция правого глаза по оси X
    leftEye.y = rightEye.y = app.view.height / 2; // Позиция глаз по оси Y

    // Добавляем зрачки в глаза
    leftEye.addChild(leftPupil); // Добавляем левый зрачок в левый глаз
    rightEye.addChild(rightPupil); // Добавляем правый зрачок в правый глаз

    // Добавляем глаза и зрачки в контейнер
    eyeContainer.addChild(leftEye, rightEye); // Добавляем глаза и зрачки в контейнер

    // Устанавливаем позицию контейнера на сцене
    eyeContainer.position.set(0, 0); // Устанавливаем позицию контейнера на сцене приложения

    // Добавляем контейнер на сцену приложения
    app.stage.addChild(eyeContainer); // Добавляем контейнер с глазами на сцену приложения

    // Обработчик события перемещения мыши
    function onMouseMove(event) {
        // Получаем позицию курсора мыши
        const mouseX = event.clientX; // Позиция курсора мыши по оси X
        const mouseY = event.clientY; // Позиция курсора мыши по оси Y

        // Определяем расстояние от центра глаза до позиции курсора мыши
        
        // Получаем глобальную позицию левого глаза относительно всей сцены
        const leftEyePosition = leftEye.toGlobal(new PIXI.Point());
        // Получаем глобальную позицию правого глаза относительно всей сцены
        const rightEyePosition = rightEye.toGlobal(new PIXI.Point());

        const leftDistance = Math.sqrt((mouseX - leftEyePosition.x) ** 2 + (mouseY - leftEyePosition.y) ** 2); // Расстояние до центра левого глаза
        const rightDistance = Math.sqrt((mouseX - rightEyePosition.x) ** 2 + (mouseY - rightEyePosition.y) ** 2); // Расстояние до центра правого глаза

        // Ограничиваем позицию зрачков в пределах круга радиусом X px от центра глаза
        const maxDistance = 180; // Максимальное расстояние для перемещения зрачка
        const leftClampedDistance = Math.min(leftDistance, maxDistance); // Ограничиваем расстояние для левого зрачка
        const rightClampedDistance = Math.min(rightDistance, maxDistance); // Ограничиваем расстояние для правого зрачка

        // Вычисляем новые позиции зрачков в пределах круга
        // Вычисляем угол между позицией курсора мыши и центром левого глаза
        const leftAngle = Math.atan2(mouseY - leftEyePosition.y, mouseX - leftEyePosition.x);
        // Вычисляем угол между позицией курсора мыши и центром правого глаза
        const rightAngle = Math.atan2(mouseY - rightEyePosition.y, mouseX - rightEyePosition.x);
        // Вычисляем новую позицию по оси X для левого зрачка с учетом ограниченного расстояния
        const leftPupilX = leftEyePosition.x + Math.cos(leftAngle) * leftClampedDistance;
        // Вычисляем новую позицию по оси Y для левого зрачка с учетом ограниченного расстояния
        const leftPupilY = leftEyePosition.y + Math.sin(leftAngle) * leftClampedDistance;
        // Вычисляем новую позицию по оси X для правого зрачка с учетом ограниченного расстояния
        const rightPupilX = rightEyePosition.x + Math.cos(rightAngle) * rightClampedDistance;
        // Вычисляем новую позицию по оси Y для правого зрачка с учетом ограниченного расстояния
        const rightPupilY = rightEyePosition.y + Math.sin(rightAngle) * rightClampedDistance;


        // Устанавливаем новые позиции зрачков
        leftPupil.position.set(leftPupilX - leftEyePosition.x, leftPupilY - leftEyePosition.y); // Устанавливаем новую позицию левого зрачка
        rightPupil.position.set(rightPupilX - rightEyePosition.x, rightPupilY - rightEyePosition.y); // Устанавливаем новую позицию правого зрачка
    }

    // Добавляем обработчик события перемещения мыши
    window.addEventListener('mousemove', onMouseMove); // Добавляем обработчик события перемещения мыши
}

// Функция для скрытия глаз
export function hideEyes(app) {
    if (eyeContainer && app.stage.children.includes(eyeContainer)) {
        app.stage.removeChild(eyeContainer); // Удаляем контейнер с глазами со сцены
    }
}
