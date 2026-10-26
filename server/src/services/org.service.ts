import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const getOrgService = async (userId: string) => {
  const getOrg = await prisma.organization.findMany({
    where: {
      members: {
        some: {
          id: userId,
        },
      },
    },
  });

  return getOrg;
};
