import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (fullname, username, password, email, gender) => {
    const success = handleInputErrors({
      fullname,
      username,
      password,
      email,
      gender,
    });
    if (!success) return;
    setloading(true);
    try {
      const res = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, password, email, gender }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));

      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;

function handleInputErrors({ fullname, username, password, email, gender }) {
  if (!fullname || !username || !password || !email || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 charcaters");
    return false;
  }

  return true;
}
