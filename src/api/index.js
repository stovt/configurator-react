import axios from 'axios';

const delay = ms => new Promise( resolve => setTimeout( resolve, ms ) );

export const fetchLocales = () =>
  axios.get(configUrls.GetLocalesForCurrSite).then(response => {

    let localesArr =  response.data.map(locale => {
      return {...locale, 'active': false }
    });
    localesArr.length > 1 ? localesArr[1].active = true : localesArr[0].active = true;

    let localesObj = localesArr.reduce((acc, elem) => (
      { 
        ...acc, 
        [elem.localeID]: { 'id':elem.localeID, 'value':elem.localeValue, 'active': elem.active }
      }),
    {});
    return localesObj;
  });

/*export const selectLocale = id =>
  delay( 500 ).then( () => {
    const todo = fakeDatabase.todos.find( t => t.id === id );
    todo.selected = true;
    return todo;
  });*/