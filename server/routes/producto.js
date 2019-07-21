const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

let Producto = require('../models/producto');

//========================
//Obtener Productos
//========================
app.get('/producto', (req, res) => {
    //trae todos los productos
    //populate : usuario categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({})
        .skip(desde)
        .limit(5)
        .sort('Nombre')
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        })

});

//========================
//Obtener Un Producto por Id
//========================
app.get('/producto/:id', (req, res) => {
    //trae todos los productos
    //populate : usuario categoria
    //paginado
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            producto: productoDB
        });

    });

});

// ===========================
//  Buscar productos
// ===========================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            })

        })


});


//========================
//Crear una nuevo producto
//========================
app.post('/producto', verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });


});

//========================
//Actualizar un producto
//========================
app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let body = req.body;


    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                producto: productoGuardado
            });

        });




    })

});

//========================
//Borrar un producto
//========================
app.delete('/producto/:id', (req, res) => {
    //disponible a falso
    //producto ha sido deshabilitado
    let id = req.params.id;

    let cambiaEstadoDisponible = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, cambiaEstadoDisponible, { new: true }, (err, productoBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoBorrado
        });

    });

});

module.exports = app;