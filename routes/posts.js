const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

// Save post
router.post('/post/save', async (req, res) => {
    try {
        // Create a new post object with data from the request body
        let newPost = new Posts(req.body);
        
        // Save the new post to the database
        await newPost.save();

        // Respond with success message
        return res.status(200).json({
            success: "Post saved successfully"
        });
    } catch (err) {
        // If an error occurs during saving, respond with error message
        return res.status(400).json({
            error: err.message
        });
    }
});
// Get posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find();
        return res.status(200).json({ success: true, existingPosts: posts });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
// show details of a specific post
router.get('/post/:id', async (req, res) => {
    try {
        let postId = req.params.id;

        // Use findById() to find the post by its ID
        let post = await Posts.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Return the post details
        return res.status(200).json({ success: true, post });
    } catch (err) {
        // Handle any errors
        return res.status(400).json({ success: false, error: err.message });
    }
});


// Update post
router.put('/post/update/:id', (req, res) => {
    Posts.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(updatedPost => {
            res.status(200).json({ success: "Updated successfully", updatedPost });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
});

// Delete post
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ success: "Deleted successfully", deletedPost });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;
