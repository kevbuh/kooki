import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method not allowed" });
  }

  const { recipeId, userEmail } = JSON.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  const saveRecipe = await prisma.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      likedBy: {
        connect: {
          id: user?.id,
        },
      },
      numSaves: {
        increment: 1,
      },
      // authorId: user?.id as string, // this need to be dynamically read
    },
  });

  return saveRecipe;
};