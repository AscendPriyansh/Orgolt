import type { ListCreateInput } from "../../generated/prisma/models.js";
import prisma from "../lib/prisma.js";
import type { UpdateListInput } from "../validators/list.validator.js";

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

export const updateListService = async (data: UpdateListInput, orgId: string, boardId: string, listId: string) => {
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

    const listExist = await prisma.list.findFirst({
        where: {
            id: listId,
            boardId: boardId
        }
    });

    if(!listExist) {
        throw new Error("List does't exist");
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

export const deleteListService = async (orgId: string, boardId: string, listId: string) => {
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

    const listExist = await prisma.list.findFirst({
        where: {
            id: listId,
            boardId: boardId
        }
    });

    if(!listExist) {
        throw new Error("List does't exist");
    }

    const deleteList = await prisma.list.delete({
        where: {
            id: listId,
            boardId: boardId
        }
    });

    return deleteList;
}