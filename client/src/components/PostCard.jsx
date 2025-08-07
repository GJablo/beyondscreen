import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageSquare, Edit, Trash2 } from 'react-feather';
import API from '../services/api';

export default function PostCard({ post, onDelete, onEdit, onLike, onComment }) {
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const currentUserId = API.defaults.headers.common['Authorization']?.split(' ')[1]; // Adjust based on your auth

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await onComment(post._id, commentText);
      setCommentText('');
      setIsCommenting(false);
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={post.user?.avatar || '/default-avatar.png'}
          alt={post.user?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{post.user?.name}</h3>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <p className="mb-3">{post.content}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full rounded-lg mb-3 max-h-96 object-contain"
        />
      )}

      <div className="flex items-center space-x-4 text-sm text-gray-500 border-t border-b border-gray-100 dark:border-gray-700 py-2 my-2">
        <button
          onClick={() => onLike(post._id)}
          className={`flex items-center space-x-1 ${post.likes.includes(currentUserId) ? 'text-red-500' : ''}`}
        >
          <Heart size={16} />
          <span>{post.likes.length}</span>
        </button>
        <button
          onClick={() => setIsCommenting(!isCommenting)}
          className="flex items-center space-x-1"
        >
          <MessageSquare size={16} />
          <span>{post.comments.length}</span>
        </button>

        {post.user._id === currentUserId && (
          <div className="flex space-x-3 ml-auto">
            <button onClick={() => onEdit(post)} className="text-blue-500">
              <Edit size={16} />
            </button>
            <button onClick={() => onDelete(post._id)} className="text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {isCommenting && (
        <form onSubmit={handleSubmitComment} className="mt-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-lg text-sm"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              type="button"
              onClick={() => setIsCommenting(false)}
              className="px-3 py-1 text-sm text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg"
            >
              Post
            </button>
          </div>
        </form>
      )}

      {post.comments.length > 0 && (
        <div className="mt-3 space-y-2">
          {post.comments.map((comment, index) => (
            <div key={index} className="flex space-x-2">
              <img
                src={comment.user?.avatar || '/default-avatar.png'}
                alt={comment.user?.name}
                className="w-6 h-6 rounded-full"
              />
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg flex-1">
                <p className="font-semibold text-sm">{comment.user?.name}</p>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
