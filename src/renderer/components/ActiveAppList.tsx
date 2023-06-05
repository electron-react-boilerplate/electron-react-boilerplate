import { useContext } from 'react';
import AppListContext from 'renderer/contexts/AppListContext';
import AppRow from './AppRow';

function ActiveAppList() {
  const appList = useContext(AppListContext);
  const app1 = 'eka';
  const app2 = 'toka';

  return (
    <div>
      <h3>Active App List</h3>
      <table>
        <AppRow appName={app1} />
        <AppRow appName={app2} />
      </table>
    </div>
  );
}

export default ActiveAppList;
