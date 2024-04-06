import React, { useState } from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Practice() {
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [editIndex, setEditIndex] = useState(-1)

    const handleEdit = (index) => {
        setEditIndex(index)
        setTask(tasks[index])
    }

    const handleDelete = (index) => {
        let updatedList = [...tasks]
        updatedList.splice(index, 1)
        setTasks(updatedList)
    }
    const handleAddTask = () => {
        if (editIndex == -1) {
            setTasks([...tasks, task])
            setTask("")
        }
        else {
            let updateList = tasks
            updateList[editIndex] = task
            setTasks(updateList)
            setEditIndex(-1)
            setTask("")
        }
    }
    const handleTextInput = (task) => {
        setTask(task)
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: wp('80%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: hp('1%') }}>
                <Text style={{ height: hp('3%'), width: wp('50%') }}>{item}</Text>
                <TouchableOpacity onPress={() => handleEdit(index)}>
                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>ToDo List</Text>
            <TextInput style={{ height: hp('10%'), width: wp('80%'), borderColor: '#000', borderWidth: 1, marginVertical: hp('5%') }}
                defaultValue={task}
                onChangeText={str => handleTextInput(str)} />

            <Button title={editIndex == -1 ? 'Add Task' : 'Edit Task'} onPress={handleAddTask} />

            <FlatList
                style={{ height: hp('50%') }}
                data={tasks}
                renderItem={renderItem} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    headerText: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: hp('5%')
    },
    counterText: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold',
        fontSize: hp('3%')
    }
})