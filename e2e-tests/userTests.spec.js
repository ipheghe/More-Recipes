module.exports = {
  'User is redirected to login page after successful signup': (browser) => {
    browser
      .url('http://localhost:8000/#/signup')
      .waitForElementVisible('body', 5000)
      .pause(3000)
      .assert.elementPresent('input#username')
      .assert.elementPresent('input#fullName')
      .assert.elementPresent('input#mobileNumber')
      .assert.elementPresent('input#email')
      .assert.elementPresent('input#password')
      .assert.elementPresent('button#signup')
      .setValue('input#username', 'vixen')
      .setValue('input#fullName', 'Amaka Linda')
      .setValue('input#mobileNumber', 2347035221123)
      .setValue('input#email', 'amaka@yahoo.com')
      .setValue('input#password', 'abcde')
      .click('button#signup')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/login')
      .pause(1000)
      .end();
  },

  'user receives an error if required fields for signup are empty':
   (browser) => {
     browser
       .url('http://localhost:8000/#/signup')
       .pause(3000)
       .setValue('input#username', '')
       .setValue('input#fullName', 'Amaka Linda')
       .setValue('input#mobileNumber', 2347035221123)
       .setValue('input#email', 'amaka@yahoo.com')
       .setValue('input#password', 'abcde')
       .click('button#signup')
       .pause(1000)
       .assert
       .containsText(
         'p.alert',
         'Username must start with a letter and have no spaces.'
       )
       .pause(5000);
   },

  'user receives an error if email is invalid':
   (browser) => {
     browser
       .url('http://localhost:8000/#/signup')
       .pause(3000)
       .setValue('input#username', 'vixen')
       .setValue('input#fullName', 'Amaka Linda')
       .setValue('input#mobileNumber', 2347035221123)
       .clearValue('input#email')
       .setValue('input#email', 'amaka@yahoo')
       .setValue('input#password', 'abcde')
       .click('button#signup')
       .pause(1000)
       .assert
       .containsText('p.alert', 'Invalid Email Address')
       .pause(5000);
   },

  'user cannot sign up with existing username': (browser) => {
    browser
      .url('http://localhost:8000/#/signup')
      .pause(3000)
      .setValue('input#username', 'vixen')
      .setValue('input#fullName', 'Amaka Linda')
      .setValue('input#mobileNumber', 2347035221123)
      .clearValue('input#email')
      .setValue('input#email', 'amaka@yahoo.com')
      .setValue('input#password', 'abcde')
      .click('button#signup')
      .pause(1000)
      .assert
      .containsText('p.alert', 'Username you entered already exist')
      .pause(5000);
  },

  'user cannot sign up with exisiting email': (browser) => {
    browser
      .url('http://localhost:8000/#/signup')
      .pause(3000)
      .setValue('input#username', 'kemi')
      .setValue('input#fullName', 'Amaka Linda')
      .setValue('input#mobileNumber', 2347035221123)
      .clearValue('input#email')
      .setValue('input#email', 'amaka@yahoo.com')
      .setValue('input#password', 'abcde')
      .click('button#signup')
      .pause(1000)
      .assert
      .containsText('p.alert', 'Email address you entered already exist')
      .pause(5000);
  },

  'user receives an error if password is incorrect': (browser) => {
    browser
      .url('http://localhost:8000/#/login')
      .waitForElementVisible('.login-form', 5000)
      .assert.elementPresent('input#username')
      .assert.elementPresent('input#password')
      .setValue('input#username', 'vixen')
      .setValue('input#password', 'incorrect')
      .click('button#login')
      .pause(1000)
      .assert
      .containsText('p.alert', 'Authentication failed!')
      .pause(3000);
  },

  'User is Redirected to dashboard page after successful login': (browser) => {
    browser
      .url('http://localhost:8000/#/login')
      .waitForElementVisible('.login-form', 5000)
      .assert.elementPresent('input#username')
      .assert.elementPresent('input#password')
      .setValue('input#username', 'vixen')
      .setValue('input#password', 'abcde')
      .click('button#login')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/dashboard/top-recipes')
      .pause(3000);
  },

  'user receives an error if recipe name field for add recipe is empty':
    (browser) => {
      browser
        .url('http://localhost:8000/#/dashboard/add-recipe')
        .waitForElementVisible('#add-recipe', 5000)
        .pause(3000)
        .assert.elementPresent('input[name=recipeName]')
        .assert.elementPresent('input[name=recipeDetail]')
        .setValue('input[name=recipeName]', ' ')
        .setValue('input[name=recipeDetail]', ' ')
        .setValue('textarea[name=ingredients]', ' ')
        .setValue('textarea[name=directions]', ' ')
        .click('#click-add-recipe')
        .assert
        .containsText('p.alert', 'Recipe image field cannot be empty')
        .pause(3000);
    },

  'Users can add recipe': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/add-recipe')
      .waitForElementVisible('#add-recipe', 5000)
      .setValue('input[name=recipeName]', 'Banga Soup ')
      .setValue('input[name=recipeDetail]', 'Nice meal ')
      .setValue('textarea[name=ingredients]', 'palmkernel, maggi ')
      .setValue('textarea[name=directions]', 'boil palkernel, boil meat ')
      .setValue(
        'input#imageUrl',
        '/Users/andeladeveloper/Desktop/More-Recipes/client/public/assets/images/pizza1.jpg'
      )
      .pause(6000)
      .click('#click-add-recipe')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/dashboard/my-recipes')
      .pause(5000);
  },

  'user cannot add recipe with the same recipe name': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/add-recipe')
      .waitForElementVisible('#add-recipe', 5000)
      .setValue('input[name=recipeName]', 'Banga Soup')
      .setValue('input[name=recipeDetail]', 'Nice meal')
      .setValue('textarea[name=ingredients]', 'palmkernel, maggi ')
      .setValue('textarea[name=directions]', 'boil palkernel, boil meat ')
      .setValue(
        'input#imageUrl',
        '/Users/andeladeveloper/Desktop/More-Recipes/client' +
      '/public/assets/images/pizza1.jpg'
      )
      .pause(6000)
      .click('#click-add-recipe')
      .containsText('p.alert', 'Email address you entered already exist')
      .pause(5000);
  },

  'User can search for recipe': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/top-recipes')
      .waitForElementVisible('.form-inline my-2 my-lg-0', 5000)
      .setValue('input[type=text]', 'banga')
      .assert.urlEquals('http://localhost:8000/#/search?sort=banga');
  },

  'Users can view recipe': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/top-recipes')
      .click('.btn-more')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/recipe/1')
      .waitForElementVisible('#recipe-name', 5000)
      .assert.containsText('#recipeName', 'Banga Soup')
      .assert.containsText('#recipeDescription', 'Nice Meal')
      .assert.containsText('button.review', 'Add Review');
    browser.expect.element('img.img-thumbnail')
      .to.have
      .attribute(
        'src',
        'http://res.cloudinary.com/ruqoyah/image/upload/c_fill,h_200,w_302/sckzvzjpxachzod9vdq2'
      );
    browser.done();
  },
};
