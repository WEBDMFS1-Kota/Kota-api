import bcrypt from 'bcrypt';
import prisma from '../globalService';

const saltRounds = 10;

async function createUser(body: any) {
  const birthdate = new Date(body.birthDate);
  const newUser = prisma.users.create({
    data: {
      pseudo: body.pseudo,
      avatar: body.avatar,
      firstname: body.firstname,
      lastname: body.lastname,
      password: await bcrypt.hash(body.password, saltRounds),
      email: body.email,
      birthDate: birthdate,
      githubProfileURL: body.githubProfileURL,
    },
    select: {
      id: true,
      pseudo: true,
      avatar: true,
      firstname: true,
      lastname: true,
      email: true,
      birthDate: true,
      githubProfileURL: true,
      password: false,
    },
  });
  return newUser;
}

async function getUsers(query: any) {
  const user = await prisma.users.findMany({
    where: {
      id: Number(query.userId) || undefined,
      pseudo: query.pseudo,
      email: query.email,
    },
    select: {
      id: true,
      pseudo: true,
      avatar: true,
      firstname: true,
      lastname: true,
      password: false,
      email: true,
      birthDate: true,
      githubProfileURL: true,
    },
  });
  return user;
}

async function getUserByEmailAndPassword(email: string, password: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (user?.password && await bcrypt.compare(password, user.password)) {
    user.password = null;
    return user;
  }
  return null;
}

async function updateUser(userCheckedId: any, body: any) {
  const birthdate = new Date(body.birthDate);
  if (body.password) {
    return prisma.users.update({
      where: {
        id: Number(userCheckedId),
      },
      data: {
        pseudo: body.pseudo,
        avatar: body.avatar,
        firstname: body.firstname,
        lastname: body.lastname,
        password: await bcrypt.hash(body.password, saltRounds),
        email: body.email,
        birthDate: birthdate,
        githubProfileURL: body.githubProfileURL,
      },
    });
  }
  return prisma.users.update({
    where: {
      id: Number(userCheckedId),
    },
    data: {
      pseudo: body.pseudo,
      avatar: body.avatar,
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      birthDate: birthdate,
      githubProfileURL: body.githubProfileURL,
    },
    select: {
      id: true,
      pseudo: true,
      avatar: true,
      firstname: true,
      lastname: true,
      email: true,
      birthDate: true,
      githubProfileURL: true,
      password: false,
    },
  });
}

async function deleteUser(query: any) {
  return prisma.users.delete({
    where: {
      id: Number(query.id),
    },
    select: {
      id: true,
      pseudo: true,
      avatar: true,
      firstname: true,
      lastname: true,
      email: true,
      birthDate: true,
      githubProfileURL: true,
      password: false,
    },
  });
}

async function getUserById(id: any) {
  return prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export {
  createUser, updateUser, deleteUser, getUsers, getUserByEmailAndPassword, getUserById,
};
