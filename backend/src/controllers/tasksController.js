import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTasks = async (listId) => {
  return await prisma.task.findMany({
    where: { listId: Number(listId) },
    orderBy: { position: 'asc' },
  });
};

export const createTask = async (data) => {
  const { listId, title, description, position } = data;
  return await prisma.task.create({
    data: {
      title,
      description,
      listId: Number(listId),
      position: position || 0,
    },
  });
};

export const updateTask = async (taskId, data) => {
  const { title, description, position, listId } = data;
  return await prisma.task.update({
    where: { id: Number(taskId) },
    data: { title, description, position, listId },
  });
};

export const deleteTask = async (taskId) => {
  return await prisma.task.delete({ where: { id: Number(taskId) } });
};

export const moveTask = async (taskIds, data) => {
  const { toListId } = data;
  // Build a CASE statement for bulk update
  const cases = taskIds
    .map((id, idx) => `WHEN id = ${id} THEN ${idx}`)
    .join(' ');
  const ids = taskIds.join(',');
  // Use raw SQL for bulk position update
  await prisma.$executeRawUnsafe(
    `UPDATE Task SET position = CASE ${cases} END, listId = ${toListId} WHERE id IN (${ids})`
  );
  // Return updated tasks
  return true;
};
