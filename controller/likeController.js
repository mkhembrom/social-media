const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const likePost = async (req, res) => {
    const {id} = req.params;
   
    try {
        const alreadyLiked = await prisma.like.findMany({
            where: {
                AND: [
                    { userId: req.user.id},
                    { postId: parseInt(id)}
                ],
               
            }
        });

        console.log(alreadyLiked.length); 

        if (alreadyLiked.length) {
            const unlike = await prisma.like.deleteMany({
                where: {
                    AND: [
                        { userId: req.user.id},
                        { postId: parseInt(id)}
                    ],
                }
            });
            return res.status(200).json({ post: "You Disliked the Post" })
        } else {
            const like = await prisma.like.create({
                data: {
                    postId: parseInt(id),
                    userId: req.user.id
                }
            });
            return res.status(200).json({ post: "You Like the Post" });
        }
        
        
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const numberOfLikePost = async (req, res) => {
    const { id } = req.params;
    try {

        // FIND NUMBER OF POST
        // const post = await prisma.post.findUnique({
        //     where: {
        //         id: parseInt(id),
        //     },
        // })

        
        // console.log(post);
         // const post = await prisma.post.findUnique({
        //     where: {
        //         id: parseInt(id),
        //     },
        // })

        
        // console.log(post);
        const countLike = await prisma.like.count({
            where: {
                postId: parseInt(id),
            }
        });
        console.log(countLike);
        res.status(200).json({ count:  countLike});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    likePost,
    numberOfLikePost
}