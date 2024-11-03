"use client";

import { Box, Card, FormControl, Grid2, Input, InputLabel, MenuItem } from "@mui/material";
import * as React from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "@/models/reducers/pokemon/action";
import { RootState, AppDispatch } from "@/models/store";
import { Pokemon } from "@/models/reducers/pokemon/types";
import { useEffect } from "react";
const PokemonForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state);
    const [pokemonList, setPokemonList] = React.useState('');

    useEffect(() => {
        dispatch(fetchPokemon());
    }, [dispatch]);

    const handleChange = (event: SelectChangeEvent) => {
        setPokemonList(event.target.value as string);
    };

    return (
        <Card>
            <Box sx={{ p: 2 }}>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 6, md: 8 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Pokemon List</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={pokemonList}
                                label="Pokemon List"
                                onChange={handleChange}
                            >
                                {
                                    data.map((item: Pokemon) => (
                                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 8 }}>
                        <Input placeholder="Type" />
                    </Grid2>
                </Grid2>
            </Box>
        </Card>
    )
};
export default PokemonForm;