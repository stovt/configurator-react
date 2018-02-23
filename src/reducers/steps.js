import { combineReducers } from 'redux';
import isEmpty from 'lodash/isEmpty';

const createStepsList = () => {
  const steps = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_STEPS':
        return action.steps;
      default:
        return state;
    }
  };

  const stepsIds = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_STEPS':
        return action.steps.map(step => step.value);
      default:
        return state;
    }
  };

  const active = (state = 'create', action) => {
    switch(action.type) {
      case 'SELECT_STEP':
        return action.step;
      case 'NEXT_STEP': 
      return action.steps[action.steps.indexOf(state) + 1];
      case 'PREV_STEP':
      return action.steps[action.steps.indexOf(state) - 1];
        return state;
      default:
        return state;
    }
  };

  return combineReducers({
    steps,
    stepsIds,
    active
  });
};

export default createStepsList;

export const getSteps = (state) => state.steps.steps;
export const getStepsIds = (state) => state.steps.stepsIds;
export const getActiveStep = (state) => state.steps.active;