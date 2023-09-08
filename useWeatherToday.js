import { useState, useEffect, useCallback } from "react";

const useWeatherToday = (lat, lon, API_KEY) => {
  const [weatherToday, setWeatherToday] = useState(null);
  const [error, setError] = useState(null);
  // refetch는 useCallback을 사용하여 함수를 재사용할 수 있게 해준다.
  const refetch = useCallback(async () => {
    const response2 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    setWeatherToday(await response2.json());
  }, [lat, lon]);

  useEffect(() => {
    if (lat && lon) refetch();
  }, [lat, lon, refetch]);

  return { weatherToday, refetch };
};
export default useWeatherToday;
