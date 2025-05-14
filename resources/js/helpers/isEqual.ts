export const isEqual = (a, b) => {
  // Перевірка на точну рівність або однаковий посилання на об'єкти
  if (a === b) {
    return true;
  }

  // Перевірка на тип даних
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  // Отримання ключів об'єктів
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Перевірка на рівну кількість ключів
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Перевірка на однаковість значень за кожним ключем
  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
};
