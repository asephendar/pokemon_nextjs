import BasicBreadcrumbs from "@/app/components/breadcrumbs";
import Pokemon from "../pokemon";
import { Box, Container, Typography } from "@mui/material";

const PokemonView: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Pokemon
            </Typography>
            <BasicBreadcrumbs
                items={[
                    { label: 'dashboard', href: '/' },
                    { label: 'Pokemon' }
                ]}
            />
            <Box sx={{ my: 4 }}>
                <Pokemon />
            </Box>
        </Container>
    );
};

export default PokemonView;