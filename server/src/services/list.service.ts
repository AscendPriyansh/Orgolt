import prisma from "../lib/prisma.js";
import type { CreateListInput, UpdateListInput } from "../validators/list.validator.js";

const checkBoardAccess = async (orgId: string, boardId: string, userId: string) => {
    const orgExists = await prisma.organization.findUnique({
        where: {
            id: orgId
        },
        select: {
            ownerId: true
        }
    });

    if(!orgExists) {
        throw new Error("Organization doesn't exist");
    }

    if(orgExists.ownerId !== userId) {
        throw new Error("Only the organization owner can manage lists");
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

    return getBoard;
}

export const getListService = async (orgId: string, boardId: string, userId: string) => {
    await checkBoardAccess(orgId, boardId, userId);

    const getList = await prisma.list.findMany({
        where: {
            boardId: boardId
        },
        orderBy: {
            position: "asc"
        },
        select: {
            id: true,
            name: true,
            boardId: true,
            position: true
        }
    });

    return getList;
}

export const createListService = async (data: CreateListInput, orgId: string, boardId: string, userId: string) => {
    const { name } = data;

    await checkBoardAccess(orgId, boardId, userId);

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

export const updateListService = async (data: UpdateListInput, orgId: string, boardId: string, listId: string, userId: string) => {
    const { name } = data;

    await checkBoardAccess(orgId, boardId, userId);

    const listExist = await prisma.list.findFirst({
        where: {
            id: listId,
            boardId: boardId
        }
    });

    if(!listExist) {
        throw new Error("List doesn't exist");
    }

    const updateList = await prisma.list.update({
        where: {
            id: listId,
            boardId: boardId
        },
        data: {
            name: name
        }
    });

    return updateList; 
}

export const deleteListService = async (orgId: string, boardId: string, listId: string, userId: string) => {
    await checkBoardAccess(orgId, boardId, userId);

    const listExist = await prisma.list.findFirst({
        where: {
            id: listId,
            boardId: boardId
        }
    });

    if(!listExist) {
        throw new Error("List doesn't exist");
    }

    const deleteList = await prisma.list.delete({
        where: {
            id: listId,
            boardId: boardId
        }
    });

    return deleteList;
}