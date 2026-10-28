import type { ListCreateInput } from "../../generated/prisma/models.js";
import prisma from "../lib/prisma.js";

export const getListService = async (orgId: string, boardId: string, userId: string) => {
    const orgExists = await prisma.organization.findUnique({
        where: {
            id: orgId
        }
    });

    if(!orgExists) {
        throw new Error("Organization doesn't exist");
    }

    const getBoard = await prisma.board.findFirst({
        where: {
            id: boardId,
            organizationId: orgId
        },
        select: {
            id: true,
            name: true,
            description: true
        }
    });

    if(!getBoard) {
        throw new Error("Board doesn't exist");
    }

    const getList = await prisma.list.findMany({
        where: {
            boardId: boardId
        },
        select: {
            id: true,
            name: true,
            boardId: true,
            position: true
        }
    });

    if(!getList) {
        throw new Error("List doesn't exist");
    }

    return getList;
}

export const createListService = async (data: ListCreateInput, orgId: string, boardId: string, userId: string) => {
    const { name } = data;

    const orgExists = await prisma.organization.findUnique({
        where: {
            id: orgId
        }
    });

    if(!orgExists) {
        throw new Error("Organization doesn't exist");
    }

    const getBoard = await prisma.board.findFirst({
        where: {
            id: boardId,
            organizationId: orgId
        },
        select: {
            id: true,
            name: true,
            description: true
        }
    });

    if(!getBoard) {
        throw new Error("Board doesn't exist");
    }

    const createList = await prisma.list.create({
        data: {
            name: name,
            boardId: boardId
        },
        select: {
            id: true,
            name: true,
            boardId: true,
            position: true
        }
    });

    return createList;
}