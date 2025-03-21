'use client'
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { useEffect } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, err } = useAuth();
  const router = useRouter()
  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((value) => {
    signup(value);
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-zinc-900 max-w-md p-10 rounded-md">
        {err === '' ? null : 
          <div className="bg-red-600 text-white p-2">
            {err}
          </div>
        }
        <h1 className="text-3xl font-bold text-white p-10 text-center">
          Register
        </h1>

        <form onSubmit={onSubmit}>
          <p className="text-white"> Email</p>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <p className="text-white"> Password</p>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          <p className="text-white"> Password Confirm</p>
          <input
            type="password"
            {...register("password2", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password Confirm"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md my-2"
          >
            Register
          </button>
        </form>
        <p className="text-white my-2">
          {" "}
          Already have an account?
          <Link href="/login" className="text-sky-600 ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
