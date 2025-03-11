export const setAccessToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('authToken');
};

export const clearStorageData = () => {
  localStorage.clear()
};