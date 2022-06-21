import {
  upVoteProject,
  downVoteProject,
  checkVote,
  modifVote,
  modifProjVoteToUp,
  modifProjVoteToDown,
  resetUpVote,
  resetDownVote,
  resetUserVoteRelation,
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
          if (alreadyVoted) {
            if (Number(alreadyVoted.voteValue) !== Number(body.value)) {
              const modifiedVote = await modifVote(body, alreadyVoted);
              if (Number(modifiedVote.voteValue) === 1) {
                const newVote = await modifProjVoteToUp(params.idProject);
                return response.status(201).send(newVote);
              }
              const newVote = await modifProjVoteToDown(params.idProject);
              return response.status(201).send(newVote);
            }
            if (Number(body.value) === 1) {
              await resetUserVoteRelation(alreadyVoted.id);
              const reset = await resetUpVote(params.idProject);
              return response.status(201).send(reset);
            }
            await resetUserVoteRelation(alreadyVoted.id);
            const reset = await resetDownVote(params.idProject);
            return response.status(201).send(reset);
          }
          if (Number(body.value) === 1) {
            const vote = await upVoteProject(body, params.idProject);
            return response.status(200).send(vote);
          }
          const vote = await downVoteProject(body, params.idProject);
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
