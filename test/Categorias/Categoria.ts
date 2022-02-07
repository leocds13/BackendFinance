import * as dotenv from "dotenv";
dotenv.config();
process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

import server from "../../src";
import { Server } from "http";
import Categoria, { CategoriaInput } from "../../src/database/models/categoria.model";

chai.use(chaiHttp);

describe("Categoria", async () => {
	let myServer: Server = null;
	let id: string = "ID Ficticio";
	let category: Categoria;

	const newCategory: CategoriaInput = {
		nome: "Categoria_teste",
	};

	it("Serve deveria subir", (done) => {
		server
			.then((ser) => {
				myServer = ser;
				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("Get all & valores iniciais", (done) => {
		const initValues = [
			"Alimentação",
			"Saúde",
			"Moradia",
			"Transporte",
			"Educação",
			"Lazer",
			"Imprevistos",
		];

		chai.request(myServer)
			.get("/api/categorias")
			.then((res) => {
				chai.expect(res).to.have.status(200);

				chai.expect(res.body).to.be.a("Array");
				chai.expect(res.body).to.have.length(7);

				initValues.forEach((categ) => {
					chai.expect(
						res.body.some((e: any) => e.nome == categ),
						`'${categ}' não existe em req.body`
					).to.be.true;
				});

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("POST method", (done) => {
		chai.request(myServer)
			.post("/api/categorias")
			.send(newCategory)
			.then((res) => {
				chai.expect(res).have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Object");
				body.to.have.property("id");
				body.to.have.property("descricao");
				body.to.have.property("vlr_em_categoria").to.be.equal(0);
				body.to.have.property("nome").to.be.equal(newCategory.nome);
				body.to.have.property("updatedAt");
				body.to.have.property("createdAt");
				body.to.have.property("deletedAt");

				id = res.body.id;

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("Get By Id", (done) => {
		chai.request(myServer)
			.get(`/api/categorias/${id}`)
			.then((res) => {
				chai.expect(res).have.status(200);

				let body = chai.expect(res.body);
				body.to.be.a("Object");
				body.to.have.property("id");
				body.to.have.property("nome").to.be.equal(newCategory.nome);
				body.to.have.property("descricao");
				body.to.have.property("vlr_em_categoria").to.be.equal(0);

				category = res.body;

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("PUT method", (done) => {
		const newValues: CategoriaInput = {
			descricao: "Descrição teste",
			vlr_em_categoria: 20,
			nome: "Categoria teste",
		};

		chai.request(myServer)
			.put(`/api/categorias/${id}`)
			.send(newValues)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);

				body.to.be.a("Object");
				body.to.not.be.equal(category);
				body.to.have
					.property("descricao")
					.to.be.equal(newValues.descricao);
				body.to.have
					.property("vlr_em_categoria")
					.to.be.equal(newValues.vlr_em_categoria);
				body.to.have.property("nome").to.be.equal(newValues.nome);

				category = res.body;

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("DELETE method", (done) => {
		chai.request(myServer)
			.delete(`/api/categorias/${id}`)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Boolean");
				body.to.be.true;

				chai.request(myServer)
					.get(`/api/categorias/${id}`)
					.then((res) => {
						chai.expect(res).to.have.status(400);

						done();
					})
					.catch((e) => {
						console.log(e);
						done(e);
					});
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});
});
