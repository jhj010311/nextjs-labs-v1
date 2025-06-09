// CSR 방식
// data fetching 선행하고 rendering을 한다

// 이 키워드가 있어야 클라이언트 사이드 렌더링을 한다
// 없을 경우 디폴트는 서버 사이드 렌더링
"use client";
import { useEffect, useState } from "react";

type Post = {
    id: string;
    title: string;
    body: string;
};

export default function PostsClientPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // next.js에서는 axios 말고 fetch 써라 > ?
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                if (!res.ok) throw new Error("네트워크 에러");

                return res.json();
            })
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h1>로딩중...</h1>;
    if (error) return <h1>오류 : {error}</h1>;

    return (
        <>
            <h2>클라이언트 패칭</h2>;
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <b>{post.title}</b>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
