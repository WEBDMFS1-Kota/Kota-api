import prisma from '../globalService';

async function getTags(query: any) {
  const user = await prisma.tags.findMany({
    where: {
      id: query.id,
      name: query.name,
    },
  });
  return user;
}

export { // disable eslint ici car même format que les autres services mais erreur
  // eslint-disable-next-line import/prefer-default-export
  getTags,
};
