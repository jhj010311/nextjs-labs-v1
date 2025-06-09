"use client";
import { useState } from "react";

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
    const [likes, setLikes] = useState(initialLikes);

    return (
        <div style={{ marginTop: 16 }}>
            <button
                onClick={() => setLikes((n) => n + 1)}
                style={{ padding: "0.5em 1em", fontWeight: "bold" }}
            >
                ❤️ 좋아요 {likes}
            </button>
        </div>
    );
}
