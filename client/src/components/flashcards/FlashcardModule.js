import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { 
  getCards, 
  resetCards,
  nextCard,
  prevCard,
  updateCard,
  addCard
} from '../../actions/card';
import { getModuleStats } from '../../actions/module';
import CardDisplay from './CardDisplay';
import CardList from './CardList';
import AddCardForm from './AddCardForm';

const FlashcardModule = () => {
  const { moduleName } = useParams();
  const dispatch = useDispatch();
  const { cards, currentCard, currentIndex, loading } = useSelector(state => state.card);
  const { stats } = useSelector(state => state.module);
  const [showCardList, setShowCardList] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    dispatch(getCards(moduleName));
    dispatch(getModuleStats(moduleName));
  }, [dispatch, moduleName]);

  const handleNextCard = () => {
    dispatch(nextCard());
    setAnswer('');
  };

  const handlePrevCard = () => {
    dispatch(prevCard());
    setAnswer('');
  };

  const handleCheckAnswer = () => {
    if (!currentCard) return;
    
    // For simplicity, just show the back of the card
    // A more sophisticated answer checking would go here
    const cardElement = document.querySelector('.card-back');
    if (cardElement) {
      cardElement.classList.remove('hidden');
    }
  };

  const handleMarkCorrect = () => {
    if (!currentCard) return;
    
    dispatch(updateCard(
      moduleName,
      currentCard.id,
      { correct: 'Correct', response: answer }
    ));
    
    handleNextCard();
  };

  const handleMarkIncorrect = () => {
    if (!currentCard) return;
    
    dispatch(updateCard(
      moduleName,
      currentCard.id,
      { correct: 'Incorrect', response: answer }
    ));
    
    handleNextCard();
  };

  const handleResetScores = () => {
    if (window.confirm('Are you sure you want to reset all scores? This will start a new session.')) {
      dispatch(resetCards(moduleName));
    }
  };

  const handleAddCard = (cardData) => {
    dispatch(addCard(moduleName, cardData));
    setShowAddForm(false);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        handleCheckAnswer();
        break;
      case 'ArrowUp':
        e.preventDefault();
        handleNextCard();
        break;
      case 'ArrowDown':
        e.preventDefault();
        handlePrevCard();
        break;
      case 'Alt':
        e.preventDefault();
        if (e.location === 1) {
          handleMarkIncorrect();
        } else if (e.location === 2) {
          handleMarkCorrect();
        }
        break;
      default:
        break;
    }
  };

  if (loading || !stats) {
    return <div className="loading-spinner">Loading flashcards...</div>;
  }

  const formattedModuleName = moduleName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <FlashcardModuleContainer>
      <div className="module-header">
        <h2>{formattedModuleName}</h2>
        <div className="header-controls">
          <div className="stats">
            <p>Progress: {stats.correct} / {stats.total} ({stats.percentage}%)</p>
          </div>
          <div className="header-buttons">
            <Link to="/sessions" className="logs-link">View Session Logs</Link>
            <button onClick={handleResetScores} className="reset-btn">Reset Scores</button>
            <Link to="/modules" className="module-switch">Switch Module</Link>
          </div>
        </div>
      </div>

      <div className="card-list-control">
        <button onClick={() => setShowCardList(!showCardList)} className="toggle-list-btn">
          {showCardList ? 'Hide' : 'Show'} Card List ({cards.length} cards)
        </button>
        {showCardList && <CardList cards={cards} />}
      </div>

      {currentCard ? (
        <>
          <CardDisplay 
            card={currentCard}
            currentIndex={currentIndex}
            totalCards={cards.length}
            moduleName={moduleName}
          />
          
          <div className="answer-section">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Your answer"
              className="answer-input"
            />
            <div className="answer-buttons">
            <button onClick={handleCheckAnswer} className="check-btn">
                Check Answer
              </button>
              <button onClick={handleMarkIncorrect} className="incorrect-btn">
                Incorrect (Left Alt)
              </button>
              <button onClick={handleMarkCorrect} className="correct-btn">
                Correct (Right Alt)
              </button>
            </div>
          </div>
          
          <div className="navigation-buttons">
            <button onClick={handlePrevCard}>Previous (Down Arrow)</button>
            <button onClick={handleNextCard}>Next (Up Arrow)</button>
          </div>
        </>
      ) : (
        <p>No cards available for this module.</p>
      )}

      <div className="add-card-section">
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="toggle-add-card"
        >
          {showAddForm ? 'Cancel' : 'Add New Card'}
        </button>
        
        {showAddForm && <AddCardForm onAddCard={handleAddCard} />}
      </div>
    </FlashcardModuleContainer>
  );
};

const FlashcardModuleContainer = styled.div`
  margin: 2rem 0;

  .module-header {
    margin-bottom: 2rem;
    
    h2 {
      color: ${({ theme }) => theme.primary};
      margin-bottom: 1rem;
      text-align: center;
    }
    
    .header-controls {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: ${({ theme }) => theme.headerBg};
      padding: 1rem;
      border-radius: 8px;
      
      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
    
    .stats {
      font-size: 1.1rem;
      font-weight: bold;
      
      p {
        margin: 0;
      }
    }
    
    .header-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      
      a, button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-decoration: none;
        font-size: 0.9rem;
      }
    }
    
    .logs-link {
      background-color: ${({ theme }) => theme.primary};
      color: white;
      
      &:hover {
        background-color: ${({ theme }) => theme.primaryHover};
      }
    }
    
    .reset-btn {
      background-color: ${({ theme }) => theme.danger};
      color: white;
      border: none;
      cursor: pointer;
      
      &:hover {
        background-color: ${({ theme }) => theme.dangerHover};
      }
    }
    
    .module-switch {
      background-color: ${({ theme }) => theme.secondary};
      color: white;
      
      &:hover {
        background-color: ${({ theme }) => theme.secondaryHover};
      }
    }
  }
  
  .card-list-control {
    margin-bottom: 2rem;
    
    .toggle-list-btn {
      background-color: ${({ theme }) => theme.primary};
      color: white;
      border: none;
      padding: 0.7rem 1.2rem;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: ${({ theme }) => theme.primaryHover};
      }
    }
  }
  
  .answer-section {
    margin: 1.5rem 0;
    
    .answer-input {
      width: 100%;
      padding: 0.8rem;
      font-size: 1rem;
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 4px;
      margin-bottom: 1rem;
      background-color: ${({ theme }) => theme.cardBg};
      color: ${({ theme }) => theme.text};
    }
    
    .answer-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      
      button {
        padding: 0.7rem 1.2rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .check-btn {
        background-color: ${({ theme }) => theme.primary};
        color: white;
        
        &:hover {
          background-color: ${({ theme }) => theme.primaryHover};
        }
      }
      
      .correct-btn {
        background-color: ${({ theme }) => theme.correct};
        color: white;
        
        &:hover {
          opacity: 0.9;
        }
      }
      
      .incorrect-btn {
        background-color: ${({ theme }) => theme.incorrect};
        color: white;
        
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    
    button {
      padding: 0.7rem 1.2rem;
      background-color: ${({ theme }) => theme.primary};
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: ${({ theme }) => theme.primaryHover};
      }
    }
  }
  
  .add-card-section {
    margin-top: 2rem;
    
    .toggle-add-card {
      background-color: ${({ theme }) => theme.secondary};
      color: white;
      border: none;
      padding: 0.7rem 1.2rem;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 1rem;
      
      &:hover {
        background-color: ${({ theme }) => theme.secondaryHover};
      }
    }
  }
`;

export default FlashcardModule;