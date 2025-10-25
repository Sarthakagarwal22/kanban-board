import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createBoard = async (reqBody) => {
    const { name } = reqBody;
    const board = await prisma.board.create({ data: { name } });
    return board;
};

export const getAllBoards = async () => {
    const boards = await prisma.board.findMany();
    return boards;
};