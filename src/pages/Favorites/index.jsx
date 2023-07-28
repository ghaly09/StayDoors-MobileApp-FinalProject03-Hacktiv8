import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, View, Image } from "react-native";
import { Appbar, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CardHotels from "../../components/Cards/card-hotels";
import { useSelector } from "react-redux";

export default function Favorites() {
  const navigation = useNavigation();
  const { items } = useSelector((state) => state.favorite);

  const handleBack = () => {
    navigation.navigate("Home");
  };

  console.log(items.length);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="keyboard-backspace" onPress={handleBack} />
        <Appbar.Content
          title={
            <Text className="text-lg">
              <MaterialCommunityIcons name="cards-outline" size={26} />
              Favo
              <Text className="text-purple-700 font-semibold">rites</Text>{" "}
            </Text>
          }
          mode="center-aligned"
          style={{ alignItems: "center" }}
        />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <ScrollView>
        {items.length === 0 ? (
          <View className="flex items-center mt-40">
            <Image
              source={require("../../../assets/not-found.png")}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
            <Text className="text-slate-500 font-bold">
              Oops! you have no Favorites yet!
            </Text>
          </View>
        ) : (
          <View className="px-3">
            {items?.map((item, index) => (
              <CardHotels
                key={index}
                name={item?.nameHotel}
                city={item?.city}
                imgHotel={item?.imgHotel}
                price={item?.price}
                currency={item?.currency}
                reviews={item?.rates}
                rates={item?.reviews}
                Guest={item?.Guest}
                Saved={item?.Saved}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
