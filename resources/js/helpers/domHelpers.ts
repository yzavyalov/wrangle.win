export const select = (el) => document.querySelector(el);

export const selectAll = (el) => document.querySelectorAll(el);

export const exist = (el) =>
  typeof select(el) !== "undefined" && select(el) !== null ? true : false;

export const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
};

export const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += " " + className;
  }
};

export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
};
