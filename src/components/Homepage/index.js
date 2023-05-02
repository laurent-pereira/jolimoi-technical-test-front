import { useEffect, useState } from 'react';
import { Grid, CssBaseline, Container, TextField, Typography, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

const Homepage = () => {
    const [ number, setNumber ] = useState(0);
    const [ roman, setRoman ] = useState('');
    const [ error, setError ] = useState('');
    const [ session, setSession ] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL, { number, session }).then((_) => {
            setError('');
        }).catch((err) => {
            setError(err.response.data.details[0].message);
            setRoman('');
        });
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setNumber(parseInt(value, 10));
    };

    useEffect(() => {
        if(!session) {
            const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}`);
            eventSource.onmessage = (event) => {
                const { id, result } = JSON.parse(event.data);
                setSession(id);
                setRoman(result);
                setError('');
            };
            eventSource.onerror = (error) => {
                setError('Unable to connect to server, please try again later');
                setSession(null);
            };
            eventSource.onclose = () => {
                eventSource.close();
            };
        }
    }, [session]);

    return (
        <Grid container component="main">
            <CssBaseline />
            <Grid item md={3} />
            <Grid item xs={12} md={6}>
                <Container>
                    <Typography variant="h1" component="h1" gutterBottom align='center'> 
                        Jolimoi
                    </Typography>
                    <Typography variant="body1" gutterBottom align='center'>{session  ? `Connected to server on session ${session}` : 'Disconnected to server'}</Typography>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        size='small'
                        helperText="Entrez un nombre entre 1 et 100"
                        sx={{ margin: '10px'}}
                        onChange={handleChange}
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 100 } }}
                    />
                    <LoadingButton
                        loading={false}
                        disabled={session === ''}
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ margin: '10px'}}
                    >Calculer</LoadingButton>
                </Container>
                <Container>
                    {error && <Alert severity="error">{error}</Alert>}
                    {roman !== '' && <Alert severity="info">{`Le chiffre romain correspondant est ${roman}`}</Alert>}
                </Container>
            </Grid>
            <Grid item md={3} />
        </Grid>
    )
};
export default Homepage;