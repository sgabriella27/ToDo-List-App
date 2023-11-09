import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type DeleteTaskFunction = (index: number) => void
type CompleteTaskFunction = (index: number) => void

interface DeleteTaskProp {
    taskName: string,
    index: number,
    taskCompleted: boolean,
    deleteTask: DeleteTaskFunction,
    completeTask: CompleteTaskFunction,
}

const Task: React.FC<DeleteTaskProp> = ({ index, taskName, taskCompleted, completeTask, deleteTask }) => {
    return (
        <TouchableOpacity onPress={ () => completeTask(index) }>
            <View style={ styles.item }>
                <View style={ styles.itemLeft }>
                    <View style={ styles.bullet }></View>
                    <Text style={ taskCompleted ? styles.itemTextCompleted : styles.itemText }>{ taskName }</Text>
                </View>
                <Icon 
                    name="trash" 
                    size={ 21 } 
                    color="red" 
                    style={ styles.trashIcon } 
                    onPress={ () => deleteTask(index) }    
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    bullet: {
        width: 18,
        height: 18,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 100,
        marginRight: 15,
    },

    itemText: {
        maxWidth: '80%',
        fontSize: 20,
    },

    itemTextCompleted: {
        maxWidth: '80%',
        fontSize: 20,
        textDecorationLine: 'line-through'
    },

    trashIcon: {
        marginRight: 15,
    },
})

export default Task;