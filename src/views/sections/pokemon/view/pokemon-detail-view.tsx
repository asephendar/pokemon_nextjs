import BasicBreadcrumbs from "@/app/components/breadcrumbs";
import Pokemon from "../pokemon";
import { Box, Container, Typography } from "@mui/material";
import PokemonDetail from "../pokemon-detail";

const PokemonDetailView: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Pokemon Detail
            </Typography>
            <BasicBreadcrumbs
                items={[
                    { label: 'dashboard', href: '/' },
                    { label: 'Pokemon', href: '/pokemon' },
                    { label: 'Pokemon Detail' }
                ]}
            />
            <Box sx={{ my: 4 }}>
                <PokemonDetail />
            </Box>
            {/* <PokemonList /> */}
        </Container>
    );
};

export default PokemonDetailView;