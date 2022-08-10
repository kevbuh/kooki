import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      <div className="px-3">
        <div className="dropdown md:dropdown-right w-full">
          <button
            tabIndex={0}
            className="rounded-xl hover:bg-rosa hover:text-white font-semibold py-3 mt-2.5 text-xl w-full bg-stone-100 "
          >
            Create
          </button>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 px-8 shadow bg-white rounded-box w-60"
          >
            <li>
              <Link href="/create">
                <a>Create Recipe</a>
              </Link>
            </li>
            <li>
              <Link href="/create-category">
                <a>Create Playlist</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 my-4 mx-2">
        <Link href="/explore">
          <button
            className={
              router.pathname == "/explore"
                ? "p-2 rounded-xl bg-rosa font-medium m-1 text-white"
                : "p-2 rounded-xl bg-stone-100 font-medium m-1"
            }
          >
            Recipes
          </button>
        </Link>
        <Link href="/playlists">
          <button
            className={
              router.pathname == "/playlists"
                ? "p-2 rounded-xl bg-rosa font-medium m-1 text-white"
                : "p-2 rounded-xl bg-stone-100 font-medium m-1"
            }
          >
            Playlists
          </button>
        </Link>

        <Link href="/ingredients">
          <button
            className={
              router.pathname == "/ingredients"
                ? "p-2 rounded-xl bg-rosa font-medium m-1 text-white"
                : "p-2 rounded-xl bg-stone-100 font-medium m-1"
            }
          >
            Ingredients
          </button>
        </Link>
        {/* </Link> */}
        <Link href="/categories">
          <button
            className={
              router.pathname == "/categories"
                ? "p-2 rounded-xl bg-rosa font-medium m-1 text-white"
                : "p-2 rounded-xl bg-stone-100 font-medium m-1"
            }
          >
            Categories
          </button>
        </Link>
      </div>
      {!session && (
        <div className="px-3">
          <hr />
          <p className="text-gray-500 font-semibold text-sm mt-4">
            Log in to follow creators, like videos, and view comments.
          </p>
          <button
            className=" text-rosa border-2 border-rosa hover:bg-rosa rounded-xl p-2 w-full font-semibold hover:text-white mt-2 mb-4"
            onClick={() => router.push("/signup")}
          >
            Log in
          </button>
        </div>
      )}
      <div className="px-3">
        <hr />
      </div>
      <div className="px-3 mt-4 flex flex-wrap">
        <button className="p-2 rounded-xl bg-stone-100 font-medium mr-1 my-1">
          Breakfast
        </button>
        <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
          Lunch
        </button>
        <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
          Dinner
        </button>
        <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
          Snacks
        </button>
        <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
          Drinks
        </button>
      </div>
      <div className="px-3 pt-3">
        <hr />
      </div>
      <div className="collapse collapse-arrow ">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Ingredients</div>
        <div className="collapse-content ">
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Steak
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Onions
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Fish
          </button>
          <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
            Papaya
          </button>
        </div>
      </div>
      {/* <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
          Most Popular
        </button>
        <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
          Experimental
        </button>
        <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
          Trending
        </button>
        <button className="p-2 rounded-xl bg-stone-100 font-medium m-1">
          New
        </button> */}
    </div>
  );
}

export default Sidebar;
