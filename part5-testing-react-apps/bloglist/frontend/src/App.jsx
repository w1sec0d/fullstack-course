import { useState } from "react";
import LoginForm from "./components/LoginForm";

const handleLogin = async () => {};

const App = () => {
  const [user, setUser] = useState(null);

  return user === null ? <LoginForm /> : <div></div>;
};

export default App;
