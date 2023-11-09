import React, { useState, useRef } from 'react';
import { Keyboard, PanResponder, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import TaskForm from './TaskForm';
import Task from './Task';
import { useTaskContext } from '../context/TaskContext';

const TaskWrapper: React.FC = () => {
    const { taskItems, setTaskItems } = useTaskContext()
    let [completeCounter, setCompleteCounter] = useState<number>(0)
    const [dragging, setDragging] = useState(false);

    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: () => {},
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (_, gestureState) => {
                setDragging(true)
                const dragIndex = Math.floor(gestureState.y0 / 60)
                const hoverIndex = Math.floor(gestureState.moveY / 60)
        
                if (dragIndex !== hoverIndex) {
                    const newOrder = [...taskItems]
                    const [draggedItem] = newOrder.splice(dragIndex, 1)
                    newOrder.splice(hoverIndex, 0, draggedItem)
                    setTaskItems(newOrder)
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderRelease: () => {
                setDragging(false)
            },
        })
    ).current

    const deleteTask = (index: number) => {
        let itemsCopy = [...taskItems]
        itemsCopy.splice(index, 1)
        setTaskItems(itemsCopy)
    }

    const addTask = (task: string) => {
        Keyboard.dismiss()
        const newTask: TaskProp = { taskName: task, completedTask: false }
        setTaskItems([...taskItems, newTask])
    }

    const completeTask = (indexComplete: number) => {
        const updatedTask = taskItems.map((task, index) => index === indexComplete ? { ...task, completedTask: !task.completedTask } : task)
        setTaskItems(updatedTask)
        
        const taskDoneCount = updatedTask.filter((task) => task.completedTask).length
        setCompleteCounter(taskDoneCount)
    }

    return (
        <View style={ styles.container }>

            {/* Task Container */}
            <View style={ styles.tasksWrappers }>
                <Text style={ styles.sectionTitle }>Complete Your Task!</Text>
                <Text style={ styles.counter }>{ "Task Done: " + completeCounter }</Text>

                {/* List of Task */}
                <View style={ styles.items }>
                {
                    taskItems.map((item, index) => {
                        return (
                            <TouchableOpacity key={ index } {...panResponder.panHandlers}>
                                    <Task 
                                        key={ index } 
                                        taskName={ item.taskName } 
                                        index={ index } 
                                        taskCompleted = { item.completedTask }
                                        deleteTask={ () => deleteTask(index) }
                                        completeTask={ () => completeTask(index) }
                                    />
                            </TouchableOpacity>
                        )

                    })
                }
                </View>

            </View>

            {/* Write Task */}
            <TaskForm addTask={ addTask } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },

    tasksWrappers: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    items: {
        marginTop: 30,
    },

    counter: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TaskWrapper;