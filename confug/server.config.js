if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

module.export = {
    PORT: process.env.PORT
}