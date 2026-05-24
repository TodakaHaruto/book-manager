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

  const url = `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;

  console.log('Google Books API URL:', url);

  const res = await fetch(url, {
    cache: 'no-store',
  });

  console.log('Google Books API status:', res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Google Books API error:', errorText);
    return [];
  }

  const result = await res.json();

  console.log('Google Books totalItems:', result.totalItems);
  console.log('Google Books items length:', result.items?.length);

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
