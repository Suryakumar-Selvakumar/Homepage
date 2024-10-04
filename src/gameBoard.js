import { Ship } from "./ship";
import { randomize } from "./helper";
export class Gameboard {
  constructor() {
    this.board = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    this.shipCoordsArr = [];
    this.shipsFoundArr = [];
  }

  placeShip(shipLength, coord, placement) {
    this.shipCoordsArr.push(coord);
    const coordRow = coord[0],
      coordCol = coord[1],
      ship = new Ship(shipLength, placement);
    for (let i = 0; i < shipLength; i++) {
      if (placement === "left") {
        this.board[coordRow][coordCol - i] = ship;
      } else if (placement === "right") {
        this.board[coordRow][coordCol + i] = ship;
      } else if (placement === "top") {
        this.board[coordRow - i][coordCol] = ship;
      } else if (placement === "bottom") {
        this.board[coordRow + i][coordCol] = ship;
      }
    }
  }

  randomCoords(shipLength) {
    const choices = ["left", "right", "top", "bottom"];
    let coordRow = Math.floor(Math.random() * 10),
      choice = Math.floor(Math.random() * 4),
      coordCol = Math.floor(Math.random() * 10),
      countUndefCheck = 0,
      countNullCheck = 0,
      countDiagCheck = 0,
      placement = choices[choice];
    for (let i = 0; i < shipLength; i++) {
      if (placement === "left" && coordCol - i >= 0) {
        countUndefCheck++;
      } else if (placement === "right" && coordCol + i <= 9) {
        countUndefCheck++;
      } else if (placement === "top" && coordRow - i >= 0) {
        countUndefCheck++;
      } else if (placement === "bottom" && coordRow + i <= 9) {
        countUndefCheck++;
      }
    }

    for (let i = 0; i < shipLength; i++) {
      if (countUndefCheck === shipLength) {
        if (
          placement === "left" &&
          this.board[coordRow][coordCol - i] === null
        ) {
          countNullCheck++;
        } else if (
          placement === "right" &&
          this.board[coordRow][coordCol + i] === null
        ) {
          countNullCheck++;
        } else if (
          placement === "top" &&
          this.board[coordRow - i][coordCol] === null
        ) {
          countNullCheck++;
        } else if (
          placement === "bottom" &&
          this.board[coordRow + i][coordCol] === null
        ) {
          countNullCheck++;
        }
      }
    }

    for (let i = 0; i < shipLength; i++) {
      if (countNullCheck === shipLength) {
        if (
          coordCol - i >= 0 &&
          coordCol + i <= 9 &&
          coordRow - i >= 0 &&
          coordRow + i <= 9
        ) {
          if (
            placement === "left" &&
            this.board[coordRow - i][coordCol + i] === null &&
            this.board[coordRow + i][coordCol + i] === null
          ) {
            countDiagCheck++;
          } else if (
            placement === "right" &&
            this.board[coordRow - i][coordCol - i] === null &&
            this.board[coordRow + i][coordCol - i] === null
          ) {
            countDiagCheck++;
          } else if (
            placement === "top" &&
            this.board[coordRow - i][coordCol - i] === null &&
            this.board[coordRow - i][coordCol + i] === null
          ) {
            countDiagCheck++;
          } else if (
            placement === "bottom" &&
            this.board[coordRow + i][coordCol - i] === null &&
            this.board[coordRow + i][coordCol + i] === null
          ) {
            countDiagCheck++;
          }
        }
      }
    }

    if (countDiagCheck === shipLength) {
      return {
        coord: [coordRow, coordCol],
        placement: placement,
        shipLength: shipLength,
      };
    }

    placement = randomize(placement);
    this.randomCoords(shipLength);
  }

  receiveAttack(coord) {
    if (
      typeof this.board[coord[0]][coord[1]] === "object" &&
      this.board[coord[0]][coord[1]] !== null
    ) {
      this.board[coord[0]][coord[1]].hit();
      this.shipsFoundArr.push([coord[0], coord[1]]);
      return true;
    } else {
      this.board[coord[0]][coord[1]] = "miss";
      return false;
    }
  }

  isAllSunk() {
    let count = 0;
    this.shipCoordsArr.forEach((coord) => {
      if (this.board[coord[0]][coord[1]].isSunk()) {
        count++;
      }
    });
    if (count === this.shipCoordsArr.length) {
      return true;
    }
    return false;
  }
}
