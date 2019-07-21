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
//process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.CADUCIDAD_TOKEN = '48h';

//
// entorno
//

process.env.SEED = process.env.REST_SEED || 'este-es-el-seed-desarrollo';

//
// google CLIENT_ID
//

process.env.CLIENT_ID = process.env.CLIENT_ID || '496200867736-t2huesdcmhf2fmp6te44asb519j1al8p.apps.googleusercontent.com';


let urlDB;




if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;