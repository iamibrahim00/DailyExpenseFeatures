let btn = document.getElementById('submit')
btn.addEventListener('click',Storage)
function Storage(event) {
    event.preventDefault();
    const money= document.getElementById('money').value;
    const description = document.getElementById('description').value;
    const category =document.getElementById('category').value;


  const obj={
  money,
  description,
  category
  }

  console.log(obj)
  axios.post("http://localhost:4000/user/add-expense",obj)
  .then((response) => {
      showUserOnScreen(response.data.newExpenseDetails)
     // console.log(newExpenseDetails)
  }).catch(err => {
      document.body.innerHTML =document.body.innerHTML + "<h4>Something Went wrong </h4>"
  })
}

window.addEventListener("DOMContentLoaded", ()=>{
  axios.get("http://localhost:4000/user/get-expense")
  .then((response) =>{
    console.log(response)

    for(var i =0; i< response.data.allExpense.length;i++){
     showUserOnScreen(response.data.allExpense[i])
    }
  }).catch((err) => console.log(err))

})

function showUserOnScreen(obj){
  const parentElement = document.getElementById('listOfitems')
 
  const childNode =`<li id = ${obj.id}>${obj.id}- ${obj.money} - ${obj.description} - ${obj.category}
  <button onclick = deleteUser('${obj.id}')>Delete</button></li>`  
                  
                    
   parentElement.innerHTML = parentElement.innerHTML +childNode
}

 function deleteUser (objId){
  axios.delete(`http://localhost:4000/user/delete-expense/${objId}`)
  .then((response)=>{
    removeUserfromScreen(objId)
  }).catch((err) => {   
                console.log(err)
                
 })
 
}

 function removeUserfromScreen(objId){
  const parentNode= document.getElementById('listOfitems')
  const childNodeTobeDeleted = document.getElementById(objId)
  if(childNodeTobeDeleted){
    //parentNode.removeChild(childNodeTobeDeleted);
      childNodeTobeDeleted.remove()
  }

 }