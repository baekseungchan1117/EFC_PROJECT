import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const [editingPostId, setEditingPostId] = useState(null);

  const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await axios.get('/api/posts', config);
      setPosts(response.data);
    } catch (error) {
      // Handle the error (e.g., token expiration)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const createPost = async () => {
    try {
      await axios.post('/api/posts', form, config);
      loadPosts();
    } catch (error) {
      // Handle the error
    }
  };

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditForm({ title: post.title, content: post.content });
  };


  const updatePost = async () => {
    try {
      await axios.put(`/api/posts/${editingPostId}`, { ...editForm, id: editingPostId }, config);
      loadPosts();
      setEditingPostId(null);
    } catch (error) {
      // Handle the error
      console.log(error);
    }
};

  
  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`, config);
      loadPosts();
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <div>
      <div>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" />
        <button onClick={createPost}>Create Post</button>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {editingPostId === post.id ? (
              <div>
                <input name="title" value={editForm.title} onChange={handleEditChange} />
                <textarea name="content" value={editForm.content} onChange={handleEditChange} />
                <button onClick={() => updatePost()}>Update</button>
                <button onClick={() => setEditingPostId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <button onClick={() => startEditing(post)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
                <p>{post.id}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
