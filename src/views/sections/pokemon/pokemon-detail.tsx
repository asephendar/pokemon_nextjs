"use client";

import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useParams } from 'next/navigation'; // Correct import for App Router
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/models/store';

const PokemonDetail = () => {
    const params = useParams();
    const { name } = params; // Access the dynamic route parameter

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
        </Box>
    );
};

export default PokemonDetail;
