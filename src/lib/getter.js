import { Description } from '@mui/icons-material';
import prisma from './prisma';

export function createBook(book) {
    const authors = book.volumeInfo.authors;
    const price = book.saleInfo.listPrice;
    const img = book.volumeInfo.imageLinks;
    return {
        id: book.id,
        title: book.volumeInfo.title,
        author: authors ? authors.join(',') : '',
        price: price ? price.amount : 0,
        publisher: book.volumeInfo.publisher,
        published: book.volumeInfo.publishedDate,
        image: img ? img.smallThumbnail : '/no_image.png',
    };
}

export async function getBooksByKeyword(keyword) {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=20&printType=books`);
        const result = await res.json();
        const books = [];
        if(result.totalItems === 0) {
            return null;
        }
            for (const b of result.items) {
                books.push(createBook(b));
                }
                return books;
}

export async function getBookById(id) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  const result = await res.json();
  return createBook(result);
}

export async function getReviewById(id) {
  return await prisma.reviews.findUnique({
    where: {
      id: id
    }
  });
}

export async function getAllReviews() {
  return await prisma.reviews.findMany({
    orderBy: {
      read: 'desc'
    }
  });
}