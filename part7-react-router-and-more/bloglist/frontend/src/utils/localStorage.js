export const getUserFromLocalStorage = () => {
  const user = window.localStorage.getItem('bloglistAppUser');
  return user ? JSON.parse(user) : null;
};

export const setUserToLocalStorage = (user) => {
  window.localStorage.setItem('bloglistAppUser', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  window.localStorage.removeItem('bloglistAppUser');
};