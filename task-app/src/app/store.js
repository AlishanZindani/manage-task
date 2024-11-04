import { configureStore } from '@reduxjs/toolkit'; // Importing the Redux store configuration utility
import { apiSlice } from '../features/api/apiSlice'; // Importing the API slice for managing API state

export const store = configureStore({
  reducer: {
    // Integrating the API slice reducer to manage API-related state within the Redux store
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Extending the default middleware to include API middleware for handling asynchronous operations
    getDefaultMiddleware().concat(apiSlice.middleware),
});
