import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { jumpToCard } from "../../actions/card";

const CardList = ({ cards }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleCardClick = (cardId) => {
    dispatch(jumpToCard(cardId));
  };

  const filteredCards = cards.filter((card) =>
    card.front.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <CardListContainer>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="card-list">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <div
              key={card.id}
              className={`card-item ${card.correct ? card.correct.toLowerCase() : ""}`}
              onClick={() => handleCardClick(card.id)}
            >
              <span className="card-number">{index + 1}</span>
              <span className="card-text">{card.front}</span>
              <span className="card-status">
                {card.correct === "Correct" && "✓"}
                {card.correct === "Incorrect" && "✗"}
              </span>
            </div>
          ))
        ) : (
          <div className="no-cards">
            {searchTerm ? "No cards match your search" : "No cards available"}
          </div>
        )}
      </div>
    </CardListContainer>
  );
};

const CardListContainer = styled.div`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadow};

  .search-container {
    margin-bottom: 1rem;

    .search-input {
      width: 100%;
      padding: 0.8rem;
      font-size: 0.9rem;
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 4px;
      background-color: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
    }
  }

  .card-list {
    max-height: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    /* Scrollbar styling */
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.body};
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.primary};
      border-radius: 4px;
    }
  }

  .card-item {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.body};
    cursor: pointer;
    transition: background-color 0.2s;
    border-left: 3px solid transparent;

    &:hover {
      background-color: ${({ theme }) => theme.headerBg};
    }

    &.correct {
      border-left-color: ${({ theme }) => theme.correct};
    }

    &.incorrect {
      border-left-color: ${({ theme }) => theme.incorrect};
    }

    .card-number {
      min-width: 30px;
      color: ${({ theme }) => theme.text};
      opacity: 0.7;
      font-size: 0.9rem;
    }

    .card-text {
      flex: 1;
      margin: 0 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .card-status {
      width: 20px;
      text-align: center;
      font-weight: bold;

      &.correct {
        color: ${({ theme }) => theme.correct};
      }

      &.incorrect {
        color: ${({ theme }) => theme.incorrect};
      }
    }
  }

  .no-cards {
    padding: 1.5rem;
    text-align: center;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
  }
`;

export default CardList;
