import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <span>
          <Logo />
        </span>
      </div>
      <h2>Sign up to create account</h2>
      <p>
        Already have an account?&nbsp;
        <Link to="/login" className="">
          Sign In
        </Link>
      </p>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit(create)}>
        <div className="">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            lable="Email"
            placeholeder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                  "Email address must be a valid address",
              },
            })} //name should be unique
          />
          <Input
            lable="Password"
            type="password"
            placeholeder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type='submit'>Sign Up</Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
