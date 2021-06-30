let express=require('express');
let app=express();

// let app=request('express')();

let bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

let ingredients= [
    {
        "id":"6dty6",
        "text":"MD"
    },
    {
        "id":"7yhu8",
        "text":"SAMS"
    },
    {
        "id":"6dty6",
        "text":"TABREZ"
    }
];

app.get('/',function(request,response){
    response.send(ingredients);
});

app.post('/',function(request,response){
    let ingredient=request.body;
    console.log(request.body);
    if(!request.body.id || !request.body.text){
        response.status(500).send({error:"Ingredient must carry a value!"});
    }else{
        ingredients.push({...request.body});
        console.log(ingredients);
        response.status(200).send(ingredients);
    }
});

app.put('/:ingredientId',function(request,response){
    let newText=request.body.text;
    if(!newText || newText==""){
        response.status(500).send({error:"Enter a Text!"});
    }else{
        for(let i=0;i< ingredients.length;i++){
            let ing=ingredients[i];
            if(ing.id===request.params.ingredientId){
                ingredients[i].text=newText;
                break;
            }
        }
        response.send(ingredients);
    }
});

// app.get("/sams",function(request,response){
//     response.send("We can do it Trust Allah He has a better plan for You")
// });

app.listen(9999,function(){
    console.log("Port is running on 9999");
});
