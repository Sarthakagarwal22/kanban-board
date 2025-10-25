import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

// Common utility for API calls using axios
export async function apiRequest(url, method = 'GET', data = null) {
  try {
    const response = await axios({
      url: baseURL + url,
      method,
      data,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'API request failed');
  }
}
