/* eslint-disable no-undef */
import { Player } from "../player";

describe("Player", () => {
  const player = new Player("human");
  it("exists", () => {
    expect(Player).toBeDefined();
  });

  it("type and gameBoard exist", () => {
    expect(player).toHaveProperty("type");
    expect(player).toHaveProperty("gameBoard");
  });
});
