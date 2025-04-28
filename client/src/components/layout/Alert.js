import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Alert = () => {
  const alerts = useSelector(state => state.alert);

  return (
    <AlertContainer>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.msg}
          </div>
        ))}
    </AlertContainer>
  );
};

const AlertContainer = styled.div`
  margin: 1rem 0;
  
  .alert {
    padding: 0.8rem;
    margin: 0.5rem 0;
    opacity: 0.9;
    border-radius: 4px;
  }
  
  .alert-success {
    background-color: ${({ theme }) => theme.correct};
    color: #fff;
  }
  
  .alert-danger {
    background-color: ${({ theme }) => theme.incorrect};
    color: #fff;
  }
  
  .alert-info {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

export default Alert;