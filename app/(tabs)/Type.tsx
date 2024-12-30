export type RootStackParamList = {
    home: undefined; // Home screen does not take any params
    QuizPage: { subjectId: string; subjectName: string }; // QuizPage takes two params
  };