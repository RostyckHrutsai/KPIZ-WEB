const inp=document.getElementById('inp')
const age=document.getElementById('age')
const num=document.getElementById('num')

const list=document.getElementById('list')
const outp=document.getElementById('active')
arr=[]

var lastBlock
var ind
var lastImgUrl
////////////////////////////////

//////// WORK WITH IMAGES//////////////////////////
document.getElementById('img').addEventListener("input", function() {
  var file = this.files[0];
  var img = document.getElementById('photo');
  var reader = new FileReader();
  reader.onload = function(event) {
    img.src = event.target.result;
    lastImgUrl = img.src
  }
  reader.readAsDataURL(file);
});

//////////////////// ADD EMP////////////////////

function newEmployee(){
  var block=document.getElementById('input')
  var btn=document.getElementById('emp')
  if(block.style.display=='none'){block.style.display='block'; btn.innerText='cancel'}
  else{block.style.display='none'; btn.innerText='new employee'}
}

////// Delete Emp//////////

function Del(){
  list.removeChild(lastBlock)
  outp.innerText=''
  arr.splice(ind,1)
  del.style.display='none'
  edit.style.display='none'
}

var del=document.getElementById('delEmp')
del.addEventListener('click',Del)


//////// EDIT EMP /////////////////
var edit=document.getElementById('edit')
edit.addEventListener('click',f=()=>{
  inp.value=arr[ind].name
  age.value=arr[ind].age
  num.value=arr[ind].number
  arr.splice(ind,1)
  newEmployee()
  Del()
})
/////// OUTPUT BLOCK ////////

function watchblock(){
    var block=this
    var index = [].indexOf.call(block.parentElement.children, block);
    console.log(index)
    index-=1
    console.log(index)
    //if(lastImgUrl!='undefined'){document.getElementById('show_photo').src=lastImgUrl}
    //else{document.getElementById('show_photo').src='https://offvkontakte.ru/wp-content/uploads/avatarka-pustaya-vk_23.jpg'}
    outp.innerText=arr[index].name+'\n'+arr[index].age+'\n'+arr[index].number
    console.log(lastImgUrl)
    document.getElementById('delEmp').style.display='block'
    lastBlock=this
    ind=index
    ////////////
    document.getElementById('edit').style.display='block'
}


//////  SEND ///////

function send(){fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        name: inp.value,
        age: age.value,
        number: num.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {console.log(json.name)
    arr.push(json)
    var text=document.createElement('div')
    text.innerText=json.name
    text.style.border='1px dotted black'
    list.append(text)
    text.addEventListener('click',watchblock)
    document.getElementById('input').style.display='none'
    document.getElementById('emp').innerText='new employee'
    });}



    
