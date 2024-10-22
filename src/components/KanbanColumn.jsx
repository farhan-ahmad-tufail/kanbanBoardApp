import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanColumn.css';

const KanbanColumn = ({ group, tickets, users, groupBy }) => {

  const getColumnTitle = () => {
    if (groupBy === 'user') {
      const user = users.find(u => u.id === group);
      return user ? user.name : 'Unknown User';
    }
    if (group === '0') return 'No priority';
    if (group === '1') return 'Low';
    if (group === '2') return 'Medium';
    if (group === '3') return 'High';
    if (group === '4') return 'Urgent';
    return group;
  };

  const getTicketCount = () => tickets.length;

  const getColumnIcon = () => {
    if (groupBy === 'user') {
      const user = users.find(u => u.id === group);
      return user && user.avatar ? (
        <img src={user.avatar} alt={user.name} className="user-avatar" />
      ) : null;
    }
    return null;
  };

  return (
    <div className="kanban-column">
      <div className="column-header">
        {getColumnIcon()}
        <h2>{getColumnTitle()}</h2>
        <span className="ticket-count">{getTicketCount()}</span>
      </div>
      <div className="column-content">
        {tickets.map(ticket => (
          <KanbanCard key={ticket.id} ticket={ticket} users={users} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;