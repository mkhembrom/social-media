const { PrismaClient } = require('.prisma/client');
const prisma = new PrismaClient();

const unfollow = async (req, res) => {
    const { id } = req.params;

   try {

       const followings = await prisma.following.deleteMany({
            where: {
               AND: [
                    {followingId: parseInt(id),},
                    {userId: req.user.id}
               ]
            }
       })

       const followers = await prisma.follower.deleteMany({
            where: {
               AND: [
                    { followerId: req.user.id },
                    { userId: parseInt(id) }
                ]
            }
        })

       res.status(200).json({followings, followers});
   } catch (err) {
       res.status(400).json({ error: err.message });
   }
}

const follow = async (req, res) => {
    const { id } = req.params;

    try {

        const alreadyFollowing = await prisma.following.findMany({
            where: {
                AND: [
                    { followingId: parseInt(id) },
                    { userId: req.user.id }
                ]
            }
        })

        if(alreadyFollowing.length) return res.status(200).json({ msg: "You already follow this users"})
        
        const followings = await prisma.following.create({
            data: {
                followingId: parseInt(id),
                userId: req.user.id,
            }
        })

        const followers = await prisma.follower.create({
            data: {
                followerId: req.user.id,
                userId: parseInt(id),
            }
        })
         
        res.status(201).json({followings, followers});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    follow,
    unfollow
}