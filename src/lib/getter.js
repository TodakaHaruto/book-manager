import prisma from './prisma';

export function createBook(book) {
  const volumeInfo = book.volumeInfo ?? {};
  const saleInfo = book.saleInfo ?? {};
  const authors = volumeInfo.authors ?? [];
  const imageLinks = volumeInfo.imageLinks ?? {};

  return {
    id: book.id,
    title: volumeInfo.title ?? 'タイトル不明',
    author: authors.length > 0 ? authors.join(', ') : '著者不明',
    price: saleInfo.listPrice?.amount ?? 0,
    publisher: volumeInfo.publisher ?? '出版社不明',
    published: volumeInfo.publishedDate ?? '発売日不明',
    image: imageLinks.smallThumbnail ?? imageLinks.thumbnail ?? '/no_image.png',
  };
}

export async function getBooksByKeyword(keyword) {
  const q = Array.isArray(keyword) ? keyword.join(' ') : keyword;

  if (!q || q.trim() === '') {
    return [];
  }

  const params = new URLSearchParams({
    q: q,
    maxResults: '20',
    printType: 'books',
  });

  if (process.env.GOOGLE_BOOKS_API_KEY) {
    params.append('key', process.env.GOOGLE_BOOKS_API_KEY);
  }

  const url = `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;

  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Google Books API error:', res.status, errorText);
    return [];
  }

  const result = await res.json();

  if (!result.items || result.items.length === 0) {
    return [];
  }

  return result.items.map((b) => createBook(b));
}

export async function getBookById(id) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);

  if (!res.ok) {
    return null;
  }

  const result = await res.json();
  return createBook(result);
}

export async function getReviewById(id) {
  return await prisma.reviews.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getAllReviews() {
  return await prisma.reviews.findMany({
    orderBy: {
      read: 'desc',
    },
  });
}
