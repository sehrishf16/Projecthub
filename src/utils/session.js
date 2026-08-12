const SESSION_KEY = "projecthub_session";

export const loginUser = (user) => {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      isAuthenticated: true,
      user,
    }),
  );
};

export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getSession = () => {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session);
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

export const isAuthenticated = () => {
  const session = getSession();

  return Boolean(session?.isAuthenticated);
};

export const getCurrentUser = () => {
  const session = getSession();

  return session?.user || null;
};
