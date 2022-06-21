import prisma from '../globalService';

async function getProjectTagsByProjectId(projectId: number) {
  return prisma.projectTag.findMany({
    where: {
      projectId,
    },
    include: {
      projects: true,
      tags: true,
    },
  });
}

async function getProjectTagByProjectIdAndTagId(projectId: number, tagId: number) {
  return prisma.projectTag.findMany({
    where: {
      projectId, tagId,
    },
  });
}

async function addProjectTag(projectId: number, tagId: number) {
  return prisma.projects.update({
    where: {
      id: projectId,
    },
    data: {
      projectTag: {
        create: {
          tagId,
        },
      },
    },
  });
}

export {
  getProjectTagsByProjectId,
  addProjectTag,
  getProjectTagByProjectIdAndTagId,
};
