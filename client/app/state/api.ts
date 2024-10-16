import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface Comment {
  id: number;
  text: string;
  taskId: number;
  userId: number;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileUrl: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  projectId: number;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Project", "Task"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "project",
      providesTags: ["Project"],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "project",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `task?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({
              type: "Task" as const,
              id,
            }))
          : [{ type: "Task" as const }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "task",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `task/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Task", id: taskId },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
} = api;
