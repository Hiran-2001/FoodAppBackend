const checkRole = () => {
    (req, res, next) => {
        if (!req.user) {
            return res.status(401).send('Unauthorized');
        }
        const isAuthorized = req.user.isAdmin 

        if(isAuthorized){
            next();
        }else{
            return res.status(403).send('You are not allowed to make this request.');
        }
    }
}

// const role = { checkRole };
module.exports = checkRole;