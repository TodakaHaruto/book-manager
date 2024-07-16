import BookList from "../../../components/BookList";
import { getWishById, getBookById } from '../../../lib/getterWish';
import FormWish from '../../../components/FormWish';

export default async function EditPage({ params }) {
    const book = await getBookById(params.id);
    const review = await getWishById(params.id);
    const read = (review?.read || new Date()).toLocaleDateString('sv-SE');

    return (
        <>
        
        <div className="mt-16 bg-gray-600 pb-80 px-8">
            <h1 className="m-4 ml-6 pt-8 font-mediu text-2xl">書籍の詳細情報</h1>
            <div id="form">
                <BookList book={book} />
                <FormWish src={{id: book.id, read, memo: review?.memo}} />
            </div>
        </div>
        
        </>

    );
}