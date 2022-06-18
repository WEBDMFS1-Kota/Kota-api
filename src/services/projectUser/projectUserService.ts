import prisma from '../globalService';

async function getProjectsUser(userIdToFind: any, query: any) {
  const user = await prisma.projectsUsers.findMany({
    where: {
      id: Number(query.id) || undefined,
      userId: Number(userIdToFind),
    },
  });
  return user;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getProjectsUser,
};
