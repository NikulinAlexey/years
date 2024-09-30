const itemSelector = ".screen__item";
const screen = document.querySelector(".screen");
const itemTemplate = document.querySelector("#template").content;

const resetButton = document.querySelector(".button");
const input = document.querySelector(".input");
const tablo = document.querySelector(".tablo");
const form = document.querySelector(".form");

const from = 1910;
const until = 2025;

let seconds = 10;
let animationDuration = 1000 * seconds;

tablo.textContent = "Сейчас длина анимации " + seconds + " сек.";

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

  const gaps = (screenItemsLength - 1) * 10;
  const itemsHeight = (screenItemsLength - 1) * screen.offsetHeight;
  const heightToShift = itemsHeight + gaps;

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

resetButton.addEventListener("click", () => {
  animateScreen(seconds * 1000);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  seconds = Number(input.value);

  tablo.textContent = "Сейчас длина анимации " + seconds + " сек.";

  screen.getAnimations().forEach(animation => {
    animation.finish();
  });
  e.target.reset();
});

// resetButton.addEventListener("click", (e) => {
//   animateScreen();
// });

setItems();
