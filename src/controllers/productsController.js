const fs = require('fs');
const path = require('path');
const multer = require('multer');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const productsjson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const products=require('../data/productsDataBase.json');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render('products',{
			products //referencia clave product y alor products/
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		// obetener dato porparam 
		const idParam= req.params.id;
		//buscar dentro del array el producto 
		const prodFind = products.find((p) => p.id === idParam);

		res.render('detail',{
			prodFind
		})
		
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic

		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		// request:{
		//params:{}
		//query:{}
		//body:{
			/*
			name:
			price:
			discount:
			category:
			description:
			*/
		//}
		//}
		
		let newProduct = req.body
		newProduct.id= `${products.length + 1}`
		newProduct.image= req.file?.filename || "default-image.png"
		// newProduct.image= req.file.filename
		// agregar el neProduct al array de products
		products.push(newProduct);

		//sobrescribir el archivo jsom
		fs.writeFileSync( productsFilePath, JSON.stringify(products));
		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const {id} = req.params;

		const productToEdit= products.find((product) => product.id == id);
		console.log(productToEdit);
		res.render('product-edit-form',{
			productToEdit
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const {id} = req.params;
		const edicion= req.body
		const productToEdit= products.find(product => product.id === id);

		const indiceDelProduct= products.findIndex((prod)=> prod.id === id)
		products[indiceDelProduct] = {
			id: id,
			name: edicion.name,
			description: edicion.description,
			price: edicion.price,
			discount: edicion.discount,
			image: products[indiceDelProduct].image,
			category: edicion.category
		}
		//multer

		//guardar en json
		fs.writeFileSync( productsFilePath, JSON.stringify(products));
		res.redirect('/')

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		//obtener el id
		const {id}= req.params
		const indiceDelProduct= products.findIndex((prod)=> prod.id === id)
		//eliminar el product del array 
		products.splice(indiceDelProduct,1);
		//actalizar el json
		fs.writeFileSync( productsFilePath, JSON.stringify(products));
		//redireccionar
		res.redirect('/')
	}
};

module.exports = controller;