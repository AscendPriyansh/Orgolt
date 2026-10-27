import prisma from "../lib/prisma.js";
import type { CreateBoardInput, UpdateBoardInput } from "../validators/board.validator.js";

export const getBoardsService = async (orgId: string, userId: string) => {
    const getBoard = await prisma.board.findMany({
        where: {
            organizationId: orgId
        },
        select: {
            id: true,
            name: true,
            description: true
        }
    });

    return getBoard;
}

export const createBoardService = async (data: CreateBoardInput, orgId: string, userId: string) => {
    const { name, description } = data;

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
        throw new Error("Only the organization owner can create boards");
    }

    const boradExist = await prisma.board.findFirst({
        where: {
            organizationId: orgId,
            name: name
        }
    });

    if(boradExist) {
        throw new Error("Board already exist");
    }

    const createBoard = await prisma.board.create({
        data: {
            organizationId: orgId,
            ownerId: userId,
            name: name,
            description: description || ""
        },
        select: {
            organizationId: true,
            name: true,
            description: true
        }
    });

    return createBoard;
}

export const updateBoardService = async (data: UpdateBoardInput, orgId: string, boardId: string, userId: string) => {
    const { name, description } = data;

    const orgExists = await prisma.organization.findUnique({
        where: {
            id: orgId,
        },
        select: {
            ownerId: true
        }
    });

    if(!orgExists) {
        throw new Error("Organization doesn't exist");
    }

    if(orgExists.ownerId !== userId) {
        throw new Error("Only the organization owner can update boards");
    }

    const boardExists = await prisma.board.findFirst({
        where: {
            id: boardId,
            organizationId: orgId
        }
    });

    if(!boardExists) {
        throw new Error("Board doesn't exist");
    }

    const updateBoard = await prisma.board.update({
        where: {
            id: boardId,
            organizationId: orgId
        },
        data: {
            name: name || "",
            description: description || ""
        },
        select: {
            id: true,
            name: true,
            description: true
        }
    });

    return updateBoard;
}

export const deleteBoardService = async (orgId: string, boardId: string, userId: string) => {
    const orgExists = await prisma.organization.findUnique({
        where: {
            id: orgId,
        },
        select: {
            ownerId: true
        }
    });

    if(!orgExists) {
        throw new Error("Organization doesn't exist");
    }

    if(orgExists.ownerId !== userId) {
        throw new Error("Only the organization owner can delete boards");
    }

    const boardExists = await prisma.board.findFirst({
        where: {
            id: boardId,
            organizationId: orgId
        }
    });

    if(!boardExists) {
        throw new Error("Board doesn't exist");
    }

    const deleteBoard = await prisma.board.delete({
        where: {
            id: boardId,
            organizationId: orgId
        }
    });

    return deleteBoard;
}