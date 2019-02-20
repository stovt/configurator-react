export const fetchSteps = steps => ({
  type: 'FETCH_STEPS',
  steps
});

export const selectStep = step => ({
  type: 'SELECT_STEP',
  step
});

export const nextStep = steps => ({
  type: 'NEXT_STEP',
  steps
});

export const prevStep = steps => ({
  type: 'PREV_STEP',
  steps
});
