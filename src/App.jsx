import React, { useEffect, useState } from 'react';
import { fetchKanbanData } from './services/api';
import KanbanBoard from './components/KanbanBoard';
import './App.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsSliders2 } from "react-icons/bs";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]); 
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const loadTickets = async () => {
      const data = await fetchKanbanData();

      
      setTickets(Array.isArray(data.tickets) ? data.tickets : []);
      setUsers(Array.isArray(data.users) ? data.users : []); 
    };

    loadTickets();
  }, []);

  return (
    <div className="App">
      <header>
        <button
          className="display-btn"
          onClick={() => setShowControls(!showControls)}
        >
          <BsSliders2 className="icon-left" />
          Display
          <RiArrowDropDownLine className="icon-right" />
        </button>

      
        {showControls && (
          <div className="controls">
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="status">Group by Status</option>
              <option value="user">Group by User</option>
              <option value="priority">Group by Priority</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        )}
      </header>

      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;


