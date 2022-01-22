import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useStoreAction(actionCreator) {
  const dispatch = useDispatch();
  // Create a function that dispatchs the action
  // Wrap in useCallback to keep the reference
  const dispatchAction = useCallback(
    (...args) => dispatch(actionCreator(...args)),
    [dispatch, actionCreator],
  );
  return dispatchAction;
}
