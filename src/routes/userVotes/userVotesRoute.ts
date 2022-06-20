import {
  upVoteProject,
  downVoteProject,
  checkVote,
  modifVote,
  modifProjVoteToUp,
  modifProjVoteToDown,
} from '../../services/userVotes/userVotesService';
import { patchUserVote } from '../../schema/userSchema';

const userVotesRoutes = (server: any, opts: any, done: () => void) => {
  server.patch('/projects/vote/:idProject', {
    onRequest: [server.authenticate],
    schema: patchUserVote,
    handler: async (request: any, response: any) => {
      const { body, params } = request;
      try {
        if (Number(body.value) === 1 || Number(body.value) === -1) {
          const alreadyVoted = (await checkVote(body, params.idProject))[0];
          if (alreadyVoted) { // l'utilisateur a déjà voté
            if (Number(alreadyVoted.voteValue) !== Number(body.value)) { // nouveau vote différent
              const modifiedVote = await modifVote(body, alreadyVoted); // modif relation
              if (Number(modifiedVote.voteValue) === 1) { // vote pour
                const newVote = await modifProjVoteToUp(params.idProject);
                return response.status(201).send(newVote);
              }

              const newVote = await modifProjVoteToDown(params.idProject); // vote contre
              return response.status(201).send(newVote);
            }
            return response.status(409).send({ errorMsg: 'You already voted that.' });
          }
          if (Number(body.value) === 1) { // vote pas encore effectué par l'utilisateur // vote pour
            const vote = await upVoteProject(body, params.idProject);
            return response.status(200).send(vote);
          }
          const vote = await downVoteProject(body, params.idProject); // vote contre
          return response.status(200).send(vote);
        }
        return response.status(400).send({ errorMsg: 'Invalid value for vote' });
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  done();
};

export default userVotesRoutes;
