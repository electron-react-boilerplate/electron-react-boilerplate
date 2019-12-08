import _ from 'lodash';
import { ANSWER_QUESTION, INITIALIZE } from '../actions/question';
import allQuestions from '../constants/questions';

export default function questions(
  state = {
    items: [],
    currentIndex: 0,
    score: 0,
    result: false
  },
  action
) {
  switch (action.type) {
    case ANSWER_QUESTION: {
      const isRight = action.index === state.items[state.currentIndex].answer;
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        score: isRight ? state.score + 1 : state.score,
        result: isRight
      };
    }
    case INITIALIZE:
      return {
        items: _.sampleSize(allQuestions, 6),
        currentIndex: 0,
        score: 0
      };
    default:
      return state;
  }
}
