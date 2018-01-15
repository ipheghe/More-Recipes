module.exports = {
  'it should show the complete workflow for registering a user':
  (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 1000)
      .pause(3000)
      .url('http://localhost:8000/#/signup')
      .pause(3000)
      .assert.elementPresent('input#username')
      .assert.elementPresent('input#fullName')
      .assert.elementPresent('input#mobileNumber')
      .assert.elementPresent('input#email')
      .assert.elementPresent('input#password')
      .assert.elementPresent('button#signup')

      // throws an error for null username field
      .setValue('input#username', '')
      .setValue('input#fullName', 'Emeka Obiora')
      .click('button#signup')
      .pause(1000)
      .assert
      .containsText('p.alert', 'Username must start with a letter and have no spaces.')
      .pause(3000)

      // throws an error for invalid email
      .setValue('input#username', 'shaolin')
      .setValue('input#mobileNumber', 2347035221782)
      .setValue('input#email', 'shaolin@yahoo')
      .setValue('input#password', 'abcde')
      .click('button#signup')
      .pause(1000)
      .assert
      .containsText('p.alert', 'Invalid Email Address')
      .pause(3000)

      // signup user successfully and redirect to login page
      .setValue('input#email', '.com')
      .click('button#signup')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/#/login')
      .pause(3000)

      // signup another user
      .url('http://localhost:8000/#/signup')
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
  }
};
