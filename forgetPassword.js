
let btn = document.getElementById('linksend')
btn.addEventListener('click',Storage)
function Storage(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    
  const obj={
  email,
  }
      
    

  console.log(obj)
  axios.post("http://localhost:4000/password/forgetpassword",obj)
  .then((response) => {
      console.log(response)      
  }).catch((err) => {
   
      document.body.innerHTML =document.body.innerHTML + "<h4>Err: Please check the credentials</h4>"
  })
} 