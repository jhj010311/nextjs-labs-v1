// SSG + IHR 방식 (빌드 시점에 렌더링, 단 일정 주기로 갱신)

type Post = {
    id: string;
    title: string;
    body: string;
};

export default async function PostsSSGPage() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        next: { revalidate: 10 }, // 10초 주기로 새로운 html을 생성
    });
    if (!res.ok) throw new Error("에러 발생");

    const posts: Post[] = await res.json();

    const now: string = new Date().toLocaleString();
    // run dev로는 체크하기 힘들고
    // build로 해야 체크할 수 있다

    return (
        <>
            <h2>SSG 패칭 + ISR</h2>
            <h3>페이지 생성 시각 : {now}</h3>
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
