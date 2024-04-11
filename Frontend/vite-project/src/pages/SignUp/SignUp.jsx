import React, { useState } from "react";
import Genderchecckbox from "./Genderchecckbox";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp.js";

const SignUp = () => {
  const [input, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    gender: "",
  });

  const { loading, signup } = useSignUp();
  const handleCheckBox = (gender) => {
    setInputs({ ...input, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, username, password, email, gender } = input;
    await signup(fullname, username, password, email, gender);
    // setInputs(input);
    console.log(input, "button clicked");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            SignUp<span className="text-blue-500"> ChatApp</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Fullname</span>
              </label>
              <input
                type="text"
                placeholder="Enter the Fullname"
                className="w-full input input-bordered h-10"
                value={input.fullname}
                onChange={(e) =>
                  setInputs({ ...input, fullname: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter the Username"
                className="w-full input input-bordered h-10"
                value={input.username}
                onChange={(e) =>
                  setInputs({ ...input, username: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">email</span>
              </label>
              <input
                type="text"
                placeholder="Enter the email"
                className="w-full input input-bordered h-10"
                value={input.email}
                onChange={(e) => setInputs({ ...input, email: e.target.value })}
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="Password"
                placeholder="Enter the Password"
                className="w-full input input-bordered h-10"
                value={input.password}
                onChange={(e) =>
                  setInputs({ ...input, password: e.target.value })
                }
              />
              <Genderchecckbox
                onCheckBoxChange={handleCheckBox}
                selectedGender={input.gender}
              />
              <Link
                to="http://localhost:5000/login"
                className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
              >
                Already have an Account
              </Link>
              <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
