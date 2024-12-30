import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./Type";
import { RouteProp } from "@react-navigation/native";

type QuizPageRouteProp = RouteProp<RootStackParamList, "QuizPage">;

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options: string[];
}

const QuizPage: React.FC = () => {
 const route = useRoute();
  const { subjectId, subjectName } = route.params as RootStackParamList['QuizPage'];

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${subjectId}&type=multiple`);
      const data = await response.json();

      const formattedQuestions = data.results.map((item: any) => ({
        question: item.question,
        correct_answer: item.correct_answer,
        incorrect_answers: item.incorrect_answers,
        options: shuffleOptions([item.correct_answer, ...item.incorrect_answers]),
      }));

      setQuestions(formattedQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setIsLoading(false);
    }
  };

  const shuffleOptions = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);

    if (option === questions[currentQuestionIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }

    // Move to the next question after a short delay
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // End of quiz
        alert(`Quiz Completed! Your score: ${score + (option === questions[currentQuestionIndex].correct_answer ? 1 : 0)}/${questions.length}`);
      }
    }, 1000);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No questions available for this category.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Subject Name */}
      <Text style={styles.subjectName}>{subjectName}</Text>
      </View>
      <Text style={styles.questionCount}>
        Question {currentQuestionIndex + 1} / {questions.length}
      </Text>
      <Text style={styles.questionText}>{decodeURIComponent(currentQuestion.question)}</Text>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option
                ? option === currentQuestion.correct_answer
                  ? styles.correctOption
                  : styles.incorrectOption
                : null,
            ]}
            onPress={() => handleAnswerSelect(option)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.optionText}>{decodeURIComponent(option)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#0096c7",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 150,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: -15,
    marginTop: -15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color:"#f5f5f5"
  },
  questionCount: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color:"#03045e",
  },
  questionText: {
    fontSize: 18,
    fontWeight:"500",
    marginBottom: 20,
    color:"#495057"
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  correctOption: {
    backgroundColor: "#4CAF50",
  },
  incorrectOption: {
    backgroundColor: "#F44336",
  },
  optionText: {
    fontSize: 16,
    color:'#1b263b',
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  bottomContainer: {
    position: "absolute", // Position the container absolutely
    bottom: 0, // Attach to the bottom of the screen
    width: "120%", // Ensure it spans the full width of the screen
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#0096c7",
    borderTopLeftRadius: 200,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow direction
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 10, // Shadow blur radius
  },  
});

export default QuizPage;
