import { useSelector } from 'react-redux';
import Toast from './Toast';

export default function NofiticationCenter() {
  const state = useSelector((state) => state.notificationReducer);

  return (
    <div className="notification__container top-right">
      {state.notifications.map((n) => (
        <Toast key={n.uuid} text={n.message} dismissTime={n.dismissTime} />
      ))}
    </div>
  );
}
