import prisma from '../globalService';

async function addUserTags(userId: any, tagToAddId: any) {
  return prisma.users.update({
    where: {
      id: Number(userId),
    },
    data: {
      userTag: {
        create: {
          tagId: Number(tagToAddId),
        },
      },
    },
  });
}

async function getUserTag(userId: any, identifiedTagId: any) {
  const userTagsId = await prisma.userTag.findMany({
    where: {
      userId: Number(userId),
      tagId: Number(identifiedTagId),
    },
  });
  return userTagsId;
}

async function getAllUserTags(userId: any) {
  const userTagsId = await prisma.userTag.findMany({
    where: {
      userId: Number(userId),
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
