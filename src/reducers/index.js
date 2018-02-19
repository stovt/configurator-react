import { combineReducers } from 'redux';
import createLocalesList from './locales';
import createStepsList from './steps';
import createConfiguratorsList from './configurators';
import createProductsList from './products';

const allReducers = combineReducers({
  locales: createLocalesList(),
  steps: createStepsList(),
  configurators: createConfiguratorsList(),
  products: createProductsList(),
});

export default allReducers;

