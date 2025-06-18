import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { WebView } from 'react-native-webview';

export default function IntroScreen() {
  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0}>
        <View style={styles.page} key="1">
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/frame.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.dotContainer}>
            <View style={styles.activeDot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
          <View style={styles.dotContainer}>
            <View style={styles.dot} />
            <View style={styles.activeDot} />
            <View style={styles.dot} />
          </View>
        </View>
        <View style={styles.page} key="3">
          <WebView
            source={{ uri: "https://lab.alowallet.net/auth/sign-in" }}
            style={styles.webViewContainer}
          />
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  page: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  dotContainer: {
    position: "absolute",
    bottom: 50,
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  webViewContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.7,
    resizeMode: "contain",
  },
});
