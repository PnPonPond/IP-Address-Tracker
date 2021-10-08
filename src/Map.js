import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map(position = [51.505, -0.09]) {
  return (
    <MapContainer
      center={position}
      zoom={6}
      scrollWheelZoom={true}
      whenCreated={(map) => map.flyTo(position)}
      style={{ height: "65vh", zIndex: "1" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup keepInView>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
