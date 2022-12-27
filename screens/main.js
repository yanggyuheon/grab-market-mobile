import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import Avatar from "../assets/icons/avatar.png";
import { API_URL } from "../config/constants";
import axios from "axios";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 영어 => 한글
// import Carousel from "react-native-snap-carousel";

dayjs.extend(relativeTime);
dayjs.locale("ko"); // 영어 => 한글

export default function MainScreen(props) {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        setBanners(result.data.banners);
      })
      .catch((error) => {
        console.error(console.error());
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Carousel
            data={banners}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            itemHeight={200}
            renderItem={(obj) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("배너 클릭");
                  }}
                >
                  <Image
                    style={styles.bannerImage}
                    source={{ uri: `${API_URL}/${obj.item.imageUrl}` }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            }}
          /> */}
        <Text style={styles.headline}>판매되는 상품들</Text>
        <View style={styles.productList}>
          {products.map((product, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  props.navigation.navigate("Product", {
                    id: product.id,
                  });
                }}
              >
                <View style={styles.productCard} key={index}>
                  {product.soldout === 1 && <View style={styles.productBlur} />}
                  <View>
                    <Image
                      style={styles.productImage}
                      source={{
                        uri: `${API_URL}/${product.imageUrl}`,
                      }}
                      resizeMode={"contain"}
                    />
                  </View>
                  <View style={styles.productContents}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}원</Text>
                    <View style={styles.productFooter}>
                      <View style={styles.productSeller}>
                        <Image style={styles.productAvatar} source={Avatar} />
                        <Text style={styles.productSellerName}>
                          {product.seller}
                        </Text>
                      </View>
                      <Text style={styles.productDate}>
                        {dayjs(product.createdAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex", //  default: 수직 자동 적용되어 있음, 수평정렬시 수정
    flex: 1,
    backgroundColor: "#fff",
  },
  productCard: {
    width: 320,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "white",
    marginBottom: 8,
  },
  productImage: {
    width: "100%",
    height: 210,
  },
  productContents: {
    padding: 8,
  },
  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  productAvatar: {
    width: 24,
    height: 24,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
  },
  productList: {
    alignItems: "center",
  },
  headline: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 24,
  },
  productBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffffaa",
    zIndex: 999, // 최상단으로
  },
  bannerImage: {
    width: "100%",
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});