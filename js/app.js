const parallaxEl = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0, yValue = 0;
let rotateDegree = 0;
let isMouseActive = false; // Флаг, указывающий на активность мыши

function update(cursorPosition) {
  parallaxEl.forEach((el) => {
    let speedx = parseFloat(el.dataset.speedx);
    let speedy = parseFloat(el.dataset.speedy);
    let speedz = parseFloat(el.dataset.speesz);
    let rotateSpeed = parseFloat(el.dataset.rotation);

    let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zvalue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1; 
    
    el.style.transform = `perspective(2300px) translateZ(${
      zvalue * speedz
    }px) rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${
      -xValue * speedx
    }px)) translateY(calc(-50% + ${yValue * speedy}px))`; 
  });
}

function reset() {
  xValue = 0;
  yValue = 0;
  rotateDegree = 0;
  isMouseActive = false;
  update(0);
}

update(0);

window.addEventListener('mousemove', (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
  update(e.clientX);

  // Установка флага активности мыши
  isMouseActive = true;
});

// Добавление обработчиков сенсорного ввода для iPad
window.addEventListener('touchstart', (e) => {
  // Получаем начальные координаты касания
  xValue = e.touches[0].clientX - window.innerWidth / 2;
  yValue = e.touches[0].clientY - window.innerHeight / 2;

  // Установка флага активности мыши
  isMouseActive = true;
});

window.addEventListener('touchmove', (e) => {
  // Получаем текущие координаты перемещения пальца
  xValue = e.touches[0].clientX - window.innerWidth / 2;
  yValue = e.touches[0].clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
  update(e.touches[0].clientX);
});

// Событие при уходе мыши с элемента .parallax
parallaxEl.forEach((el) => {
  el.addEventListener('mouseleave', () => {
    if (!isMouseActive) {
      reset();
    }
  });
});

// Событие при уходе мыши с области экрана
window.addEventListener('mouseout', (e) => {
  // Проверка, что мышь вышла за пределы окна браузера
  if (e.relatedTarget === null) {
    reset();
  }
});



// if (window.innerWidth >= 725) {
// 	main.style.maxHeight = `${window.innerWidth * 0.6}px`; 
// } else {
// 	main.style.maxHeight = `${window.innerWidth * 1.6}px`;
// }
