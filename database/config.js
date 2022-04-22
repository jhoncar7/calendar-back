const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true //Esto es para que no se genere un error cuando se crea un indice, pero me dice que no es soportada
        });

        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }
}

module.exports = {
    dbConnection
};

/*

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

*/