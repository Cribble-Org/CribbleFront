const { VITE_BACKEND_URL } = import.meta.env;

const config = {
  BASE_URL: VITE_BACKEND_URL || '',
};

export default config;