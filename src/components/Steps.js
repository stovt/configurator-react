import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/steps';
import { getSteps, getStepsIds, getActiveStep } from '../reducers/steps';
import { getActiveConfiguratorID } from '../reducers/configurator';

import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import CreateConfiguratorStepIcon from 'material-ui/svg-icons/action/search';
import AddProductsStepIcon from 'material-ui/svg-icons/content/add';
import AddAccessoriesStepIcon from 'material-ui/svg-icons/av/playlist-add-check';
import SaveConfiguratorStepIcon from 'material-ui/svg-icons/content/save';

import Locales from './Locales';
import CreateConfiguratorStep from './CreateConfiguratorStep';
import AddProductsStep from './AddProductsStep';
import AddAccessoriesStep from './AddAccessoriesStep';
import SaveConfiguratorStep from './SaveConfiguratorStep';

const tabsConfig = [
  {
    value: 'create',
    label: 'Create or find configurator',
    icon: <CreateConfiguratorStepIcon />,
    step: <CreateConfiguratorStep />
  },
  {
    value: 'add-products',
    label: 'Add basic products',
    icon: <AddProductsStepIcon />,
    step: <AddProductsStep />
  },
  {
    value: 'add-accesories',
    label: 'Add accessories',
    icon: <AddAccessoriesStepIcon />,
    step: <AddAccessoriesStep />
  },
  {
    value: 'save',
    label: 'Save configurator',
    icon: <SaveConfiguratorStepIcon />,
    step: <SaveConfiguratorStep />
  }
];

class Steps extends Component {
  componentDidMount() {
    this.fetchData(tabsConfig);
  }

  fetchData(steps) {
    const { fetchSteps } = this.props;
    fetchSteps(steps);
  }

  render() {
    const { steps, stepsIds, activeStep, tabsDisabled, selectStep, prevStep, nextStep } = this.props;
    if (!steps.length) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Tabs 
          value={activeStep} 
          onChange={selectStep}
        >
          {steps.map((step) =>
            <Tab 
              key={step.value} 
              value={step.value}
              label={step.label}
              icon={step.icon}
              disabled={tabsDisabled}
            >
              <Locales />
              <h3>{step.label}</h3>
              {step.step}
            </Tab>
          )}
        </Tabs>
        <RaisedButton 
          label="Back" 
          secondary={true} 
          disabled={tabsDisabled || activeStep === stepsIds[0]}
          onClick={() => prevStep(stepsIds)} 
          style={{'marginTop':'10px'}}
        />
        <RaisedButton 
          label="Next" 
          primary={true} 
          disabled={tabsDisabled || activeStep === stepsIds[stepsIds.length - 1]} 
          onClick={() => nextStep(stepsIds)}
          style={{'marginTop':'10px', 'float':'right'}} 
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    steps: getSteps(state),
    stepsIds: getStepsIds(state),
    activeStep: getActiveStep(state),
    tabsDisabled: getActiveConfiguratorID(state) ? false : true
  }
};

export default connect(mapStateToProps, actions) (Steps);