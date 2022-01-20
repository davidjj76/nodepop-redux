import React from 'react';

import { getTags } from '../service';
import { CheckboxGroup } from '../../common';

function SelectTags(props) {
  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
