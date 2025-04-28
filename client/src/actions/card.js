import axios from 'axios';
import {
  GET_CARDS,
  ADD_CARD,
  UPDATE_CARD,
  RESET_CARDS,
  CARD_ERROR,
  SET_CURRENT_CARD,
  CLEAR_CURRENT_CARD
} from './types';
import { setAlert } from './alert';
import { getModuleStats } from './module';

// Get cards for a module
export const getCards = moduleName => async dispatch => {
  try {
    const res = await axios.get(`/api/cards/${moduleName}`);

    dispatch({
      type: GET_CARDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: err.response?.data.msg || 'Error loading cards'
    });
  }
};

// Add new card
export const addCard = (moduleName, cardData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/cards/${moduleName}`, cardData, config);

    dispatch({
      type: ADD_CARD,
      payload: res.data
    });

    dispatch(setAlert('Card added successfully', 'success'));
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: err.response?.data.msg || 'Error adding card'
    });
  }
};

// Update card
export const updateCard = (moduleName, id, cardData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/cards/${moduleName}/${id}`, cardData, config);

    dispatch({
      type: UPDATE_CARD,
      payload: res.data
    });

    // If we're updating the score, also update module stats
    if (cardData.correct !== undefined) {
      dispatch(getModuleStats(moduleName));
    }
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: err.response?.data.msg || 'Error updating card'
    });
  }
};

// Reset all card scores for a module
export const resetCards = moduleName => async dispatch => {
  try {
    const res = await axios.put(`/api/cards/${moduleName}/reset`);

    dispatch({
      type: RESET_CARDS
    });
    
    dispatch(getModuleStats(moduleName));
    dispatch(setAlert('Scores reset successfully', 'success'));
  } catch (err) {
    dispatch({
      type: CARD_ERROR,
      payload: err.response?.data.msg || 'Error resetting scores'
    });
  }
};

// Set current card
export const setCurrentCard = (card, index) => {
  return {
    type: SET_CURRENT_CARD,
    payload: { card, index }
  };
};

// Clear current card
export const clearCurrentCard = () => {
  return { type: CLEAR_CURRENT_CARD };
};

// Navigate to next card
export const nextCard = () => (dispatch, getState) => {
  const { cards, currentIndex } = getState().card;
  if (cards.length === 0) return;
  
  const nextIndex = (currentIndex + 1) % cards.length;
  dispatch(setCurrentCard(cards[nextIndex], nextIndex));
};

// Navigate to previous card
export const prevCard = () => (dispatch, getState) => {
  const { cards, currentIndex } = getState().card;
  if (cards.length === 0) return;
  
  const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
  dispatch(setCurrentCard(cards[prevIndex], prevIndex));
};

// Jump to specific card by ID
export const jumpToCard = cardId => (dispatch, getState) => {
  const { cards } = getState().card;
  const index = cards.findIndex(card => card.id === cardId);
  
  if (index !== -1) {
    dispatch(setCurrentCard(cards[index], index));
  }
};