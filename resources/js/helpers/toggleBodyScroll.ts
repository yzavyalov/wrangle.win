export const toggleBodyScroll = (shouldDisable: boolean) => {
  const className = 'no-scroll';
  const body = document.body;

  if (shouldDisable) {
    body.classList.add(className);
  } else {
    body.classList.remove(className);
  }
};
