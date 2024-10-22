
import React from 'react';
import './KanbanCard.css';

const KanbanCard = ({ ticket, users, onStatusChange }) => {
  const user = users.find(u => u.id === ticket.userId);

  const getPriorityIcon = () => {
    switch (ticket.priority) {
      case 0: return '---';
      case 1: return '▼';
      case 2: return '●';
      case 3: return '▲';
      case 4: return '⚡';
      default: return '';
    }
  };

  const getPriorityClass = () => {
    return `priority-${ticket.priority}`;
  };

  const getStatusIcon = () => {
    switch (ticket.status) {
      case 'Done': return '✓';
      case 'Canceled': return '✕';
      default: return '';
    }
  };

  const handleClick = () => {
    if (ticket.status !== 'Done' && ticket.status !== 'Canceled') {
      onStatusChange(ticket.id, 'Done');
    }
  };

  return (
    <div 
      className={`kanban-card ${ticket.status.toLowerCase()}`} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        {user && <img src='https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' alt={user.name} className="user-avatar" />}
      </div>
      <h3 className="card-title">{ticket.title}</h3>
      <div className="card-footer">
        <span className={`priority-icon ${getPriorityClass()}`}>{getPriorityIcon()}</span>
        <span className="feature-tag">Feature Request</span>
        {getStatusIcon() && <span className="status-icon">{getStatusIcon()}</span>}
      </div>
    </div>
  );
};

export default KanbanCard;