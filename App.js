import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";

const styles = StyleSheet.create({
    container: {
        padding:20,
        flex: 1,
    },
    questionBox: {
        marginBottom: 20,
    },

    image: {
        width: '100%',
        height: 200,
        borderWidth: 3,
        borderColor: 'pink',
    },
    touchableText: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 10,
        fontSize: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: 'thin',
        fontStyle: 'italic',
        flex:1,
        color:'#d9539f',
        textAlign: 'center',
    },
    icon:{
        marginTop:20,
        marginBottom:15,
        alignItems: 'center',
        flexDirection: 'row',
        flex:1,
        color:'#d9539f',

    },
    question:{
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textTransform: 'uppercase',
        color:'black',
        textAlign: 'center',
        backgroundColor:'pink',
    },

    pickerInput:{
        backgroundColor: '#e0e0e0',
        borderWidth: 2,
        borderColor: 'black',
    },

});


const QuestionBox = ({ label, image, options, selectedValue, onValueChange }) => {
    return (
        <ScrollView style={styles.questionBox}>
            <Image source={image} style={styles.image} />
            <Text style={styles.question}>{label}</Text>

            <View style={styles.pickerInput}>
                <RNPickerSelect
                onValueChange={onValueChange}
                items={options.map(option => ({ label: option, value: option }))}
                value={selectedValue}
                placeholder={{ label: 'Select an answer', value: null }}/>
            </View>
        </ScrollView>
    );
};


const App = () => { // Wrap everything in the App component function
    const questions = [
        {
            label: 'What animal is this?',
            image: require('./img/rabbit.jpg'),
            options: ['Elephant', 'Tiger', 'Rabbit'],
            correctAnswer: 'Rabbit',
        },
        {
            label: 'What animal is this?',
            image: require('./img/squirrel.jpg'),
            options: ['Giraffe', 'Squirrel', 'Deer'],
            correctAnswer: 'Squirrel',
        },
        {
            label: 'What animal is this?',
            image: require('./img/deer.jpg'),
            options: ['Hummingbird', 'Deer', 'Peacock'],
            correctAnswer: 'Deer',
        },
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    const handleAnswerChange = (value, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const calculateScore = () => {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                score += 1;
            }
        });
        return score;
    };

    const handleSubmit = () => {
        const score = calculateScore();
        Alert.alert(`You have ${score} correct answer(s)!`);
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 30, flexGrow: 1 }}>
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.icon}>
                    <Icon name="paw" size={30} color="#d9539f" />
                    <Text style={styles.title}>Shannon's Quiz</Text>
                    <Icon name="paw" size={30} color="#d9539f" />
                </View>
                {questions.map((question, index) => (
                    <QuestionBox
                        key={index}
                        image={question.image}
                        label={question.label}
                        options={question.options}
                        selectedValue={answers[index]}
                        onValueChange={(value) => handleAnswerChange(value, index)}
                    />
                ))}
                <Button title="Submit Answers" onPress={handleSubmit} />
                <TouchableOpacity onPress={() => ToastAndroid.show("Good luck!", ToastAndroid.SHORT)}>
                    <Text style={styles.touchableText}>Good Luck!</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default App; //
