import prisma from '../globalService';

const addProjet = async (req: any, res: any, reply: any) => {
  const { title, description } = req.body;
  const projet = await prisma.projects.create({
    data: {
      title,
      description,
    },
  });
  res.json(projet);
  return reply.send('Projet added!');
};

const getProjets = async (res: any) => {
  const projets = await prisma.projects.findMany();
  return res.json(projets);
};

export { addProjet, getProjets };
