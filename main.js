function cachedFunction(func) {
  const cache = {};
  const lastCalls = [];

  return function(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      // Возвращаем результат из кэша, если он уже есть
      return cache[key];
    }

    const result = func.apply(this, args);
    cache[key] = result;

    // Добавляем вызов в список последних вызовов
    lastCalls.push(key);

    // Если количество вызовов превышает 10, удаляем самый старый вызов
    if (lastCalls.length > 10) {
      const oldestCall = lastCalls.shift();
      delete cache[oldestCall];
    }

    return result;
  };
}
function myFunction(arg) {
  console.log("Первый звонок от номера:", arg);
  return ('+') + arg 
}

const cachedMyFunction = cachedFunction(myFunction);

console.log(cachedMyFunction(1111111111)); 
console.log(cachedMyFunction(2222222222));
console.log(cachedMyFunction(1111111111)); 
console.log(cachedMyFunction(1111111111)); 
console.log(cachedMyFunction(2222222222));
console.log(cachedMyFunction(3333333333));
console.log(cachedMyFunction(1111111111));