/* eslint-disable no-undef */
import { Gameboard } from "../gameBoard";
import { Ship } from "../ship";

describe("Gameboard", () => {
  const gameBoard = new Gameboard();
  it.each([Gameboard, gameBoard.board, gameBoard.placeShip])(
    "%# exists",
    () => {
      expect(Gameboard).toBeDefined();
    }
  );

  it("places ship(3, [0, 9],'left') objects at adj. coordinates", () => {
    gameBoard.placeShip(3, [0, 9], "left");
    expect(gameBoard.board[0][8]).toEqual(expect.any(Ship));
    expect(gameBoard.board[0][7]).toEqual(expect.any(Ship));
  });

  it("places ship(2, [3, 0], 'right') objects at adj. coordinates", () => {
    gameBoard.placeShip(2, [3, 0], "right");
    expect(gameBoard.board[3][1]).toEqual(expect.any(Ship));
  });

  it("places ship(4, [5, 5], 'top') objects at adj. coordinates", () => {
    gameBoard.placeShip(4, [5, 5], "top");
    expect(gameBoard.board[4][5]).toEqual(expect.any(Ship));
    expect(gameBoard.board[3][5]).toEqual(expect.any(Ship));
    expect(gameBoard.board[2][5]).toEqual(expect.any(Ship));
  });

  it("places ship(2, [7, 3], 'bottom') objects at adj. coordinates", () => {
    gameBoard.placeShip(2, [7, 3], "bottom");
    expect(gameBoard.board[8][3]).toEqual(expect.any(Ship));
  });

  it.skip("returns coordinates that work in placeShip", () => {
    const newShipDetails = gameBoard.randomCoords(4);
    gameBoard.placeShip(
      newShipDetails.shipLength,
      newShipDetails.coord,
      newShipDetails.placement
    );
    expect(
      gameBoard.board[newShipDetails.coord[0]][newShipDetails.coord[1]]
    ).toEqual(expect.any(Ship));
  });

  it("receiveAttack exists", () => {
    expect(gameBoard.receiveAttack).toBeDefined();
  });

  it("receiveAttack checks if the attack hit a ship at [7,3]", () => {
    expect(gameBoard.receiveAttack([7, 3])).toBe(true);
  });

  it("receiveAttack checks if the attack hit a ship at [3,9]", () => {
    expect(gameBoard.receiveAttack([3, 9])).toBe(false);
  });

  it("receiveAttack registers the hit on the ship at [5, 5]", () => {
    gameBoard.receiveAttack([5, 5]);
    expect(gameBoard.board[5][5].hits).toEqual(1);
  });

  it("receiveAttack registers the hit on a ship at [4, 5]", () => {
    gameBoard.receiveAttack([4, 5]);
    expect(gameBoard.board[4][5].hits).toEqual(2);
  });

  it("receiveAttack registers the hit on a ship at [3, 5]", () => {
    gameBoard.receiveAttack([3, 5]);
    expect(gameBoard.board[3][5].hits).toEqual(3);
  });

  it("receiveAttack records the coordinates of the missed shot at [6, 3]", () => {
    gameBoard.receiveAttack([6, 3]);
    expect(gameBoard.board[6][3]).toBe("miss");
  });

  it("isAllSunk exists", () => {
    expect(gameBoard.isAllSunk).toBeDefined();
  });

  it("isAllSunk() checks if all ships are sunk (case-1)", () => {
    expect(gameBoard.isAllSunk()).toBe(false);
  });

  it("isAllSunk() checks if all ships are sunk (case-2)", () => {
    gameBoard.receiveAttack([2, 5]);
    gameBoard.receiveAttack([8, 3]);
    gameBoard.receiveAttack([3, 0]);
    gameBoard.receiveAttack([3, 1]);
    gameBoard.receiveAttack([0, 9]);
    gameBoard.receiveAttack([0, 8]);
    gameBoard.receiveAttack([0, 7]);

    expect(gameBoard.isAllSunk()).toBe(true);
  });
});
