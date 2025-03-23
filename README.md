<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SmartServe README</title>
  <style>
    body {
      background-color: #494949;
      color: #E2DED1;
      font-family: Arial, sans-serif;
      padding: 2rem;
      line-height: 1.6;
    }
    h1, h2, h3, h4, strong {
      color: #9BCF7F !important;
    }
    code, pre {
      background-color: #6B6B6B !important;
      padding: 0.5rem;
      border-radius: 5px;
      display: block;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    table, th, td {
      border: 1px solid #6B6B6B !important;
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
    }
    a {
      color: #E2DED1 !important;
      font-weight: bold;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .center {
      text-align: center;
    }
    .logo {
      width: 150px;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>

  <div class="center">
    <img src="./SmartServe-official-logo.png" alt="SmartServe-logo" class="logo" />
    <h1>Welcome To SmartServe!</h1>
  </div>

  <h2>Goal</h2>
  <p>
    With <strong>SmartServe</strong>, we are aiming to utilize Google Gemini to generate personalized meal plans and dietary recommendations based on specific user preferences, AKA the parameters. Due to the rapid increase in nutritional information on the internet, it has become common for users to feel overwhelmed and unsure of where to begin their nutritional journey. 
  </p>

  <h2>What We Provide</h2>
  <p>
    Unlike static plans or one-size-fits-all solutions, SmartServe adapts dynamically to user input, offering a seamless experience that evolves with changing preferences. Additionally, we integrate features like shopping list generation and nutritional breakdowns to enhance usability and efficiency. This solution is designed for individuals of all ages, with a particular focus on those with health concerns, dietary restrictions, bodybuilders, those looking to expand their food palette, or anyone seeking to improve their overall health and well-being. Our goal is to simplify meal planning and nutritional goal setting, helping users save time and reduce decision fatigue.
  </p>

  <h2>How Do I Use This Service?</h2>
  <p>Firstly, <em><strong>you don't need to register</strong></em> to use our service. Although registering unlocks the benefit of being able to track your generated meal plan history, without an account, you can still generate as many meal plans as you please!</p>

  <h3>Step 1</h3>
  <p>
    Click <a href="https://smartserveai.vercel.app" target="_blank">here</a> to visit our website or paste the link provided below:
  </p>
  <pre>https://smartserveai.vercel.app</pre>

  <h3>Step 2</h3>
  <p>
    If you would like to sign up, provide valid credentials to register. If you already have an account, proceed to log in. Otherwise, you may continue as guest.
  </p>
  <p>
    Fill out your desired preferences in the dashboard, and once you're satisfied, hit the Generate button!
  </p>

  <h3>Step 3</h3>
  <p>
    Marvel at your potential next meal!
  </p>

  <h2>Tech Stack</h2>
  <table>
    <thead>
      <tr>
        <th>MVC Component</th>
        <th>Environment</th>
        <th>Hosting Service</th>
        <th>Language</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Database</td>
        <td>MySQL</td>
        <td>Railway</td>
        <td>SQL</td>
      </tr>
      <tr>
        <td>Backend</td>
        <td>Spring-Boot</td>
        <td>Railway</td>
        <td>Java</td>
      </tr>
      <tr>
        <td>Frontend</td>
        <td>Next.js</td>
        <td>Vercel</td>
        <td>TypeScript</td>
      </tr>
    </tbody>
  </table>

  <h2>Contributors</h2>
  <table>
    <tr><th>Group 11</th></tr>
    <tr><td>Jin Kim</td></tr>
    <tr><td>Xavier Lachance</td></tr>
    <tr><td>Aidan Huang</td></tr>
    <tr><td>Sebastian Nieto</td></tr>
    <tr><td>Chloe Choi</td></tr>
    <tr><td>Joshua Geng</td></tr>
  </table>

  <h2>Conclusion / Final Notes</h2>
  <p>
    If you have any questions about our service, code, or any other related topic, please reach out to any one of our contributors!
  </p>
  <p>
    This project was completed as a requirement for SENG 401. View our code with discretion. 
  </p>
  <p>
    For running our program locally, follow the instructions below:
  </p>

  <h3>1. Ensure you have Java 21, Maven 4.0.0+, and Node.js v16.0.0+ installed.</h3>
  <p>If you would like to use a local instantiation of the MySQL database, you must first create an empty schema named <strong>"smartserve_db"</strong>.</p>

  <h3>Backend</h3>
  <pre>
    cd smartserve-backend
  </pre>
  <pre>
    mvn clean install
  </pre>
  <pre>
    mvn spring-boot:run
  </pre>

  <h3>Frontend</h3>
  <pre>
    cd smartserve-frontend
    </pre>
    <pre>
    npm install
    </pre>
    <pre>
    npm run dev
    </pre>
    or
    <pre>
    npm start
  </pre>

</body>
</html>
