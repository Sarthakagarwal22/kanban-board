import { apiRequest } from './http';

export async function getTasks(listId) {
  // Fetch all tasks for a list
  return await apiRequest(`/task/v1/getAll/${listId}`, 'GET');
}

export async function createTask(data) {
  // data should include listId, title, description, position, etc.
  return await apiRequest('/task/v1/create', 'POST', data);
}

export async function updateTask(taskId, data) {
  // data should include updated fields
  return await apiRequest('/task/v1/update', 'PATCH', { taskId, ...data });
}

export async function deleteTask(taskId) {
  return await apiRequest('/task/v1/delete', 'DELETE', { taskId });
}

export async function moveTask(taskId, toListId, position) {
  return await apiRequest('/task/v1/move', 'PATCH', { taskId, toListId, position });
}
