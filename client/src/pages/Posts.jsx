import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import API from '../services/api';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import Sidebar from "../components/Sidebar";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get('/posts');
      setPosts(data);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = async (postId) => {
    try {
      await API.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      toast('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const { data } = await API.patch(`/posts/${postId}/like`);
      setPosts(posts.map(post =>
        post._id === postId ? { ...post, likes: data.likes } : post
      ));
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleCommentAdded = async (postId, comment) => {
    try {
      const { data } = await API.post(`/posts/${postId}/comment`, { text: comment });
      setPosts(posts.map(post =>
        post._id === postId ? { ...post, comments: data.comments } : post
      ));
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <>
    <div className="min-h-screen flex flex-col md:flex-row">
    <Sidebar />
    {/* Main content area */}
      <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-tr from-zinc-100 to-sky-100 dark:from-zinc-900 dark:to-sky-900 text-zinc-900 dark:text-zinc-100">

    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Community Posts</h1>

      <PostForm
        onPostCreated={handlePostCreated}
        initialData={editingPost}
      />

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No posts yet. Be the first to share!</p>
        ) : (
          posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              onDelete={handleDeletePost}
              onEdit={() => setEditingPost(post)}
              onLike={handleLikePost}
              onComment={handleCommentAdded}
            />
          ))
        )}
      </div>
    </div>
    </main>
      </div>
    </>
  );
}
