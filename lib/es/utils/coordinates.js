export const mouseEventToPosition = (e, el) => {
  const rect = el.getBoundingClientRect();
  const y = e.clientY - rect.top;
  const x = e.clientX - rect.left;
  return {
    x,
    y
  };
};