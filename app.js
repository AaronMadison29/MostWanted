/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){

  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      mainMenu(searchByName(people), people);
      break;
    case 'no':
      promptForCriterionChoice(people);
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
      break;
    case "family":
      displayFamily(person, people);
      break;
    case "descendants":
      alert(displayDescendants(person, people));
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.firstName == firstName && el.lastName == lastName) {
      return el;
    }
  });

  return filteredPeople[0];

}

function promptForCriterionChoice(people)
{
  var searchType = promptFor("Do you want to search based on one or many criterion? Enter 'one' or 'many'", oneMany).toLowerCase();
  switch(searchType){
    case 'one':
      displayPeople(searchByOneCriterion(people, promptForOneCriterion()));
      break;
    case 'many':
      displayPeople(searchByManyCriteria(people, promptForOneCriterion()));
      break;
    default:
      app(people); // restart app
    break;
  }
}

function promptForOneCriterion()
{
  var response = promptFor("Which criterion would you like to search by? You can enter: 'First Name', 'Last Name', 'Date of Birth', 'Height', 'Weight', 'Eye Color', or 'Occupation'", singleCriterion);
  switch(response)
  {
    case "First Name":
      response =  "firstName";
      break;
    case "Last Name":
      response =  "lastName";
      break;
    case "Date of Birth":
      response =  "dob";
      break;
    case "Height":
      response =  "height";
      break;
    case "Weight":
      response =  "weight";
      break;
    case "Eye Color":
      response =  "eyeColor";
      break;
    case "Occupation":
      response =  "occupation";
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
      break;
  }
  return response;
}

function promptForManyCriteria()
{
  var response = promptFor("Which criterion would you like to search by? You can enter: 'First Name', 'Last Name', 'Date of Birth', 'Height', 'Weight', 'Eye Color', or 'Occupation'", singleCriterion);
  switch(response)
  {
    case "First Name":
      response =  "firstName";
      break;
    case "Last Name":
      response =  "lastName";
      break;
    case "Date of Birth":
      response =  "dob";
      break;
    case "Height":
      response =  "height";
      break;
    case "Weight":
      response =  "weight";
      break;
    case "Eye Color":
      response =  "eyeColor";
      break;
    case "Occupation":
      response =  "occupation";
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
      break;
  }
  return response;
}

function searchByOneCriterion(people, criterion)
{
  let criterionChoice = promptFor("What is the person's " + criterion, chars);
  let matchingPeople = people.filter(function(el){
    if(el[criterion] == criterionChoice) {
      return el;
    }
  });
  return matchingPeople;
}

function searchByManyCriteria(people, criterion)
{
  var matchingPeople;
  for(criteria in criterion)
  {
    matchingPeople.add(people.filter(function(el){
      if(el[criterion] == criterionValue) {
        return el;
      }
    }));
  }
  return matchingPeople;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyecolor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

function displayFamily(person, people){
  var spouse = getSpouse(person, people);
  var parents = getParents(person, people);
  //Check to make sure this is going to work
  var personsFamily = "Spouse: " + spouse.firstName + " " + spouse.lastName + "\n";
  alert(personsFamily);
  displayPeople(parents);
}

function getSpouse(person, people){
  let spouse = people.filter(function(el) {
    if(el.id === person.currentSpouse) {
      return el;
      //I think that's right now
    }
  })
  return spouse[0];
}

function getParents(person, people){
  var parentsOf = person["parents"];
  var parentsOfPerson = people.filter(function(el) {
    //map that returns all in array
    //var parentMultiple;
      if (parentsOf.some(x => x === el.id)) {
        return el.firstName + " " + el.lastName + ", ";
        //Not sure if I want that comma there
    }
    //return parentMultiple;
  })
  return parentsOfPerson;
  //Is this in the right spot? Want to make sure it's going to return only after going through all
}

function displayDescendants(person, people){
  let descendants;
  let grandchildren;
  let counter = 0;

    let children = people.filter(function(el) {
      if (el.parents.some(x => x === person.id)) {
        return el;
    }

    counter++;

    if (counter > 0 && counter < 2){
      for (var i = 0; i < children.length; i++){
        let child = children[i];
        grandchildren += displayDescendants(child, children);
        //I think that's right
        descendants += children[i];
        descendants += grandchildren[i];
        //Seems pretty convoluted
      }
    }

    //Need to add each of the people returned as children and grandchildren as descendants, so I can a
    if (counter > 0){
      return descendants;
    }
  })
};

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function oneMany(input){
  return input.toLowerCase() == "one" || input.toLowerCase() == "many";
}
function singleCriterion(input){
  var inputs = ["First Name", "Last Name", "Date of Birth", "Height", "Weight", "Eye Color", "Occupation"]
  return inputs.some(x => x == input);
}

function chars(input)
{
  return true
}