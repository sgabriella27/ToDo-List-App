import React, { useState, useRef } from 'react';
import { Keyboard, PanResponder, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import TaskForm from './TaskForm';
import Task from './Task';
import { useTaskContext } from '../context/TaskContext';

const TaskWrapper: React.FC = () => {
    const { taskItems, setTaskItems } = useTaskContext()
    let [completeCounter, setCompleteCounter] = useState<number>(0)
    const [draggingIndex, setDraggingIndex] = useState(-1)

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (_, gestureState) => {
                const newTask = [...taskItems]
                const draggedItem = newTask[draggingIndex as number]
                newTask.splice(draggingIndex as number, 1)
                const newIndex = Math.max(0, Math.min(newTask.length, draggingIndex as number + Math.round(gestureState.dy / 60)))
                newTask.splice(newIndex, 0, draggedItem);
                setDraggingIndex(newIndex)
                setTaskItems(newTask)
            },
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderRelease: () => {
                setDraggingIndex(-1)
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
                        console.log(item)
                        return (
                            // <TouchableOpacity key={ index } onPress={ () => setDraggingIndex(index) }>
                            //     <View
                            //         style={ [styles.draggableItem, draggingIndex === index && styles.draggingItem] }
                            //         {...panResponder.panHandlers}
                            //     >
                            //         <Task 
                            //             key={ index } 
                            //             taskName={ item.taskName } 
                            //             index={ index } 
                            //             taskCompleted = { item.completedTask }
                            //             deleteTask={ () => deleteTask(index) }
                            //             completeTask={ () => completeTask(index) }
                            //         />
                            //     </View>
                            // </TouchableOpacity>
                            <Task 
                                key={ index } 
                                taskName={ item.taskName } 
                                index={ index } 
                                taskCompleted = { item.completedTask }
                                deleteTask={ () => deleteTask(index) }
                                completeTask={ () => completeTask(index) }
                            />
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

    draggableItem: {
        marginBottom: 8,
    },
    
    draggingItem: {
        opacity: 0.7,
    },
});

export default TaskWrapper;