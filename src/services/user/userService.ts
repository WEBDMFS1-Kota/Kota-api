import bcrypt from 'bcrypt';
import prisma from '../globalService';

async function createUser(body: any) {
  const birthdate = new Date(body.birthDate);
  const saltRounds = 10;
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
  });
  return newUser;
}

async function getUser(query: any) {
  const user = await prisma.users.findMany({
    where: {
      id: Number(query.userId) || undefined,
      pseudo: query.pseudo,
      email: query.email,
    },
  });
  return user;
}

async function updateUser(userCheckedId: any, body: any) {
  const birthdate = new Date(body.birthDate);
  const saltRounds = 10;
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

async function deleteUser(query: any) {
  return prisma.users.delete({
    where: {
      id: Number(query.id),
    },
  });
}

export {
  createUser, updateUser, deleteUser, getUser,
};
