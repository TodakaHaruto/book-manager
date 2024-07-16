'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react'; 
import { Button } from '@mui/material';
import theme from "../../../components/theme";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';

export default function SearchLayout({children}) {
    const router = useRouter();
    const txtKeyword = useRef(null);

    useEffect(() => {
        txtKeyword.current?.focus();
    });


    const handleSearch = () => {
        router.push(`/search/${txtKeyword.current.value}`);
    };

    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline>
            <div className='mt-16 bg-gray-600 pt-8'>
                <h1 className=' font-medium text-2xl mx-10 text-center '>書籍の検索</h1>
                <form className='mt-6 mb-4 text-center' action={handleSearch}>
                    <input type="text" ref={txtKeyword} className='bg-gray-100 text-black rounded m-4 px-2 focus:bg-white focus:outline-none' ></input>
                    <Button variant="contained" color="primary" className='py-0.5' type='submit'>検索</Button>
                </form>
                {children}
            </div>
            </CssBaseline>
        </ThemeProvider>

        </>
    );
}

