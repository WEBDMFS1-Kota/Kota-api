import prisma from '../globalService';

const health = async () => {
  const prismaHealth = await prisma.tags.count();
  return prismaHealth;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  health,
};