import { apiRequest } from './http';

export async function fetchBoards() {
  return await apiRequest('/board/v1/getAll', 'GET');
}

export async function createBoard(data) {
  return await apiRequest('/board/v1/create', 'POST', data);
}
