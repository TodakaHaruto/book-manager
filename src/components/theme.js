import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[700],
        },
        secondary: {
            main: grey[400],
        },
    },
    spacing: 10,
});

export default theme;