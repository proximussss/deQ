import React, { useState } from "react";
import styled from "styled-components";

const AddCardForm = ({ onAddCard }) => {
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  const { front, back } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!front || !back) {
      alert("Both front and back content are required!");
      return;
    }

    onAddCard(formData);
    setFormData({ front: "", back: "" });
  };

  return (
    <AddCardFormContainer>
      <h3>Add New Card</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front:</label>
          <textarea
            id="front"
            name="front"
            value={front}
            onChange={onChange}
            placeholder="Enter question or front content"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back:</label>
          <textarea
            id="back"
            name="back"
            value={back}
            onChange={onChange}
            placeholder="Enter answer or back content"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Card
        </button>
      </form>
    </AddCardFormContainer>
  );
};

const AddCardFormContainer = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  margin-top: 1rem;

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.primary};
  }

  .form-group {
    margin-bottom: 1rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    .form-input {
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
  }

  .submit-btn {
    width: 100%;
    padding: 0.8rem;
    background-color: ${({ theme }) => theme.secondary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: ${({ theme }) => theme.secondaryHover};
    }
  }
`;

export default AddCardForm;
