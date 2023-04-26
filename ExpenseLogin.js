
let btn = document.getElementById('login')
btn.addEventListener('click',Storage)
function Storage(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password =document.getElementById('password').value;
    
  const obj={
  email,
  password
  }
      
    

  console.log(obj)
  axios.post("http://localhost:4000/user/login",obj)
  .then((response) => {
      console.log(response)
      window.location.href="./DailyExpense.html"
  }).catch((err) => {
   
      document.body.innerHTML =document.body.innerHTML + "<h4>Err: Please check the credentials</h4>"
  })
}