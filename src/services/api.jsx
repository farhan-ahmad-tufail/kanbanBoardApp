// services/api.jsx
import axios from 'axios';

export const fetchKanbanData = async () => {
  try {
    const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
    return response.data;
  } catch (error) {
    console.error('Error fetching Kanban data', error);
    return [];
  }
};
