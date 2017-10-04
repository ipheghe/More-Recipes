const initialState = {
  isAuthenticated: !!localStorage.getItem('token')
};

export default initialState;