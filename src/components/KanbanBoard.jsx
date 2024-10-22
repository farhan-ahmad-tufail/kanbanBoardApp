import React from 'react';
import KanbanColumn from './KanbanColumn';

const sortTickets = (tickets, sortBy) => {
  if (sortBy === 'priority') {
    return [...tickets].sort((a, b) => b.priority - a.priority);
  } else if (sortBy === 'title') {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets;
};

const groupTickets = (tickets, groupBy) => {
    const groups = {};
  
    tickets.forEach(ticket => {
      let key;
      if (groupBy === 'status') {
        key = ticket.status;
      } else if (groupBy === 'user') {
        key = ticket.userId; 
      } else if (groupBy === 'priority') {
        key = ticket.priority;
      }
  
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
    });
  
    return groups;
  };


const KanbanBoard = ({ tickets, groupBy, sortBy, users }) => {
  
    const groupedTickets = groupTickets(tickets, groupBy);
    const sortedGroupedTickets = Object.keys(groupedTickets).map(group => ({
      group,
      tickets: sortTickets(groupedTickets[group], sortBy),
    }));
  
    return (
      <div className="kanban-board">
        {sortedGroupedTickets.map(column => (
          <KanbanColumn
            key={column.group}
            group={column.group}
            tickets={column.tickets}
            users={users}  
            // onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    );
  };
  
  export default KanbanBoard;
  


