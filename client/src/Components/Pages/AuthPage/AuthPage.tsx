import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

import Input from "../../UI/Input/Input";
import BtnOne from "../../UI/BtnOne/BtnOne";

import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import type {
  AuthForm,
  AuthResponse,
  UserData,
} from "../../../Types/Auth.Types";

import axios from "axios";

import "./AuthPage.css";

function AuthPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const title: string =
    useLocation().pathname === "/login" ? "Login" : "Sign Up";

  const authSetUser = useContext(AuthContext)?.setUser as React.Dispatch<
    React.SetStateAction<UserData | null>
  >;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AuthForm>();

  useEffect(() => {
    setLoading(false);
    setError(null);
    reset();
  }, [title]);

  async function onFormSubmit(data: AuthForm): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const auth = await axios.post<AuthResponse>(
        `http://localhost:3000/${title === "Login" ? "Login" : "Signup"}`,
        data,
        { withCredentials: true },
      );
      setLoading(false);

      if (auth.status === 200 && auth.data.user) {
        authSetUser?.(auth.data.user);
        navigate("/");
      }

      reset();
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="AuthPage">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {title === "Sign Up" && (
          <>
            <Input
              Register={register}
              Type="text"
              Name="FirstName"
              Placeholder="First Name"
              Label="First Name"
              Rules={{
                required: "First Name is required",
                minLength: { value: 3, message: "Too short" },
                maxLength: { value: 20, message: "Too long" },
                pattern: {
                  value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
                  message: "Invalid characters",
                },
                validate: (v: string) =>
                  v.trim().length > 0 || "Cannot be empty",
              }}
              Error={errors.FirstName?.message}
            />

            <Input
              Register={register}
              Type="text"
              Name="LastName"
              Placeholder="Last Name"
              Label="Last Name"
              Rules={{
                required: "First Name is required",
                minLength: { value: 3, message: "Too short" },
                maxLength: { value: 20, message: "Too long" },
                pattern: {
                  value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
                  message: "Invalid characters",
                },
                validate: (v: string) =>
                  v.trim().length > 0 || "Cannot be empty",
              }}
              Error={errors.LastName?.message}
            />
          </>
        )}

        <Input
          Register={register}
          Type="email"
          Name="Email"
          Placeholder="Email"
          Label="Email"
          Rules={{
            required: "Email is required",
            maxLength: { value: 254, message: "Email too long" },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              message: "Invalid email format",
            },
            validate: (v: string) => v.trim() === v || "No spaces at start/end",
          }}
          Error={errors.Email?.message}
        />

        <Input
          Register={register}
          Type="password"
          Name="Password"
          Placeholder="Password"
          Label="Password"
          Rules={{
            required: "Password is required",
            minLength: { value: 10, message: "Minimum 10 characters" },
            maxLength: { value: 50, message: "Too long" },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              message: "Use upper, lower, number, and symbol",
            },
            validate: (v: string) => v.trim() === v || "No spaces at start/end",
          }}
          Error={errors.Password?.message}
        />

        <BtnOne type="submit" text={title} isDisabled={loading || !isValid} />

        {loading && <p>Loading...</p>}
        {error && <p className="Error">{error}</p>}
      </form>

      {!loading && (
        <>
          {title === "Sign Up" ? (
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          ) : (
            <p>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default AuthPage;
