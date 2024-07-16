import { getAllWishes } from '../../lib/getterWish';
import LinkedBookList from '../../components/LinkedBookList';

export const dynamic = 'force-dynamic';

export default async function Readed() {
    const reviews = await getAllWishes();


    return (
        <>
        <div className="mt-16 bg-gray-600 w-full">
            <h1 className="text-white pt-20 pb-8 text-4xl text-center font-semibold">これから読みたい本</h1>
            <div >
                {reviews.map((b,i) => (
                <LinkedBookList book={b} index={i + 1} key={b.id} link={'editWish'}/>
            ))}
            </div>
        </div>
        </>
    )
}
