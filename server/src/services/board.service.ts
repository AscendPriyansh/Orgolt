import prisma from "../lib/prisma.js";

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

    if(!getBoard) {
        throw new Error("Board doesn't exist");
    }

    return getBoard;
}