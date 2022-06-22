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

async function deleteProjectTag(projectTagId: number) {
  return prisma.projectTag.delete({
    where: {
      id: projectTagId,
    },
  });
}

export {
  getProjectTagsByProjectId,
  addProjectTag,
  getProjectTagByProjectIdAndTagId,
  deleteProjectTag,
};
