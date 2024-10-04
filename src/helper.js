function randomize(placement) {
  const choices = ["left", "right", "top", "bottom"];
  let choice = Math.floor(Math.random() * 4);
  if (choices[choice] !== placement) return choices[choice];
  return randomize(placement);
}

function returnAdjCell(shipCoord) {
  if (shipCoord) {
    const choices = [
      [shipCoord[0], shipCoord[1] - 1],
      [shipCoord[0], shipCoord[1] + 1],
      [shipCoord[0] - 1, shipCoord[1]],
      [shipCoord[0] + 1, shipCoord[1]],
    ];
    let choice = Math.floor(Math.random() * 4);
    return choices[choice];
  } else return undefined;
}

export { randomize, returnAdjCell };
