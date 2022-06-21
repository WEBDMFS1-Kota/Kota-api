import prisma from '../globalService';

async function upVoteProject(body: any, idProject:any) {
  return prisma.projects.update({
    where: {
      id: Number(idProject),
    },
    data: {
      upVote: { increment: 1 },
      usersVotes: {
        create: {
          userId: Number(body.voterId),
          voteValue: Number(body.value),
        },
      },
    },
  });
}

async function downVoteProject(body: any, idProject:any) {
  return prisma.projects.update({
    where: {
      id: Number(idProject),
    },
    data: {
      downVote: { increment: 1 },
      usersVotes: {
        create: {
          userId: Number(body.voterId),
          voteValue: Number(body.value),
        },
      },
    },
  });
}

async function checkVote(body: any, idProject:any) {
  return prisma.usersVotes.findMany({
    where: {
      projectId: Number(idProject),
      userId: Number(body.voterId),
    },
  });
}

async function modifVote(body: any, alreadyVoted:any) {
  return prisma.usersVotes.update({
    where: {
      id: Number(alreadyVoted.id),
    },
    data: {
      voteValue: Number(body.value),
    },
  });
}

async function modifProjVoteToUp(idProject:any) {
  return prisma.projects.update({
    where: {
      id: Number(idProject),
    },
    data: {
      upVote: { increment: 1 },
      downVote: { decrement: 1 },
    },
  });
}

async function modifProjVoteToDown(idProject:any) {
  return prisma.projects.update({
    where: {
      id: Number(idProject),
    },
    data: {
      upVote: { decrement: 1 },
      downVote: { increment: 1 },
    },
  });
}

export {
  upVoteProject, downVoteProject, checkVote, modifVote, modifProjVoteToUp, modifProjVoteToDown,
};