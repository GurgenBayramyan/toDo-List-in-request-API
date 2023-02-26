const container_todo = document.querySelector(".container");
const container = document.querySelector(".container");
const mainInput = document.querySelector(".main_input");
const btn = document.querySelector(".btn");
const title = document.querySelector(".title") 
let data ;

title.addEventListener("click",()=>{
    location.reload()
})
async function requesApp(url){
    let request = await fetch(url);
    let resp = await request.json();
    data = [...resp]
} 

window.onload = async() =>{
   await requesApp("https://retoolapi.dev/29qJQC/data");
   createHTML(data)
   
}
async function deleteElement(obj,id){
   
   await fetch(`https://retoolapi.dev/29qJQC/data/${id}`,{method:"DELETE"})
   let index= await data.indexOf(elem=>obj.id == elem.id);
   await data.splice(index,1)
}
async function change(url,id,input){
    let body = JSON.stringify({
        data:`${input.value}`,
        isActive: false,
        id:id
    });

    let index = data.findIndex(el=>el.id == id);
    data[index] = JSON.parse(body);
   await fetch(`${url}/${id}`,{
    method:"PUT",
    headers:{
        'Content-Type': 'application/json'
    },
    body:body
   })
}
async function changeBox(url,id,boolean,input){
    let body = JSON.stringify({
        data:`${input.value}`,
        isActive: boolean,
        id:id
    });
    let index = data.findIndex(el=>el.id == id);
    data[index] = JSON.parse(body);
    await fetch(`${url}/${id}`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body:body
       })

}

function createHTML(data){
    container.innerHTML = "";
    data.forEach(obj=>{
        if(obj.data){
        let id = obj.id
        let div = document.createElement("div");
        div.classList.add("add_div");
        div.innerHTML = ` 
           
            <input  class="valueinput ${obj.isActive && "cheked_input" }" type="text" value="${obj.data}" readonly  />
            <button>delete</button>
            <button class="change">change</button>
            <input  class = "chekbox "type="checkbox" ${obj.isActive && "checked"} />
        `

        container.append(div)
        let deleteDiv = div.querySelector("button");

        deleteDiv.addEventListener("click",(e)=>{
            deleteElement(obj,id)
            e.target.parentElement.remove();
            
        })

        let input = div.querySelector(".valueinput");
        let changeBtn = div.querySelector(".change");
        let myChekbox = div.querySelector(".chekbox");
        changeBtn.addEventListener("click",()=>{
            if(input.readOnly){
                input.removeAttribute("readonly");
                input.focus();
            }
        })
        
        myChekbox.addEventListener("change",()=>{
            if(myChekbox.checked){
                changeBox("https://retoolapi.dev/29qJQC/data",id,true,input);
                input.classList.add("cheked_input");
                
            }else{
                changeBox("https://retoolapi.dev/29qJQC/data",id,false,input);
                input.classList.remove("cheked_input");
            }
        })
        
        input.addEventListener("blur",()=>{
            input.setAttribute("readonly","readonly");
             change("https://retoolapi.dev/29qJQC/data",id,input)
        })
        }

        

    })

}

async function  post(url){
    let body = JSON.stringify({
        data:`${mainInput.value}`,
        isActive: false,
        id:Date.now()
    })
    data.push(JSON.parse(body))
     await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:body
    })

}



btn.addEventListener("click",()=>{
   if(mainInput.value.trim()){
    post("https://retoolapi.dev/29qJQC/data")
    .then( createHTML(data));
    mainInput.value = "";
   }
})

