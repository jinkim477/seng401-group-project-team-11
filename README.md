<p align="center">
    <img src="./SmartServe-official-logo.png" alt="SmartServe-logo" width="150" />
    <h1 align = "center">
        Welcome To SmartServe!
    </h1>
</p>


## Goal
With **SmartServe**, we are aiming to utilize Google Gemini to generate personalized meal plans and dietary recommendations based on specific user preferences, AKA the parameters. Due to the rapid increase in nutritional information on the internet, it has become common for users to feel overwhelmed and unsure of where to begin their nutritional journey. 


## What We Provide
Unlike static plans or one-size-fits-all solutions, SmartServe adapts dynamically to user input, offering a seamless experience that evolves with changing preferences. Additionally, we integrate features like shopping list generation and nutritional breakdowns to enhance usability and efficiency. This solution is designed for individuals of all ages, with a particular focus on those with health concerns, dietary restrictions, bodybuilders, those looking to expand their food palette, or anyone seeking to improve their overall health and well-being. Our goal is to simplify meal planning and nutritional goal setting, helping users save time and reduce decision fatigue.

## How Do I Use This Service?
Firstly, ***you don't need to register*** to use our service. Although registering unlocks the benefit of being able to track your generated meal plan history, without an account, you can still generate as many meal plans as you please!

### Step 1
Click [here](https://smartserveai.vercel.app) to visit our website or paste the link provided below:
```
https://smartserveai.vercel.app
```

### Step 2
If you would like to sign up, provide valid credentials to register. If you already have an account, proceed to log in. Otherwise, you may continue as guest.

Fill out your desired preferences in the dashboard, and once you're satisfied, hit the Generate button!

### Step 3
Marvel at your potential next meal!

## Tech Stack
| MVC Component | Environment | Hosting Service | Lanuage |
| --- | --- | --- | --- |
| Database | MySQL | Railway | SQL |
| Backend | Spring-Boot | Railway | Java |
| Frontend | Next.js | Vercel | TypeScript |

## Contributors
| Group 11 |
| --- |
| Jin Kim |
| Xavier Lachance |
| Aidan Huang |
| Sebastian Nieto |
| Chloe Choi |
| Joshua Geng |

## Conclusion / Final Notes
If you have any questions about our service, code, or any other related topic, please reach out to any one of our contributors!

This project was completed as a requirement for SENG 401. View our code with discretion. 

For running our program locally, follow the instructions below:

1. Ensure you have Java 21, Maven 4.0.0+, and Node.js v16.0.0+ installed.
2. If you would like to use a local instantiation of the MySQL database, you must first create an empty schema named "smartserve_db".

### Backend
```
cd smartserve-backend
```
```
mvn clean install
```
```
mvn spring-boot:run
```

### Frontend
```
cd smartserve-frontend
```
```
npm install
```
```
npm run dev
```
or
```
npm start
```