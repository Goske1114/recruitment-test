import React from "react";
import Link from 'next/link'
import { useAuth } from "../context/AuthContext";
import { useExoplanets } from "../context/ExoplanetsContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { pattern, changePattern, err } = useExoplanets()
  return (
    <nav className="bg-zinc-700 flex-col justify-between py-5 px-10 items-center justify-center">
      <div className="flex justify-between lg:flex-row flex-col items-center justify-center">
        <Link href={isAuthenticated ? "/" : "/login"}>
          {" "}
          <h1 className="text-2xl font-bold">Exoplanets Manager </h1>
        </Link>
        {!isAuthenticated ? null : 
          <input 
            type='text' 
            value={pattern}
            onChange={e => changePattern(e.target.value)}
            placeholder='Search here...' 
            className="flex-grow lg:mr-10 lg:ml-10 md:mb-3 md:mt-3"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: 3,
              outline: 'none',
              marginRight:10,
            }}
          />
        }
        {!isAuthenticated ? null :
          <span className="font-bold lg:mr-10 lg:ml-10 md:mb-3 md:mt-3"> 
            {user.username}
          </span>
        }
        <ul className="flex gap-x-2 flex-wrap items-center justify-center">
          {isAuthenticated ? (
            <div className="flex flex-row flex-wrap flex-grow justify-center">
              <div className="flex">
                <li className="hover:text-sky-200">
                  <Link href="/" className="bg-indigo-500 px-4 py-1 rounded-sm">
                    Home
                  </Link>
                </li>
                <li className="hover:text-sky-200">
                  <Link
                    href="/Exoplanet-new"
                    className="bg-indigo-500 px-4 py-1 rounded-sm"
                  >
                    New
                  </Link>
                </li>
              </div>
              <div className="flex">
                <li className="hover:text-sky-200">
                  <Link
                    href="/profile"
                    className="bg-indigo-500 px-4 py-1 rounded-sm"
                  >
                    Profile
                  </Link>
                </li>
                <li className="hover:text-sky-200">
                  <Link
                    href="/"
                    onClick={() => logout()}
                    className="bg-red-500 px-4 py-1 rounded-sm"
                  >
                    logout
                  </Link>
                </li>
              </div>
            </div>
          ) : (
            <>
              <li className="hover:text-sky-600">
                <Link href="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                  Login
                </Link>
              </li>
              <li className="hover:text-sky-600">
                <Link
                  href="/register"
                  className="bg-indigo-500 px-4 py-1 rounded-sm"
                >
                  register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      { err === '' ? null : 
        <div className="mt-6 text-center text-red-400 text-xl">
          {err}
        </div>
      }
    </nav>
  );
}

export default Navbar;
