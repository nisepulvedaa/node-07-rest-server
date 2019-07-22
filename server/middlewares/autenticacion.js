const jwt = require('jsonwebtoken');
//==================================
//verificar token
//==================================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    /*    res.json({
           token: token
       }); */
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no Valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });


};

//==================================
//verificar adminRole
//==================================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'Role  no tiene permisos para insertar'
            }
        });

    }

};


//==================================
//verificar token para imagen
//==================================

let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no Valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });


};


module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}