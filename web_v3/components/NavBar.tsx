import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const NavBar = () => {
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);
  const router = useRouter();

  return (
    <div className="navbar shadow-sm bg-white sticky top-0 z-10">
      <div className="sm:w-1/6">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-2xl text-rosa sm:mx-auto">
            kooki
          </a>
        </Link>
      </div>

      <div className="w-full">
        <form className="w-full mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-zine-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <button></button>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-black rounded-lg dark:bg-stone-100 bg-stone-100"
              placeholder="Search Recipes, Ingredients..."
              onChange={(e) => setSearchField(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              required
            />
          </div>
        </form>
      </div>
      <div className="justify-center w-1/3 md:w-1/6 grid grid-cols-2 content-evenly items-center">
        {/* <Link href="/grocery-list">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </button>
        </Link> */}
        <div className="dropdown dropdown-end mx-auto">
          <label tabIndex={0} className="btn btn-ghost btn-circle hover:glass ">
            <div className="w-6 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-white rounded-box w-52"
          >
            <li>
              <Link href="/notifications">
                <a>Notifications</a>
              </Link>
            </li>
            <li>
              <Link href="/saved-recipes">
                <a>Saved Recipes</a>
              </Link>
            </li>
            {/* <Link href="/grocery-list">
              <li>
                <a>Grocery List</a>
              </li>
            </Link> */}
            <li>
              <Link href="/create">
                <a>Create Recipe</a>
              </Link>
            </li>
            <div className="divide-y">
              <li>
                <Link href="/account/">
                  <a className="justify-between">
                    Account
                    <span className="badge">New</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <a>Help</a>
                </Link>
              </li>
            </div>
            <li>
              <Link href="/">
                <a onClick={() => signOut({ callbackUrl: "/" })}>Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;