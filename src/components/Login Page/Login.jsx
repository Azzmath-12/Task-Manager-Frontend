import { useNavigate } from 'react-router-dom';
import { GoTasklist } from "react-icons/go";

function Login() {
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Navigate("/Home");
  }

  return (
    <>
      <div className="login-container">
        <h1><GoTasklist /> TaskFlow</h1>
        <p>Manage your tasks efficiently</p>
        <div className="login-form-container">
          <h2>Welcome</h2>
          <p>Sign in to your account or create a new one</p>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>User ID</label>
              <input type="email" placeholder="Enter user id" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;