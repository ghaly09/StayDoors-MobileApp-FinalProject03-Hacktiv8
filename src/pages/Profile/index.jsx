import React, { useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ItemBooked } from "../../components/Profile/ItemBooked";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Appbar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Profile() {
  const booked = useSelector((state) => state.booked.booked);
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  useEffect(() => {}, [booked]);

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Action
          icon="keyboard-backspace"
          onPress={() => navigation.navigate("Home")}
        />
        <Appbar.Content
          title={
            <Text className="text-lg">
              <MaterialCommunityIcons name="cards-outline" size={26} />
              <Text className="text-purple-700 font-semibold">Profile</Text>
            </Text>
          }
          mode="center-aligned"
          style={{ alignItems: "center" }}
        />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <View className="py-5 px-4">
        <View className="h-25 flex-row justify-between">
          <Image
            source={{
              uri: user.imgUrl,
              width: 100,
              height: 100,
            }}
            className="rounded-xl"
          />
          <View className="justify-center items-center grow">
            <Text className="font-bold text-2xl">{`${user?.firstName} ${user?.lastName}`}</Text>
            <Text className="text-base">{user?.email}</Text>
          </View>
        </View>
        <View className="my-8 p-5 flex-row justify-between border-t-2 border-b-2 border-gray-300">
          <View className="items-center">
            <Text className="font-bold text-base">Bookings</Text>
            <Text className="font-bold" style={{ color: "#1B9C85" }}>
              {booked.length}
            </Text>
          </View>
          <View className="items-center">
            <Text className="font-bold text-base">Reviews</Text>
            <Text className="font-bold" style={{ color: "#1B9C85" }}>
              0
            </Text>
          </View>
          <View className="items-center">
            <Text className="font-bold text-base">Favorites</Text>
            <Text className="font-bold" style={{ color: "#1B9C85" }}>
              0
            </Text>
          </View>
        </View>
        <View>
          {booked.length > 0 ? (
            booked.map((item) => (
              <ItemBooked
                key={item.data.id}
                img={item.data.img}
                title={item.data.title}
                location={item.data.location}
                rate={item.data.rate}
                currency={item.data.currency}
                price={item.data.price}
                guest={item.data.guest}
              />
            ))
          ) : (
            <View className="flex items-center">
              <Image
                source={require("../../../assets/not-found.png")}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
              />
              <Text className="text-slate-500 font-bold">
                Oops! you haven't Booking yet!
              </Text>
            </View>
          )}
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
