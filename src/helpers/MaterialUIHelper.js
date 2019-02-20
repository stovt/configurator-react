export const autoCompleteFilter = (searchText, key) => {
  const searchTextL = searchText.toLowerCase();
  const keyL = key.toLowerCase();
  const searchTextLArray = searchTextL.split(' ');
  let result = true;
  for (let i = 0; i < searchTextLArray.length; i += 1) {
    if (keyL.indexOf(searchTextLArray[i]) === -1) {
      result = false;
    }
  }
  return result;
};
