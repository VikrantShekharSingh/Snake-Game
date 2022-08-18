import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import {
  update as updateFood,
  draw as drawFood,
  score,
  snakeSpeed,
} from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;

const gameBoard = document.getElementById("game-board");
const scoreDiv = document.getElementById("score");
const speedDiv = document.getElementById("speed");
const highScoreDiv = document.getElementById("high-score");

function main(currentTime) {
  if (gameOver) {
    if (
      confirm(
        `Your score is ${score} and speed is ${snakeSpeed}. Press ok to restart.`
      )
    ) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  scoreDiv.innerHTML = `Score: ${score}`;
  speedDiv.innerHTML = `Speed: ${snakeSpeed}`;
  highScoreDiv.innerHTML = `High Score: ${
    localStorage.getItem("highScore") ?? "0"
  }`;
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
