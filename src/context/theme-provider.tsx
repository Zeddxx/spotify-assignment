import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      variants: [
        {
          props: { type: "dark" },
          style: {
            outline: "white",
            border: "none",
          },
        },
      ],
    },
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  );
};
