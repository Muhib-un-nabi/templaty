import { NotificationManager } from '../../components/common/react-notifications';

export const checkLimit = ({ cb, cbData, checkFor, team }) => {
  if (team && team.package && team.current) {
    if (team.package[checkFor] - team.current[checkFor] >= 1) {
      cb(cbData);
    } else {
      NotificationManager.info(
        'Success message',
        `Your Limit Reach Please Upgrate you Pakage`,
        3000,
        null,
        null
      );
    }
  }
};
