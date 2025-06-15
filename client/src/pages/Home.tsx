import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <h1 className="mb-3">Welcome to the App</h1>
      <p className="mb-4">Navigate to different sections</p>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Go to Login
        </button>
        <button className="btn btn-success" onClick={() => navigate('/signup')}>
          Go to Signup
        </button>
        <button className="btn btn-info" onClick={() => navigate('/profile')}>
          Go to Profile
        </button>
        <button className="btn btn-warning" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;
