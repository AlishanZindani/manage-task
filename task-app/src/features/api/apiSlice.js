import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
// Define your API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl, 
  }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks', // GET request to /tasks endpoint
      providesTags: ['Task'],
    }),
    getTaskById: builder.query({
        query: (id) => `/tasks/${id}`, // GET request to /tasks/:id
        providesTags: (result, error, id) => [{ type: 'Task', id }],
      }),
    addTask: builder.mutation({
      query: (newTask) => ({
        url: '/tasks', // POST request to /tasks endpoint
        method: 'POST',
        body: newTask,
        invalidatesTags: ['Task'],
      }),
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`, // DELETE request to /tasks/:id endpoint
        method: 'DELETE',
      }),
    }),
    patchTask: builder.mutation({
      query: ({ id, ...updatedFields }) => ({
        url: `/tasks/${id}`, // PATCH request to /tasks/:id endpoint
        method: 'PATCH',
        body: updatedFields,
      }),
    }),
  }),
});

// Export hooks for queries and mutations
export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  usePatchTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
