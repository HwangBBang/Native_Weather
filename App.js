import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Dimensions, Text, View } from "react-native";
import useWeatherToday from "./useWeatherToday";
import useLocation from "./useLocation";

// import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
// useWeatherToday(Hook)은 함수 컴포넌트에서 React state 와 생명주기 기능을 연동할 수 있게 해주는 함수이다.

//Dimesions 은 화면의 크기를 알려준다.
const SCREEN_WIDTH = Dimensions.get("window").width;
const API_KEY = "765ab5c0a723e005495e33153aaefecd";

////////////////////////////////////////////////
export default function App() {
  const [today, setToday] = useState([]);
  const { lati_long, city, refetch: refetchLocation } = useLocation();

  const { weatherToday, refetch: refetchWeather } = useWeatherToday(
    lati_long?.latitude,
    lati_long?.longitude,
    API_KEY
  );

  useEffect(() => {
    if (lati_long && weatherToday) {
      setToday(weatherToday);
    }
  }, [lati_long, weatherToday]);

  console.log("today: ", today);
  console.log("lati_long: ", lati_long);
  // API 호출 순서 getLocaion -> getWeather -> render
  // 호출 할 때 까지좀 기다리고 싶음.
  //
  function showValue(value) {
    if (value === "Loading...") {
      return "Loading...";
    }
    return (value / 10).toFixed(1);
  }
  function convertTime(value) {
    const dataObject = new Date(value * 1000);
    return dataObject.toDateString();
  }
  function isExist(value) {
    value ? value : "Loading...";
  }

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityText}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled // 페이지 단위로 스크롤
        horizontal // 가로 스크롤
        // showsHorizontalScrollIndicator={false} // 스크롤 바 안보이게
        contentContainerStyle={styles.weather} // 스크롤 뷰의 스타일
      >
        <View style={styles.day}>
          {/* 현재  */}
          <Text style={styles.tempText}>{convertTime(today.dt)}</Text>

          <Text style={styles.tempText}>
            {isExist(showValue(today.main.temp))}°C
          </Text>
          <Text style={styles.max_min_Text}>
            MAX : {isExist(showValue(today.main.temp_max))}°C / MIN :{" "}
            {isExist(showValue(today.main.temp_min))}°C
          </Text>
          <Text style={styles.weatherText}>
            {isExist(today.weather[0].main)}
          </Text>
          <Text style={styles.weatherText}>
            💧{isExist(today.main.humidity)}%{" "}
          </Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.tempText}>27°C </Text>
          <Text style={styles.weatherText}>Sunny </Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.tempText}>27°C </Text>
          <Text style={styles.weatherText}>Sunny </Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.tempText}>27°C </Text>
          <Text style={styles.weatherText}>Sunny </Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.tempText}>27°C </Text>
          <Text style={styles.weatherText}>Sunny </Text>
        </View>
      </ScrollView>
      <StatusBar style="black" />
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
    flex: 1,
    color: "black",
    justifyContent: "center", // vertical
    alignItems: "center", // horizontal
  },
  cityText: {
    fontSize: 48,
    fontWeight: "500",
  },
  weather: {
    // flex: 8,

    color: "black",
  },
  day: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  tempText: {
    marginTop: 50,
    fontSize: 98,
    fontWeight: "bold",
    marginLeft: 40,
  },
  weatherText: {
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 40,
  },
  max_min_Text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 40,
  },
});
///////////////////////////////////////////////
//requestPermissionAsync() : 사용자에게 위치 정보를 얻어오는 권한을 요청하는 함수
//getCurrentPositionAsync() : 현재 위치를 얻어오는 함수
//geocodeAsync() : 주소를 위도, 경도로 변환해주는 함수
//reverseGeocodeAsync() : 위도, 경도를 주소로 변환해주는 함수
///////////////////////////////////////////////
// const getWeather = async () => {

//   const response1 = await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${lati_long.latitude}&lon=${lati_long.longitude}&appid=${API_KEY}`
//   );
//   const json1 = await response1.json();
//   setDays(
//     json1.list.filter((weather) => {
//       if (weather.dt_txt.includes("15:00:00")) return weather;
//     })
//   );
// console.log(days[0].main.temp);const { weatherToday, refetch } = useWeatherToday();

///////////////////////////////////////////////
