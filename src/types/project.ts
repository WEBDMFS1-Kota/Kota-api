interface ProjectType {
  id?: number;
  title?: string;
  projectUrl?: string;
  description?: string;
  publishDate?: Date;
  image?: string;
  upVote?: number;
  projectsUsers?: any[];
  projectTags?: any[];
}

interface ProjectsUserType {
  id?: number;
  projectId?: number;
  userId?: number;
}

interface ProjectTagType {
  id?: number;
  projectId?: number;
  tagId?: number;
}

export { ProjectTagType, ProjectType, ProjectsUserType };