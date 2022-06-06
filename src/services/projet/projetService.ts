import prisma from '../globalService';

const addProjet = async (req: any, res: any) => {
  const projet = await prisma.projects.create({
    data: {
      ...req.body,
      publishDate: new Date(),
    },
  });
  return res.send(projet);
};

const getProjets = async (req: any, res: any) => {
  const projets = await prisma.projects.findMany();
  return res.send(projets);
};

const getProjetById = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const projetById = await prisma.projects.findUnique(
      {
        where: { id: Number(id) },
      },
    );
    if (!projetById) {
      return res.status(404).send({
        errorMsg: `No project with ${id}`,
      });
    }
    return res.send(projetById);
  } catch (e: any) {
    return res.status(404).send({
      errorMsg: `Cannot get project with ${id}. Error : ${e.message}`,
    });
  }
};

const updateProjet = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    title,
    projectUrl,
    description,
    image,
  } = req.body;
  try {
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
        errorMsg: 'Update failed',
      });
    }
    return res.send(projetById);
  } catch (e: any) {
    return res.status(404).send({
      errorMsg: `Delete failed. Error : ${e.message}`,
    });
  }
};

const deleteProjet = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.projects.delete({
      where: { id: Number(id) },
    });
    return deleted;
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
