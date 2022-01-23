// Middleware example: adds timestamp to every action
export const timestamp = store => next => action =>
  next({
    ...action,
    meta: { ...action.meta, timestamp: new Date().getTime() },
  });

const redirectionsMap = {
  401: '/login',
  404: '/404',
};

// Middleware example: redirects on error actions
export const errorRedirection = history => store => next => action => {
  if (action.error) {
    const redirection = redirectionsMap[action.payload?.statusCode];
    if (redirection) {
      history.push(redirection);
    }
  }
  next(action);
};
