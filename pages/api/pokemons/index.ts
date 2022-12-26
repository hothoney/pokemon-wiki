import type { NextApiRequest, NextApiResponse } from "next";
import { Pokemon, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface BaseResponse<T> {
  data: T;
  success: boolean;
  msg?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseResponse<Pokemon[] | null>>
) {
  if (req.method === "GET") {
    const pokemon = await prisma.pokemon.findMany({});
    return res.json({
      data: pokemon,
      success: true,
    });
  }
  if (req.method === "POST") {
    const result = await prisma.pokemon.create({
      data: req.body,
    });
    if (result) {
      return res.status(201).json({
        data: null,
        success: true,
      });
    }
  }
}
