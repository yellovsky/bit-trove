export const getApiHost = () => {
  try {
    return process.env.API_HOST;
  } catch {
    return typeof window === undefined ? undefined : window.ENV?.API_HOST;
  }
};

export const getClientHost = () => {
  try {
    return process.env.CLIENT_HOST;
  } catch {
    return typeof window === undefined ? undefined : window.location.origin;
  }
};
