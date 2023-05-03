// import React, { useState, useEffect, useRef } from "react";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// function GoogleMapsComponent({ props, apiKey }) {
//   const [map, setMap] = useState(null);
//   const [marker, setMarker] = useState(null);
//   const [address, setAddress] = useState("");
//   const mapRef = useRef(null);

//   // Load the Google Maps API script and create the map and marker when it's ready
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6JRXqRrT7Xa8d4UQIIMWIh5vvrRpNlk8`;
//     script.onload = () => {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 40.94166970175866, lng: 24.414645635986343 },
//         zoom: 13,
//       });
//       const marker = new window.google.maps.Marker({
//         position: { lat: 40.94166970175866, lng: 24.414645635986343 },
//         map: map,
//         draggable: true,
//       });
//       setMap(map);
//       setMarker(marker);
//     };
//     document.body.appendChild(script);
//   }, [apiKey]);

//   // Update the marker's position when it's dragged
//   useEffect(() => {
//     if (marker) {
//       const listener = marker.addListener("dragend", () => {
//         const position = marker.getPosition();

//         const geocoder = new window.google.maps.Geocoder();
//         geocoder.geocode({ location: position }, (results, status) => {
//           if (status === "OK") {
//             handleAddressChange(results[0].formatted_address);
//             console.log(results[0].formatted_address);
//           } else {
//             console.error("Geocode failed due to: " + status);
//           }
//         });

//         console.log(position.lat(), position.lng());
//       });
//       return () => {
//         window.google.maps.event.removeListener(listener);
//       };
//     }
//   }, [marker]);

//   return <div style={{ width: "100%", height: "400px" }} ref={mapRef}></div>;
// }

// export default GoogleMapsComponent;
