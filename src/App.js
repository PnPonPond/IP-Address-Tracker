import styled from "styled-components";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Map from "./Map";

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

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function App() {
  const [ip, setip] = useState("8.8.8.8");
  const [position, setPosition] = useState([51.505, -0.09]);
  const [location, setLocation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_hA9vw0XpQnaeDUXbahaxDW3XHl62V&ipAddress=${ip}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            console.log(result);
            setLocation(result);
            setPosition([result.location.lat, result.location.lng]);
          }
        },
        (error) => {
          alert(error);
        }
      );
  };
  console.log(position);

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
      <Map position={position} />
    </Container>
  );
}

export default App;
