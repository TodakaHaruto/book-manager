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
  
  export async function getBookById(id) {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const result = await res.json();
    return createBook(result);
  }

export async function getWishById(id) {
  return await prisma.wish.findUnique({
    where: {
      id: id
    }
  });
}

export async function getAllWishes() {
  return await prisma.wish.findMany({
    orderBy: {
      title: 'desc'
    }
  });
}