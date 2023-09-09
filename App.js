import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Ionicons, Fontisto } from "@expo/vector-icons";

import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "765ab5c0a723e005495e33153aaefecd";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    const jsonList = [
      json.list[0],
      json.list[8],
      json.list[16],
      json.list[24],
      json.list[32],
    ];
    console.log(jsonList);
    setDays(jsonList);
  };
  useEffect(() => {
    getWeather();
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더합니다.
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}월 ${day}일`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityText}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled // 페이지 단위로 스크롤
        horizontal // 가로 스크롤
        contentContainerStyle={styles.weather} // 스크롤 뷰의 스타일
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="black" size="large" />
          </View>
        ) : (
          days.slice(0, 5).map((day, i) => (
            <View key={i} style={styles.day}>
              <Text style={styles.date}>{formatDate(days[i].dt_txt)}</Text>
              <Text style={styles.tempText}>
                {days[i].main.temp.toFixed(1)}°C
              </Text>
              <Text style={styles.max_min_Text}>
                MAX : {days[i].main.temp_max}°C / MIN : {days[i].main.temp_min}
                °C
              </Text>
              <Text style={styles.humidityText}>
                💧{days[i].main.humidity}%{" "}
              </Text>
              <Text style={styles.weatherText}>{days[i].weather[0].main}</Text>
              <Text style={styles.descriptionText}>
                {days[i].weather[0].description}
              </Text>
              <View style={styles.icons}>
                <Fontisto name={icons[days[i].weather[0].main]} size={96} />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc423",
    justifyContent: "center", // vertical
  },

  city: {
    flex: 0.6,
    color: "black",
    justifyContent: "center", // vertical
    alignItems: "center", // horizontal
  },
  cityText: {
    fontSize: 48,
    fontWeight: "500",
    marginBottom: 0,
  },
  weather: {
    // flex: 8,
    color: "black",
  },
  day: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  date: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 0,
    // 좌우간 정중앙
    textAlign: "center",
  },
  tempText: {
    marginTop: 50,
    fontSize: 98,
    fontWeight: "bold",
    textAlign: "center",
  },
  weatherText: {
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
  humidityText: {
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 40,
  },
  descriptionText: {
    fontSize: 28,
    textAlign: "center",
  },
  max_min_Text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 40,
  },
  icons: {
    flex: 1,
    // 가로 정중앙
    alignItems: "center",
    // 세로 정중앙
    justifyContent: "center",
  },
});
