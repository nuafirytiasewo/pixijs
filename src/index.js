// Импортируем библиотеку PIXI.js
import * as PIXI from 'pixi.js';

// Создаем новый экземпляр приложения PixiJS
const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);

// Создаем контейнер для глаз
const eyeContainer = new PIXI.Container();

// Загружаем текстуры для глаз и зрачков
const eyeTexture = PIXI.Texture.from('./src/images/eye.png');
const pupilTexture = PIXI.Texture.from('./src/images/pupil.png');

// Создаем спрайты для зрачков
const leftPupil = new PIXI.Sprite(pupilTexture);
const rightPupil = new PIXI.Sprite(pupilTexture);

// Устанавливаем анкор для зрачков в центр
leftPupil.anchor.set(0.5);
rightPupil.anchor.set(0.5);

// Устанавливаем начальные позиции для зрачков внутри глаз
leftPupil.position.set(0, 0);
rightPupil.position.set(0, 0);

// Создаем спрайты для левого и правого глаза
const leftEye = new PIXI.Sprite(eyeTexture);
const rightEye = new PIXI.Sprite(eyeTexture);

// Устанавливаем анкор для глаз в центр
leftEye.anchor.set(0.5);
rightEye.anchor.set(0.5);

// Устанавливаем размер глаз
const scaleEye = 0.5
leftEye.scale.set(scaleEye,scaleEye)
rightEye.scale.set(scaleEye,scaleEye)

// Отношение размера к расстоянию
const distance = 650 * scaleEye
// Размещаем глаза рядом, по центру канваса
leftEye.x = app.view.width / 2 - distance;
rightEye.x = app.view.width / 2 + distance;
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
