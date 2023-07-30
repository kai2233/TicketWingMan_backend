<a name="readme-top"></a>
<div>
    <center>
        <img style="border-radius:25px;"  src="./img/ticketwingman_color.png" width="20%" >
        <h3 style="font-size:180%; background: linear-gradient(70deg, lightskyblue, lightcoral); -webkit-background-clip: text;
        color: transparent;"> 
            TTP capstone project : Ticket-Wingman Backend
        </h3>
        <h3 style="background: linear-gradient(70deg, lightskyblue, lightcoral); -webkit-background-clip: text;color: transparent;">
            Youre one stop destination for flight information
        <h3>
    </center>
</div>

<h2 style="font-size:150%; background: linear-gradient(70deg, lightskyblue, lightcoral); -webkit-background-clip: text;color: transparent;">Description</h2>
Welcome to our ticket Wingman backend. Our backend is built using node.js, express.js, sequelize and postgres. It provides various datasets based on user requests, such as ticket search, flight tracking, airport lookups, historical weather data of a location from the past year, and different plug types used by countries.

Ticket Wingman backend receives data from the user from the frontend, integrates with external api's based on the request, processes the information and then sends it to the frontend in the desired format.

For instance, we have set up our own api using the AMADEUS api for flight ticket searches and airport lookups. It will retrieve the flight ticket dataset based on the given departure airport, destination airport, departure date and return date. The backend will process the dataset, filtering out unnecessary data and formatting it into a standardized desired form.

The Ticket Wingman backend also authenticates users when they sign up or log in to the site as well as stores each user's information in a postgres database through the use of sequelize. The information stored includes the user's email, encrypted password, first name, last name, and etc. 

The Ticket Wingman backend also has its own dataset set up in the database by our team, which contains the different plugin types used by each country. A countries table that stores 266 countries and the types of plug they use, a plugs table that stores all 15 types of plugs, a country_plugs that connects the two table.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h2 style="font-size:150%; background: linear-gradient(70deg, lightskyblue, lightcoral); -webkit-background-clip: text;color: transparent;"> Contributing </h2>
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h2 style="font-size:150%; background: linear-gradient(70deg, lightskyblue, lightcoral); -webkit-background-clip: text;color: transparent;"> Installation and Run </h2>

- ### Installation
    In this project, we are using nodejs and express as the main framework. Other libraries/tools we used and require for run this project are the following:
    ```js
        amadeus : 8.1.0,
        axios : 1.4.0,
        connect-session-sequelize : 7.1.7,
        cors : 2.8.5,
        dotenv : 16.3.1,
        express-session : 1.17.3,
        passport : 0.6.0,
        passport-github2 : 0.1.12,
        passport-google-oauth20 : 2.0.0,
        passport-local : 1.0.0,
        pg : 8.11.1,
        pg-hstore : 2.3.4,
        sequelize : 6.32.1 
    ```
    use the following commands to install all the packages:
    ```shell
        npm install -i amadeus axios cors dotenv passport pg sequelize passport-github2 passport-google-oauthw
    ```
    ps : There are a few packages that may be required but need to be run to install them, use the following command:
    
    - `npm install -i [package name]` or `npm install -g [package name]`

- ### Run
   Before start running the application <i style="font-size:120%"> LOCALLY </i>, there are additional setup for environment variables. The following settings are write into a file name '.evn' under the root folder of the application. Here is the following configuration needs :
   ```js
        dbUsername=[database username]
        dbPassword=[database password]
        dbPort=[database port]
        dbName=[database name]
        
        AMADUES_CLIENT_ID=[amadeus api key]
        AMADUES_CLIENT_SECRET=[amadeus api secret key]

        TRAVEK_IMPACT_MODEL=[google travek impact mode api key]

        GOOGLE_CLIENT_ID=[google auth api key]
        GOOGLE_CLIENT_SECRET=[google auth api secret key]
        GOOGLE_CALLBACK_URL=[google auth redirect url]
        GITHUB_CLIENT_ID=[github auth api key]
        GITHUB_CLIENT_SECRET=[github auth api secret key]
        GITHUB_CALLBACK_URL=[github auth redirect url]
   ```
   to run the application, use following command:
   "`npm start`"

   <p align="right">(<a href="#readme-top">back to top</a>)</p>

<h2 style="font-size:150%; background: linear-gradient(70deg, lightcoral, lightskyblue); -webkit-background-clip: text;color: transparent;"> Usage </h2>

Sample way to use plugs api to get the plug type of different country:

sample request url:
```curl
https://ticketwingman-backend.onrender.com/api/plugs/?counterCode=[country code(ios3166-1 alpha2 code)]
```
sample response json data:
```json
    [
        {
            country,
            country_code,
            voltage : {
                volt : [],
                unit : "V"
            },
            frequency : {
                hertz : [],
                unit : "Hz"
            },
            plugs : [
                {
                    type, img
                }, 
                ...
            ]
        }
    ]
```
For more usage and information, user following documents :
- [<h3 style="font-size:130%; background: linear-gradient(70deg, lightskyblue, lightcoral); -webkit-background-clip: text;color: transparent;">API Documenetations for Ticket-Wingman backend project</h3>](./API_document.md)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h2 style="font-size:150%; background: linear-gradient(70deg, lightcoral, lightskyblue); -webkit-background-clip: text;color: transparent;">Acknowledgments</h2>

Documentation resources the helps understand our project more better :
- [<h3>amadeus API documentation</h3>](https://developers.amadeus.com/self-service)
- [<h3>Travel Impact Model API documentation</h3>](https://developers.google.com/travel/impact-model)
- [<h3>open-meteo API documentation</h3>](https://open-meteo.com/en/docs)
- [<h3>aviationstack API documentation</h3>](https://aviationstack.com/documentation)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Maintainer
- | All members |   |   |   |     
  |---|---|---|---|
  | [Kaifeng Yu](https://github.com/kai2233) | [XiaoLing Huang](https://github.com/shellyh0626) | [Mohamed Ismail](https://github.com/9Mohamedismail) | [Yuzhuang Chen](https://github.com/yuzchen7) |
  |<center><img src='https://avatars.githubusercontent.com/u/78000665?v=4' width="50" style="border-radius:25em;"></center>|<center><img src='https://avatars.githubusercontent.com/u/92035526?v=4' width="50" style="border-radius:25em;"></center>|<center><img src='https://avatars.githubusercontent.com/u/87681402?v=4' width="50" style="border-radius:25em;"></center>|<center><img src='https://avatars.githubusercontent.com/u/71522461?v=4' width="50" style="border-radius:25em;"></center>|
  <p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributors
This project exists thanks to all the people who contribute. And all other ttp program staff(I can't find your github)

[<img src='https://avatars.githubusercontent.com/u/24597264?v=4' style="border-radius:25em;" width="50">](https://github.com/mjhui1990)
[<img src='https://avatars.githubusercontent.com/u/25914423?v=4' style="border-radius:25em;" width="50">](https://github.com/ajLapid718)
[<img src='https://avatars.githubusercontent.com/u/50688605?v=4' style="border-radius:25em;" width="50">](https://github.com/DBorhara)
[<img src='https://avatars.githubusercontent.com/u/101434685?v=4' style="border-radius:25em;" width="50">](https://github.com/KYu-2468)
<p align="right">(<a href="#readme-top">back to top</a>)</p>