import prisma from '../globalService';

const resetPassword = async () => {
  console.log(prisma);
  const prismaHealth = 'await funciton to define';
  return prismaHealth;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  resetPassword,
};
