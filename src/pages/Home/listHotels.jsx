import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { ActivityIndicator, Appbar, MD2Colors } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CardHotels from "../../components/Cards/card-hotels";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { fetchDataList } from "../../redux/slices/slice-list";
import List from "../../utils/API/properties/list";
import {
  fetchDataLocation,
  updateIdSearch,
} from "../../redux/slices/slice-search";
import searchLocations from "../../utils/API/search/locations";
import { checkIn, checkOut } from "../../utils/Date/checkIn-checkOut";

export default function ListHotels() {
  const dispatch = useDispatch();
  const dataSearch = useSelector((state) => state.search);
  const { data, loading } = useSelector((state) => state.list);

  const navigation = useNavigation();
  const route = useRoute();
  const { searchQuery, id } = route.params;
  const guest = 2;

  // Change This tobe your actions
  const handleBack = () => {
    navigation.navigate("Home");
  };

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const existDataFetch = data?.result?.filter((hotel) => {
    if (
      dataSearch.data[0]?.country === hotel?.country_trans &&
      typeof searchQuery === "string"
    ) {
      return data.result;
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataSearch.data.length != 0 || data.length == 0) {
          await delay(1000);
          dispatch(
            fetchDataList(
              List(
                checkIn,
                checkOut,
                (dest_ids = dataSearch.data[0]?.dest_id),
                (dest_type = dataSearch.data[0]?.dest_type),
                (guest_qty = guest)
              )
            )
          );
        } else if (dataSearch.data.length == 0) {
          dispatch(fetchDataLocation(searchLocations(id)));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (
      searchQuery !== dataSearch.id ||
      dataSearch.id === "" ||
      existDataFetch === undefined ||
      existDataFetch.length == 0
    ) {
      fetchData();
      dispatch(updateIdSearch(searchQuery));
    }
  }, [dataSearch, id]);

  console.log(existDataFetch);
  console.log("id", dataSearch.id);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="keyboard-backspace" onPress={handleBack} />
        <Appbar.Content
          title={
            <Text className="text-lg">
              <MaterialCommunityIcons name="cards-outline" size={26} />
              Stay
              <Text className="text-purple-700 font-semibold">Doors</Text>{" "}
            </Text>
          }
          mode="center-aligned"
          style={{ alignItems: "center" }}
        />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <ScrollView>
        <SafeAreaView className="px-2">
          <Text className="text-[30px] text-center font-bold">
            {searchQuery}
          </Text>
          <Text className="text-[14px] text-center font-base">
            Choose your hotels
          </Text>
          {existDataFetch == undefined ||
          existDataFetch.length == 0 ||
          loading ? (
            <View className="mt-36">
              <ActivityIndicator
                animating={true}
                size={"large"}
                color={MD2Colors.purple500}
              />
              <Text className="text-[20px] mt-2 text-slate-500 text-center font-bold">
                Loading!
              </Text>
            </View>
          ) : existDataFetch.length == 0 ? (
            <View className="mt-36">
              <Image
                source={require("../../../assets/not-found.png")}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
              />
              <Text className="text-[20px] mt-2 text-slate-500 text-center font-bold">
                I'm sorry your destination is not Found!
              </Text>
            </View>
          ) : (
            existDataFetch?.map((hotel, index) => (
              <CardHotels
                key={index}
                name={hotel?.hotel_name}
                city={hotel?.city}
                imgHotel={hotel?.main_photo_url}
                price={hotel?.price_breakdown?.gross_price}
                currency={hotel?.price_breakdown?.currency}
                reviews={hotel?.review_score_word}
                rates={hotel?.review_score}
                Guest={guest}
              />
            ))
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
