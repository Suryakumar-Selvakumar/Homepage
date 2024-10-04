/* eslint-disable no-undef */
import { Ship } from "../ship";

describe("Ship", () => {
  const ship = new Ship(3, "left");
  it("exists", () => {
    expect(Ship).toBeDefined();
  });

  it("length, hits, sunk, placement exists", () => {
    expect(ship.length).toBeDefined();
    expect(ship.hits).toBeDefined();
    expect(ship.sunk).toBeDefined();
    expect(ship.placement).toBeDefined();
  });

  it("hit() function works", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it("isSunk() function works", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  it("isSunk() function works", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
