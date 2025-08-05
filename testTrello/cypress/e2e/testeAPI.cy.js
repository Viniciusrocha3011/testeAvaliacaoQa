describe('Test Trello', () => {

const key = '06c8590b2d941f662ad778ba380e263b';
const token = 'ATTAdcb29298367de44ca56a5562ab6c2335da851409a7a99fb9526d3607054da69dA8816705';
let quadroID;
let listaID;
let cartaoID;

it('Cadastrar um board', () => {

    cy.request({
    method: 'POST',
    url: 'https://api.trello.com/1/boards/',
    qs: {
        name: 'Test Board',
        key: key,
        token: token,
        idOrganization: '68913ec54ade8004a7109c94'

    },
    }).then((response) => {
    expect(response.status).to.eq(200);
    quadroID = response.body.id;
    cy.log(`ID do Board: ${response.body.id}`);
    });

});

it('Cadastrar uma lista', () => {

    cy.request({
    method: 'POST',
    url: `https://api.trello.com/1/boards/${quadroID}/lists`,
    qs: {
        name: 'Test Trello Lista',
        key: key,
        token: token,
        idOrganization: '68913ec54ade8004a7109c94'
    },
    }).then((response) => {
    expect(response.status).to.eq(200);
    listaID = response.body.id;
    cy.log(`ID da lista criada: ${response.body.id}`);
    });
});

it('Cadastrar um card', () => {

    cy.request({
    method: 'POST',
    url: `https://api.trello.com/1/cards`,
    qs: {
        name: 'Incluir um Card',
        idList: listaID,
        key: key,
        token: token,
        idOrganization: '68913ec54ade8004a7109c94'
    },
    }).then((response) => {
    expect(response.status).to.eq(200);
    cartaoID = response.body.id;
    cy.log(`ID do card criado: ${response.body.id}`);
    });
});

it('Excluir um card', () => {

    cy.request({
    method: 'DELETE',
    url: `https://api.trello.com/1/cards/${cartaoID}`,
    qs: {
        key: key,
        token: token,
        idOrganization: '68913ec54ade8004a7109c94'
    },
    }).then((response) => {
    expect(response.status).to.eq(200);;
    });
});

it('Excluir um Board', () => {

    cy.request({
    method: 'DELETE',
    url: `https://api.trello.com/1/boards/${quadroID}`,
    qs: {
        key: key,
        token: token,
        idOrganization: '68913ec54ade8004a7109c94'
    },
    }).then((response) => {
    expect(response.status).to.eq(200);;
    });
});

});