import prisma from '../globalService';

async function createUser(body: any) {
  const birthdate = new Date(body.birthDate);
  return prisma.users.create({
    data: {
      pseudo: body.pseudo,
      avatar: body.avatar,
      firstname: body.firstname,
      lastname: body.lastname,
      password: body.password,
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

async function getUser(query: any) {
  const user = await prisma.users.findMany({
    where: {
      id: Number(query.userId),
      pseudo: query.pseudo,
      email: query.email,
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
  return user;
}

async function updateUser(userCheckedId:any, body: any) {
  const birthdate = new Date(body.birthDate);
  return prisma.users.update({
    where: {
      id: Number(userCheckedId),
    },
    data: {
      pseudo: body.pseudo,
      avatar: body.avatar,
      firstname: body.firstname,
      lastname: body.lastname,
      password: body.password,
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

async function deleteUser(query:any) {
  return prisma.users.delete({
    where: {
      id: Number(query.id),
    },
  });
}

export {
  createUser, updateUser, deleteUser, getUser,
};
