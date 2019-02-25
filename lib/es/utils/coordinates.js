const preCalc = (dimensions, viewSize) => {
  const aspectRatio = dimensions.width / dimensions.height;
  let padWidth = 0;
  let padHeight = 0;
  let ratio = viewSize / dimensions.height;

  if (aspectRatio < 1) {
    padWidth = (dimensions.height - dimensions.width) * ratio / 2;
  } else if (aspectRatio > 1) {
    ratio = viewSize / dimensions.width;
    padHeight = (dimensions.width - dimensions.height) * ratio / 2;
  }

  return {
    padHeight,
    padWidth,
    aspectRatio,
    ratio
  };
};

export const coordToPoint = (coord, dimensions, viewSize) => {
  const {
    padHeight,
    padWidth,
    aspectRatio,
    ratio
  } = preCalc(dimensions, viewSize);
  const realX = coord.x - padWidth;
  const realY = coord.y - padHeight;
  const x = realX / ratio;
  const y = realY / ratio;
  return {
    x,
    y
  };
};
export const pointToCoord = (point, dimensions, viewSize) => {
  const {
    padHeight,
    padWidth,
    aspectRatio,
    ratio
  } = preCalc(dimensions, viewSize);
  const x = point.x * ratio + padWidth;
  const y = point.y * ratio + padHeight;
  return {
    x,
    y
  };
};
export const mouseEventToCoordinate = (e, el) => {
  const rect = el.getBoundingClientRect();
  const y = e.clientY - rect.top;
  const x = e.clientX - rect.left;
  return {
    x,
    y
  };
};