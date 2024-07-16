import { getAllReviews } from '../../lib/getter';
import LinkedBookList from '../../components/LinkedBookList';

export const dynamic = 'force-dynamic';

export default async function Readed() {
    const reviews = await getAllReviews();


    return (
        <>
        <div className="mt-16 bg-gray-600 w-full">
            <h1 className="text-white pt-20 pb-8 text-4xl text-center font-semibold">今までに読んだ本</h1>
            <div >
                {reviews.map((b,i) => (
                <LinkedBookList book={b} index={i + 1} key={b.id} link={'detail'}/>
            ))}
            </div>
        </div>
        </>
    )
}
