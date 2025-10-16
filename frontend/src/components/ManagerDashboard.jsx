import React, { useState, useEffect } from 'react';
import './ManagerDashboard.css';

const ManagerDashboard = ({ managerId }) => {
  const [allocations, setAllocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (managerId) {
      fetchAllocations();
    }
  }, [managerId]);

  const fetchAllocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/allocations/${managerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch allocations');
      }
      const data = await response.json();
      setAllocations(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading allocations...</div>;
  }

  if (error) {
    return <div className="dashboard-error">Error: {error}</div>;
  }

  if (!allocations) {
    return null;
  }

  const { manager, teams, directReports, isHigherLevel } = allocations;

  return (
    <div className="manager-dashboard">
      <div className="dashboard-info">
        <h2>Manager: {manager.name}</h2>
        <p className="manager-level">
          {isHigherLevel ? 'Higher Level Manager' : 'Direct Manager'}
        </p>
      </div>

      {isHigherLevel && directReports.length > 0 && (
        <div className="direct-reports-section">
          <h3>Direct Reports (Managers)</h3>
          <div className="direct-reports-list">
            {directReports.map(report => (
              <div key={report.id} className="direct-report-card">
                <strong>{report.name}</strong>
                <span className="badge">Level {report.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="teams-section">
        <h3>Scrum Teams & Allocations</h3>
        {teams.length === 0 ? (
          <p className="no-teams">No scrum teams found for this manager.</p>
        ) : (
          <div className="teams-grid">
            {teams.map(team => (
              <div key={team.id} className="team-card">
                <div className="team-header">
                  <h4>{team.name}</h4>
                  <span className="team-id">{team.id}</span>
                </div>
                <div className="team-members">
                  <h5>Team Members</h5>
                  <table className="allocation-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Allocation %</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.members.map(member => (
                        <tr key={member.id}>
                          <td>{member.name}</td>
                          <td>
                            <div className="allocation-bar-container">
                              <div 
                                className="allocation-bar" 
                                style={{ width: `${member.allocation}%` }}
                              >
                                {member.allocation}%
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${
                              member.allocation === 100 ? 'full' : 
                              member.allocation >= 80 ? 'high' : 
                              member.allocation >= 50 ? 'medium' : 'low'
                            }`}>
                              {member.allocation === 100 ? 'Full Time' : 
                               member.allocation >= 80 ? 'Near Full' : 
                               member.allocation >= 50 ? 'Part Time' : 'Low'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
