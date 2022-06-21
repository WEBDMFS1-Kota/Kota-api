import { Prisma } from '@prisma/client';
import ServiceError from '../error';
import prisma from '../globalService';
import { ProjectType } from '../../types/project';

const addProject = async (record: ProjectType, userId: any) => {
  const project = await prisma.projects.create({
    data: {
      ...record,
      upVote: 0,
      downVote: 0,
      publishDate: new Date(),
      projectsUsers: {
        create: {
          userId: Number(userId),
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

const getHotProjects = async () => {
  const projects = await prisma.projects.findMany({
    orderBy: {
      publishDate: 'desc',
    },
  });
  return projects;
};

const getTopProjects = async () => {
  const projects = await prisma.projects.findMany({
    orderBy: {
      upVote: 'desc',
    },
  });
  return projects;
};

async function getProjectById(id: number) {
  return prisma.projects.findUnique(
    {
      where: {
        id,
      },
      include: {
        projectsUsers: {
          include: {
            users: true,
          },
        },
      },
    },
  );
}

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

const deleteProject = async (id: number) => prisma.projects.delete({
  where: { id },
});

export {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getHotProjects,
  getTopProjects,
};