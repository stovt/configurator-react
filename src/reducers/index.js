import { combineReducers } from 'redux';
import createLocalesList from './locales';
import createConfiguratorsList from './configurators';

const allReducers = combineReducers({
  locales: createLocalesList(),
  configurators: createConfiguratorsList()
});

export default allReducers;

