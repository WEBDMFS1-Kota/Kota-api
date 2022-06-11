import { Prisma } from '@prisma/client';
import ServiceError from '../error';
import prisma from '../globalService';
import ProjectType from '../../types/project/projectType';

const addProject = async (record: ProjectType, creatorId: any) => {
  const project = await prisma.projects.create({
    data: {
      ...record,
      publishDate: new Date(),
      projectsUsers: {
        create: {
          userId: Number(creatorId),
        },
      },
    },
  });
  return project;
};

const getProjects = async () => {
  const projects = await prisma.projects.findMany();
  return projects;
};

const getProjectById = async (id: number) => {
  const projectById = await prisma.projects.findUnique(
    {
      where: { id },
    },
  );
  if (!projectById) {
    throw new ServiceError(404, `Project not found with id ${id}`);
  }
  return projectById;
};

const updateProject = async (id: number, record: ProjectType) => {
  try {
    const updateProjectById = await prisma.projects.update({
      where: { id },
      data: record,
    });
    return updateProjectById;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ServiceError(404, `Update failed, record ${id} not found`);
    }
    throw error;
  }
};

const deleteProject = async (id: number) => {
  const deleted = await prisma.projects.delete({
    where: { id },
  });
  if (!deleted) {
    throw new ServiceError(404, 'Delete failed');
  }
  return deleted;
};

export {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
