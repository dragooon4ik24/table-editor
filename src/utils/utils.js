export const ascendingSort = (el1, el2) => {
  if (el1.name > el2.name) {
    return 1
  }
  if (el1.name < el2.name) {
    return -1
  }
  return 0
}
export const descendingSort = (el1, el2) => {
  if (el1.name < el2.name) {
    return 1
  }
  if (el1.name > el2.name) {
    return -1
  }
  return 0
}
