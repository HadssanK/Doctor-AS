import jwt from 'jsonwebtoken'

const verifyToken = async (req , res , next)=>{
    const authheader = req.headers.authorization;

    if (!authheader || !authheader.startsWith('Bearer')) {
        res.status(401).json({
            message: "Unothoraized , Token missing"
        })
    }
    const token = authheader.split(" ")[1];

    try {
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next();
    } catch (error) {
       return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export { verifyToken };