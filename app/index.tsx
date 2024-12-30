import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router"; // Functionality imported from the first code

export default function HomeScreen() {
  const gotoSignup = () => {
    router.push("/signup"); // Navigates to the signup page
  };

  const gotoSignin = () => {
    router.push("/signin"); // Navigates to the signin page
  };

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imgContainer2}>
        <Image
          source={require("../assets/images/joinnow1.jpg")} // Updated to use your image
          style={styles.image}
        />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Learnify</Text>
        <Text style={styles.subtitle}>Empowering your journey to knowledge.</Text>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Join Now Button */}
          <TouchableOpacity onPress={gotoSignup} style={styles.joinButton}>
            <Text style={styles.buttonText}>Join Now</Text>
          </TouchableOpacity>

          {/* Already a member? */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Already on Learnify? </Text>
            <TouchableOpacity onPress={gotoSignin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imgContainer2: {
    flex: 2,
    marginHorizontal: "10%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "80%",
    marginTop: "30%",
  },
  textContainer: {
    flex: 2,
    marginHorizontal: "10%",
    justifyContent: "center",
  },
  title: {
    color: "#132939",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
    marginVertical: 10,
    marginTop: "-30%",
  },
  subtitle: {
    color: "#132939",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  bottomSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  joinButton: {
    backgroundColor: "#0096c7",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    color: "#132939",
    fontSize: 14,
  },
  loginText: {
    fontWeight: "bold",
    color: "#132939",
  },
});
