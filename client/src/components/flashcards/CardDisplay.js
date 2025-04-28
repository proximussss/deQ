import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateCard } from '../../actions/card';

const CardDisplay = ({ card, currentIndex, totalCards, moduleName }) => {
  const dispatch = useDispatch();
  const [showBack, setShowBack] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    front: card.front,
    back: card.back
  });

  const toggleBack = () => {
    setShowBack(!showBack);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset edit data when entering edit mode
      setEditData({
        front: card.front,
        back: card.back
      });
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const saveCardEdits = () => {
    if (!editData.front || !editData.back) {
      alert('Both front and back content are required!');
      return;
    }

    dispatch(updateCard(
      moduleName,
      card.id,
      { front: editData.front, back: editData.back }
    ));
    
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditData({
      front: card.front,
      back: card.back
    });
  };

  return (
    <CardDisplayContainer className={card.correct === 'Correct' ? 'correct' : card.correct === 'Incorrect' ? 'incorrect' : ''}>
      <div className="card-controls">
        <button onClick={toggleEditMode} className="edit-btn">
          <span className="edit-icon">✎</span> {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <div className="card-index">
          Card {currentIndex + 1} of {totalCards}
        </div>
      </div>

      {isEditing ? (
        <div className="edit-mode">
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="front">Front:</label>
              <textarea
                id="front"
                name="front"
                value={editData.front}
                onChange={handleChange}
                className="edit-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="back">Back:</label>
              <textarea
                id="back"
                name="back"
                value={editData.back}
                onChange={handleChange}
                className="edit-input"
              />
            </div>
            <div className="edit-buttons">
              <button onClick={saveCardEdits} className="save-btn">Save</button>
              <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <div className="card-front">{card.front}</div>
          <button onClick={toggleBack} className="toggle-back">
            {showBack ? 'Hide Answer' : 'Show Answer'}
          </button>
          {showBack && (
            <div className="card-back">{card.back}</div>
          )}
          
          {card.correct && (
            <div className={`card-status ${card.correct.toLowerCase()}`}>
              <p>Marked: {card.correct}</p>
              {card.response && <p>Your answer: {card.response}</p>}
            </div>
          )}
        </div>
      )}
    </CardDisplayContainer>
  );
};

const CardDisplayContainer = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  margin-bottom: 1.5rem;
  position: relative;
  border-left: 5px solid transparent;
  
  &.correct {
    border-left-color: ${({ theme }) => theme.correct};
  }
  
  &.incorrect {
    border-left-color: ${({ theme }) => theme.incorrect};
  }
  
  .card-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    .edit-btn {
      background-color: transparent;
      color: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.primary};
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      
      &:hover {
        background-color: ${({ theme }) => theme.primary};
        color: white;
      }
    }
    
    .card-index {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.text};
      opacity: 0.7;
    }
  }
  
  .view-mode {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .card-front {
      font-size: 1.3rem;
      min-height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      background-color: ${({ theme }) => theme.body};
      border-radius: 6px;
      white-space: pre-wrap;
    }
    
    .toggle-back {
      align-self: center;
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
    
    .card-back {
      font-size: 1.2rem;
      min-height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      background-color: ${({ theme }) => theme.body};
      border-radius: 6px;
      white-space: pre-wrap;
      animation: fadeIn 0.3s ease;
    }
    
    .card-status {
      margin-top: 1rem;
      padding: 0.8rem;
      border-radius: 4px;
      font-size: 0.9rem;
      
      &.correct {
        background-color: rgba(46, 204, 113, 0.1);
        border: 1px solid ${({ theme }) => theme.correct};
        
        p {
          color: ${({ theme }) => theme.correct};
        }
      }
      
      &.incorrect {
        background-color: rgba(231, 76, 60, 0.1);
        border: 1px solid ${({ theme }) => theme.incorrect};
        
        p {
          color: ${({ theme }) => theme.incorrect};
        }
      }
      
      p {
        margin: 0.3rem 0;
      }
    }
  }
  
  .edit-mode {
    animation: fadeIn 0.3s ease;
    
    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      label {
        font-weight: bold;
        color: ${({ theme }) => theme.text};
      }
    }
    
    .edit-input {
      width: 100%;
      min-height: 100px;
      padding: 0.8rem;
      font-size: 1rem;
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 4px;
      resize: vertical;
      background-color: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
    }
    
    .edit-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 0.8rem;
      margin-top: 0.5rem;
      
      button {
        padding: 0.6rem 1.2rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .save-btn {
        background-color: ${({ theme }) => theme.correct};
        color: white;
        
        &:hover {
          opacity: 0.9;
        }
      }
      
      .cancel-btn {
        background-color: ${({ theme }) => theme.incorrect};
        color: white;
        
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default CardDisplay;