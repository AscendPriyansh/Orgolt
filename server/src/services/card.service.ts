import prisma from "../lib/prisma.js";
import type {
  CreateCardInput,
  UpdateCardInput,
} from "../validators/card.validator.js";

const checkListAccess = async (
  orgId: string,
  boardId: string,
  listId: string,
  userId: string,
) => {
  const orgExists = await prisma.organization.findUnique({
    where: {
      id: orgId,
    },
    select: {
      ownerId: true,
    },
  });

  if (!orgExists) {
    throw new Error("Organization doesn't exist");
  }

  if (orgExists.ownerId !== userId) {
    throw new Error("Only the organization owner can manage cards");
  }

  const boardExists = await prisma.board.findFirst({
    where: {
      id: boardId,
      organizationId: orgId,
    },
    select: {
      id: true,
    },
  });

  if (!boardExists) {
    throw new Error("Board doesn't exist");
  }

  const listExists = await prisma.list.findFirst({
    where: {
      id: listId,
      boardId: boardId,
    },
    select: {
      id: true,
    },
  });

  if (!listExists) {
    throw new Error("List doesn't exist");
  }
};

export const getCardService = async (
  orgId: string,
  boardId: string,
  listId: string,
  cardId: string,
  userId: string,
) => {
  await checkListAccess(orgId, boardId, listId, userId);

  const getCard = await prisma.card.findFirst({
    where: {
      id: cardId,
      listId: listId,
    },
    select: {
      id: true,
      name: true,
      listId: true,
      position: true,
    },
  });

  if (!getCard) {
    throw new Error("Card doesn't exist");
  }

  return getCard;
};

export const createCardService = async (
  data: CreateCardInput,
  orgId: string,
  boardId: string,
  listId: string,
  userId: string,
) => {
  const { name } = data;

  await checkListAccess(orgId, boardId, listId, userId);

  const createCard = await prisma.card.create({
    data: {
      name: name,
      listId: listId,
    },
    select: {
      id: true,
      name: true,
      listId: true,
    },
  });

  return createCard;
};

export const updateCardService = async (
  data: UpdateCardInput,
  orgId: string,
  boardId: string,
  listId: string,
  cardId: string,
  userId: string,
) => {
  const { name } = data;

  await checkListAccess(orgId, boardId, listId, userId);

  const cardExists = await prisma.card.findFirst({
    where: {
      id: cardId,
      listId: listId,
    },
    select: {
      id: true,
    },
  });

  if (!cardExists) {
    throw new Error("Card doesn't exist");
  }

  const updateCard = await prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      name: name,
    },
    select: {
      id: true,
      name: true,
      listId: true,
    },
  });

  return updateCard;
};

export const deleteCardService = async (
  orgId: string,
  boardId: string,
  listId: string,
  cardId: string,
  userId: string,
) => {
  await checkListAccess(orgId, boardId, listId, userId);

  const cardExists = await prisma.card.findFirst({
    where: {
      id: cardId,
      listId: listId,
    },
    select: {
      id: true,
    },
  });

  if (!cardExists) {
    throw new Error("Card doesn't exist");
  }

  const deleteCard = await prisma.card.delete({
    where: {
      id: cardId,
    },
  });

  return deleteCard;
};
