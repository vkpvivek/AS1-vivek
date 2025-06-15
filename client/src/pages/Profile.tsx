
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../utils/api';

// const Profile = () => {
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await API.get('/user/me');
//         setUser(res.data);
//       } catch {
//         alert('Unauthorized or session expired');
//         navigate('/login');
//       }
//     };

//     fetchUser();
//   }, []);

//   if (!user) return <div className="container mt-5">Loading...</div>;

//   return (
//     <div className="container mt-5">
//       <div className="card p-4">
//         <h3 className="mb-3">Welcome, {user.name}!</h3>
//         <p><strong>Email:</strong> {user.email}</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Profile = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/user/me');
        setUser(res.data);
      } catch {
        alert('Unauthorized or session expired');
        navigate('/login');
      }
    };

    fetchUser();
  }, []);

  const handleRateLimitClick = async () => {
    try {
      const res = await API.get('/user/me');
      setTestResults(prev => [...prev, `Request ${clickCount + 1}: ✅ Success`]);
    } catch (err: any) {
      if (err.response?.status === 429) {
        setTestResults(prev => [
          ...prev,
          `Request ${clickCount + 1}: ❌ Rate limit hit - ${err.response.data.message}`,
        ]);
      } else {
        setTestResults(prev => [...prev, `Request ${clickCount + 1}: ❌ Error`]);
      }
    }
    setClickCount(prev => prev + 1);
  };

  if (!user) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h3 className="mb-3">Welcome, {user.name}!</h3>
        <p><strong>Email:</strong> {user.email}</p>

        <hr />

        <h5>Rate Limiter Manual Test</h5>
        <button
          className="btn btn-outline-primary mb-3"
          onClick={handleRateLimitClick}
          disabled={clickCount >= 12}
        >
          Make API Request ({clickCount}/12)
        </button>

        <ul className="list-group">
          {testResults.map((result, index) => (
            <li key={index} className="list-group-item">
              {result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
