const LoginForm = (handleLogin) => {
  return (
    <>
      <h2>Log-in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default LoginForm;
