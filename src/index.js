import './index.css'; 

import {getUsers, deleteUser} from './api/userApi'; 

//populate table from API call 
getUsers().then(result => {
    let usersBody = ""; 

    result.forEach(user => {
        usersBody+= `<tr>
        <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
        <td>${user.id}</td> 
        <td>${user.firstName}</td> 
        <td>${user.lastName}</td> 
        <td>${user.email}</td> 
        </tr>`
    });
    //nb. the html fragment is just a string 
    // string partials make this much better! 
    //in reality this process would usually be done with a framework

    //why do we use global here 
    global.document.getElementById('users').innerHTML = usersBody;

      // Must use array.from to create a real array from a DOM collection
  // getElementsByClassname only returns an "array like" object
  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});



