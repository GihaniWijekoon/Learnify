import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { RootStackParamList } from "./Type";
import { StackNavigationProp } from '@react-navigation/stack';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

const UNSPLASH_API_KEY = 'H1pOf9FnXRXkAu6zCRW17pDPqyWiR17ablBQpLgLgHk'; // Replace with your Unsplash API key

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mySubjects, setMySubjects] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  type RouteParams = {
    username?: string;
  };

  const route = useRoute();
  const { username } = route.params as RouteParams;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setCategories(filtered);
  }, [searchText]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");
      const data = await Promise.all(
        response.data.trivia_categories.map(async (item: any) => {
          const imageUrl = await fetchImage(item.name);
          return {
            id: item.id.toString(),
            name: item.name,
            imageUrl: imageUrl,
          };
        })
      );
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchImage = async (categoryName: string) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${categoryName}&client_id=${UNSPLASH_API_KEY}`
      );
      const imageUrl = response.data.results[0]?.urls?.small;
      return imageUrl || "https://via.placeholder.com/100";
    } catch (error) {
      console.error("Error fetching image:", error);
      return "https://via.placeholder.com/100";
    }
  };

  const handleAddSubject = (category: Category) => {
    if (!mySubjects.some((subject) => subject.id === category.id)) {
      setMySubjects([...mySubjects, category]);
    }
  };

  const handleCardPress = (category: Category) => {
    navigation.navigate("QuizPage", { subjectId: category.id, subjectName: category.name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Hello, {username || "Guest"}</Text>
        <Text style={styles.subHeader}>What do you want to learn today?</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {/* All Subjects Section */}
      <Text style={styles.title}>All Subjects</Text>
      <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>
        {categories.map((category) => (
          <View key={category.id} style={styles.subjectCard}>
            <Image source={{ uri: category.imageUrl }} style={styles.cardImage} />
            <TouchableOpacity
              style={styles.addIconContainer}
              onPress={() => handleAddSubject(category)}
            >
              <Icon name="plus" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.cardTitle}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* My Subjects Section */}
      <Text style={styles.title}>My Subjects ({mySubjects.length})</Text>
      <FlatList
        data={mySubjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.mySubjectCard}
            onPress={() => handleCardPress(item)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <Text style={styles.mySubjectTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.cardList}
      />
      <View style={styles.bottomContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#f5f5f5",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 16,
    color: "#f5f5f5",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: '#343a40',
  },
  horizontalScroll: {
    flexDirection: "row",
    marginBottom: 16,
  },
  subjectCard: {
    width: 180,
    height: 150,
    marginRight: 20,
    alignItems: "center",
    position: "relative",
  },
  mySubjectCard: {
    width: 350, // Increased width for "My Subjects"
    height: 150,
    marginBottom: 16,
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    position: "absolute",
    zIndex: -1,
  },
  addIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 100,
    borderColor: "#000",
    padding: 6,
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 1,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cardList: {
    paddingBottom: 80,
  },
  bottomContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#0096c7",
    borderTopLeftRadius: 200,
    marginTop: 10,
    marginBottom: -20,
    marginHorizontal: -16,
  },
  mySubjectTitle: {
    fontSize: 20, // Increased font size for "My Subjects"
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center", // Center-align text
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    position: "absolute",
    zIndex: 1,
  },
});

export default HomePage;
