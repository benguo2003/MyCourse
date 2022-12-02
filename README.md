# MyCourse

#### Source Code is in Master branch!

MyCourse is a tool students can use to keep track of their classes and view important facts about them. Users can add and drop classes, view information such as seats left, and view a map with the building marked.



## Authors

- [@benguo2003](https://www.github.com/benguo2003)
- [@gauravagarwal003](https://www.github.com/gauravagarwal003)
- [@PoweredWarrior1729](https://www.github.com/PoweredWarrior1729)
- [@rpadmanabhan20](https://www.github.com/rpadmanabhan20)
- [@sacaarjain](https://www.github.com/sacaarjain)




## Documentation

Below are the commands needed to run this project locally from scratch.

git clone https://github.com/benguo2003/MyCourse.git <br />
cd MyCourse <br />
git checkout master <br />
cd backend <br />
npm install --save-dev nodemon <br />
nodemon server <br />
Open new command prompt <br />
cd MyCourse/frontend <br />
npm install <br />
npm start <br />

Notable Information regarding App Function:

Our app relies on UCLA's Classes and Courses API, whose authentication token refreshes every hour. A specific postman request is needed to get access to a new token, with no way of accessing this API otherwise.

The database (MongoDB) connection URLs as well as the usernames and passwords are contained within the source code, so all that is required manually is UCLA's API token.

