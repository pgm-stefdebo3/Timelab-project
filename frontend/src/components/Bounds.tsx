import { Polygon } from 'react-leaflet';
import bounds from "../utils/bounds"

const grayColor = { color: '#777' };

const Bounds = () => {
return (
    <Polygon
        positions={bounds}
        pathOptions={ grayColor }
    />
);
};

export default Bounds;