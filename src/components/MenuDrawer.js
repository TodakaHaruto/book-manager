'use client';

import { useState } from 'react';
import {Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Menu } from '@mui/icons-material';

const menu = [
    {title: 'ホーム', href:'/'},
    {title: '検索', href:'/search'},
    {title: '読んだ本', href:'/readed'},
    {title: '読みたい本', href: '/wish'},
];

export default function MenuDrawer() {
    const [show, setShow] = useState(false); //ドロワーの状態を保持

    const handleDraw = () => setShow(!show); //ボタンクリック時に実行される処理

    const Icon = Menu;

    return (
        <>
        <Button onClick={handleDraw} ><Icon className='text-white'/></Button>
        <Drawer anchor="right" open={show}>
            <Box sx={{height: '100vh'}} onClick={handleDraw} className="bg-dark-grey text-white" >
            <List>
                {
                    menu.map(obj => {
                        return (
                            <ListItem key={obj.title}>
                                <ListItemButton href={obj.href}>
                                    <ListItemText primary={obj.title} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })
                }
            </List>
            </Box>
        </Drawer>
        </>
    )

}