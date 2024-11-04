import React, { useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
  useGetTasksQuery,
  usePatchTaskMutation,
} from '../features/api/apiSlice';
import PrimaryButton from '../components/common/PrimaryButton';
import { Box } from '@mui/material';
import TaskForm from '../components/layout/TaskForm';

export default function Header() {
  const { data: tasks = [], error, isLoading, refetch } = useGetTasksQuery();
  const [taskId, setTaskId] = useState(null); // State to hold the task ID

  const {
    data: singleTask,
    isLoading: getLoading,
    isError: getError,
  } = useGetTaskByIdQuery(taskId, {
    skip: taskId === null, // Skip the query if taskId is null
  });
  const {
    data: task,
    isLoading: singleLoading,
    isError: singleError,
  } = useGetTaskByIdQuery(taskId);
  const [
    deleteTask,
    { isLoading: isDeleting, isSuccess, isError: deleteError },
  ] = useDeleteTaskMutation();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleEditClick = async (e) => {
    console.log(e);
    setTaskId(e);
    setIsFormVisible(true);
  };
  const handleDeleteClick = async (e) => {
    console.log('eee', e);
    try {
      await deleteTask(e).unwrap(); // Unwrap to handle the promise
      // Optionally, you can do something after successful deletion, e.g., show a success message
      refetch();
    } catch (error) {
      console.error('Failed to delete the task: ', error);
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 250,
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Update</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="center">{row?.description}</TableCell>
                <TableCell align="center">{row?.status}</TableCell>
                <TableCell align="center">
                  {row?.createdAt?.toLocaleString('en-UK')}
                </TableCell>
                <TableCell align="center">
                  <EditIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleEditClick(row.id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteClick(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          paddingTop: '4rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PrimaryButton
          sx={{ width: { xs: '100%', md: '40%' } }}
          onClick={handleButtonClick}
        >
          Add Task
        </PrimaryButton>
      </Box>
      {isFormVisible && (
        <TaskForm setIsFormVisible={setIsFormVisible} singleTask={singleTask} />
      )}
    </>
  );
}
