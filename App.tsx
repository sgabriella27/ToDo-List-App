import { View } from 'react-native';
import React, { useState } from 'react';
import TaskWrapper from './components/TaskWrapper';
import { TaskProvider } from './context/TaskContext';

export default function App() {
  return (
    <TaskProvider>
      <TaskWrapper></TaskWrapper>
    </TaskProvider>
  );
}
