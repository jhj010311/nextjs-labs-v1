// SSG 방식 (빌드 시점에 렌더링)

type Post = {
    id: string;
    title: string;
    body: string;
};

export default async function PostsSSGPage() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("에러 발생");

    const posts: Post[] = await res.json();

    return (
        <>
            <h2>SSG 패칭</h2>
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
