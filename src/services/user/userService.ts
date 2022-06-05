/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
import prisma from '../globalService';

async function createUser(query: any) {
  return prisma.users.create({
    data: {
      email: query.email,
      password: query.password,
    },
  });
}

async function getUser(query: any) {
  return prisma.$queryRaw`SELECT * FROM users WHERE email=${query.email}`;
}

async function updateUser(params: any, query: any) {
  return prisma.users.update({
    where: {
      id: Number(params.id),
    },
    data: {
      email: query.email,
    },
  });
}

async function deleteUser(query: any) {
  return prisma.users.delete({
    where: {
      id: Number(query.id),
    },
  });
}

export {
  createUser, updateUser, getUser, deleteUser,
};
