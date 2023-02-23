// import React, { useState, useEffect, useRef } from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// function GoogleMapsComponent({ apiKey }) {
//   const [map, setMap] = useState(null);
//   const [marker, setMarker] = useState(null);
//   const mapRef = useRef(null);

//   // Load the Google Maps API script and create the map and marker when it's ready
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//     script.onload = () => {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 37.7749, lng: -122.4194 },
//         zoom: 13,
//       });
//       const marker = new window.google.maps.Marker({
//         position: { lat: 37.7749, lng: -122.4194 },
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
