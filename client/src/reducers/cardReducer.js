import {
  GET_CARDS,
  ADD_CARD,
  UPDATE_CARD,
  RESET_CARDS,
  CARD_ERROR,
  SET_CURRENT_CARD,
  CLEAR_CURRENT_CARD,
} from "../actions/types";

const initialState = {
  cards: [],
  currentCard: null,
  currentIndex: 0,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CARDS:
      return {
        ...state,
        cards: payload,
        currentCard: payload.length > 0 ? payload[0] : null,
        currentIndex: 0,
        loading: false,
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, payload],
        loading: false,
      };
    case UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === payload.id ? payload : card,
        ),
        currentCard:
          state.currentCard && state.currentCard.id === payload.id
            ? payload
            : state.currentCard,
        loading: false,
      };
    case SET_CURRENT_CARD:
      return {
        ...state,
        currentCard: payload.card,
        currentIndex: payload.index,
        loading: false,
      };
    case CLEAR_CURRENT_CARD:
      return {
        ...state,
        currentCard: null,
        currentIndex: 0,
      };
    case RESET_CARDS:
      return {
        ...state,
        cards: state.cards.map((card) => ({
          ...card,
          correct: null,
          response: null,
        })),
        loading: false,
      };
    case CARD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
