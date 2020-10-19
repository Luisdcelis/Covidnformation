import React from "react";
import { useGoogleMaps } from "react-hook-google-maps";

const Mapa = () => {
  const { ref, map, google } = useGoogleMaps(
    // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
    "AIzaSyB5B2LDlRFF6Y3CyneqtG-niqpRR_hOkJk",
    // NOTE: even if you change options later
    {
      center: { lat: 36.467518, lng: -6.202644 },
      zoom: 11,
    }
  );

  if (map) {
    new google.maps.Marker({
      position: { lat: 36.467518, lng: -6.202644 },
      map,
    });
  }
  return <div ref={ref} style={{ height: 600 }} />;
};
export default Mapa;
