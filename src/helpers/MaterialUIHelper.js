export const autoCompleteFilter = (searchText, key) => {
  var searchTextL = searchText.toLowerCase();
  var keyL = key.toLowerCase();
  var searchTextLArray = searchTextL.split(' ');
  var result = true;
  for(var i=0;i<searchTextLArray.length;i++) {
    if ( keyL.indexOf( searchTextLArray[i] ) == -1 ) {
      result = false;
    }
  }   
  return result;
}