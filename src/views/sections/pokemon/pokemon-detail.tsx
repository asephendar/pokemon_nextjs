"use client";

import { Box, Card, CardActionArea, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useParams } from 'next/navigation'; // Correct import for App Router
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/models/store';

const PokemonDetail = () => {
    const params = useParams();
    const { name } = params; // Access the dynamic route parameter
    const [pokemonTypes, setPokemonTypes] = useState('');

    const handleChangePokemon = (event: any) => { 
        setPokemonTypes(event.target.value as string);
    };

    // Use state to handle the loading state
    const [loading, setLoading] = useState(true);

    // Select Pokémon data from Redux based on the name parameter
    const pokemon = useSelector((state: RootState) =>
        state.data.find((p) => p.name === name)
    );

    useEffect(() => {
        // Add logic here to fetch details for the Pokémon if needed
        if (name) {
            setLoading(false); // Set loading to false when the name is available
        }
    }, [name]);

    if (loading) return <Typography>Loading...</Typography>; // Show loading state while fetching details
    if (!pokemon) return <Typography>No data found for {name}</Typography>; // Show error message if no data is found

    return (
        <Box>
            {/* You can add more details here */}
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        sx={{ height: 140, objectFit: 'contain', mt: 2 }}
                        component="img"
                        height="140"
                        image={pokemon.image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {pokemon.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {pokemon.types[0]}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={pokemon.name} disabled />
                </CardContent>
            </Card>
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Pokemon Types</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pokemonTypes}
                            label="Pokemon Types"
                            onChange={handleChangePokemon}
                        >
                            {
                                pokemon.types.map((type: string) => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))
                            }
                            {/* <MenuItem value={10}>{pokemon.name}</MenuItem> */}
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PokemonDetail;
