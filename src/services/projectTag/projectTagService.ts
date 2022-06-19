import prisma from '../globalService';

const addProjectTag = async (projectById: any, projectTagId: any) => {
  const projectTag = await prisma.projects.update({
    where: {
      id: Number(projectById),
    },
    data: {
      projectTag: {
        create: {
          tagId: Number(projectTagId),
        },
      },
    },
  });
  return projectTag;
};

const getProjectTags = async (projectId: any) => {
  const projectTagsById = await prisma.projectTag.findMany({
    where: {
      projectId: Number(projectId),
    },
  });
  return projectTagsById;
};

const getProjectTagById = async (projectTagId: any, tagId: any) => {
  const projectTagById = await prisma.projectTag.findMany({
    where: {
      projectId: Number(projectTagId),
      tagId: Number(tagId),
    },
  });
  return projectTagById;
};

const deleteProjectTag = async (projectTagId: number) => {
  const projectTad = prisma.projectTag.delete({
    where: {
      id: projectTagId,
    },
  });
  return projectTad;
};

export {
  addProjectTag,
  getProjectTags,
  getProjectTagById,
  deleteProjectTag,
};