import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, Text, View } from "react-native";
import { Card, Title } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

export default function CardHotels({
  name,
  city,
  imgHotel,
  price,
  currency,
  rates,
  reviews,
}) {
  let hotelPhoto =
    imgHotel ??
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/282512224.jpg?k=042d99f7a6cb37dd9ed88c1ef0a1c5e7f50f75c1d5d51305297c0791bda77a04&o=";
  const getImgQuery = hotelPhoto.lastIndexOf("/");
  const urlImg = hotelPhoto.substring(getImgQuery + 1);

  const navigation = useNavigation();

  const handleToDetail = () => {
    navigation.navigate("Detail", {
      nameHotel: name,
      city,
      imgHotel: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/${urlImg}`,
      price,
      currency,
      rates,
      reviews,
    });
  };

  return (
    <Card className="my-3" onPress={handleToDetail}>
      <Card.Content className="p-0">
        <Image
          source={{
            uri: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/${urlImg}`,
          }}
          style={{
            height: 200,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        />
        <View className="px-3 py-2">
          <View className="flex flex-row items-center justify-between">
            <View>
              <Title className="font-bold max-w-[180px] leading-6">
                {name}
              </Title>
              <Title className="font-base text-sm max-w-[180px] mt-0">
                {city}
              </Title>
              <View className="flex-row">
                <AntDesign name="star" color="#FAC213" size={20} />
                <Text className="ml-1">
                  {rates} | {reviews ?? "Haven't Review Yet"}
                </Text>
              </View>
            </View>
            <View>
              <Text className="font-semibold text-xl text-green-700">
                {currency} {Number(price).toLocaleString()}
              </Text>
              <Text className="text-right">/per Night</Text>
            </View>
          </View>

          <Text className="font-light mt-2">
            <Entypo name="price-ribbon" color="#9336B4" size={20} />
            Room service
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}