let input = document.querySelector('.form__text');
let go = document.querySelector('.go');
let addItem = document.querySelector('.add-item');
let db = document.querySelector('.here');
let form = document.querySelector('form');
let info;

function debounce(fn, debounceTime) {
    let debounce;
    return function (...args) {
      clearTimeout(debounce);
      return new Promise((resolve) => {
        debounce = setTimeout(
          () => resolve(fn.call(this, ...args)),
          debounceTime
        );
      });
    };
}
let fn = async() =>{
    let value = document.querySelector('.form__text').value;
    await fetch(`https://api.github.com/search/repositories?q=${value}`)
    .then(res => {return res.json()})
    .then(data => {
         go.innerHTML = `
         <div class= "add-item" >${data.items[0].full_name}</div>
         <div class= "add-item" >${data.items[1].full_name}</div>
         <div class= "add-item" >${data.items[2].full_name}</div>
         <div class= "add-item" >${data.items[3].full_name}</div>
         <div class= "add-item" >${data.items[4].full_name}</div>
         `;
        info = data.items;
    })
    .catch(err => console.log(err));
}
const getNames = debounce(() => {
   fn();
  }, 200);
input.onkeyup = () =>{
      getNames();
    }
go.addEventListener('click' , (event) =>{
  let classValue = event.target.classList.value;
  if (classValue == 'add-item'){
    info.forEach(el =>{
      if (el.full_name === event.target.textContent){
        let dbItem = document.createElement('div');
        dbItem.innerHTML = `
        <div class = "db__item">
          <div>
            <div> Name : ${el.name}</div>
            <div>Owner : ${el.owner.login}</div>
            <div>Stars : ${el.stargazers_count}</div>
          </div>
          <div class ="delete-btn">Delete</div>
          </div>
        `;
        db.appendChild(dbItem);
        input.value = '';
      };
    })
  };
})
db.addEventListener('click' , (event) =>{
  if(event.target.classList.value === 'delete-btn'){
    var delBlock = event.target.parentNode;
       delBlock.parentNode.removeChild(delBlock);
  }
})