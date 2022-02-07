import * as dotenv from "dotenv";
dotenv.config();
process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

import server from "../../src";
import { Server } from "http";
import Receita, { ReceitaInput } from "../../src/database/models/receita.model";
import Categoria from "../../src/database/models/categoria.model";

chai.use(chaiHttp);

describe("Receita", async () => {
	let myServer: Server = null;
	let category: Categoria;
	let receita: Partial<Receita> = {
		categoria_id: "",
		descricao: "Pagamento 1",
		data: new Date("05/01/2021"),
		valor: 10,
	};
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 2',
	// 	data: new Date('05/02/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 3',
	// 	data: new Date('05/03/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 4',
	// 	data: new Date('05/04/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 5',
	// 	data: new Date('05/05/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 6',
	// 	data: new Date('05/06/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 7',
	// 	data: new Date('05/07/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 8',
	// 	data: new Date('05/08/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 9',
	// 	data: new Date('05/09/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 10',
	// 	data: new Date('05/10/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 11',
	// 	data: new Date('05/11/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 12',
	// 	data: new Date('05/12/2021'),
	// 	valor: 10
	// },
	// {
	// 	categoria_id: '',
	// 	descricao: 'Pagamento 12',
	// 	data: new Date('05/13/2021'),
	// 	valor: 10
	// },
	// ];

	var categ = "";
	var value = 0;

	var validCategValue = (
		categ_id: string,
		value_expected: number,
		done: Mocha.Done
	) => {
		categ = categ_id;
		value = value_expected;

		chai.request(myServer)
			.get(`/api/categorias/${categ}`)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Object");
				body.to.have.property("id");
				body.to.have.property("nome");
				body.to.have.property("descricao");
				body.to.have.property("vlr_em_categoria").to.be.equal(value);
				body.to.have.property("updatedAt");
				body.to.have.property("createdAt");
				body.to.have.property("deletedAt");

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
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

	it("Get uma categoria", (done) => {
		chai.request(myServer)
			.get(`/api/categorias`)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body[0]);
				body.to.be.a("Object");
				body.to.have.property("id");
				body.to.have.property("nome");
				body.to.have.property("descricao");
				body.to.have.property("vlr_em_categoria").to.be.equal(0);
				body.to.have.property("updatedAt");
				body.to.have.property("createdAt");
				body.to.have.property("deletedAt");

				category = res.body[0];
				receita.categoria_id = category.id;

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("Validando categoria é 0", (done) => {
		validCategValue(category.id, 0, done);
	});

	it("POST Funciona", (done) => {
		chai.request(myServer)
			.post(`/api/receitas`)
			.send(receita)
			.then((res) => {
				chai.expect(
					res,
					`Send: ${JSON.stringify(res.body)}`
				).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Object");
				body.to.have.property("id");
				body.to.have
					.property("categoria_id")
					.to.be.equal(receita.categoria_id);
				body.to.have
					.property("descricao")
					.to.be.equal(receita.descricao);
				body.to.have.property("valor").to.be.equal(receita.valor);
				body.to.have.property("data");
				chai.expect(new Date(res.body.data)).to.be.deep.eq(
					receita.data
				);

				receita = res.body;

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("GET ALL Funciona", (done) => {
		chai.request(myServer)
			.get(`/api/receitas`)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Array");
				body.to.have.length(1);

				const elem = chai.expect(res.body[0]);
				elem.to.be.a("Object");
				elem.to.have.property("id");
				elem.to.have
					.property("categoria_id")
					.to.be.equal(receita.categoria_id);
				elem.to.have
					.property("descricao")
					.to.be.equal(receita.descricao);
				elem.to.have.property("valor").to.be.equal(receita.valor);
				elem.to.have.property("data").to.be.equal(receita.data);

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("GET By Id Funciona", (done) => {
		chai.request(myServer)
			.get(`/api/receitas/${receita.id}`)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Object");
				body.to.have.property("id").to.be.equal(receita.id);
				body.to.have
					.property("categoria_id")
					.to.be.equal(receita.categoria_id);
				body.to.have
					.property("descricao")
					.to.be.equal(receita.descricao);
				body.to.have.property("valor").to.be.equal(receita.valor);
				body.to.have.property("data").to.be.equal(receita.data);

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("GET By Ano Mes Funciona", (done) => {
		chai.request(myServer)
			.get(
				`/api/receitas/${new Date(receita.data).getFullYear()}/${
					new Date(receita.data).getMonth() + 1
				}`
			)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Array");

				const elem = chai.expect(res.body[0]);
				elem.to.be.a("Object");
				elem.to.have.property("id").to.be.equal(receita.id);
				elem.to.have
					.property("categoria_id")
					.to.be.equal(receita.categoria_id);
				elem.to.have
					.property("descricao")
					.to.be.equal(receita.descricao);
				elem.to.have.property("valor").to.be.equal(receita.valor);
				elem.to.have.property("data").to.be.equal(receita.data);

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("Validando categoria é 10", (done) => {
		validCategValue(receita.categoria_id, 10, done);
	});

	it("PUT Funciona - Sem /{ID}", (done) => {
		const newReceita = {
			descricao: "Alterando",
		};

		chai.request(myServer)
			.put(`/api/receitas`)
			.send(newReceita)
			.then((res) => {
				chai.expect(res).to.have.status(400);

				chai.expect(res.body).to.be.a("Array");
				chai.expect(res.body[0]).to.be.have.property("message");
				chai.expect(res.body[0].message).to.be.eq(
					"Id precisa ser informado no formato: /receitas/ID"
				);

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("PUT Funciona - valor", (done) => {
		const newReceita = {
			valor: 15,
		};

		chai.request(myServer)
			.put(`/api/receitas/${receita.id}`)
			.send(newReceita)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Object");
				body.to.have.property("id").to.be.equal(receita.id);
				body.to.have
					.property("categoria_id")
					.to.be.equal(receita.categoria_id);
				body.to.have
					.property("descricao")
					.to.be.equal(receita.descricao);
				body.to.have.property("valor").to.be.equal(newReceita.valor);
				body.to.have.property("data").to.be.equal(receita.data);

				receita = res.body;

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});
	it("Validando Valor de categoria é 15", (done) => {
		validCategValue(receita.categoria_id, 15, done);
	});

	it("PUT Funciona - categ", (done) => {
		let newReceita = {
			categoria_id: "",
		};

		chai.request(myServer)
			.get(`/api/categorias`)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body[2]);
				body.to.be.a("Object");
				body.to.have.property("id");
				body.to.have.property("nome");
				body.to.have.property("descricao");
				body.to.have.property("vlr_em_categoria").to.be.equal(0);
				body.to.have.property("updatedAt");
				body.to.have.property("createdAt");
				body.to.have.property("deletedAt");

				newReceita.categoria_id = res.body[2].id;

				chai.request(myServer)
					.put(`/api/receitas/${receita.id}`)
					.send(newReceita)
					.then((res) => {
						chai.expect(res).to.have.status(200);

						const body = chai.expect(res.body);
						body.to.be.a("Object");
						body.to.have.property("id").to.be.equal(receita.id);
						body.to.have
							.property("categoria_id")
							.to.be.equal(newReceita.categoria_id);
						body.to.have
							.property("descricao")
							.to.be.equal(receita.descricao);
						body.to.have
							.property("valor")
							.to.be.equal(receita.valor);
						body.to.have.property("data").to.be.equal(receita.data);

						receita = res.body;

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
	it("Validando Valor de Antiga é 0", (done) => {
		validCategValue(category.id, 0, done);
	});
	it("Validando Valor de categoria é 15", (done) => {
		validCategValue(receita.categoria_id, 15, done);
	});

	it("DELETE Funciona", (done) => {
		chai.request(myServer)
			.delete(`/api/receitas/${receita.id}`)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Boolean");
				body.to.be.true;

				chai.request(myServer)
					.get(`/api/receitas/${receita.id}`)
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
	it("Validando Valor de categoria é 0", (done) => {
		validCategValue(receita.categoria_id, 0, done);
	});
});
