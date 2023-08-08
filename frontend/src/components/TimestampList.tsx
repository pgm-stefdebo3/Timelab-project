import { useQuery } from "@apollo/client";
import { TimestampListProps } from "../interfaces";
import { GET_MARKER_DETAIL } from "../gql/queries";
import ConditionalLoader from "./ConditionalLoader";

const TimestampList = ({coordinate, marker, visible, setFormVisible, refetch}: TimestampListProps) => {

    const { loading, error, data } = useQuery(GET_MARKER_DETAIL, {
        variables: {
            id: marker,
        }
    });

    if (loading) return <p>Loading...</p>;

    if (error) {
        return <p>Error...</p>;
    }
    
    console.log(data);
    
return (
    <div className="map-timestamp-list" style={{display: visible? 'block' : 'none'}}>
        <div className='marker-info__header'>
            <h2>{data.marker.name}</h2>
            <p className="info-header__date">
                {new Date(data.marker.createdAt).toLocaleDateString()} {new Date(data.marker.createdAt).toLocaleTimeString()}
            </p>
        </div>
        <div className='marker-info__body'>
            <p>{data.marker.description}</p>
        </div>
        <div className='marker-info__divider'></div>
        <ConditionalLoader condition={data.marker.timestamps.length > 0}>
            <div className='marker-info__timestamps'>
                {data.marker.timestamps.map((timestamp: {author: string, description: string, createdAt: string}) => (
                    <div className='marker-info__timestamp'>
                        <div className='timestamp__header'>
                            <h3>{timestamp.author}</h3>
                            <p className="info-header__date">
                                {new Date(timestamp.createdAt).toLocaleDateString()} {new Date(timestamp.createdAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className='timestamp__body'>
                            <p>{timestamp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </ConditionalLoader>
        <ConditionalLoader condition={data.marker.timestamps.length === 0}>
            <div className='marker-info__timestamps'>
                <p>No timestamps</p>
            </div>
        </ConditionalLoader>
    </div>
);
};

export default TimestampList;