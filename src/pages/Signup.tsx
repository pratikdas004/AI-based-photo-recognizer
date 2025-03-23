
import axios from "axios";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";




const SignupPage: React.FC  = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleSignup = async () => {
    if (!name ||!email || !password || !confirmPassword || !agreed) {
      setError("Please fill all fields and accept Terms & Conditions");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="border border-gray-600 rounded-lg p-8 w-96 text-center">
        <h2 className="text-xl font-bold mb-6 font-handwriting">Create an Account</h2>
        
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <InputField type="name" placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField type="email" placeholder="Email Address*" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField type="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} />
        <InputField type="password" placeholder="Confirm Password*" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        
        <div className="flex items-center justify-start w-full text-left mb-3">
        <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="mr-2 w-4 h-4" />
        <label className="text-white text-sm">
    By creating an account, you agree with our 
    <a href="#" className="text-blue-400 ml-1">Terms & Conditions</a>
  </label>
</div>
<Button label="Sign Up" onClick={handleSignup} size="large" />

        <span className="block text-sm mb-3">or</span>
        <Button label="Sign Up with Google" onClick={() => console.log("Google Sign Up")} variant="secondary" icon={<FcGoogle />} size="large"/>
        <p className="text-sm mt-4">
          Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
