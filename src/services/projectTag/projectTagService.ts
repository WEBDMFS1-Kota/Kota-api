import prisma from '../globalService';
import { ProjectTagType } from '../../types/project';
import { getTagsByName, getTagsById } from '../tag/tagService';
import ServiceError from '../error';

const getProjectTags = async () => {
  const projectTags = await prisma.projectTag.findMany();
  const projectTagsIncludeName: any[] = [];
  await Promise.all(projectTags.map(async (projectTagDescription: any) => {
    const tag: any = (await getTagsById(projectTagDescription));
    projectTagsIncludeName.push({
      ...projectTagDescription,
      tag,
    });
  }));
  return projectTagsIncludeName;
};

const getProjectTagsByProject = async (projectId: ProjectTagType) => {
  const projectTagsByProject = await prisma.projectTag.findMany({
    where: {
      projectId: Number(projectId),
    },
  });
  // Get the name of the tag
  const projectTagsIncludeName: any[] = [];
  await Promise.all(projectTagsByProject.map(async (projectTagDescription: any) => {
    const tag: any = (await getTagsById(projectTagDescription));
    projectTagsIncludeName.push({
      ...projectTagDescription,
      tag,
    });
  }));
  return projectTagsIncludeName;
};

const getProjectTagsByProjectAndTag = async (projectId: ProjectTagType, tagId: any) => {
  const projectTagsByProjectAndTag = await prisma.projectTag.findMany({
    where: {
      projectId: Number(projectId),
      tagId: Number(tagId),
    },
  });
  return projectTagsByProjectAndTag;
};

const addProjectTag = async (projectTagDescs: any) => {
  const addedProjectTags: any[] = [];
  const alreadyExistsProjectTags: any[] = [];

  try {
    await Promise.all(projectTagDescs.map(async (projectTagDesc: any) => {
      const { projectId } = projectTagDesc;
      const tags: any = (await getTagsByName(projectTagDesc));

      const tag = tags[0];
      const existingProjectTags: any = await getProjectTagsByProjectAndTag(
        projectId,
        tag.id,
      );
      if (!tags.length) {
        throw (new Error('Tag non inexistant'));
      }

      if (existingProjectTags.length) {
        // Add new tag in same project
        alreadyExistsProjectTags.push(tag.name);
      } else {
        await prisma.projects.update({
          where: { id: projectId },
          data: {
            projectTag: {
              create: {
                tagId: Number(tag.id),
              },
            },
          },
        });
        addedProjectTags.push(projectTagDesc.name);
      }
    }));
    return {
      added: addedProjectTags,
      alreadyExists: [...new Set(alreadyExistsProjectTags)], // Suppression des doublons au cas où
    };
  } catch (error: any) {
    throw new ServiceError(500, error.message);
  }
};

const deleteProjectTag = async (projectTagId: number) => {
  const projectTag = prisma.projectTag.delete({
    where: {
      id: Number(projectTagId),
    },
  });
  return projectTag;
};

export {
  addProjectTag,
  getProjectTags,
  getProjectTagsByProject,
  getProjectTagsByProjectAndTag,
  deleteProjectTag,
};