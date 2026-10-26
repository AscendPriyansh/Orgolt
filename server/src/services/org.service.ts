import prisma from "../lib/prisma.js";
import type { CreateOrgInput, UpdateOrgInput } from "../validators/org.validator.js";

export const getOrgService = async (userId: string) => {
  const getOrg = await prisma.organization.findMany({
    where: {
      members: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      visibility: true,
      members: {
        select: {
          id: true
        }
      }
    }
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
        "ownerId": ownerId,
        "members": {
          connect: {
            id: ownerId
          }
        }
      },
      select: {
        name: true,
        description: true,
        visibility: true,
        members: {
          select: {
            id: true
          }
        }
      }
    });

    return createOrg;
}

export const updateOrgService = async (data: UpdateOrgInput, ownerId: string, orgId: string) => {
  const orgExists = await prisma.organization.findFirst({
    where: {
      id: orgId,
      ownerId
    },
    select: {
      id: true,
      name: true,
      description: true,
      visibility: true,
      members: {
        select: {
          id: true
        }
      }
    }
  });

  if (!orgExists) {
    throw new Error("Organization doesn't exist");
  }

  const updateOrg = await prisma.organization.update({
    where: {
      id: orgId
    },
    data: {
      name: data.name ?? orgExists.name,
      description: data.description ?? orgExists.description,
      visibility: data.visibility ?? orgExists.visibility
    }
  });

  return updateOrg;
}