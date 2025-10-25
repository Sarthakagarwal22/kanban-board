import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Only business logic, no req/res
export const getLists = async (boardId) => {
  return await prisma.list.findMany({
    where: { boardId: Number(boardId) },
    include: { tasks: true },
    orderBy: { position: 'asc' },
  });
};

export const createList = async (data) => {
  const { name, position, boardId } = data;
  return await prisma.list.create({
    data: { name, boardId: Number(boardId), position: position || 0 },
  });
};

export const updateList = async (listId, data) => {
  const { name, position } = data;
  return await prisma.list.update({
    where: { id: Number(listId) },
    data: { name, position },
  });
};

export const deleteList = async (listId) => {
  return await prisma.list.delete({ where: { id: Number(listId) } });
};
