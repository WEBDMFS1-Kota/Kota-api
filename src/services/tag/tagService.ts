import prisma from '../globalService';

async function getTags(query: any, body?: any) {
  const tags = await prisma.tags.findMany({
    where: {
      id: Number(query.tagId),
      name: body.name,
    },
  });
  return tags;
}

async function getTagsById(query: any) {
  const tag = await prisma.tags.findUnique({
    where: {
      id: query.tagId,
    },
  });
  return tag;
}

async function getTagById(id: number) {
  return prisma.tags.findUnique({
    where: {
      id,
    },
  });
}

async function getTagsByName(query: any) {
  const tag = await prisma.tags.findMany({
    where: {
      id: Number(query.id) || undefined,
      name: query.name,
    },
  });
  return tag;
}
export {
  getTags, getTagsByName, getTagsById, getTagById,
};
