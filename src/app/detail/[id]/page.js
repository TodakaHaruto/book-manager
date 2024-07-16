import { getBookById, getReviewById } from "../../../lib/getter";
import BookList from "../../../components/BookList";
import FormReaded from '../../../components/FormReaded';


export default async function DetailPage({ params }) {
    const book = await getBookById(params.id);
    const review = await getReviewById(params.id);
    const read = (review?.read || new Date()).toLocaleDateString('sv-SE');

    return (
        <>         
        <div className="mt-16 bg-gray-600 pb-80 px-8">
            <h1 className="m-4 ml-6 pt-8 font-mediu text-2xl">書籍の詳細情報</h1>
            <div id="form">
                <BookList book={book} />
                <FormReaded src={{id: book.id, read, memo: review?.memo}} />
            </div>
        </div>
        </>
    )
}