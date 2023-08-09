import React from 'react'
import { MarkerImportFormProps, layer } from '../../interfaces'
import { ErrorMessage, Form, Formik } from 'formik'
import * as yup from 'yup';
import { Button, FormLabel, MenuItem, StepButton, TextField } from '@mui/material';
import ConditionalLoader from '../ConditionalLoader';
import { useMutation } from '@apollo/client';
import { mutationImportMarkers } from '../../gql/mutations';

const validationSchema = yup.object({
    layerId: yup.number().required(),
    coordinateField: yup.string().required(),
});

const MarkerImportForm1 = ({selectedRows, layers, setModal, formData, setFormData}: MarkerImportFormProps) => {
    const [importMarkers] = useMutation(mutationImportMarkers);

    let rowKeys: string[] = Object.keys(selectedRows[0]);

    return (
        <Formik
        initialValues={{
            layerId: formData.layerId || null,
            coordinateField: formData.coordinateField || '',
        }}
        validationSchema={validationSchema}
        validate={(values) => {
            const errors: Record<string, string> = {};
            if (values.coordinateField) {
                console.log(selectedRows[0][values.coordinateField][0]);
                console.log(typeof selectedRows[0][values.coordinateField][0]);
                
                
                if (typeof selectedRows[0][values.coordinateField][0] !== 'number' && typeof selectedRows[0][values.coordinateField][0][0] !== 'number' && typeof selectedRows[0][values.coordinateField][0][0][0] !== 'number') {
                    errors.coordinateField = 'The coordinates field must contain a number';
                }
            }

            return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
        
            setFormData({...formData, ...values});
            setModal('import-2');

            setTimeout(() => {
                setSubmitting(false);
            }, 1000);
        }}
        >
        {({ values, handleChange, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className='card-form' style={{paddingTop: '2rem'}}>
                <FormLabel sx={{px: '1rem'}} htmlFor='layerId'>Choose the layer you want to import to</FormLabel>
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
                    {layers?.map((layer: {name: string, id: number}) => (
                        <MenuItem key={layer.id} value={layer.id}>
                            {layer.name}
                        </MenuItem>
                    ))}
                </TextField>
                <FormLabel sx={{px: '1rem'}} htmlFor='coordinateField'>Choose what field represents the coordinates</FormLabel>
                <ErrorMessage name="coordinateField" component="div" className='errorfield' />
                <TextField
                variant="outlined"
                name="coordinateField"
                id="coordinateField"
                sx={{
                    width: '100%',
                    px: '1rem'
                }}
                select
                value={values.coordinateField}
                onChange={handleChange}
                >
                <MenuItem key={-1} value={undefined}>
                    ---
                </MenuItem>
                {rowKeys?.map((rowKey, key) => (
                    <MenuItem key={key} value={rowKey}>
                        {rowKey}
                    </MenuItem>
                ))}
                </TextField>
                <Button
                    variant='contained'
                    className='card-form-button'
                    type='submit'
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        margin: '1rem 1rem 0 auto',
                        width: 'max-content'
                    }}
                >
                    {'Next >'}
                </Button>
            </Form>
            )}
        </Formik>
    )
}

export default MarkerImportForm1;