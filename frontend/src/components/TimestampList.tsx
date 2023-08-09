import { useQuery } from "@apollo/client";
import { TimestampListProps } from "../interfaces";
import { GET_MARKER_DETAIL } from "../gql/queries";
import ConditionalLoader from "./ConditionalLoader";
import Button from "./Button";

import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";
import TimestampForm from "./TimestampForm";

const TimestampList = ({coordinate, marker, visible, setFormVisible}: TimestampListProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [form, setForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
    }
    , []);

    const { loading, error, data, refetch } = useQuery(GET_MARKER_DETAIL, {
        variables: {
            id: marker,
        }
    });

    if (loading) return <p>Loading...</p>;

    if (error) {
        return <p>Error...</p>;
    }
    
return (
    <div style={{display: visible? 'block' : 'none'}}>
        
        <div className='map-form-container__close' onClick={() => {
            if (!form) {
                setFormVisible('')
            } else {
                setForm(false)
            }}
            }>
            <ArrowForwardIosIcon  color='secondary' sx={{
            visibility: visible? 'visible': 'hidden',
            width: visible? '2rem': '0',
            }}/>
        </div>
        <ConditionalLoader condition={!form}>
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
                        {data.marker.timestamps.map((timestamp: {author: string, description: string, createdAt: string, fileName: string,}, index: number) => (
                            <div className='marker-info__timestamp'>
                                <div className="timestamp__image-container">
                                    <img src={`http://localhost:3000/timestamp/timestamp-file/${timestamp.fileName}`} alt={`marker ${marker} timestamp ${index} `}/>
                                </div>
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
                    <div className='marker-info__no-timestamps'>
                        <p>No timestamps yet, add one!</p>
                    </div>
                </ConditionalLoader>
                <Button className={isLoaded? 'button': 'button button--not-loaded' } type='button' onClick={() => setForm(true)}>
                    <AddBoxIcon color='secondary'/>
                    <p>Add a timestamp</p>
                </Button>
            </div>
        </ConditionalLoader>
        <TimestampForm marker={marker} refetch={refetch} setFormVisible={setForm} visible={form}/>
    </div>
);
};

export default TimestampList;