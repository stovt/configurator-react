import { combineReducers } from 'redux';
import createLocalesList from './locales';
import createConfiguratorsList from './configurators';
import createStepsList from './steps';

const allReducers = combineReducers({
  locales: createLocalesList(),
  configurators: createConfiguratorsList(),
  steps: createStepsList()
});

export default allReducers;

