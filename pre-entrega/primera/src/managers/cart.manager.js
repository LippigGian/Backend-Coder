import { promises } from 'fs';

export default class CartManager {
  constructor(path) {
    this.ruta = path;
  }

  async save(obj) {
    //Aqui iria el metodo POST
  }

  async getById(id) {
    
  }

  async getProducts() {
    try {
      const products = await promises.readFile(this.path, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async deleteById(id) {
    
  }

  async deleteAll() {
    
  }
}