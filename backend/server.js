const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock data structure representing the organization hierarchy
// In production, this would come from RAM (Resource Allocation Management) system
const mockData = {
  managers: [
    {
      id: 'M1',
      name: 'Sarah Johnson',
      level: 2, // Higher level manager
      reportsTo: null
    },
    {
      id: 'M2',
      name: 'Michael Chen',
      level: 1, // Direct manager
      reportsTo: 'M1'
    },
    {
      id: 'M3',
      name: 'Emily Rodriguez',
      level: 1, // Direct manager
      reportsTo: 'M1'
    }
  ],
  scrumTeams: [
    {
      id: 'T1',
      name: 'Alpha Team',
      managerId: 'M2',
      members: [
        { id: 'E1', name: 'John Doe', allocation: 100 },
        { id: 'E2', name: 'Jane Smith', allocation: 80 },
        { id: 'E3', name: 'Bob Wilson', allocation: 100 }
      ]
    },
    {
      id: 'T2',
      name: 'Beta Team',
      managerId: 'M2',
      members: [
        { id: 'E4', name: 'Alice Brown', allocation: 100 },
        { id: 'E5', name: 'Charlie Davis', allocation: 60 }
      ]
    },
    {
      id: 'T3',
      name: 'Gamma Team',
      managerId: 'M3',
      members: [
        { id: 'E6', name: 'David Lee', allocation: 100 },
        { id: 'E7', name: 'Emma White', allocation: 75 },
        { id: 'E8', name: 'Frank Miller', allocation: 100 }
      ]
    }
  ]
};

// Helper function to get manager by ID
function getManagerById(managerId) {
  return mockData.managers.find(m => m.id === managerId);
}

// Helper function to get all managers reporting to a specific manager
function getDirectReports(managerId) {
  return mockData.managers.filter(m => m.reportsTo === managerId);
}

// Helper function to get all teams for a manager (including indirect reports)
function getTeamsForManager(managerId) {
  const manager = getManagerById(managerId);
  if (!manager) return [];

  // Get teams directly managed by this manager
  let teams = mockData.scrumTeams.filter(t => t.managerId === managerId);

  // If this is a higher-level manager, also get teams from their direct reports
  const directReports = getDirectReports(managerId);
  directReports.forEach(report => {
    const reportTeams = mockData.scrumTeams.filter(t => t.managerId === report.id);
    teams = teams.concat(reportTeams);
  });

  return teams;
}

// API endpoint to get managers list
app.get('/api/managers', (req, res) => {
  res.json(mockData.managers);
});

// API endpoint to get allocation data for a specific manager
app.get('/api/allocations/:managerId', (req, res) => {
  const { managerId } = req.params;
  
  const manager = getManagerById(managerId);
  if (!manager) {
    return res.status(404).json({ error: 'Manager not found' });
  }

  const teams = getTeamsForManager(managerId);
  const directReports = getDirectReports(managerId);

  res.json({
    manager: {
      id: manager.id,
      name: manager.name,
      level: manager.level
    },
    teams: teams,
    directReports: directReports,
    isHigherLevel: directReports.length > 0
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
