import {Constants} from '../actions';

export const addCard = (listID, text) => {
  return {
    type: Constants.AddCARD,
    payload: {text, listID},
  };
}