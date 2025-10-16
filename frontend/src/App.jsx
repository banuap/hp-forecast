import React, { useState, useEffect } from 'react';
import ManagerDashboard from './components/ManagerDashboard';
import './App.css';

function App() {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await fetch('/api/managers');
      if (!response.ok) {
        throw new Error('Failed to fetch managers');
      }
      const data = await response.json();
      setManagers(data);
      // Set the first manager as default selection
      if (data.length > 0) {
        setSelectedManager(data[0].id);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleManagerChange = (e) => {
    setSelectedManager(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Manager Allocation Approval Dashboard</h1>
        <div className="manager-selector">
          <label htmlFor="manager-select">Select Manager: </label>
          <select 
            id="manager-select"
            value={selectedManager || ''} 
            onChange={handleManagerChange}
          >
            {managers.map(manager => (
              <option key={manager.id} value={manager.id}>
                {manager.name} (Level {manager.level})
              </option>
            ))}
          </select>
        </div>
      </header>
      {selectedManager && <ManagerDashboard managerId={selectedManager} />}
    </div>
  );
}

export default App;
