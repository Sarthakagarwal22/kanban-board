export async function deleteList(listId) {
  return await apiRequest(`/list/v1/delete/${listId}`, 'DELETE');
}
export async function createList(data) {
  return await apiRequest('/list/v1/create', 'POST', data);
}
import { apiRequest } from './http';

export async function fetchListsWithTasks(boardId) {
  // boardId should be passed from KanbanBoard
  return await apiRequest(`/list/v1/getAll/${boardId}`, 'GET');
}

export async function moveTask(taskId, toListId, position) {
  return await apiRequest('/task/v1/move', 'PATCH', { taskId, toListId, position });
}
