import React from "react";
import LinkedBookList from "../../../components/LinkedBookList";
import { getBooksByKeyword } from "../../../lib/getter";


export default async function searchResult({params: {keyword = undefined} }) {
    if(keyword == undefined) {
        return (
            <p className="text-center">キーワードを入力して検索してください</p>
        );
    }

    const books = await getBooksByKeyword(keyword);
    if(books === null) {
        return (
            <p className="text-center">お探しの書籍は見つかりませんでした</p>
        )
    }
    
    return (
        <>
            {books.map((b,i) => (
                <LinkedBookList book={b} index={i + 1} key={b.id} link={'edit'}/>
            ))} 
        </>
    )
}