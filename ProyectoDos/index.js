import mongoose from 'mongoose';
import productos from './src/daos/productos/products.json' assert { type: "json" };

const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    código: { type: Number, required: true },
    foto: { type: String, required: false },
    precio: { type: Number, required: true },
    stock: { type: Number, default: false },
    id: { type: Number, default: false },
})

const productosDAO = mongoose.model('productos', ProductsSchema);

await mongoose.connect('mongodb://localhost:27017/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
});

console.log('Base de datos mongo conectada')

const inserciones = [];

for (const prod of productos) {
    inserciones.push(productosDAO.create(prod))
}

const results = await Promise.allSettled(inserciones)
const rejected = results.filter(result => result.status === 'rejected')
if (rejected.length > 0) {
    console.log('Error al insertar producto')
    console.log(rejected)
} else {
    console.log('lo que se agregó a la bd');
    console.log(inserciones);
    console.log('productos insertados correctamente')
}

await mongoose.disconnect();