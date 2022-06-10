import prisma from '../globalService';

async function getTag(query: any) {
  const user = await prisma.tags.findMany({
    where: {
      id: query.id,
      name: query.name,
    },
  });
  return user;
}

async function createTag(body: any) {
  return prisma.tags.create({
    data: {
      name:body.name,
    },
  });
}



export {
  getTag,
  createTag
};
