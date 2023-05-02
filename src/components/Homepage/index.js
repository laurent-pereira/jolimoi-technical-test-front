import { useState } from 'react';
import { Grid, CssBaseline, Container, TextField, Typography, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

const Homepage = () => {
    const [ number, setNumber ] = useState(0);
    const [ roman, setRoman ] = useState('');
    const [ error, setError ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL, { number }).then((res) => {
            setRoman(res.data.result);
            setError('');
        }).catch((err) => {
            setRoman('');
            setError(err.response.data.details[0].message);
        });
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setNumber(parseInt(value, 10));
    };

    return (
        <Grid container component="main">
            <CssBaseline />
            <Grid item md={3} />
            <Grid item xs={12} md={6}>
                <Container>
                    <Typography variant="h1" component="h1" gutterBottom align='center'> 
                        Jolimoi
                    </Typography>
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
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ margin: '10px'}}
                    >Calculer</LoadingButton>
                </Container>
                <Container>
                    {error && <Alert severity="error">{error}</Alert>}
                    {roman && <Alert severity="info">{`Le chiffre romain correspondant à ${number} est ${roman}`}</Alert>}
                </Container>
            </Grid>
            <Grid item md={3} />
        </Grid>
    )
};
export default Homepage;