import { useState } from "react"
import { Keyboard, TextInput } from "react-native"
import { StyleSheet } from "react-native"
import { Platform } from "react-native"
import { Text } from "react-native"
import { View } from "react-native"
import { TouchableOpacity } from "react-native"
import { KeyboardAvoidingView } from "react-native"

type AddTaskFunction = (task: string) => void

const TaskForm: React.FC<{ addTask: AddTaskFunction }> = ({ addTask }) => {
    const [task, setTask] = useState<string>('')

    const handleAddTask = () => {
        addTask(task)
        setTask('')
    }
    
    return (
        <KeyboardAvoidingView 
            behavior={ Platform.OS === "ios" ? "padding" : "height" }
            style={ styles.writeTaskWrapper }
        >
            <TextInput 
            style={ styles.input } 
            placeholder='Write a Task!' 
            value={ task }
            onChangeText={ (text: string) => setTask(text) } 
            />

            <TouchableOpacity
            onPress={ () => handleAddTask() }
            >
                <View style={ styles.addWrapper }>
                    <Text style={ styles.addText }>+</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: 250,
        backgroundColor: '#FFF',
        borderRadius: 15,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },

    addText: {

    },
})

export default TaskForm;