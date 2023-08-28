const fs = require('fs');
const path = require('path');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const products= require('../data/productsDataBase.json')

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		//visitados
		const arrVisitados = products.filter((elem)=> elem.category === "visited")

		//ofertas
		const arrOfertas = products.filter((elem)=> elem.category === "in-sale")

		//pasarselos a la vista
		res.render('index',{
			visitados: arrVisitados,
			ofertas: arrOfertas
		})
	},
	search: (req, res) => {
		// Do the magic

		//capturar info de query string
		//pq name del mform se llama keyords 
		const {keywords} = req.query;
		
		//buscar dentro de un array
		const prodSearch = products.filter((elem)=>elem.name.toLowerCase().includes(keywords.toLowerCase()))

		//pasarlelo a vista
		res.render('results',{
			results: prodSearch
		})
	},
};

module.exports = controller;
