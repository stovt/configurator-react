import React from 'react';
import MetaAttributes from '../MetaAttributes';
import ConfiguratorPreview from '../ConfiguratorPreview';
import ImageOrdering from '../ImageOrdering';

const PreviewConfiguratorStep = () => (
  <div>
    <MetaAttributes />
    <ConfiguratorPreview />
    <ImageOrdering />
  </div>
);

export default PreviewConfiguratorStep;