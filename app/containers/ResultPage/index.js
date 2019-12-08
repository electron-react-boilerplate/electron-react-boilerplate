// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import routes from '../../constants/routes';
import SuccessImg from '../../assets/success.jpg';
import WrongImg from '../../assets/wrong.jpg';
import RightImg from '../../assets/right.jpg';
import WrongAudio from '../../assets/wrong.wav';
import RightAudio from '../../assets/right.mp3';
import styles from './index.css';
import AnimatedLink from '../../components/AnimatedLink';

type Props = {
  currentIndex: number,
  result: boolean,
  score: number,
  items: array
};
function ResultPage({ currentIndex, result, score, items }: Props) {
  const [showScore, setShowScore] = useState(false);
  let image = SuccessImg;

  let link = (
    <AnimatedLink to={routes.HOME}>
      你的得分为{score}分！点击返回首页
    </AnimatedLink>
  );

  if (!showScore) {
    image = result ? RightImg : WrongImg;
    link =
      currentIndex >= items.length ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        <h1 onClick={() => setShowScore(true)} style={{ cursor: 'pointer' }}>
          答题已完成！点击查看结果
        </h1>
      ) : (
        <AnimatedLink to={routes.QUIZ}>下一题</AnimatedLink>
      );
  }

  return (
    <div className={styles.container}>
      <img src={image} alt="result" />
      {showScore || (
        <audio autoPlay src={result ? RightAudio : WrongAudio}>
          <track kind="captions" />
        </audio>
      )}
      {link}
    </div>
  );
}

function mapStateToProps(state) {
  return state.question;
}

export default connect(mapStateToProps)(ResultPage);
