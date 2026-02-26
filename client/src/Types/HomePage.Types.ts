interface TaskData {
  Total: number;
  InProgress: number;
  overdue: number;
}

interface ProjectsData {
  Total: number;
  NewThisWeek: number;
  overdue: number;
}

interface TeamsData {
  Total: number;
  NewThisWeek: number;
  TotalMembers: number;
}

interface HomePageData {
  DueToday: number;
  LastUpdate: Date;
  Task: TaskData;
  Projects: ProjectsData;
  Teams: TeamsData;
}

export type { HomePageData, TaskData, ProjectsData, TeamsData };
