import { combineReducers } from 'redux';
import createList, * as fromLocales from './locales';


const allReducers = combineReducers({
  locales: createList()
});

export default allReducers;

