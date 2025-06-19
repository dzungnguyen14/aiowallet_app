import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

const HAS_SHOW_INTRO_KEY = "has_show_intro";

export default function IntroScreen() {
  const [isIntro, setIsIntro] = useState(true);
  
  const getInfo = async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value;
  };

  const setInfo = async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  };
  const hasShowIntro = async () => {
    const hasShowIntro = await getInfo(HAS_SHOW_INTRO_KEY);
    if (hasShowIntro && hasShowIntro === "1") {
      setIsIntro(false);
    }
  };
  const handleIntro = () => {
    setInfo(HAS_SHOW_INTRO_KEY, "1");
    setIsIntro(false);
  };

  useEffect(() => {
    // hasShowIntro();
  }, []);



  return (
    <View style={styles.container}>
      {isIntro && (
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/frame.png")}
            style={styles.logo}
          />
          <View style={styles.introTextContainer}>
            <Text style={styles.WhiteLargeText}>Bắt đầu cùng Alowallet</Text>
            <Text style={styles.WhiteSmallText}>
              Ứng dụng quản lý bán hàng thông minh <Text style={styles.HighlightTextBold}>Số 1 Việt Nam</Text>
            </Text>
            <Text style={styles.WhiteSmallText}>
              Được tin dùng bởi <Text style={styles.HighlightTextBold}>hơn 600.000</Text> chủ kinh doanh
            </Text>
          </View>
          <View style={styles.ListFeatureContainer}>
            <View style={styles.ListFeatureItem}>
              <Ionicons name="list-outline" size={18} color="white" />
              <Text style={styles.ListFeatureItemText}>Hơn <Text style={styles.HighlightTextBold}>50 tính năng</Text> quản lý dễ sử dụng</Text>
            </View>
            <View style={styles.ListFeatureItem}>
              <Ionicons name="phone-portrait-outline" size={18} color="white" />
              <Text style={styles.ListFeatureItemText}><Text style={styles.HighlightTextBold}>Không cần</Text> đầu tư thiết bị</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleIntro}>
          <LinearGradient
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#C6EA8D', '#61C454']}
            >
              <Text style={styles.buttonText}>Bắt đầu ngay!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {!isIntro && (
        <View style={styles.page} key="2">
          <WebView
            source={{ uri: "https://lab.alowallet.net/auth/sign-in" }}
            style={styles.webViewContainer}
          />
        </View>
      )}
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
  webViewContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(74, 144, 226, 1)",
    height: Dimensions.get("window").height,
  },
  logo: {
    width: Dimensions.get("window").width * 0.8,
    height: 400,
  },
  introTextContainer: {
    gap: 10,
  },
  WhiteLargeText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 20
  },
  WhiteSmallText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  ListFeatureContainer: {
    gap: 10,
    marginTop: 30,
  },
  ListFeatureItemImage: {
    width: 20,
    height: 20,
  },
  ListFeatureItemText: {
    fontSize: 16,
    color: "white",
  },
  HighlightTextBold: {
    fontWeight: "bold",
  },
  ListFeatureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    borderWidth: 0.5,
    borderColor: "gray",
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});
