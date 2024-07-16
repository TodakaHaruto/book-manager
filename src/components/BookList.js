import Image from 'next/image';

export default function BookList({index, book, hover}) {

    let type = 'flex w-full mb-4';
    if(hover == 'valid') {
        type += ' hover:bg-gray-500'
    }

    return (
        <div className='flex'>
            {/* 登録した書籍のリスト */}
            <div className={type}>
                <div>
                    <Image src={book.image} alt='' width={100} height={160} />
                </div>
                <div >
                    <ul className='list-none text-white ml-2'>
                        <li>{index && index + "." }</li>
                        <li>{book.title} ({book.price}円)</li>
                        <li>{book.author}</li>
                        <li>{book.publisher}刊</li>
                        <li>{book.published} 発売</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}