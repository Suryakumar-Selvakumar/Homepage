import { Player } from "./player";
import "./style.css";
import {
  createGameBoard,
  displayComputerBoard,
  displayPlayerBoard,
  populateComputerBoard,
  populateHumanBoard,
  populateRandomShips,
  registerComputerPlay,
  registerHumanPlay,
  resetGameBoards,
} from "./displayMethods";
import winner from "./icons/winner.svg";

// Create human and computer players
const human = new Player("human");
const computer = new Player("computer");

// Create gameboards on DOM for both
const humanBoard = document.querySelector(".player-grid");
const computerBoard = document.querySelector(".computer-grid");
createGameBoard(human, humanBoard);
createGameBoard(computer, computerBoard);

// Populate the gameboards of both using some default coordinates
populateHumanBoard(human.gameBoard);
displayPlayerBoard(humanBoard, human.gameBoard.board);
populateComputerBoard(computer.gameBoard);

// Setting Winner indicator
const playerVictory = document.querySelector("#player-victory");
const computerVictory = document.querySelector("#computer-victory");
computerVictory.src = winner;
playerVictory.src = winner;

// Randomize button populates gameboards with ships at random coordinates
const randomize = document.getElementById("randomize");
randomize.addEventListener("click", () => {
  populateRandomShips(human.gameBoard, human);
  displayPlayerBoard(humanBoard, human.gameBoard.board);
  populateRandomShips(computer.gameBoard, computer);
});

const home = document.querySelector(".home");
const playBtn = document.getElementById("play");
const computerSide = document.querySelector(".computer-side");

// Play button to start the game
playBtn.addEventListener("click", () => {
  home.style.cssText = "display: none;";
  computerSide.style.cssText = "display: grid;";
  displayComputerBoard(computerBoard, computer.gameBoard.board);
});

// Play Again button to play the game again
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", () => {
  playAgain.style.cssText = "visibility: hidden;";
  computerSide.style.cssText = "display: none;";
  home.style.cssText = "display: flex;";
  playerVictory.style.cssText = "visibility: hidden;";
  computerVictory.style.cssText = "visibility: hidden;";
  resetGameBoards(human, humanBoard, computer, computerBoard);
});

// EventListner that drives the whole game
computerBoard.addEventListener("click", (event) => {
  if (event.target.tagName === "DIV") {
    let dataChosen = event.target.getAttribute("chosen");
    if (dataChosen === "false") {
      if (!human.gameBoard.isAllSunk() && !computer.gameBoard.isAllSunk()) {
        const dataRow = event.target.getAttribute("data-row");
        const dataColumn = event.target.getAttribute("data-column");

        registerHumanPlay(
          computer.gameBoard,
          dataRow,
          dataColumn,
          event.target
        );
        displayComputerBoard(computerBoard, computer.gameBoard.board);
        registerComputerPlay(human.gameBoard, human.visitedArr, humanBoard);
        displayPlayerBoard(humanBoard, human.gameBoard.board);
        if (human.gameBoard.isAllSunk()) {
          computerVictory.style.cssText = "visibility: visible;";
          playAgain.style.cssText = "visibility: visible;";
        } else if (computer.gameBoard.isAllSunk()) {
          playerVictory.style.cssText = "visibility: visible;";
          playAgain.style.cssText = "visibility: visible;";
        }
      }
    }
  }
});
