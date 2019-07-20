//
// Puerto
//

process.env.PORT = process.env.PORT || 3000;

//
// entorno
//


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//
// vencimiento del token
// 60 segundos, 60 minnutos , 24 horas , 30 dias
//
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//
// entorno
//

process.env.SEED = process.env.REST_SEED || 'este-es-el-seed-desarrollo';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;