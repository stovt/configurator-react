import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import CreateConfiguratorStepIcon from 'material-ui/svg-icons/action/search';
import AddProductsStepIcon from 'material-ui/svg-icons/content/add';
import AddAccessoriesStepIcon from 'material-ui/svg-icons/av/playlist-add-check';
import PreviewConfiguratorStepIcon from 'material-ui/svg-icons/content/save';
import { getActiveConfiguratorID } from '../../reducers/configurator';
import { getSteps, getStepsIds, getActiveStep } from '../../reducers/steps';
import * as actions from '../../actions/steps';
import StepHeader from '../StepHeader';
import CreateConfiguratorStep from './CreateConfiguratorStep';
import AddProductsStep from './AddProductsStep';
import AddAccessoriesStep from './AddAccessoriesStep';
import PreviewConfiguratorStep from './PreviewConfiguratorStep';

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
    value: 'preview',
    label: 'Preview configurator',
    icon: <PreviewConfiguratorStepIcon />,
    step: <PreviewConfiguratorStep />
  }
];

class Steps extends React.PureComponent {
  constructor() {
    super();

    this.fetchData = this.fetchData.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  componentDidMount() {
    this.fetchData(tabsConfig);
  }

  fetchData(steps) {
    const { fetchSteps } = this.props;
    fetchSteps(steps);
  }

  prevStep() {
    const { prevStep, stepsIds } = this.props;
    prevStep(stepsIds);
  }

  nextStep() {
    const { nextStep, stepsIds } = this.props;
    nextStep(stepsIds);
  }

  render() {
    const {
      steps, stepsIds, activeStep, tabsDisabled, selectStep
    } = this.props;
    if (!steps.length) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Tabs
          value={activeStep}
          onChange={selectStep}
        >
          {steps.map(step => (
            <Tab
              key={step.value}
              value={step.value}
              label={step.label}
              icon={step.icon}
              disabled={tabsDisabled}
            >
              <StepHeader />
              <h3>{step.label}</h3>
              {step.step}
            </Tab>
          ))}
        </Tabs>
        <RaisedButton
          label="Back"
          secondary
          disabled={tabsDisabled || activeStep === stepsIds[0]}
          onClick={this.prevStep}
          style={{ marginTop: '10px' }}
        />
        <RaisedButton
          label="Next"
          primary
          disabled={tabsDisabled || activeStep === stepsIds[stepsIds.length - 1]}
          onClick={this.nextStep}
          style={{ marginTop: '10px', float: 'right' }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  steps: getSteps(state),
  stepsIds: getStepsIds(state),
  activeStep: getActiveStep(state),
  tabsDisabled: !getActiveConfiguratorID(state)
});

export default connect(mapStateToProps, actions)(Steps);

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
  stepsIds: PropTypes.array.isRequired,
  activeStep: PropTypes.string.isRequired,
  tabsDisabled: PropTypes.bool.isRequired,
  fetchSteps: PropTypes.func.isRequired,
  selectStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};
