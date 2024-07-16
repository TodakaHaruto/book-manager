'use client';

import { addReview } from '../lib/actions.js';
import theme from './theme.js';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Button } from '@mui/material';
import { addWish } from '../lib/actionsWish.js';
import { useRouter } from 'next/navigation.js';

export default function FormEdit({ src: {id, read, memo} }) {
    const router = useRouter();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <form action={addReview}>
                <input type='hidden' name='id' defaultValue={id} />
                <div className='mb-3'>
                    <label className='font-bold' htmlFor='read'>読了日:</label>
                    <input type='date' id='read' name='read' className='text-black block bg-gray-100 border-2 border-gray-600 rounded forcus:bg-white focus:outline-none focus:border-red-500' defaultValue={read}/>
                </div>
                <div className='mb-3'>
                    <label className='font-bold' htmlFor='memo'>メモ:</label>
                    <textarea id='memo' name='memo' rows="3" className='text-black block bg-gray-100 border-2 border-gray-600 w-full rounded focus:bg-white focus:outline-none focus:border-gray-400'>{memo}</textarea>
                </div>
                <Button variant="contained" color='primary' className='m-4' onClick={() => router.back()}>戻る</Button>
                <Button type='submit' variant="contained" color='primary' className='m-4'>読んだ本に追加</Button>
                <Button type='submit' variant="contained" color='primary' formAction={addWish} >読みたい本に追加</Button>                
                </form>
            </CssBaseline>
        </ThemeProvider>
        
    );
}