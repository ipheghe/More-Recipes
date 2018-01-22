module.exports = {
  'user is redirected to login page after successful signup': (browser) => {
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

  'user receives an error if username field is empty':
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

  'user cannot sign up with an already existing username': (browser) => {
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

  'user cannot sign up with an already exisiting email': (browser) => {
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
        .setValue('input[name=recipeDetail]', '')
        .setValue('textarea[name=ingredients]', '')
        .setValue('textarea[name=directions]', '')
        .setValue(
          'input#imageUrl',
          '/Users/andeladeveloper/Desktop/More-Recipes/' +
          'client/public/assets/images/pizza1.jpg'
        )
        .click('#click-add-recipe')
        .assert
        .containsText('p.alert', 'Recipe name field cannot be empty')
        .pause(3000);
    },

  'user can add recipe': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/add-recipe')
      .waitForElementVisible('#add-recipe', 5000)
      .setValue('input[name=recipeName]', 'Banga Soup')
      .setValue('input[name=recipeDetail]', 'Nice meal ')
      .setValue('textarea[name=ingredients]', 'palmkernel, maggi ')
      .setValue('textarea[name=directions]', 'boil palkernel, boil meat ')
      .setValue(
        'input#imageUrl',
        '/Users/andeladeveloper/Desktop/More-Recipes/' +
        'client/public/assets/images/pizza1.jpg'
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
      .setValue('textarea[name=ingredients]', 'palmkernel, maggi')
      .setValue('textarea[name=directions]', 'boil palkernel, boil meat')
      .setValue(
        'input#imageUrl',
        '/Users/andeladeveloper/Desktop/More-Recipes/client' +
      '/public/assets/images/pizza1.jpg'
      )
      .pause(6000)
      .click('#click-add-recipe')
      .pause(3000)
      .assert
      .containsText('p.alert', 'Recipe name exists!')
      .pause(1000);
  },

  'User can search for recipe': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/top-recipes')
      .waitForElementVisible('nav form.form-inline.my-2.my-lg-0', 5000)
      .setValue('input[type=text]', 'banga')
      .click('#search-recipe')
      .assert.urlEquals('http://localhost:8000/#/dashboard/search?sort=banga')
      .pause(1000);
  },

  'Users can view and favorite recipe': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/top-recipes')
      .click('.btn-more')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/recipes/1')
      .waitForElementVisible('#recipeName', 5000)
      .assert.containsText('#recipeName', 'Banga Soup')
      .assert.containsText('#recipeDescription', 'Nice meal')
      .assert.containsText('button.review', 'Add Review');
    browser.expect.element('img.img-thumbnail')
      .to.have
      .attribute(
        'src',
        'http://res.cloudinary.com/ovie/image/upload/dd3lv0o93/sckzvzjhgvagva'
      );
    browser.waitForElementVisible('#favorite', 5000)
      .click('#favorite')
      .waitForElementVisible('.modal-header', 5000)
      .setValue('select[id="recipe-drop-down"]', 'unCategorized')
      .click('#favorite-recipe')
      .pause(1000)
      .waitForElementVisible('#un-favorite', 5000)
      .pause(1000);
  },

  'user can upvote and downvote recipe': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/top-recipes')
      .click('.btn-more')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/recipes/1')
      .waitForElementVisible('#upvote', 5000)
      .waitForElementVisible('#downvote', 5000)
      .assert
      .containsText('p#upvote-count', 0)
      .assert
      .containsText('p#downvote-count', 0)
      .click('#upvote')
      .pause(2000)
      .assert
      .containsText('p#upvote-count', '1Upvotes |')
      .assert
      .containsText('p#downvote-count', 0)
      .click('#downvote')
      .pause(2000)
      .assert
      .containsText('p#upvote-count', 0)
      .assert
      .containsText('p#downvote-count', '1Downvotes |')
      .pause(1000);
  },

  'Users can edit and delete recipe': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/manage-recipes')
      .waitForElementVisible('#manage-recipe', 5000)
      .waitForElementVisible('#recipe-drop-down', 5000)
      .setValue('select[id="recipe-drop-down"]', 'Banga Soup')
      .pause(5000)
      .assert
      .containsText('textarea[name=ingredients]', 'palmkernel, maggi')
      .assert
      .containsText('textarea[name=directions]', 'boil palkernel, boil meat')
      .clearValue('textarea[name=directions]')
      .setValue('textarea[name=directions]', ',boil palkernel')
      // update recipe
      .click('#update-recipe')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/dashboard/my-recipes')
      .pause(1000)
      .url('http://localhost:8000/#/dashboard/manage-recipes')
      .setValue('select[id="recipe-drop-down"]', 'Banga Soup')
      .pause(5000)
      .assert
      .containsText('textarea[name=directions]', 'boil palkernel')
      // delete recipe
      .click('#delete-recipe')
      .assert.urlEquals('http://localhost:8000/#/dashboard/manage-recipes')
      .assert
      .containsText('textarea[name=directions]', '')
      .pause(1000);
  },

  'user can view and edit profile and logout': (browser) => {
    browser
      .url('http://localhost:8000/#/dashboard/top-recipes')
      .pause(1000)
      .url('http://localhost:8000/#/edit-profile')
      .waitForElementVisible('#profile-form', 5000)
      .clearValue('input[name=email]')
      .setValue('input[name=email]', 'linda@yahoo.com')
      .click('#edit-profile')
      .pause(2000)
      .click('#logout')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/login')
      .end();
  },
};
