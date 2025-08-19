'use client'
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { createComment, getCommentsByProductId } from '../sanity/comment-util';

function Comments({ product }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [email, setEmail] = useState('');

  // Brand colors for consistency
  const brandTeal = "#2DD4BF";
  const brandDarkGray = "#4a4a4a";

  useEffect(() => {
    const fetchComments = async () => {
      if (product?._id) {
        const fetchedComments = await getCommentsByProductId(product._id);
        setComments(fetchedComments);
      }
    };
    fetchComments();
  }, [product]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddComment = async () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (comment.trim() === '') {
      toast.error("Please enter a comment");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      const newComment = await createComment(product?._id, comment, rating, email);
      toast.success('Comment added successfully!');
      setComments([newComment, ...comments]); // Add new comment to the top
      setComment('');
      setRating(0);
      setEmail('');
    } catch (error) {
      toast.error('Failed to add comment.');
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-7xl px-4">
      {/* 1. Updated title color */}
      <h2 className="mb-4 text-2xl font-bold md:text-3xl" style={{ color: brandDarkGray }}>Comments & Reviews</h2>

      {/* Star Rating Input - Gold is standard and clear for user input */}
      <div className="mb-4 flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>

      {/* Input for Email */}
      <div className="mb-4 flex items-center">
        <input
          type="email"
          placeholder="Your email..."
          value={email}
          onChange={handleEmailChange}
          // 2. Updated input focus style
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
        />
      </div>

      {/* Input for Comment */}
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Write your review here..."
          value={comment}
          onChange={handleCommentChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
        />
        {/* 3. Updated button color */}
        <button
          onClick={handleAddComment}
          className="rounded-md px-4 py-2 text-white transition-colors hover:bg-teal-500 focus:outline-none"
          style={{ backgroundColor: brandTeal }}
        >
          Submit
        </button>
      </div>

      {/* Dynamic Comments */}
      <div className="mt-8 space-y-6">
        {comments.map((c, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            {/* 4. Updated email/author color */}
            <strong className="font-semibold" style={{ color: brandDarkGray }}>{c.email}</strong>
            <p className="mt-1 text-gray-700">{c.commentText}</p> 
            <div className='mt-2 flex flex-row space-x-1'>
              {/* 5. Updated star color for display */}
              {[...Array(c.stars || 0)].map((_, i) => (
                <FaStar key={i} className="text-lg" style={{ color: brandTeal }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;