"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/lib/helper";
import LoginModal from "../login-modal/LoginModal";
import StoreProvider from "../../../providers/StoreProvider";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ArticleComment = ({ slug }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [reply, setReply] = useState({});
    const [activeReplyForm, setActiveReplyForm] = useState(null);
    const [expandedReplies, setExpandedReplies] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch comments for the article
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}article-comments`, {
                    params: { slug },
                });
                const updatedComments = response.data.map(comment => ({
                    ...comment,
                    article_comments: comment.article_comments || [], // Ensure article_comments is an array
                }));
                setComments(updatedComments.filter(comment => comment.publishedAt !== null)); // Only show published comments
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();

        // Check if a thank-you message should be displayed after reload
        if (localStorage.getItem("showThankYouPopup") === "true") {
            setIsModalOpen(true);
            localStorage.removeItem("showThankYouPopup"); // Reset the flag
        }
    }, [slug]);

    // Handle new comment and reply submission
    const handleCommentSubmit = async (e, parentCommentId = null) => {
        e.preventDefault();
        const commentContent = parentCommentId ? reply[parentCommentId] : newComment;
        const commentTitle = parentCommentId ? "" : title;

        if (!commentTitle && !commentContent) {
            setError("Title and Comment are required.");
            return;
        }
        setError("");

        const jwt = getCookie("jwt");

        if (!jwt) {
            setIsLoginModalOpen(true);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}article-comments`,
                {
                    slug,
                    title: commentTitle,
                    opinion: commentContent,
                    article_comment: parentCommentId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (parentCommentId) {
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === parentCommentId
                            ? { 
                                  ...comment, 
                                  article_comments: [...(comment.article_comments || []), response.data] 
                              }
                            : comment
                    )
                );
                setReply({ ...reply, [parentCommentId]: "" });
                setActiveReplyForm(null);
            } else {
                setComments([...comments, response.data]);
                setTitle("");
                setNewComment("");
            }

            // Set localStorage flag and show modal popup
            localStorage.setItem("showThankYouPopup", "true");
            setIsModalOpen(true);
            setTimeout(() => window.location.reload(), 1000); // Reload page after 1 second
        } catch (error) {
            console.error("Error posting comment:", error);
            setError("Failed to post comment. Please try again.");
        }
    };

    // Toggle expanded replies for nested comments
    const toggleExpandedReplies = (commentId) => {
        setExpandedReplies(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId]
        }));
    };

    // Render comments with expand/collapse functionality
    const renderComments = (commentList, level = 0) => {
        return commentList.map((comment) => (
            <div key={comment.id} className="w-full bg-gray-100 p-4 rounded mb-2" style={{ marginLeft: level * 20 }}>
                <div className="flex items-center mb-2">
                    <div className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full mr-3">
                        {comment.users_permissions_user?.username?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-bold">{comment.users_permissions_user?.username}</p>
                        <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <h4 className="font-semibold mb-1">{comment.title}</h4>
                <p className="mb-2">{comment.opinion}</p>

                <button
                    onClick={() =>
                        setActiveReplyForm(activeReplyForm === comment.id ? null : comment.id)
                    }
                    className="text-white text-xs mt-2 py-1 px-2 rounded-xl mr-5 bg-slate-400 hover:bg-slate-300"
                >
                    {activeReplyForm === comment.id ? "Cancel" : "Reply"}
                </button>

                {/* Conditional Reply Form */}
                {activeReplyForm === comment.id && (
                    <form
                        onSubmit={(e) => handleCommentSubmit(e, comment.id)}
                        className="mt-4 w-full"
                    >
                        <textarea
                            placeholder="Write a Reply..."
                            value={reply[comment.id] || ""}
                            onChange={(e) =>
                                setReply({ ...reply, [comment.id]: e.target.value })
                            }
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-full text-sm"
                        >
                            Post Reply
                        </button>
                    </form>
                )}

                {/* Display Nested Replies with Expand/Collapse */}
                {Array.isArray(comment.article_comments) && comment.article_comments.length > 0 && (
                    <>
                        {expandedReplies[comment.id] ? (
                            <div className="p-1 rounded w-full">
                                {renderComments(comment.article_comments, level + 1)}
                                <button
                                    onClick={() => toggleExpandedReplies(comment.id)}
                                    className="text-white text-xs mt-2 py-1 px-2 rounded-xl bg-slate-400 hover:bg-slate-300"
                                >
                                    Collapse replies
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => toggleExpandedReplies(comment.id)}
                                className="border border-black rounded-xl px-2 py-1 bg-transparent text-black text-xs mt-2"
                            >
                                Expand replies ({comment.article_comments.length})
                            </button>
                        )}
                    </>
                )}
            </div>
        ));
    };

    return (
        <div className="mt-6 shadow-md p-4 rounded-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Write your Comment</h3>
            <form onSubmit={(e) => handleCommentSubmit(e)} className="mb-4 w-full">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-sm p-2 border border-gray-300 rounded mb-2"
                />
                <textarea
                    placeholder="Write a Comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm"
                >
                    Post Comment
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>

            <div className="space-y-6">
                {comments.length > 0 ? (
                    renderComments(comments)
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
            <StoreProvider>
                <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
            </StoreProvider>

            {/* Thank You Modal */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="thank-you-title"
                aria-describedby="thank-you-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        width: '80%',
                        maxWidth: '400px',
                        textAlign: 'center',
                    }}
                >
                    <h2 id="thank-you-title" className="text-xl font-semibold">Thank you!</h2>
                    <p id="thank-you-description">Your comment has been submitted successfully.</p>
                </Box>
            </Modal>
        </div>
    );
};

export default ArticleComment;
