'use client'
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { useEffect } from "react";
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, err, isAuthenticated, loading } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((value) => {
    signin(value);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-zinc-900 max-w-md  w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold text-white p-10 text-center">
          Login
        </h1>

        <form onSubmit={onSubmit}>
          {err === '' ? null :
            <div className="text-red-600">
              {err}
            </div>
          }
          {loading === false ? null :
            <div className="text-white text-2xl w-full text-center">
              Authorizing...
              <br />
            </div>
          }
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
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md my-2"
          >
            Login
          </button>
        </form>
        <p className="text-white text-center my-2 ">
          {" "}
          Dont have an account?
          <Link href="/register" className="text-sky-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
