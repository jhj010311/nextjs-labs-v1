import LikeButton from "./LikeButton";

type Post = {
    id: string;
    title: string;
    body: string;
};

type Props = {
    params: { id: string };
};

// 갯수를 한정짓는다면 SSG 방식도 가능
// 한정지을 수 없다면 SSR 방식

// 갯수를 한정지을 방식
export async function generateStaticParams() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await res.json();
    return posts.slice(0, 10).map((post) => ({
        id: post.id.toString(),
    }));
}

// async 컴포넌트는 클라이언트 사이드 컴포넌트에 쓸 수 없다
export default async function DetailPage({ params }: Props) {
    const { id } = await params;

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post: Post = await res.json();

    return (
        <>
            <div>
                <h2>게시글 상세 (ID: {id})</h2>
                <b>{post.title}</b>
                <p>{post.body}</p>
                <LikeButton initialLikes={0} />
            </div>
        </>
    );
}
