import { Box, Typography } from '@mui/material';
import React, { useEffect, useState, memo } from 'react';
import formStyles from '../../styles/taskform';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryTextfield from '../common/PrimaryTextfield';
import PrimaryButton from '../common/PrimaryButton';
import {
  useAddTaskMutation,
  useGetTasksQuery,
  usePatchTaskMutation,
} from '../../features/api/apiSlice';

const TaskForm = ({ setIsFormVisible, singleTask }) => {
  const styles = formStyles();
  const [addTask, setAddTask] = useState({
    id: '',
    title: '',
    desc: '',
    status: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [submitTask] = useAddTaskMutation();
  const [updateTask] = usePatchTaskMutation();
  const { refetch } = useGetTasksQuery();

  const validateTask = () => {
    if (
      addTask.title.length < 2 ||
      addTask.desc.length < 2 ||
      addTask.status.length < 2
    ) {
      setErrorMessage('Minimum 2 chars required');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleAddClick = async () => {
    if (validateTask()) {
      try {
        await submitTask({
          title: addTask.title,
          description: addTask.desc,
        }).unwrap();
        setIsFormVisible(false);
        refetch();
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    }
  };

  const handleUpdateClick = async () => {
    if (validateTask()) {
      const newData = {
        id: addTask.id,
        title: addTask.title,
        description: addTask.desc,
        status: addTask.status,
      };
      try {
        await updateTask(newData).unwrap();
        setIsFormVisible(false);
        refetch();
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    }
  };

  useEffect(() => {
    if (singleTask?.title) {
      setAddTask({
        id: singleTask.id || '',
        title: singleTask.title || '',
        desc: singleTask.description || '',
        status: singleTask.status || '',
      });
    }
  }, [singleTask]);

  return (
    <Box className={styles.formContainer}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography fontSize="2rem" fontWeight="700">
          Manage your Task
        </Typography>
        <CloseIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setAddTask({ title: '', desc: '', status: '' });
            setIsFormVisible(false);
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <PrimaryTextfield
            label="Title"
            value={addTask.title}
            helperText={errorMessage || null}
            onChange={(e) => setAddTask({ ...addTask, title: e.target.value })}
          />
          <PrimaryTextfield
            label="Description"
            value={addTask.desc}
            helperText={errorMessage || null}
            onChange={(e) => setAddTask({ ...addTask, desc: e.target.value })}
          />
          <PrimaryTextfield
            label="Status"
            value={addTask.status}
            helperText={errorMessage || null}
            onChange={(e) => setAddTask({ ...addTask, status: e.target.value })}
          />
        </Box>
        <PrimaryButton
          sx={{ width: '100%' }}
          onClick={!singleTask?.title ? handleAddClick : handleUpdateClick}
        >
          {!singleTask?.title ? 'Add' : 'Update'}
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default memo(TaskForm); // Memoizing the component for performance optimization
