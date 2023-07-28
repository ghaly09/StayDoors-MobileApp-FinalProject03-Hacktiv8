import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Favorites from "../../pages/Favorites";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import { useSelector } from "react-redux";
import Login from "../../pages/Login";
import Settings from "../../pages/Settings";

const Tab = createMaterialBottomTabNavigator();

export default function Navbar() {
  // const auth = useSelector((state) => state.auth);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <AntDesign name="home" size={26} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: "Favorite",
          tabBarIcon: () => <MaterialIcons name="favorite-border" size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => <AntDesign name="user" size={26} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: () => <AntDesign name="setting" size={26} />,
        }}
      />

      {/* {auth.isAuthenticated ? (
        <>
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: () => <AntDesign name="user" size={26} />,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: () => <AntDesign name="setting" size={26} />,
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarLabel: "Sign In",
            tabBarIcon: () => <MaterialIcons name="login" size={26} />,
          }}
        />
      )} */}
    </Tab.Navigator>
  );
}
