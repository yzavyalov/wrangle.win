export const onImageErrorWithLogo = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = "/images/logo.svg";
};
