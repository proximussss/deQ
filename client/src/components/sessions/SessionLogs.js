import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getSessions } from '../../actions/session';

const SessionLogs = () => {
  const dispatch = useDispatch();
  const { sessions, loading } = useSelector(state => state.session);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  if (loading) {
    return <div className="loading-spinner">Loading session logs...</div>;
  }

  return (
    <SessionLogsContainer>
      <div className="header">
        <h2>Session Logs</h2>
        <Link to="/modules" className="back-link">Back to Modules</Link>
      </div>
      
      {sessions.length > 0 ? (
        <div className="logs-table-container">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Module</th>
                <th>Session</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(log => (
                <tr key={log.id}>
                  <td>{new Date(log.date).toLocaleDateString()}</td>
                  <td>{log.time}</td>
                  <td>{log.module}</td>
                  <td>{log.sessionNum}</td>
                  <td>{log.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-logs">No session logs available</p>
      )}
    </SessionLogsContainer>
  );
};

const SessionLogsContainer = styled.div`
  margin: 2rem 0;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    h2 {
      color: ${({ theme }) => theme.primary};
    }
    
    .back-link {
      background-color: ${({ theme }) => theme.primary};
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
      
      &:hover {
        background-color: ${({ theme }) => theme.primaryHover};
      }
    }
  }
  
  .logs-table-container {
    background-color: ${({ theme }) => theme.cardBg};
    border-radius: 8px;
    padding: 1rem;
    box-shadow: ${({ theme }) => theme.shadow};
    overflow-x: auto;
  }
  
  .logs-table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 0.8rem;
      text-align: left;
      border-bottom: 1px solid ${({ theme }) => theme.border};
    }
    
    th {
      font-weight: bold;
      color: ${({ theme }) => theme.primary};
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    tbody tr {
      transition: background-color 0.2s;
      
      &:hover {
        background-color: ${({ theme }) => theme.body};
      }
    }
  }
  
  .no-logs {
    text-align: center;
    padding: 2rem;
    background-color: ${({ theme }) => theme.cardBg};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;

export default SessionLogs;