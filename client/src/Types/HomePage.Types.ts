interface TaskData {
  Total: number;
}

interface ProjectsData {
  Total: number;
}

interface TeamsData {
  Total: number;
  TotalMembers: number;
}

interface HomePageData {
  LastUpdate: Date;
  Task: TaskData;
  Projects: ProjectsData;
  Teams: TeamsData;
}

export type { HomePageData, TaskData, ProjectsData, TeamsData };
