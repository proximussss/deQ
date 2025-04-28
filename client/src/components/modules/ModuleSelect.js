import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getModules } from "../../actions/module";

const ModuleSelect = () => {
  const dispatch = useDispatch();
  const { modules, loading } = useSelector((state) => state.module);

  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  if (loading) {
    return <div className="loading-spinner">Loading modules...</div>;
  }

  return (
    <ModuleSelectContainer>
      <h2>Select a Module</h2>
      <div className="module-grid">
        {modules.length > 0 ? (
          modules.map((module) => (
            <Link
              to={`/module/${module.id}`}
              key={module.id}
              className="module-card"
            >
              {module.name}
            </Link>
          ))
        ) : (
          <p>No modules available</p>
        )}
      </div>
    </ModuleSelectContainer>
  );
};

const ModuleSelectContainer = styled.div`
  margin: 2rem 0;

  h2 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.primary};
    text-align: center;
  }

  .module-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .module-card {
    background-color: ${({ theme }) => theme.cardBg};
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    box-shadow: ${({ theme }) => theme.shadow};
    transition:
      transform 0.3s,
      box-shadow 0.3s;
    color: ${({ theme }) => theme.primary};
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  }
`;

export default ModuleSelect;
