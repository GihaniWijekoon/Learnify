import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, SafeAreaView, ScrollView, View, TextInput } from "react-native";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleSignin = () => {
    setErrors({ username: "", password: "" });

    let isValid = true;
    if (!username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      isValid = false;
    } else if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      isValid = false;
    }

    if (isValid) {
      router.push(`/home?username=${username}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Image style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
          </View>

          {/* Wrap the form and sign-in button inside a shadow container */}
          <View style={styles.formContainer}>
            
          <Text style={styles.textMain}>
              SignIn
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Name"
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              {errors.username ? (
                <Text style={styles.errorText}>{errors.username}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            <View style={{ marginHorizontal: 50 }}>
              <TouchableOpacity style={styles.button} onPress={handleSignin}>
                <Text style={styles.buttonText}>SignIn</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: 5 }}>
              <Text style={styles.textBottom}>
                Don't You Have an Account?{" "}
                <Link href={"/signup"}>
                  <Text style={styles.textBottomClick}>
                    Create Account
                  </Text>
                </Link>
              </Text>
            </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  scrollContent: {
    padding: 16,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 45,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%",
    marginTop: 30,
    borderColor: "#03045e",
  },
  button: {
    marginTop: 35,
    backgroundColor: "#0096c7",
    paddingHorizontal: 30,
    borderRadius: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    height: 100,
    width: 200,
    margin: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  textMain: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: "bold",
    
  },
  textSec: {
    fontSize: 20,
  },
  textBottom: {
    fontSize: 14,
    margin: 7,
  },
  textBottomClick: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Signin;
