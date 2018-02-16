import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import CreateConfiguratorStepIcon from 'material-ui/svg-icons/action/search';
import AddProductsStepIcon from 'material-ui/svg-icons/content/add';
import AddAccessoriesStepIcon from 'material-ui/svg-icons/av/playlist-add-check';
import SaveConfiguratorStepIcon from 'material-ui/svg-icons/content/save';

import StepHeader from './StepHeader';
import CreateConfiguratorStep from './CreateConfiguratorStep';
import AddProductsStep from './AddProductsStep';
import AddAccessoriesStep from './AddAccessoriesStep';
import SaveConfiguratorStep from './SaveConfiguratorStep';

const Steps = () => (
  <Tabs value={'create'} >
    <Tab 
      label="Create or find configurator" 
      value={'create'}
      icon={<CreateConfiguratorStepIcon />}
    >
      <StepHeader />
      <h3>Create or find configurator</h3>
      <CreateConfiguratorStep />
    </Tab>
    <Tab 
      label="Add basic products" 
      value={'add-products'}
      icon={<AddProductsStepIcon />}
    >
      <StepHeader />
      <h3>Add basic products</h3>
      <AddProductsStep />
    </Tab>        
    <Tab 
      label="Add accessories" 
      value={'add-accesories'}
      icon={<AddAccessoriesStepIcon />}
    >
      <StepHeader />
      <h3>Add accessories</h3>
      <AddAccessoriesStep />
    </Tab>
    <Tab 
      label="Save configurator" 
      value={'save'}
      icon={<SaveConfiguratorStepIcon />}
    >
      <StepHeader />
      <h3>Save configurator</h3>
      <SaveConfiguratorStep />
    </Tab>
  </Tabs>
)

export default Steps;