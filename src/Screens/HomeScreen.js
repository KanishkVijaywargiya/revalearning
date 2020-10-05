import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import GridImage from "../Components/GridImages.js";
import Header from "../Components/Header.js";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

class HomeScreen extends Component {
  state = {
    courseslist: [],
  };
  componentDidMount() {
    this.courselist();
  }
  courselist = async () => {
    var listref = await firebase
      .database()
      .ref("courses/")
      .on("value", (dataSnapshot) => {
        let val = dataSnapshot.val();
        console.log("VALUE::", val);

        if (val !== null) {
          let subjectList = Object.values(val);
          this.setState({
            courseslist: subjectList,
          });
        } else {
          this.setState({
            courseslist: [],
          });
        }
        console.log("courselist::", this.state.courseslist);
      });
  };
  render() {
    return (
      <View style={{ backgroundColor: "#F9DDA4", flex: 1 }}>
        <Header title="REVA University" color="#F3B431" />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? hp("4%") : hp("2%"),
            left: Platform.OS === "ios" ? hp("2%") : hp("2%"),
          }}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Icon name="ios-menu" size={40} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#121212",
            textTransform: "uppercase",
            fontWeight: "bold",
            padding: 20,
            letterSpacing: 1,
            fontSize: 30,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          Courses
        </Text>
        <ScrollView style={{ marginTop: 10 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {this.state.courseslist.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  this.props.navigation.navigate("DetailScreen", {
                    content: item,
                  })
                }
              >
                <GridImage
                  image={{ uri: item.image }}
                  text={item.name}
                  para={item.para}
                  width={width / 3 - 10}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default HomeScreen;
