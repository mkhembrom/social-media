const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createComment = async (req, res) => {
    const { id } = req.params;
    const { comments } = req.body;
    try {
        const comment = await prisma.comment.create({
            data: {
                postId: parseInt(id),
                userId: req.user.id,
                comment: comments
            }
        });
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await prisma.comment.deleteMany({
            where: {
                AND: [
                { postId: parseInt(id),},
                { userId: req.user.id, }
               ]
               
            }
        });
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createComment,
    deleteComment
}