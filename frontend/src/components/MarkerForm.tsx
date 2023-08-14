import { ErrorMessage, Form, Formik } from "formik";
import { MarkerFormProps, MarkerInput } from "../interfaces";
import { Button, FormLabel, MenuItem, TextField  } from '@mui/material';
import * as yup from 'yup';
import { mutationImportMarkers } from "../gql/mutations";
import { useMutation } from "@apollo/client";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const validationSchema = yup.object({
    layerId: yup.number().required(),
    title: yup.string().required().max(40),
    description: yup.string().max(500),
    author: yup.string(),
});

const MarkerForm = ({coordinate, layers, visible, setFormVisible, refetch}: MarkerFormProps) => {
    const [importMarkers] = useMutation(mutationImportMarkers);

const filteredLayers = layers?.filter((layer: {name: string, id: number, private: boolean}) => layer.private === false);
    

return (
    <>
        <div className='map-form-container__close'  style={{display: visible? 'block' : 'none'}} onClick={() => setFormVisible('')}>
            <ArrowForwardIosIcon  color='secondary' sx={{
                visibility: visible? 'visible': 'hidden',
                width: visible? '2rem': '0',
            }}/>
        </div>
        <div className="map-markerform" style={{display: visible? 'block' : 'none'}}>
            <Formik
            initialValues={{
                layerId: undefined,
                title: '',
                description: '',
                author: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                let input: MarkerInput[] = [{
                    type: 'Point',
                    name: values.title,
                    coords: [coordinate],
                    layerId: values.layerId,
                    createdAt: new Date(),
                }]

                if (values.description) {
                    input[0].description = values.description;
                }

                if (values.author) {
                    input[0].author = values.author;
                }

                const { data } = await importMarkers({
                    variables: {
                        createMarkerWithCoordsInputs: input,
                    }
                })

                if (data) {
                    refetch();
                }
                setFormVisible('');

                setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
            }}
            >
            {({ values, handleChange, setFieldValue, isSubmitting, errors, touched }) => (
                <Form className='marker-form' style={{paddingTop: '2rem'}}>
                    <FormLabel sx={{px: '1rem'}} htmlFor='layerId'>Choose the layer you want to import to <span className="text-red">*</span></FormLabel>
                    <ErrorMessage name="layerId" component="div" className='errorfield' />
                    <TextField
                        variant="outlined"
                        name="layerId"
                        id="layerId"
                        sx={{
                            width: '100%',
                            px: '1rem'
                        }}
                        select
                        value={values.layerId}
                        onChange={handleChange}
                        >
                            
                        <MenuItem key={-1} value={undefined}>
                            ---
                        </MenuItem>
                        {filteredLayers?.map((layer: {name: string, id: number}) => (
                            <MenuItem key={layer.id} value={layer.id}>
                                {layer.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormLabel sx={{px: '1rem'}} htmlFor='title'>Enter the desired title for the marker <span className="text-red">*</span></FormLabel>
                    <ErrorMessage name="title" component="div" className='errorfield' />
                    <TextField
                        name="title"
                        id="title"
                        value={values.title}
                        defaultValue={values.title}
                        onChange={handleChange}
                        sx={{width: '100%', px: '1rem', mt: '1rem', mb: '2rem'}}
                    />
                    <FormLabel sx={{px: '1rem'}} htmlFor='description'>Enter the desired description for the marker</FormLabel>
                    <ErrorMessage name="description" component="div" className='errorfield' />
                    <TextField
                        name="description"
                        id="description"
                        defaultValue={values.description}
                        value={values.description}
                        onChange={handleChange}
                        multiline
                        rows={5}
                        sx={{width: '100%', px: '1rem', mt: '1rem', mb: '2rem'}}
                    />
                    <FormLabel sx={{px: '1rem'}} htmlFor='author'>Enter your name</FormLabel>
                    <ErrorMessage name="author" component="div" className='errorfield' />
                    <TextField
                        name="author"
                        id="author"
                        value={values.author}
                        defaultValue={values.author}
                        onChange={handleChange}
                        sx={{width: '100%', px: '1rem', mt: '1rem', mb: '2rem'}}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        className="marker-form-button"
                        disabled={isSubmitting}
                        sx={{width: 'max-content', mt: '1rem', mb: '2rem', ml: 'auto', mr: '1rem'}}
                    >
                        Import
                    </Button>
                </Form>
                )}
            </Formik>
        </div>
        
    </>
);
};

export default MarkerForm;