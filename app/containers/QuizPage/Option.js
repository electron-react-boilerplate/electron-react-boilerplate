import React from 'react';
import { useHistory } from 'react-router';
import styles from './index.css';
import routes from '../../constants/routes';

type Props = {
  text: string,
  onClick: () => void
};

export default function Option({ onClick, text }: Props) {
  const history = useHistory();

  const handleClick = () => {
    onClick();
    history.push(routes.RESULT);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={styles.option} onClick={handleClick}>
      {text}
    </div>
  );
}
