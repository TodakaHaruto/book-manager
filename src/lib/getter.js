import prisma from './prisma';

function buildGoogleBooksUrl(path, params = {}) {
  const queryParts = [];

  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      queryParts.push(`${key}=${params[key]}`);
    }
  }

  if (process.env.GOOGLE_BOOKS_API_KEY) {
    queryParts.push(`key=${process.env.GOOGLE_BOOKS_API_KEY}`);
  }

  const queryString = queryParts.join('&');

  return queryString
    ? `https://www.googleapis.com/books/v1/${path}?${queryString}`
    : `https://www.googleapis.com/books/v1/${path}`;
}

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

  const trimmedKeyword = q.trim();

  const url = buildGoogleBooksUrl('volumes', {
    q: trimmedKeyword,
    maxResults: '20',
  });

  console.log(
    'Google Books API URL:',
    process.env.GOOGLE_BOOKS_API_KEY
      ? url.replace(process.env.GOOGLE_BOOKS_API_KEY, 'HIDDEN')
      : url
  );

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  console.log('Google Books API status:', res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Google Books API search error:', res.status, errorText);
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
  if (!id) {
    return null;
  }

  const url = buildGoogleBooksUrl(`volumes/${id}`);

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Google Books API detail error:', res.status, errorText);
    return null;
  }

  const result = await res.json();

  return createBook(result);
}

export async function getReviewById(id) {
  if (!id) {
    return null;
  }

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
