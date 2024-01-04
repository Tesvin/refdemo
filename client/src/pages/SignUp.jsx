import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-green-900 text-3xl text-center font-bold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} 
      className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="firstname"
          className="border p-3 rounded-lg"
          id="firstname"
          onChange={handleChange}
        />
        
        <input
          type="text"
          placeholder="lastname"
          className="border p-3 rounded-lg"
          id="lastname"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        
        <button
          disabled={loading}
          className="bg-green-900 font-bold text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-[#0a192f]">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-[#0a192f] font-bold">Sign in</span>
        </Link>
        {/* <Link to={"/sign-in"}>
          <span className="p-6 text-red-300">forgoten password?</span>
        </Link> */}
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}