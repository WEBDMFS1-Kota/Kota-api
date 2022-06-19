import prisma from '../globalService';

async function getProjectsUserByUser(userIdToFind: any, query: any) {
  const user = await prisma.projectsUsers.findMany({
    where: {
      id: Number(query.id) || undefined,
      userId: Number(userIdToFind),
    },
  });
  return user;
}

async function getProjectsUserByProject(projectToFindId: any, query: any) {
  const user = await prisma.projectsUsers.findMany({
    where: {
      id: Number(query.id) || undefined,
      projectId: Number(projectToFindId),
    },
  });
  return user;
}

export {
  getProjectsUserByUser, getProjectsUserByProject,
};
