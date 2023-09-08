import React, { useCallback, useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [lati_long, setLati_long] = useState(null);
  const [city, setCity] = useState("Loading..."); // city[0].city

  const refetch = useCallback(async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );

      setLati_long({ latitude, longitude });
      if (location[0].city) setCity(location[0].city);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    refetch();
  }, []);

  return { lati_long, city, refetch };
};
export default useLocation;
