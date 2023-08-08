import { Polygon } from 'react-leaflet';
import bounds from "../utils/bounds"

const redColor = { color: '#D5212A' };

const Bounds = () => {
return (
    <Polygon
        positions={bounds}
        pathOptions={ redColor }
    />
);
};

export default Bounds;