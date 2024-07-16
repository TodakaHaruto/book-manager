import Link from "next/link";
import BookList from "./BookList";

export default function LinkedBookList({index, book, link}) {
    return (
        <Link href={`/${link}/${book.id}`}>
            <div className="mx-12">
                <BookList index={index} book={book} hover={'valid'}/>
            </div>
        </Link>
    )
}