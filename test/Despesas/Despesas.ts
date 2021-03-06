import * as dotenv from "dotenv";
dotenv.config();
process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

import server from "../../src";
import { Server } from "http";
import Despesa from "../../src/database/models/despesa.model";
import Categoria from "../../src/database/models/categoria.model";

chai.use(chaiHttp);

describe("Despesa", async () => {
	let myServer: Server = null;
	let category: Categoria;
	let despesa: Partial<Despesa> = {
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
				despesa.categoria_id = category.id;

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("Validando categoria ?? 0", (done) => {
		validCategValue(category.id, 0, done);
	});

	it("POST Funciona", (done) => {
		chai.request(myServer)
			.post(`/api/despesas`)
			.send(despesa)
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
					.to.be.equal(despesa.categoria_id);
				body.to.have
					.property("descricao")
					.to.be.equal(despesa.descricao);
				body.to.have.property("valor").to.be.equal(despesa.valor);
				body.to.have.property("data");
				chai.expect(new Date(res.body.data)).to.be.deep.eq(
					despesa.data
				);

				despesa = res.body;

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("GET ALL Funciona", (done) => {
		chai.request(myServer)
			.get(`/api/despesas`)
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
					.to.be.equal(despesa.categoria_id);
				elem.to.have
					.property("descricao")
					.to.be.equal(despesa.descricao);
				elem.to.have.property("valor").to.be.equal(despesa.valor);
				elem.to.have.property("data").to.be.equal(despesa.data);

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("GET By Id Funciona", (done) => {
		chai.request(myServer)
			.get(`/api/despesas/${despesa.id}`)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Object");
				body.to.have.property("id").to.be.equal(despesa.id);
				body.to.have
					.property("categoria_id")
					.to.be.equal(despesa.categoria_id);
				body.to.have
					.property("descricao")
					.to.be.equal(despesa.descricao);
				body.to.have.property("valor").to.be.equal(despesa.valor);
				body.to.have.property("data").to.be.equal(despesa.data);

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
				`/api/despesas/${new Date(despesa.data).getFullYear()}/${
					new Date(despesa.data).getMonth() + 1
				}`
			)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Array");

				const elem = chai.expect(res.body[0]);
				elem.to.be.a("Object");
				elem.to.have.property("id").to.be.equal(despesa.id);
				elem.to.have
					.property("categoria_id")
					.to.be.equal(despesa.categoria_id);
				elem.to.have
					.property("descricao")
					.to.be.equal(despesa.descricao);
				elem.to.have.property("valor").to.be.equal(despesa.valor);
				elem.to.have.property("data").to.be.equal(despesa.data);

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("Validando categoria ?? -10", (done) => {
		validCategValue(despesa.categoria_id, -10, done);
	});

	it("PUT Funciona - Sem /{ID}", (done) => {
		const newDespesa = {
			descricao: "Alterando",
		};

		chai.request(myServer)
			.put(`/api/despesas`)
			.send(newDespesa)
			.then((res) => {
				chai.expect(res).to.have.status(400);

				chai.expect(res.body).to.be.a("Array");
				chai.expect(res.body[0]).to.be.have.property("message");
				chai.expect(res.body[0].message).to.be.eq(
					"Id precisa ser informado no formato: /despesas/ID"
				);

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});

	it("PUT Funciona - valor", (done) => {
		const newDespesa = {
			valor: 15,
		};

		chai.request(myServer)
			.put(`/api/despesas/${despesa.id}`)
			.send(newDespesa)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Object");
				body.to.have.property("id").to.be.equal(despesa.id);
				body.to.have
					.property("categoria_id")
					.to.be.equal(despesa.categoria_id);
				body.to.have
					.property("descricao")
					.to.be.equal(despesa.descricao);
				body.to.have.property("valor").to.be.equal(newDespesa.valor);
				body.to.have.property("data").to.be.equal(despesa.data);

				despesa = res.body;

				done();
			})
			.catch((e) => {
				console.log(e);
				done(e);
			});
	});
	it("Validando Valor de categoria ?? -15", (done) => {
		validCategValue(despesa.categoria_id, -15, done);
	});

	it("PUT Funciona - categ", (done) => {
		let newDespesa = {
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

				newDespesa.categoria_id = res.body[2].id;

				chai.request(myServer)
					.put(`/api/despesas/${despesa.id}`)
					.send(newDespesa)
					.then((res) => {
						chai.expect(res).to.have.status(200);

						const body = chai.expect(res.body);
						body.to.be.a("Object");
						body.to.have.property("id").to.be.equal(despesa.id);
						body.to.have
							.property("categoria_id")
							.to.be.equal(newDespesa.categoria_id);
						body.to.have
							.property("descricao")
							.to.be.equal(despesa.descricao);
						body.to.have
							.property("valor")
							.to.be.equal(despesa.valor);
						body.to.have.property("data").to.be.equal(despesa.data);

						despesa = res.body;

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
	it("Validando Valor de Antiga ?? 0", (done) => {
		validCategValue(category.id, 0, done);
	});
	it("Validando Valor de categoria ?? -15", (done) => {
		validCategValue(despesa.categoria_id, -15, done);
	});

	it("DELETE Funciona", (done) => {
		chai.request(myServer)
			.delete(`/api/despesas/${despesa.id}`)
			.then((res) => {
				chai.expect(res).to.have.status(200);

				const body = chai.expect(res.body);
				body.to.be.a("Boolean");
				body.to.be.true;

				chai.request(myServer)
					.get(`/api/despesas/${despesa.id}`)
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
	it("Validando Valor de categoria ?? 0", (done) => {
		validCategValue(despesa.categoria_id, 0, done);
	});
});
