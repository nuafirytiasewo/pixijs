// Импортируем библиотеку PIXI.js
import * as PIXI from 'pixi.js';

//показываем глаза
export function startEyesGame(app) {
    // Создаем контейнер для глаз
    const eyeContainer = new PIXI.Container();

    // Загружаем текстуры для глаз и зрачков
    const eyeTexture = PIXI.Texture.from('./src/images/eye.png');
    const pupilTexture = PIXI.Texture.from('./src/images/pupil.png');

    // Создаем спрайты для зрачков
    const leftPupil = new PIXI.Sprite(pupilTexture);
    const rightPupil = new PIXI.Sprite(pupilTexture);

    // Устанавливаем "якорь" для зрачков в центр
    leftPupil.anchor.set(0.5);
    rightPupil.anchor.set(0.5);

    // Создаем спрайты для левого и правого глаза
    const leftEye = new PIXI.Sprite(eyeTexture);
    const rightEye = new PIXI.Sprite(eyeTexture);

    // Устанавливаем "якорь" для глаз в центр
    leftEye.anchor.set(0.5);
    rightEye.anchor.set(0.5);

    // Устанавливаем размер глаз
    const scaleEye = 0.2
    leftEye.scale.set(scaleEye,scaleEye)
    rightEye.scale.set(scaleEye,scaleEye)

    // Расстояние между глазами
    const distance = 650 

    // Отношение размера к расстоянию
    const relation_distance = distance * scaleEye

    // Размещаем глаза рядом, по центру канваса
    leftEye.x = app.view.width / 2 - relation_distance;
    rightEye.x = app.view.width / 2 + relation_distance;
    leftEye.y = rightEye.y = app.view.height / 2;

    // Добавляем зрачки в глаза
    leftEye.addChild(leftPupil);
    rightEye.addChild(rightPupil);

    // Добавляем глаза и зрачки в контейнер
    eyeContainer.addChild(leftEye, rightEye);

    // Устанавливаем позицию контейнера на сцене
    eyeContainer.position.set(0, 0);

    // Добавляем контейнер на сцену приложения
    app.stage.addChild(eyeContainer);

    // Обработчик события перемещения мыши
    function onMouseMove(event) {
        // Получаем позицию курсора мыши
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Определяем расстояние от центра глаза до позиции курсора мыши
        const leftEyePosition = leftEye.toGlobal(new PIXI.Point());
        const rightEyePosition = rightEye.toGlobal(new PIXI.Point());
        const leftDistance = Math.sqrt((mouseX - leftEyePosition.x) ** 2 + (mouseY - leftEyePosition.y) ** 2);
        const rightDistance = Math.sqrt((mouseX - rightEyePosition.x) ** 2 + (mouseY - rightEyePosition.y) ** 2);

        // Ограничиваем позицию зрачков в пределах круга радиусом X px от центра глаза
        const maxDistance = 180;
        const leftClampedDistance = Math.min(leftDistance, maxDistance);
        const rightClampedDistance = Math.min(rightDistance, maxDistance);

        // Вычисляем новые позиции зрачков в пределах круга
        const leftAngle = Math.atan2(mouseY - leftEyePosition.y, mouseX - leftEyePosition.x);
        const rightAngle = Math.atan2(mouseY - rightEyePosition.y, mouseX - rightEyePosition.x);
        const leftPupilX = leftEyePosition.x + Math.cos(leftAngle) * leftClampedDistance;
        const leftPupilY = leftEyePosition.y + Math.sin(leftAngle) * leftClampedDistance;
        const rightPupilX = rightEyePosition.x + Math.cos(rightAngle) * rightClampedDistance;
        const rightPupilY = rightEyePosition.y + Math.sin(rightAngle) * rightClampedDistance;

        // Устанавливаем новые позиции зрачков
        leftPupil.position.set(leftPupilX - leftEyePosition.x, leftPupilY - leftEyePosition.y);
        rightPupil.position.set(rightPupilX - rightEyePosition.x, rightPupilY - rightEyePosition.y);
    }

    // Добавляем обработчик события перемещения мыши
    window.addEventListener('mousemove', onMouseMove);

}