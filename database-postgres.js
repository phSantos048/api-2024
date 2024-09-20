import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listCarro() {
    const carro = await sql`select * from carro`;
    return carro;
  }

  async createCarro(carro) {
    const placa = randomUUID();
    console.log('placa', placa);
    const marca = carro.marca;
    const modelo = carro.modelo;
    const ano = carro.ano;
    
    await sql`insert into carro (placa, name, modelo, ano)
    values (${placa}, ${marca}, ${modelo}, ${ano})`
  }

  async updateCarro(placa, carro) {
    const marca = carro.marca;
    const modelo = carro.modelo;
    const ano = carro.ano;

    await sql`update carro set 
        name = ${marca},
        modelo = ${modelo},
        ano = ${ano}
        where placa = ${placa}
    `;
  }
  
  async deleteCarro(placa) {
    await sql`delete from carro where placa = ${placa}`
  }

}