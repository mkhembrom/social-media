const { PrismaClient } = require('.prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');

const { loginValidate, registerValidate } = require('../utils/validation');

const login = async (req, res) => {
    const { error } = loginValidate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            const comparePassword = await bcrypt.compare(password, existingUser.password);

            const token = Jwt.sign({ ...existingUser  }, process.env.SECRETTOKEN, { expiresIn: '1d' })

            if (comparePassword) return res.status(200).json({ username: existingUser.name, token });
            else return res.status(400).json({ error: "Password is invalid" });

        } else {
            return res.json("Authentication Error");
        }
    } catch (err) {
        res.status(400).json(err);
    }


}

const register = async (req, res) => {
    const {error} = registerValidate(req.body);
   
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { email, name, password } = req.body;
   
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    
        if (existingUser) return res.status(200).json({ msg: "username is already taken" });
    
        const hashPassword = await bcrypt.hash(password, 10);
        try {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashPassword,
                }
            });
            console.log(newUser);
        res.status(201).json( newUser );
        } catch (err) {
        res.status(400).json(err);
        }
}

const logout = async (req, res) => {
    
}

const totalNumberOfUser = async(req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
                followings: {
                    select: {
                        followingId: true,
                       
                    }
                },
                followers: {
                    select: {
                        followerId: true,
                      
                    }
                }
            },
           
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


module.exports = {
    login,
    register,
    totalNumberOfUser
}