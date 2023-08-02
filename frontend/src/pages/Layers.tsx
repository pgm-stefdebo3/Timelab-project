import { DashboardMain, Header } from '../components';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Field, FieldArray, Form, Formik } from 'formik';
import { Button, Grid, Card, Checkbox, FormControlLabel, Input } from "@mui/material";
import LayersIcon from '@mui/icons-material/Layers';
import CountUp from 'react-countup';

import '../sass/pages/dashboard.scss'
import { mutationCreateLayer } from '../gql/mutations';

const Layers = () => {
    const { authenticated, authLoading, user } = useAuth();
    const [createLayer] = useMutation(mutationCreateLayer);

    if (authLoading) {
        return (
            <div>
                <div>Loading...</div>
            </div>
        );
    }
    
    if (!authenticated) {
        return <Navigate to="/login" replace/>;
    }
    
  return (
    <div className='dashboard-container'>
        <Header/>
        <DashboardMain active='layers'>
            <Grid container gap={1} style={{padding: '1rem'}}>
                <Grid xs={7.90}>
                    <Card 
                        sx={{
                            pt: '2rem',
                            pb: '1rem'
                        }}
                    >
                        <Formik
                            initialValues={{
                                name: "",
                                private: false,
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true);
                                const { data } = await createLayer({
                                    variables: {
                                        name: values.name,
                                        private: values.private
                                    }
                                })
                                if (data) {
                                    console.log(data);
                                }
                                setTimeout(() => {
                                    setSubmitting(false);
                                }, 1000);
                            }}
                            >
                            {({ values, handleChange, isSubmitting, errors }) => (
                                <Form className='card-form'>
                                    <FormControlLabel
                                    control={<Input sx={{width: '100%'}}/>}
                                    sx={{
                                        alignItems: 'start',
                                    }}
                                    labelPlacement='top'
                                    label="Name"
                                    name="name"
                                    onChange={handleChange}
                                    />

                                    <FormControlLabel
                                    control={<Checkbox checked={values.private} />}
                                    sx={{
                                        marginLeft: '0.2rem'
                                    }}
                                    label="Private"
                                    name="private"
                                    onChange={handleChange}
                                    />
                                    <div>
                                    <Button
                                        className='card-form-button'
                                        type='submit'
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                            margin: '0 1rem 0 auto',
                                            width: 'max-content'
                                        }}

                                    >
                                        Create Layer
                                    </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Card>
                </Grid>
                <Grid xs={3.95}>
                    <Card 
                        sx={{
                            pt: '4.5rem',
                            pb: '1rem'
                        }}
                    >
                        <div className='countup-container'>
                            <CountUp end={9} duration={3} className='countup-number'/>
                            <div className='flex countup-suffix'>
                                <p className='countup-string'>Layers</p>
                                <LayersIcon 
                                    className='countup-icon'
                                    sx={{
                                        width: '3rem',
                                        height: '3rem',
                                        marginLeft: '0.1rem',
                                    }}
                                />
                            </div>
                        </div>
                        <Button
                            href='/layers'
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                margin: '2.5rem 1rem 0 auto',
                                width: 'max-content'
                            }}
                        
                        >
                            Go to Layers
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </DashboardMain>
    </div>
  )
}

export default Layers;