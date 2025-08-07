import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import API from '../services/api';

export default function PostForm({ onPostCreated, initialData = null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || '');
  const [imageFile, setImageFile] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initialData || { content: '' }
  });

const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    const formData = new FormData();
    formData.append('content', data.content);

    // Append the file directly if it exists
    if (imageFile) {
      formData.append('image', imageFile); // Use the stored file object
    }

    let response;
    if (initialData) {
      response = await API.put(`/posts/${initialData._id}`, formData);
    } else {
      response = await API.post('/posts', formData);
    }

    reset();
    setImagePreview('');
    setImageFile(null);
    toast.success(initialData ? 'Post updated successfully' : 'Post saved successfully');
    if (onPostCreated) onPostCreated(response.data);
  } catch (error) {
    console.error('Post submission error:', error);
    const errorMessage = error.response?.data?.message ||
                       error.response?.data?.error ||
                       'Failed to save post. Please try again.';
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageFile(file); // Store the actual file object
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div>
        <textarea
          {...register('content', { required: 'Post content is required' })}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
          rows={4}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div>
          <label className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-sm">Add Image</span>
          </label>
          <input
            type="hidden"
            {...register('imageUrl')}
            value={imagePreview}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : initialData ? 'Update' : 'Post'}
        </button>
      </div>

      {imagePreview && (
        <div className="mt-2">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-60 rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => setImagePreview('')}
            className="mt-2 text-sm text-red-500 hover:text-red-700"
          >
            Remove image
          </button>
        </div>
      )}
    </form>
  );
}
