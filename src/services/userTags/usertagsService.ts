import prisma from '../globalService';

async function addUserTags(query: any, tagToAdd: any) {
  return prisma.users.update({
    where: {
      id: Number(query.userId),
    },
    data: {
      userTag: {
        create: {
          tagId: Number(tagToAdd.id),
        },
      },
    },
  });
}

async function getUserTag(query: any, identifiedTag: any) {
  const userTagsId = await prisma.userTag.findMany({
    where: {
      userId: Number(query.userId),
      tagId: Number(identifiedTag.id),
    },
  });
  return userTagsId;
}

async function getAllUserTags(query: any) {
  const userTagsId = await prisma.userTag.findMany({
    where: {
      userId: Number(query.userId),
    },
  });
  return userTagsId;
}

async function deleteUserTag(userTagToDelete: any) {
  return prisma.userTag.delete({
    where: {
      id: userTagToDelete.id,
    },
  });
}

export {
  addUserTags, getUserTag, getAllUserTags, deleteUserTag,
};
