
let btn = document.getElementById('submit')
btn.addEventListener('click',Storage)
function Storage(event) {
    event.preventDefault();
    const money= document.getElementById('money').value;
    const description = document.getElementById('description').value;
    const category =document.getElementById('category').value;
    const postToken = localStorage.getItem('token')

  const obj={
     money,
  description,
  category,
  postToken,
  
  }

  console.log(obj)
  axios.post("http://localhost:4000/user/add-expense",obj,{headers : {"Authorization" : postToken}})
  .then((response) => {
    //console.log(obj.id)
      showUserOnScreen(response.data.expense)
      
     // console.log(newExpenseDetails)
  }).catch(err => {
      document.body.innerHTML =document.body.innerHTML + "<h4>Something Went wrong </h4>"
  })
}

function showPremiumuserAdmin(){
  document.getElementById("rzp-button1").style.visibility ="hidden"
  document.getElementById('message').innerHTML="you're a premium user now"
}

function showLeaderboard(){
  const inputElement = document.createElement('input')
  inputElement.type = "button"
  inputElement.value ='Show LeaderBoard'
  inputElement.onclick= async()=>{
    const token = localStorage.getItem("token")
    const userLeaderBoardArray = await axios.get("http://localhost:4000/showLeaderBoard",{headers : {"Authorization" : token}})
   
    
    var leaderboardElem = document.getElementById("leaderboard")
    leaderboardElem.innerHTML += `<h1>Leader Board </h1>`
    
    userLeaderBoardArray.data.forEach((userdetails)=> {
    
 
        leaderboardElem.innerHTML += `<li>Name - ${userdetails.name} Total Expense - ${userdetails.totalExpenses}</li>`
    
    
    
    });
  }
  document.getElementById("message").appendChild(inputElement)
  
}


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", ()=>{
  const token = localStorage.getItem('token')
  const decodeToken = parseJwt(token)
  console.log(decodeToken)
  const isadmin = decodeToken.ispremiumuser
  if(isadmin){
    showPremiumuserAdmin()
    showLeaderboard()
  }

  axios.get("http://localhost:4000/user/get-expense",{headers : {"Authorization" : token}})
  .then((response) =>{
    console.log(response)

    for(var i =0; i< response.data.allExpense.length;i++){
     showUserOnScreen(response.data.allExpense[i])
    }
  }).catch((err) => console.log(err))

})

function showUserOnScreen(obj){
  const parentElement = document.getElementById('listOfitems')
 
  const childNode =`<li id = ${obj.id}>${obj.money} - ${obj.description} - ${obj.category}
  <button onclick = deleteUser('${obj.id}')>Delete</button></li>`  
                  
                    
   parentElement.innerHTML = parentElement.innerHTML +childNode
}

 function deleteUser (objId){
  const deleteToken = localStorage.getItem('token')
  axios.delete(`http://localhost:4000/user/delete-expense/${objId}`,{headers:{"Authorization":deleteToken}})
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
 
 document.getElementById('rzp-button1').onclick = async function(e){

  const token = localStorage.getItem('token')
  console.log(token)
  const response = await axios.get('http://localhost:4000/premiummembership',{headers :{"Authorization": token}});
  console.log(response)

  var options = {
    "key":response.data.key_id,
    "order_id": response.data.order.id,
    
    "handler": async function(response){
      const res = await axios.post('http://localhost:4000/updatetansactions',{
        order_id: options.order_id,
        payment_id : response.razorpay_payment_id
      },{headers :{"Authorization": token}})

      console.log(res)

      alert("You are a Premium User Now")
      document.getElementById("rzp-button1").style.visibility ="hidden"
      document.getElementById('message').innerHTML="you're a premium user now"

      localStorage.setItem('token',res.data.token)
      showLeaderboard()
    }
  }

 const rzp1 = new Razorpay(options)
 rzp1.open()
 e.preventDefault()

 rzp1.on('payment failed', function(response){
  consoile.log(response)
 })
}