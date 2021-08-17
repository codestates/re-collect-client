export const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION';
export const DEQUEUE_NOTIFICATION = 'DEQUEUE_NOTIFICATION';

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
  }