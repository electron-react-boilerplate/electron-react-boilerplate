import React from 'react';
import { connect } from 'react-redux';
import { answer } from '../../actions/question';
import Option from './Option';
import styles from './index.css';

type Props = {
  question: { text: string, answer: number, options: array },
  answer: () => void
};

function Quiz({ answer: doAnswer, question }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.text}>{question && question.text}</div>
      <div className={styles.text}>
        {question &&
          question.options.map((item, index) => (
            <Option key={item} onClick={() => doAnswer(index)} text={item} />
          ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { items, currentIndex } = state.question;
  return { question: items[currentIndex] };
}

export default connect(mapStateToProps, { answer })(Quiz);
