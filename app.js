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
      app(people)
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

  printRecentsToHtml(putIntoArray(person));

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  

  switch(displayOption){
    case "info":
      displayPerson(person);
      mainMenu(person, people);
      break;
    case "family":
      displayFamily(getSpouse(person, people), getParents(person, people)[0], getParents(person, people)[1], getChildren(person, people), getSiblings(person, people));
      mainMenu(person, people);
      break;
    case "descendants":
      displayPeople(getDescendants(person, people));
      mainMenu(person, people);
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

function homeScreenClick(id, people){
  let person = people.filter(function(el){
    if (el["id"] === id){
    return el;
    }
  })[0]
  return mainMenu(person, people);
}

function putIntoArray(person){
  let counter = 0;
  var recentPeople = [];
  recentPeople.unshift(person);
  if (counter > 2){
    recentPeople.pop(recentPeople.length - 1);
  }
  counter++;
  //should be a way to stop counting when it hits 3?
  return recentPeople;
}

function printRecentsToHtml(recentPeople){
  for (let i = 0; i < recentPeople.length; i++){
    document.getElementById((i + 1) + "Recent").onclick(recentPeople[i].id);
    document.getElementById((i+1)).style.display = "inline";
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.firstName == firstName && el.lastName == lastName) {
      return el;
    }
  })[0];

  return filteredPeople;

}

function promptForCriterionChoice(people)
{
  var searchType = promptFor("Do you want to search based on one or many criterion? Enter 'one' or 'many'", oneMany).toLowerCase();
  switch(searchType){
    case 'one':
      displayPeople(searchByOneCriterion(people, promptForOneCriterion()));
      break;
    case 'many':
      displayPeople(searchByManyCriteria(people, promptForManyCriteria()));
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
  let responses = [];
  var response;
  var run = true;
  while (run) {
    response = promptFor("Which criterion would you like to search by? You can enter: 'First Name', 'Last Name', 'Date of Birth', 'Height', 'Weight', 'Eye Color', or 'Occupation' or 'STOP' to stop", singleCriterion);
    switch (response) {
      case "First Name":
        responses.push("firstName");
        break;
      case "Last Name":
        responses.push("lastName");
        break;
      case "Date of Birth":
        responses.push("dob");
        break;
      case "Height":
        responses.push("height");
        break;
      case "Weight":
        responses.push("weight");
        break;
      case "Eye Color":
        responses.push("eyeColor");
        break;
      case "Occupation":
        responses.push("occupation");
        break;
      case "STOP":
        run = false;
        break;
      default:
        alert("Invalid input. Please try again!");
        app(people); // restart app
        break;
    }
  }
  return responses;
}

function searchByOneCriterion(people, criterion)
{
  let criterionChoice = promptFor("What is the person's " + displayVariableName(criterion) + "?", chars);
  let matchingPeople = people.filter(function(el){
    if(el[criterion] == criterionChoice) {
      return el;
    }
  });
  return matchingPeople;
}

function searchByManyCriteria(people, criterion)
{
  var matchingPeople = people;
  for(criteria in criterion)
  {
    matchingPeople = searchByOneCriterion(matchingPeople, criterion[criteria]);
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

function displayFamily(spouse=null, parent1=null, parent2=null, children=null, siblings=null){
  var outputString = "";
  if(spouse != null)
  {
    outputString = "Spouse: " + spouse.firstName + " " + spouse.lastName + "\n";
  }
  if(parent1 != null)
  {
    outputString += "Parent 1: " + parent1.firstName + " " + parent1.lastName + "\n";
  }
  if(parent2 != null)
  {
    outputString += "Parent 2: " + parent2.firstName + " " + parent2.lastName + "\n";
  }
  if(children != null)
  {
    for(child in children)
    {
      outputString += "Child " + (parseInt(child) + 1) + ": " + children[child].firstName + " " + children[child].lastName + "\n";
    }
  }
  if(siblings != null)
  {
    for(sibling in siblings)
    {
      outputString += "Sibling " + (parseInt(sibling) + 1) + ": " + siblings[sibling].firstName + " " + siblings[sibling].lastName + "\n";
    }
  }
  alert(outputString);
}

function displayVariableName(variable)
{
  switch(variable)
  {
    case "firstName":
      variable =  "first name";
      break;
    case "lastName":
      variable =  "last name";
      break;
    case "dob":
      variable =  "date of birth";
      break;
    case "eyeColor":
      variable =  "eye color";
      break;
  }
  return variable;
}

function getSpouse(person, people){
  let spouse = people.filter(function(el) {
    if(el.id === person.currentSpouse) {
      return el;
      //I think that's right now
    }
  })[0];
  return spouse;
}

function getParents(person, people){
  let parents = people.filter(function(el) {
    //map that returns all in array
    //var parentMultiple;
      if (person.parents.some(x => x === el.id)) {
        return el.firstName + " " + el.lastName + ", ";
        //Not sure if I want that comma there
    }
    //return parentMultiple;
  })
  return parents;
  //Is this in the right spot? Want to make sure it's going to return only after going through all
}

function getChildren(person, people){
  return people.filter(function (el) {
    if (el.parents.some(x => x === person.id)) {
      return el;
    }});
}

function getSiblings(person, people){
  return people.filter(function(el){
    if(el.parents.some(x => x === person.parents[0] || x === person.parents[1]))
    {
      if(el["id"] != person["id"])
      {
        return el;
      }
    }
  })
}

function getDescendants(person, people){
  let descendants = [];

  let children = getChildren(person, people);


  descendants = descendants.concat(children);


  for (person in children) {
    descendants = descendants.concat(getDescendants(children[person], people));
  }
  return descendants;
}

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
  var inputs = ["First Name", "Last Name", "Date of Birth", "Height", "Weight", "Eye Color", "Occupation", "STOP"]
  return inputs.some(x => x == input);
}

function chars(input)
{
  return true
}