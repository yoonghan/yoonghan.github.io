export function set(array, index, element) {
  return [...array.slice(0, index), element, ...array.slice(index + 1)];
}

export function remove(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function insert(array, index, element) {
  return [...array.slice(0, index), element, ...array.slice(index)];
}

export function move(array, fromIndex, toIndex) {
  return insert(remove(array, fromIndex), toIndex, array[fromIndex])
}
