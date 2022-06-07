

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {

    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })



  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()


    })

    it('A blog can be created', function() {
      cy.contains('create').click()
      cy.get('#title').type('mluukkai')
      cy.get('#url').type('https://www.youtube.com/')
      cy.get('#author').type('youTeam')
      cy.contains('save').click()
      cy.contains('mluukkai youTeam')
    })

    it('A blog can be liked', function() {
      cy.contains('create').click()
      cy.get('#title').type('ficbook')
      cy.get('#url').type('https://ficbook.net/')
      cy.get('#author').type('ficGuys')
      cy.contains('save').click()

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('create').click()
      cy.get('#title').type('ficbook')
      cy.get('#url').type('https://ficbook.net/')
      cy.get('#author').type('ficGuys')
      cy.contains('save').click()
      cy.visit('http://localhost:3000')
      cy.contains('view').click()
      cy.contains('delete').click()

    })

  })


})