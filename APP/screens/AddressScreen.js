import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import jwt_decode from "jwt-decode";
import { UserType } from "../context/UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      // const token = await AsyncStorage.getItem("authToken");
      // const decodedToken = jwt_decode(token);
      // const userId = decodedToken.userId;
      // setUserId(userId);
    };

    fetchUser();
  }, []);

  console.log(userId);

  const handleAddAddress = () => {
    const address = {
      name,
      phone,
      address,
      city,
      pinCode,
    };

    axios
      .post("http://localhost:8000/api/user/address", { userId, address })
      .then((response) => {
        console.log("-=-=-");
        Alert.alert("Success", "Address added successfully");
        setName("");
        setMobileNo("");
        setAddress("");
        setPinCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add address");
        console.log("error", error);
      });
  };
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }} />

      <View style={{ padding: 10 }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full Name</Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your Name"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Phone number</Text>

          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Phone number"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Location, Flat, House No
          </Text>

          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>City, State</Text>
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pin-code</Text>

          <TextInput
            value={pinCode}
            onChangeText={(text) => setPinCode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Pin-code"
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFC72C",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
