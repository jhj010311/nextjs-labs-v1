// SSR 방식 (요청이 있으면 서버측에서 계속 갱신함)

type Post = {
    id: string;
    title: string;
    body: string;
};

export default async function PostsSSRPage() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        cache: "no-store", // 매 요청마다 서버에서 fetch 해야함
    });
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
