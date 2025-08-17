'use client'
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { createComment, getCommentsByProductId } from '../sanity/comment-util';

function Comments({ product }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [email, setEmail] = useState(''); // <-- Email state

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getCommentsByProductId(product?._id);
      setComments(fetchedComments);
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
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (comment.trim() === '') {
      toast.error("Please enter a comment");
      return;
    }

    // Create comment
    const newComment = await createComment(product?._id, comment, rating, email);
    toast.success('Comment added');

    // Update comments
    setComments([...comments, newComment]);

    // Reset inputs
    setComment('');
    setRating(0);
    setEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 mb:mx-1">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* Star Rating */}
      <div className="flex items-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= rating ? 'text-[#FFD700] text-2xl cursor-pointer' : 'text-gray-300 text-2xl cursor-pointer'}
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>

      {/* Input for Email */}
      <div className="flex items-center mb-4">
        <input
          type="email"
          placeholder="Your email..."
          value={email}
          onChange={handleEmailChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5B20B6]"
        />
      </div>

      {/* Input for Comment */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Your comment..."
          value={comment}
          onChange={handleCommentChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5B20B6]"
        />
        <button
          onClick={handleAddComment}
          className="bg-[#5B20B6] text-white px-4 py-2 rounded-md hover:bg-[#4C1D95] focus:outline-none"
        >
          Comment
        </button>
      </div>

      {/* Dynamic Comments */}
      <div>
        {comments.map((c, index) => (
          <div key={index} className="mb-4">
            <strong>{c.email}:</strong> {c.commentText} 
            <div className='flex flex-row space-x-1'>
              {[...Array(c.stars)].map((_, i) => (
                <FaStar key={i} className="text-[#FFD700] text-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
