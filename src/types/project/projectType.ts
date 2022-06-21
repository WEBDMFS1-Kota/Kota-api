interface ProjectType {
  title?: string;
  projectUrl?: string;
  description?: string;
  publishDate?: Date;
  image?: string;
  upVote?: number;
  usersVotes?: number;
  projectsUsers?: any[];
  projectTags?: any[];
}

export default ProjectType;
