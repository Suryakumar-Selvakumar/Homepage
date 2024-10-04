import { returnAdjCell } from "./helper";
import fire from "./icons/fire.svg";
import destroyer from "./icons/destroyer.svg";
import dot from "./icons/circle.svg";
import x from "./icons/alpha-x.svg";
import battleship from "./icons/battleship.svg";
import submarine from "./icons/submarine.svg";
import boat from "./icons/boat.svg";
import human from "./icons/human.svg";
import robot from "./icons/robot.svg";

const humanIcon = document.querySelector(".player-icon");
humanIcon.src = human;

const computerIcon = document.querySelector(".computer-icon");
computerIcon.src = robot;

function populateHumanBoard(playerGameBoard) {
  playerGameBoard.placeShip(4, [5, 5], "top");
  playerGameBoard.placeShip(3, [0, 9], "left");
  playerGameBoard.placeShip(3, [8, 2], "right");
  playerGameBoard.placeShip(2, [1, 1], "bottom");
  playerGameBoard.placeShip(2, [7, 8], "top");
  playerGameBoard.placeShip(2, [6, 1], "right");
  playerGameBoard.placeShip(1, [9, 9], "left");
  playerGameBoard.placeShip(1, [9, 0], "right");
  playerGameBoard.placeShip(1, [2, 8], "left");
  playerGameBoard.placeShip(1, [4, 2], "left");
}

function populateComputerBoard(computerGameBoard) {
  computerGameBoard.placeShip(4, [0, 0], "bottom");
  computerGameBoard.placeShip(3, [2, 9], "left");
  computerGameBoard.placeShip(3, [3, 4], "bottom");
  computerGameBoard.placeShip(2, [7, 1], "right");
  computerGameBoard.placeShip(2, [8, 6], "right");
  computerGameBoard.placeShip(2, [6, 8], "top");
  computerGameBoard.placeShip(1, [1, 5], "left");
  computerGameBoard.placeShip(1, [9, 2], "left");
  computerGameBoard.placeShip(1, [2, 2], "left");
  computerGameBoard.placeShip(1, [4, 6], "left");
}

const fireIcon = new Image();
fireIcon.src = fire;
fireIcon.classList.add("icons");

function displayPlayerBoard(playerGrid, playerGameBoard) {
  for (const cell of playerGrid.children) {
    const cellRow = cell.getAttribute("data-row");
    const cellColumn = cell.getAttribute("data-column");
    const cellHit = cell.getAttribute("hit");
    cell.style.cssText = "background-color: white;";
    cell.innerHTML = "";
    if (
      typeof playerGameBoard[cellRow][cellColumn] === "object" &&
      playerGameBoard[cellRow][cellColumn] !== null
    ) {
      cell.style.cssText = "background-color:rgb(0, 106, 255);";
      cell.innerHTML = "";
      if (playerGameBoard[cellRow][cellColumn].length == 4) {
        const battleshipIcon = new Image();
        battleshipIcon.src = battleship;
        battleshipIcon.classList.add("icons");
        cell.appendChild(battleshipIcon);
      } else if (playerGameBoard[cellRow][cellColumn].length == 3) {
        const destroyerIcon = new Image();
        destroyerIcon.src = destroyer;
        destroyerIcon.classList.add("icons");
        cell.appendChild(destroyerIcon);
      } else if (playerGameBoard[cellRow][cellColumn].length == 2) {
        const submarineIcon = new Image();
        submarineIcon.src = submarine;
        submarineIcon.classList.add("icons");
        cell.appendChild(submarineIcon);
      } else {
        const boatIcon = new Image();
        boatIcon.src = boat;
        boatIcon.classList.add("icons");
        cell.appendChild(boatIcon);
      }
      if (cellHit === "true") {
        cell.style.cssText = "background-color: red;";
        cell.innerHTML = "";
        const fireIcon = new Image();
        fireIcon.src = fire;
        fireIcon.classList.add("icons");
        cell.appendChild(fireIcon);
      }
    } else if (playerGameBoard[cellRow][cellColumn] === "miss") {
      cell.style.cssText = "background-color:rgb(255, 249, 208);";
      cell.innerHTML = "";
      const dotIcon = new Image();
      dotIcon.src = dot;
      dotIcon.classList.add("icons");
      cell.appendChild(dotIcon);
    }
    if (
      playerGameBoard[cellRow][cellColumn] !== null &&
      typeof playerGameBoard[cellRow][cellColumn] === "object" &&
      playerGameBoard[cellRow][cellColumn].isSunk()
    ) {
      cell.style.cssText = "background-color: darkred";
      cell.innerHTML = "";
      const explosionIcon = new Image();
      explosionIcon.src = x;
      explosionIcon.classList.add("icons");
      cell.appendChild(explosionIcon);
    }
  }
}

function displayComputerBoard(computerGrid, computerGameBoard) {
  for (const cell of computerGrid.children) {
    const cellRow = cell.getAttribute("data-row");
    const cellColumn = cell.getAttribute("data-column");
    const cellHit = cell.getAttribute("hit");
    cell.style.cssText = "background-color: white;";
    cell.innerHTML = "";
    if (
      typeof computerGameBoard[cellRow][cellColumn] === "object" &&
      computerGameBoard[cellRow][cellColumn] !== null &&
      cellHit === "true"
    ) {
      cell.style.cssText = "background-color: red;";
      cell.innerHTML = "";
      const fireIcon = new Image();
      fireIcon.src = fire;
      fireIcon.classList.add("icons");
      cell.appendChild(fireIcon);
    } else if (computerGameBoard[cellRow][cellColumn] === "miss") {
      cell.style.cssText = "background-color:rgb(255, 249, 208);";
      cell.innerHTML = "";
      const dotIcon = new Image();
      dotIcon.src = dot;
      dotIcon.classList.add("icons");
      cell.appendChild(dotIcon);
    }
    if (
      computerGameBoard[cellRow][cellColumn] !== null &&
      typeof computerGameBoard[cellRow][cellColumn] === "object" &&
      computerGameBoard[cellRow][cellColumn].isSunk()
    ) {
      cell.style.cssText = "background-color: darkred";
      cell.innerHTML = "";
      const explosionIcon = new Image();
      explosionIcon.src = x;
      explosionIcon.classList.add("icons");
      cell.appendChild(explosionIcon);
    }
  }
}

function registerHumanPlay(computerGameBoardObj, dataRow, dataColumn, cell) {
  cell.setAttribute("chosen", true);
  if (computerGameBoardObj.receiveAttack([dataRow, dataColumn])) {
    cell.setAttribute("hit", true);
  }
}

function registerComputerPlay(
  playerGameBoardObj,
  playerVisitedArr,
  playerGrid
) {
  const coordRow = Math.floor(Math.random() * 10),
    coordCol = Math.floor(Math.random() * 10);
  const shipCoord = playerGameBoardObj.shipsFoundArr.shift();
  const adjCoord = returnAdjCell(shipCoord);
  if (
    adjCoord &&
    adjCoord[0] >= 0 &&
    adjCoord[0] <= 9 &&
    adjCoord[1] >= 0 &&
    adjCoord[1] <= 9
  ) {
    if (!playerVisitedArr[adjCoord[0]][adjCoord[1]]) {
      for (const cell of playerGrid.children) {
        const cellRow = cell.getAttribute("data-row");
        const cellColumn = cell.getAttribute("data-column");
        if (adjCoord[0] == cellRow && adjCoord[1] == cellColumn) {
          if (playerGameBoardObj.receiveAttack([adjCoord[0], adjCoord[1]])) {
            cell.setAttribute("hit", true);
          }
        }
      }
      playerVisitedArr[adjCoord[0]][adjCoord[1]] = true;
      return;
    }
  } else if (!playerVisitedArr[coordRow][coordCol]) {
    for (const cell of playerGrid.children) {
      const cellRow = cell.getAttribute("data-row");
      const cellColumn = cell.getAttribute("data-column");
      if (coordRow == cellRow && coordCol == cellColumn) {
        if (playerGameBoardObj.receiveAttack([coordRow, coordCol])) {
          cell.setAttribute("hit", true);
        }
      }
    }
    playerVisitedArr[coordRow][coordCol] = true;
    return;
  }
  registerComputerPlay(playerGameBoardObj, playerVisitedArr, playerGrid);
}

function generateRandomShip(playerGameBoardObj, shipLength) {
  while (true) {
    const newShipDetails = playerGameBoardObj.randomCoords(shipLength);
    if (newShipDetails) {
      playerGameBoardObj.placeShip(
        newShipDetails.shipLength,
        newShipDetails.coord,
        newShipDetails.placement
      );
      break;
    }
  }
}

function populateRandomShips(playerGameBoardObj, player) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      playerGameBoardObj.board[i][j] = null;
      player.visitedArr[i][j] = false;
    }
  }

  playerGameBoardObj.shipCoordsArr = [];
  playerGameBoardObj.shipsFoundArr = [];

  generateRandomShip(playerGameBoardObj, 4);
  generateRandomShip(playerGameBoardObj, 3);
  generateRandomShip(playerGameBoardObj, 3);
  generateRandomShip(playerGameBoardObj, 2);
  generateRandomShip(playerGameBoardObj, 2);
  generateRandomShip(playerGameBoardObj, 2);
  generateRandomShip(playerGameBoardObj, 1);
  generateRandomShip(playerGameBoardObj, 1);
  generateRandomShip(playerGameBoardObj, 1);
  generateRandomShip(playerGameBoardObj, 1);
}

function resetGameBoards(human, humanBoard, computer, computerBoard) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      human.gameBoard.board[i][j] = null;
      computer.gameBoard.board[i][j] = null;
      human.visitedArr[i][j] = false;
      computer.visitedArr[i][j] = false;
    }
  }

  for (const cell of humanBoard.children) {
    cell.setAttribute("chosen", false);
    cell.setAttribute("hit", false);
  }

  for (const cell of computerBoard.children) {
    cell.setAttribute("chosen", false);
    cell.setAttribute("hit", false);
  }

  human.gameBoard.shipCoordsArr = [];
  computer.gameBoard.shipCoordsArr = [];
  human.gameBoard.shipsFoundArr = [];
  computer.gameBoard.shipsFoundArr = [];

  populateHumanBoard(human.gameBoard);
  populateComputerBoard(computer.gameBoard);
  displayPlayerBoard(humanBoard, human.gameBoard.board);
}

function createGameBoard(player, playerBoard) {
  for (let i = 0; i < player.gameBoard.board.length; i++) {
    for (let j = 0; j < player.gameBoard.board[0].length; j++) {
      const div = document.createElement("div");
      div.classList.add("grid-cell");
      div.setAttribute("data-row", i);
      div.setAttribute("data-column", j);
      div.setAttribute("hit", false);
      div.setAttribute("chosen", false);
      playerBoard.appendChild(div);
    }
  }
}

export {
  displayPlayerBoard,
  populateHumanBoard,
  populateComputerBoard,
  displayComputerBoard,
  registerHumanPlay,
  registerComputerPlay,
  populateRandomShips,
  resetGameBoards,
  createGameBoard
};
