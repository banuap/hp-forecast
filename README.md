# HP Forecast - Manager Allocation Approval

A web application for managers to approve allocation data for their scrum teams. Built with React and Node.js.

## Features

- **Manager-Specific Views**: Managers can only see data for scrum teams that report directly to them
- **Hierarchical Access**: Higher-level managers can view allocations and team members for scrum teams that report to their direct reports
- **Team Allocation Display**: Visual representation of team member allocations with color-coded status indicators
- **Real-time Data**: Dynamic data fetching from the backend API

## Architecture

### Backend (Node.js + Express)
- REST API endpoints for manager and allocation data
- Hierarchical data filtering based on manager levels
- Mock data structure simulating Resource Allocation Management (RAM) system

### Frontend (React + Vite)
- Modern React application with hooks
- Manager dashboard with team allocation visualization
- Responsive design for various screen sizes

## Project Structure

```
hp-forecast/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ManagerDashboard.jsx
│   │   │   └── ManagerDashboard.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json       # Frontend dependencies
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hp-forecast
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

#### Quick Start (Recommended)

**Linux/Mac:**
```bash
./start.sh
```

**Windows:**
```bash
start.bat
```

These scripts will automatically install dependencies and start both servers.

#### Manual Start

1. Start the backend server (from the `backend` directory):
```bash
npm start
```
The server will run on http://localhost:5000

2. In a new terminal, start the frontend development server (from the `frontend` directory):
```bash
npm run dev
```
The application will open at http://localhost:3000

### Using the Application

1. **Select a Manager**: Use the dropdown menu in the header to select a manager
2. **View Teams**: The dashboard will display all scrum teams visible to the selected manager
3. **Check Allocations**: Review team member allocations displayed as percentage bars with status indicators:
   - **Full Time** (100%): Green
   - **Near Full** (80-99%): Light green
   - **Part Time** (50-79%): Orange
   - **Low** (<50%): Red
4. **Higher-Level Managers**: If the selected manager has direct reports, those managers will be displayed at the top of the dashboard

## API Endpoints

### GET /api/managers
Returns a list of all managers in the system.

**Response:**
```json
[
  {
    "id": "M1",
    "name": "Sarah Johnson",
    "level": 2,
    "reportsTo": null
  }
]
```

### GET /api/allocations/:managerId
Returns allocation data for a specific manager, including their teams and direct reports.

**Response:**
```json
{
  "manager": {
    "id": "M1",
    "name": "Sarah Johnson",
    "level": 2
  },
  "teams": [...],
  "directReports": [...],
  "isHigherLevel": true
}
```

## Data Model

### Manager Hierarchy
- **Level 1**: Direct managers who manage scrum teams
- **Level 2**: Higher-level managers who manage other managers

### Scrum Teams
Each team contains:
- Team ID and name
- Manager ID (who the team reports to)
- List of team members with allocation percentages

## Future Enhancements

- Integration with actual RAM (Resource Allocation Management) system
- User authentication and authorization
- Ability to approve/reject allocations
- Historical allocation tracking
- Export functionality for reports
- Email notifications for allocation changes
- Advanced filtering and search capabilities

## License

ISC

