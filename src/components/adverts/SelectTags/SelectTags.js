import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadTags } from '../../../store/actions';
import { getTags } from '../../../store/selectors';

import { CheckboxGroup } from '../../common';

function SelectTags(props) {
  const dispatch = useDispatch();
  const tags = useSelector(getTags);
  useEffect(() => {
    dispatch(loadTags());
  });

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
