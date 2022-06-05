import prisma from '../globalService';

const addProjet = async (req: any, res: any, reply: any) => {
  const { title, description } = req.body;
  const projet = await prisma.projects.create({
    data: {
      title,
      description,
    },
  });
  res.send(projet);
  return reply.reply('Projet added!');
};

const getProjets = async (req: any, res: any) => {
  const projets = await prisma.projects.findMany();
  return res.send(projets);
};

const getProjetById = async (req: any, res: any) => {
  const { id } = req.params;
  const projetById = await prisma.projects.findUnique(
    {
      where: { id: Number(id) },
    },
  );
  return res.send(projetById);
};

const updateProjet = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    title,
    projectUrl,
    description,
    image,
  } = req.body;

  const projetById = await prisma.projects.update({
    where: { id: Number(id) },
    data: {
      title,
      projectUrl,
      description,
      image,
    },
  });

  if (!projetById) {
    return res.status(404).send({
      errorMsg: 'Delete failed',
    });
  }

  res.send(projetById);
  return res.reply('Project updated');
};

const deleteProjet = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.projects.delete({
      where: { id: Number(id) },
    });
    res.send(deleted);
    return res.reply('Project deleted');
  } catch (err: any) {
    return res.status(404).send({
      errorMsg: `Delete failed : ${err.message}`,
    });
  }
};

export {
  addProjet,
  getProjets,
  getProjetById,
  updateProjet,
  deleteProjet,
};
