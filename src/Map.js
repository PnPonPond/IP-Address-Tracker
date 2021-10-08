import styled from "styled-components";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { useMap } from "react-leaflet";
import iconL from "./icon-location.svg";

const Container = styled.div`
  height: 100vh;
  background-color: gray;
  position: relative;
`;

const SectionTop = styled.div`
  height: 35%;
  background-image: url("/img/pattern-bg.png");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
`;

const InputBox = styled.form`
  border-color: transparent;
  display: flex;
  margin-bottom: 100px;
`;

const Input = styled.input`
  width: 500px;
  padding: 20px 15px;
  border: 2px solid white;
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
  cursor: pointer;
`;

const Btn = styled.button`
  background-color: black;
  width: 20%;
  appearance: none;
  border: 2px solid #1a1a1a;
  cursor: pointer;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #292929;
  }
`;

const SectionMap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Card = styled.div`
  width: 80%;
  width: fit-content;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: absolute;
  z-index: 2;
`;

const CardTab = styled.div`
  padding: 20px;
`;

const TabTitle = styled.h5`
  color: gray;
  text-transform: uppercase;
`;

const CardLine = styled.div`
  width: 1px;
  height: 80px;
  background-color: gray;
  opacity: 0.3;
`;

const TabInfo = styled.h2``;

function Map() {
  const [ip, setip] = useState("8.8.8.8");
  const [location, setLocation] = useState(null);
  const [lat, setLat] = useState(50.5);
  const [lng, setLng] = useState(30.5);

  let DefaultIcon = L.icon({
    iconUrl: iconL,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const Fetch = () => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_hA9vw0XpQnaeDUXbahaxDW3XHl62V&ipAddress=${ip}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
        setLat(data.location.lat);
        setLng(data.location.lng);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_hA9vw0XpQnaeDUXbahaxDW3XHl62V&ipAddress=${ip}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLocation(data);
        setLat(data.location.lat);
        setLng(data.location.lng);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [ip]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Fetch();
  };

  function ChangeView(position) {
    const map = useMap();
    map.setView([lat, lng], 13);
    return null;
  }

  return (
    <Container>
      <SectionTop>
        <Title>IP Address Tracker</Title>
        <InputBox onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Search for any IP address or domain"
            onChange={(e) => setip(e.target.value)}
          ></Input>
          <Btn type="submit">
            <img src="/img/icon-arrow.svg" alt="icon-arrow" />
          </Btn>
        </InputBox>
      </SectionTop>
      <SectionMap>
        <Card>
          <CardTab>
            <TabTitle>IP Address</TabTitle>
            <TabInfo>{location ? location.ip : ""}</TabInfo>
          </CardTab>
          <CardLine />
          <CardTab>
            <TabTitle>Location</TabTitle>
            <TabInfo>
              {location
                ? `${location.location.region},${location.location.country} ${location.location.postalCode}`
                : ""}
            </TabInfo>
          </CardTab>
          <CardLine />
          <CardTab>
            <TabTitle>Timezone</TabTitle>
            <TabInfo>{location ? location.location.timezone : ""}</TabInfo>
          </CardTab>
          <CardLine />
          <CardTab>
            <TabTitle>isp</TabTitle>
            <TabInfo>{location ? location.isp : ""}</TabInfo>
          </CardTab>
        </Card>
      </SectionMap>
      {lat != null && lng != null && (
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: " 65vh", zIndex: "1" }}
        >
          <ChangeView />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}></Marker>
        </MapContainer>
      )}
    </Container>
  );
}

export default Map;
