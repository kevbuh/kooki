import { unstable_getServerSession } from "next-auth/next";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../utils/prisma";
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import RecipeCard from "../components/RecipeCard";

const SavedRecipesPage: NextPage = ({
  session,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <NavBar />
      <div className="mt-8 rounded-lg w-2/3 item-center mx-auto">
        <div>
          <p className="text-4xl mb-2">Saved Recipes</p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {data?.savedRecipes?.map((d: any, index: number) => {
            return (
              <RecipeCard
                key={index}
                name={d.name}
                author={d.authorId}
                // rating={d.avgRating ? d.avgRating?.toFixed(2) : null}
                cook_time={d.cookTime}
                caption={d.caption}
                id={d.id}
                // image={
                //   d.featured_image !== null && d.featured_image !== undefined
                //     ? API_URL + d.featured_image?.url.split("?")[0]
                //     : null
                // }
              />
            );
          })}
        </div>

        <div className="h-40"></div>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const savedRecipes = await prisma?.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      savedRecipes: true,
    },
  });

  return {
    props: {
      session: session,
      data: JSON.parse(JSON.stringify(savedRecipes)),
    },
  };
}

export default SavedRecipesPage;