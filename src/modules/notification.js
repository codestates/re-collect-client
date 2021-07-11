const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION';
const DEQUEUE_NOTIFICATION = 'DEQUEUE_NOTIFICATION';

const initialState = {
  notifications: [],
};

export const notify =
  (message, dissmissTime = 5000) =>
  (dispatch) => {
    const uuid = Math.random();
    dispatch({
      type: ENQUEUE_NOTIFICATION,
      payload: { message, uuid, dissmissTime },
    });
    setTimeout(() => {
      dispatch({ type: DEQUEUE_NOTIFICATION });
    }, dissmissTime);
  };

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENQUEUE_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case DEQUEUE_NOTIFICATION:
      return { ...state, notifications: state.notifications.slice(1) };

    default:
      return state;
  }
};
