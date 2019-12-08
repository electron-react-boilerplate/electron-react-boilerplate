import React from 'react';
import { connect } from 'react-redux';
import { init } from '../../actions/question';
import IntroVideo from '../../assets/introduction.mp4';
import styles from './index.css';
import AnimatedLink from '../../components/AnimatedLink';
import routes from '../../constants/routes';

type Props = {
  init: () => void
};

function Intro({ init: doInit }: Props) {
  return (
    <div>
      <video src={IntroVideo} autoPlay controls className={styles.video}>
        <track kind="captions" />
      </video>
      <AnimatedLink to={routes.QUIZ} onClick={doInit}>
        开始答题！
      </AnimatedLink>
    </div>
  );
}

export default connect(null, { init })(Intro);
