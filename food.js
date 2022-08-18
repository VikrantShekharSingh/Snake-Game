import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 2;
export let snakeSpeed = 5;
export let score = 0;

export function update() {
  let highScore = localStorage.getItem("highScore") ?? 0;
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    score++;
    if ((score / 10) % 1 === 0 && snakeSpeed <= 15) {
      snakeSpeed += 1;
    }
    if (score > highScore) {
      localStorage.setItem("highScore", score);
    }
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
