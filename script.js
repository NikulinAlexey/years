const itemSelector = ".screen__item";
const screen = document.querySelector(".screen");
const itemTemplate = document.querySelector("#template").content;

const startButton = document.querySelector(".button__start");
const pauseButton = document.querySelector(".button__pause");
const continueButton = document.querySelector(".button__continue");
const resetButton = document.querySelector(".button__reset");

const input = document.querySelector(".input__seconds");
const inputBg = document.querySelector(".input__bg");
const tablo = document.querySelector(".tablo");
const formDuration = document.querySelector(".form__duration");
const formBg = document.querySelector(".form__bg");

const itemsGap = 10;
const wrapperPadding = 20;
const from = 1910;
const until = 2025;

let seconds = 2;
let animationDuration = 1000 * seconds;

tablo.textContent = "Длина анимации " + seconds + " сек.";

function getArrFromRange(min, max) {
  const result = [];

  for (let i = min; i <= max; i++) {
    result.push(i);
  }

  return result;
}

function addItem(number) {
  const itemElement = itemTemplate.querySelector(itemSelector).cloneNode(true);

  itemElement.textContent = number;

  screen.append(itemElement);
}

function setItems() {
  getArrFromRange(from, until).forEach((item) => {
    addItem(item);
  });
}

function animateScreen(animationDuration) {
  const screenItemsLength = screen.querySelectorAll(itemSelector).length;
  const screenItemHeight = screen.querySelector(itemSelector).offsetHeight;
  const screenHeight = screen.offsetHeight;

  const gaps = (screenItemsLength - 1) * itemsGap;
  const itemsHeight = (screenItemsLength - 1) * screenItemHeight;
  const heightToShift = itemsHeight + gaps - screenHeight + wrapperPadding * 2;

  screen.animate(
    [
      { transform: `translateY(0)` },
      { transform: `translateY(-${heightToShift}px)` },
    ],
    {
      duration: animationDuration,
      iterations: 1,
      easing: "ease-in-out",
      fill: "forwards",
    }
  );
}

startButton.addEventListener("click", () => {
  animateScreen(seconds * 1000);
});
pauseButton.addEventListener("click", () => {
  screen.getAnimations().forEach((animation) => {
    animation.pause();
  });
});
continueButton.addEventListener("click", () => {
  screen.getAnimations().forEach((animation) => {
    animation.play();
  });
});
resetButton.addEventListener("click", () => {
  screen.getAnimations().forEach((animation) => {
    animation.cancel();
  });
});

formBg.addEventListener("submit", (e) => {
  e.preventDefault();

  document.querySelector(".body").style.backgroundImage = `url(${inputBg.value})`;

  console.log(inputBg.value);
  e.target.reset();
});

formDuration.addEventListener("submit", (e) => {
  e.preventDefault();

  seconds = Number(input.value);

  tablo.textContent = "Длина анимации " + seconds + " сек.";

  screen.getAnimations().forEach((animation) => {
    animation.finish();
  });
  e.target.reset();
});

setItems();
