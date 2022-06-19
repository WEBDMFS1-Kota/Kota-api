import {
  upVoteProject,
  downVoteProject,
  checkVote,
  modifVote,
  modifProjVoteToUp,
  modifProjVoteToDown,
} from '../../services/userVotes/userVotesService';

const userVotesRoutes = (server: any, opts: any, done: () => void) => {
  server.patch('/projects/vote/:idProject', async (request: any) => {
    const { body, params } = request;
    try {
      if (Number(body.value) === 1 || Number(body.value) === -1) {
        const alreadyVoted = (await checkVote(body, params.idProject))[0];
        if (alreadyVoted) { // l'utilisateur a déjà voté
          if (Number(alreadyVoted.voteValue) !== Number(body.value)) { // nouveau vote différent
            const modifiedVote = await modifVote(body, alreadyVoted); // modif relation
            if (Number(modifiedVote.voteValue) === 1) { // vote pour
              const newVote = await modifProjVoteToUp(params.idProject);
              return newVote;
            }

            const newVote = await modifProjVoteToDown(params.idProject); // vote contre
            return newVote;
          }
          return 'You already voted that.';
        }
        if (Number(body.value) === 1) { // vote pas encore effectué par l'utilisateur // vote pour
          const vote = await upVoteProject(body, params.idProject);
          return vote;
        }
        const vote = await downVoteProject(body, params.idProject); // vote contre
        return vote;
      }
      return 'Invalid vote value';
    } catch (error) {
      return error;
    }
  });

  done();
};

export default userVotesRoutes;
