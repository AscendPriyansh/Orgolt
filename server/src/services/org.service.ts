import prisma from "../lib/prisma.js";
import type { CreateOrgInput } from "../validators/org.validator.js";

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

export const createOrgService = async (data: CreateOrgInput, ownerId: string) => {
    const { name, description, visibility } = data;

    const orgExists = await prisma.organization.findFirst({
        where: {
            "name": data.name
        },
        select : {
          name: true,
          description: true,
          visibility: true
        }
    });

    if(orgExists) {
      throw new Error("Organization already Exists");
    }

    const createOrg = await prisma.organization.create({
      data : {
        "name": name,
        "description": description || "",
        "visibility": visibility,
        "ownerId": ownerId
      }
    });

    return createOrg;
}
