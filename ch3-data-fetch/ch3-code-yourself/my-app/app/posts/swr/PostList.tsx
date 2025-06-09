"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Post = {
    id: string;
    title: string;
    body: string;
};

export default function PostList() {
    const { data, error, isLoading } = useSWR(
        "https://jsonplaceholder.typicode.com/posts",
        fetcher,
        {
            refreshInterval: 5000,
        }
    );

    if (isLoading) return <p>로딩중...</p>;
    if (error) return <p>에러 발생</p>;

    return (
        <ul>
            {data.slice(0, 5).map((post: Post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

// SWR 훅 : 데이터 1개, 상태(useState) 2개 결합형 훅
