'use server';

import { redirect } from 'next/navigation';
import prisma from './prisma';
import { getBookById } from './getterWish';

export async function addWish(data) {
    const book = await getBookById(data.get('id'));
    const input = {
        title: book.title,
        author: book.author,
        price: Number(book.price),
        publisher: book.publisher,
        published: book.published,
        image: book.image,
        memo: data.get('memo'),
    };

    await prisma.wish.upsert({
        update: input,
        create: Object.assign({}, input, {id: data.get('id')}),
        where: {
            id: data.get('id')
        }
    });

    redirect('/wish');
}



export async function removeWish(data) {
    await prisma.wish.delete({
        where: {
            id: data.get('id')
        }
    });

    redirect('/readed');
}
