const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createPost = async (req, res) => {
    
    const { title, content } = req.body;

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                userId: req.user.id,
            }
        });
        res.status(201).json(newPost);

    } catch (err) {
       res.json({error: err.message})
    }
}

const getPost = async (req, res) => {
    try {
        const getPost = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                userId: true,
                id: true,
                likes: {
                    select: {
                        userId: true,
                    }
                },
                comments: {
                    select: {
                        userId: true,
                        comment: true
                    }
                }
               
            }
        });
        res.status(200).json(getPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getPostById = async (req, res) => {
    const {id} =  req.params;
    try {
        const getPost = await prisma.post.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json(getPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    console.log("HERE : ", id);
    const { title, content } = req.body;
    try {

        const findPost = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            }
        });

        if (req.user.id === findPost.userId) {
            const updatedPost = await prisma.post.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title,
                    content,
                },
            });
    
            res.status(200).json({post: "Updated successfully", updatedPost});
        } else {
            
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deletePost = async (req, res) => {
    
    const { id } = req.params;

    try {

        const findPost = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (req.user.id === findPost.userId) {
            const deletedPost = await prisma.post.delete({
                where: {
                    id: parseInt(id),
                }
            });
            res.status(200).json({ post: "Deleted Successfully", deletedPost});
        } else {
            res.status(400).json({ error: "You can't delete others Posts" });
        }
          
    } catch (err) {
        res.status(400).json({ error: err.message, post: deletedPost });
    }
}

module.exports = {
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost
}
