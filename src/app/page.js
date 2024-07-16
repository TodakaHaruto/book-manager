'use client';

import { Button } from "@mui/material";
import  Link  from "next/link";
import theme from "../components/theme";
import { CssBaseline, ThemeProvider } from '@mui/material';



export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="bg-hero-pattern bg-cover h-screen pt-10">
          <h1 className="pt-56 text-7xl text-center font-semibold">Book Manager</h1>
          <div className="flex justify-center">
          <Link href="/search"><Button variant="contained" color="primary" className="mt-14 px-16 py-4 text-xl">本の検索</Button></Link>
          </div>
          <div className="flex justify-center">
          <Link href="/readed"><Button variant="contained" color="primary" className="mt-14 px-16 py-4 text-xl">読んだ本</Button></Link>
          </div>
          <div className="flex justify-center">
          <Link href="/wish"><Button variant="contained" color="primary" className="mt-14 px-14 py-4 text-xl">読みたい本</Button></Link>
          </div>
        </div>
      </CssBaseline>
    </ThemeProvider>

  );
}
