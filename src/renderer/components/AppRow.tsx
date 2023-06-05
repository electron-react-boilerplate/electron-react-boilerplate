import { FC } from 'react';

type AppRowProps = {
  appName: string | undefined;
};

const AppRow: FC<AppRowProps> = function ({ appName }) {
  function maximiseWindow() {
    alert('open');
  }

  function closeWindow() {
    alert('close');
  }

  return (
    <tr>
      <td>
        <button type="button" onClick={closeWindow}>
          X
        </button>
      </td>
      <td>
        <button type="button" onClick={maximiseWindow}>
          O
        </button>
      </td>
      <td>{appName}</td>
    </tr>
  );
};

export default AppRow;
