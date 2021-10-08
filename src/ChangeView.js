import { useMap } from "react-leaflet";

export function ChangeView(position) {
  const map = useMap();
  map.setView(position, 13);
  return null;
}
