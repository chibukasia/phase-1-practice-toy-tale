let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
.then(res=>res.json())
.then(toysObject=>toysObject.forEach(toy => {
  let htmlElement=``
  let card = document.createElement('div');
  const toyCollection = document.getElementById('toy-collection');
  card.className = 'card'
  card.innerHTML=`
                  <h2>${toy.name}</h2>
                  <img src= ${toy.image} class='toy-avatar'>
                  <p>${toy.likes}</p>
                  <button class='like-btn' id= ${toy.id}>Like ❤️</button>
                  `
  toyCollection.appendChild(card)

  //console.log(toy)
}))

const form = document.querySelector('.add-toy-form')
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const toyName = document.getElementById('toy-name').value;
  const imageUrl = document.getElementById('toy-text').value;
  const obj = {
    name: toyName,
    image:imageUrl,
    likes: 0
  }
  console.log(obj)
  addNewToy(obj);
});


function addNewToy(obj){
  const postObj = {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      acceptance: 'application/json',
    },
    body:JSON.stringify(obj)  
  }
  fetch('http://localhost:3000/toys',postObj)
  .then(res=>res.json())
  .then(data=>console.log(data))
  .catch(error=> console.log(error))
}

