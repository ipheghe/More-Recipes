/**
 * @name emailTemplate
 * @description Email template generation function
 * @function
 * @param {String} name
 * @param {String} buttonText
 * @param {String} message
 * @param {String} link
 * @param {String} icon
 * @return {String} Email template
 */
const emailTemplate = (name, buttonText, message, link) => (
  `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    >
  
    <style type="text/css">
      @import url("https://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");
      img {
        max-width: 100%;
        margin: 0 auto;
        display: block;
      }
  
      body {
        background-color: #292b2c;
        height: 100vh;
      }
  
      table {
        width: 400px;
        height: 50px;
        text-align: center;
        margin: auto;
        background-color: #5cb85c;
        padding: 0 20px;
      }
  
      a {
        color: #5cb85c;
        text-decoration: none;
      }
  
      a:hover {
        text-decoration: underline;
      }
  
      h2 {
        font-size: 28px;
        color: white;
      }
  
      h6 {
        font-size: 24px;
        color: white;
        margin: 30px auto;
      }
  
      h5 {
        font-size: 16px;
        color: white;
        line-height: 1.25;
      }
  
      p {
        font-size: 14px;
        color: white;
      }
  
      tr {
        height: 10px;
      }
  
      .btn {
        border-radius: 5px;
        padding-left: 30px;
        padding-right: 30px;
        font-weight: bold;
        height: 50px;
        width: 250px;
        font-family: Helvetica, Arial, sans-serif;
        color: #5cb85c;
        text-transform: uppercase;
        background-color: rgb(255, 255, 255);
      }
  
      .body-wrap {
        border-radius: 5px;
        background-color: #292b2c;
        margin-bottom: 10px;
        margin-top: 20px;
      }
    </style>
  </head>
  
  <body>
    <div style="background-color: #292b2c; height: 100vh;">
      <table class="body-wrap">
        <tbody>
          <tr>
            <td>
              <h2>
                <i>MORE RECIPES</i>
              </h2>
              </h2>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <table>
              <tbody>
                <tr>
                  <td>
                    <h6> Hello, ${name}</h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>${message}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </tr>
          <tr>
            <table>
              <tbody>
                <tr>
                  <td style=" height: 20px;"></td>
                </tr>
                <tr>
                  <td>
                    <a href=${link} target="_blank">
                      <button class="btn">${buttonText}</button><
                    /a>
                  </td>
                </tr>
                <tr>
                  <td style=" height: 30px;"></td>
                </tr>
              </tbody>
            </table>
          </tr>
        </tbody>
      </table>
      <table class="body-wrap">
        <tbody>
          <tr>
            <td>
              <p>Sent by
                <ahref="#">more-recipes-ovie.herokuapp.com</a>,
                235, Ikorodu Road, Ilupeju, Lagos, Nigeria</p>
              <p>
                <a href="mailto:">iphegheapp@gmail.com</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
  
  </html>
  `
);

export default emailTemplate;
