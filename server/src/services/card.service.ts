import prisma from "../lib/prisma.js";
import type { CreateCardInput, UpdateCardInput } from "../validators/card.validator.js";

export const getCardService = async (
  orgId: string,
  boardId: string,
  listId: string,
  cardId: string
) => {
  const orgExists = await prisma.organization.findUnique({
    where: {
      id: orgId,
    },
  });

  if (!orgExists) {
    throw new Error("Organization doesn't exist");
  }

  const getBoard = await prisma.board.findFirst({
    where: {
      id: boardId,
      organizationId: orgId,
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  if (!getBoard) {
    throw new Error("Board doesn't exist");
  }

  const getList = await prisma.list.findMany({
    where: {
      boardId: boardId,
    },
    select: {
      id: true,
      name: true,
      boardId: true,
      position: true,
    },
  });

  if (!getList) {
    throw new Error("List doesn't exist");
  }

  const getCard = await prisma.card.findFirst({
    where: {
        id: cardId,
        listId: listId
    },
    select: {
        id: true,
        name: true,
        listId: true,
        position: true,
    }
  });

  if(!getCard) {
    throw new Error("Card doesn't exist");
  }

  return getCard;
};

export const createCardService = async (data: CreateCardInput, orgId: string, boardId: string, listId: string) => {
    const { name } = data;

    const createCard = await prisma.card.create({
        data: {
            name: name,
            listId: listId
        },
        select: {
            id: true,
            name: true,
            listId: true
        }
    });

    return createCard;
}

export const updateCardService = async (data: UpdateCardInput, orgId: string, boardId: string, listId: string, cardId: string) => {
  const { name } = data;

    const updateCard = await prisma.card.update({
      where: {
        id: cardId
      },
        data: {
            name: name,
            listId: listId
        },
        select: {
            id: true,
            name: true,
            listId: true
        }
    });

    return updateCard;
}