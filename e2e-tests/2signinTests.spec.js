module.exports = {
  'it should show the complete workflow for login in a user':
  (client) => {
    client
      .resizeWindow(1280, 800)
      .waitForElementVisible('body', 1000)
      .url('http://localhost:8000/#/login')
      .pause(3000)
      .assert.elementPresent('input#username')
      .assert.elementPresent('input#password')
      .assert.elementPresent('button#login')

      // throws an error for null username field
      .setValue('input#username', '')
      .setValue('input#password', 'abcde')
      .click('button#login')
      .pause(1000)
      .assert
      .containsText('p.alert', 'Username field cannot be empty')
      .pause(3000)

      // throws an error for invalid username
      .setValue('input#username', 'shaol')
      .click('button#login')
      .pause(1000)
      .assert
      .containsText('p.alert', 'Authentication failed. Username is incorrect or does not exist')
      .pause(3000)

      // signin user successfully and redirect to dashboard page
      .setValue('input#username', 'in')
      .click('button#login')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/dashboard/top-recipes')
      .pause(3000)

      // // signup another user
      // .url('http://localhost:8000/#/signup')
      // .pause(3000)
      // .assert.elementPresent('input#username')
      // .assert.elementPresent('input#fullName')
      // .assert.elementPresent('input#mobileNumber')
      // .assert.elementPresent('input#email')
      // .assert.elementPresent('input#password')
      // .assert.elementPresent('button#signup')
      // .setValue('input#username', 'vixen')
      // .setValue('input#fullName', 'Amaka Linda')
      // .setValue('input#mobileNumber', 2347035221123)
      // .setValue('input#email', 'amaka@yahoo.com')
      // .setValue('input#password', 'abcde')
      // .click('button#signup')
      // .pause(1000)
      // .assert.urlEquals('http://localhost:8000/#/login')
      // .pause(1000)
      .end();
  }
};
