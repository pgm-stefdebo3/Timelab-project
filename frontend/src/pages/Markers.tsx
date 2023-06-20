import { ConditionalLoader, DashboardMain, Header } from '../components';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';
import { Button, Card, Checkbox, FormControlLabel, FormLabel, Grid, Input, MenuItem, Select, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import CountUp from 'react-countup';
import MarkerIcon from '@mui/icons-material/Room';
import { useMutation } from '@apollo/client';
import { mutationCreateLayer } from '../gql/mutations';
import * as yup from 'yup';

import '../sass/pages/dashboard.scss'
import { DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react';

const Markers = () => {
    const [ jsonLoaded , setJsonLoaded ] = useState(false);
    const [ jsonKeys , setJsonKeys ] = useState<string[] | null>(null); 
    const [ jsonData , setJsonData ]  = useState(null); 
    const { authenticated, authLoading, user } = useAuth();
    const [createLayer] = useMutation(mutationCreateLayer);
    const fileRef = useRef<HTMLInputElement | null>(null);

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

const validationSchema = yup.object({
    files: yup.mixed()
      .test("is-file-too-big", "File exceeds 10MB", () => {
        let valid = true;
        const files = fileRef?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const size = file.size / 1024 / 1024;
            if (size > 10) {
              valid = false;
            }
          });
        }
        return valid;
      })
      .test(
        "is-file-of-correct-type",
        "File is not of supported type",
        () => {
          let valid = true;
          const files = fileRef?.current?.files;
          if (files) {
            const fileArr = Array.from(files);
            fileArr.forEach((file) => {
              const type = file.type.split("/")[1];
              const validTypes = [
                "json",
              ];
              if (!validTypes.includes(type)) {
                valid = false;
              }
            });
          }
          return valid;
        }
      )
  })

//   file reader functions
  function readerRead(event: any) {
    let reader = new FileReader();
    reader.onload = readerLoad;
    reader.readAsText(event.target.files[0])
  }

  function readerLoad(event: any) {
    console.log(event.target.result);
    let obj = JSON.parse(event.target.result);
    setJsonLoaded(true);
    setJsonData(obj);
    setJsonKeys(Object.keys(obj[0]));
  }

  function checkJson(event: any) {
    if (event.currentTarget.files?.[0].type.split('/')[1] === 'json') {
        return;
    }
    setJsonLoaded(false);
  }
    
  return (
    <div className='dashboard-container'>
        <Header/>
        <DashboardMain active='markers'>
            
        <Grid container gap={1} style={{padding: '1rem'}}>
                <Grid xs={3.95}>
                    <Card 
                        sx={{
                            pt: '2rem',
                            pb: '1rem'
                        }}
                    >
                        <Formik
                            initialValues={{
                                file: null,
                                private: false,
                                titleField: null
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true);
                                let keyName: string = '';
                                if (
                                    values.titleField && jsonKeys
                                ) {
                                    keyName = jsonKeys[values.titleField];
                                    console.log(jsonData?.[0][keyName]);
                                }

                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 1000);
                            }}
                            >
                            {({ values, handleChange, setFieldValue, isSubmitting, errors }) => (
                                <Form className='card-form'>
                                    <input id="file" ref={fileRef} name="file" type="file" className='card-form-file' onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files?.[0]);
                                        checkJson(event);
                                        readerRead(event);
                                    }} />
                                    
                                    <ConditionalLoader condition={jsonLoaded && jsonKeys !== null}>
                                        <FormLabel sx={{px: '1rem'}} htmlFor='titleField'>Choose what field represents the title</FormLabel>
                                        <TextField
                                        variant="outlined"
                                        name="titleField"
                                        id="titleField"
                                        sx={{
                                            width: '100%',
                                            px: '1rem'
                                        }}
                                        select
                                        value={values.titleField}
                                        onChange={handleChange}
                                        >
                                        {jsonKeys?.map((jsonKey, key) => (
                                            <MenuItem key={key} value={key}>
                                                {jsonKey}
                                            </MenuItem>
                                        ))}
                                        </TextField>

                                    </ConditionalLoader>

                                    <Button
                                        className='card-form-button'
                                        type='submit'
                                        disabled={values.file === null}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                            margin: '0 1rem 0 auto',
                                            width: 'max-content'
                                        }}
                                    >
                                        Import markers
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Card>
                </Grid>
                <Grid xs={3.95}>
                    <Card 
                        sx={{
                            pt: '2rem',
                            pb: '1rem'
                        }}
                    >
                        <h2>EXPORT</h2>
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
                            <CountUp end={243} duration={3} className='countup-number'/>
                            <div className='flex countup-suffix'>
                                <p className='countup-string'>Markers</p>
                                <MarkerIcon 
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
                            href='/markers'
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                margin: '2.5rem 1rem 0 auto',
                                width: 'max-content'
                            }}
                        
                        >
                            Go to markers
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </DashboardMain>
    </div>
  )
}

export default Markers;