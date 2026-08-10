/*const escalaMotoboys = [
  // --- TURNO: MANHÃ ---
  {
    nome: "MARLON",
    horario: "manhã",
    folga: 2,
    trabDomingo: [false, "noite"],
    trabFeriado: false,
  },
  {
    nome: "RHAYAM",
    horario: "manhã",
    folga: 4,
    trabDomingo: [false, "noite"],
    trabFeriado: false,
  },
  {
    nome: "THIAGO",
    horario: "manhã",
    folga: 5,
    trabDomingo: [true, "manhã"],
    trabFeriado: false,
  },
  {
    nome: "LUIZ",
    horario: "manhã",
    folga: 5,
    trabDomingo: [true, "manhã"],
    trabFeriado: false, 
  },
  {
    nome: "J VITOR",
    horario: "manhã",
    folga: 3,
    trabDomingo: [true, "manhã"],
    trabFeriado: false,
  },
  {
    nome: "MARCOS",
    horario: "manhã",
    folga: 6,
    trabDomingo: [false, "noite"],
    trabFeriado: false,
  },

  // --- TURNO: INTERMÉDIO ---
  {
    nome: "SILAS",
    horario: "intermedio",
    folga: 1,
    trabDomingo: [true, "tarde"],
    trabFeriado: false,
  },
  {
    nome: "FABRICIO",
    horario: "intermedio",
    folga: 2,
    trabDomingo: [false, "manhã"],
    trabFeriado: false,
  },

  // --- TURNO: NOITE ---
  {
    nome: "RODRIGO",
    horario: "noite",
    folga: 1,
    trabDomingo: [false, "manhã"],
    trabFeriado: false,
  },
  {
    nome: "GABRIEL P",
    horario: "noite",
    folga: 3,
    trabDomingo: [true, "noite"],
    trabFeriado: false,
  },
  {
    nome: "RENAN",
    horario: "noite",
    folga: 3,
    trabDomingo: [true, "noite"],
    trabFeriado: false,
  },
  {
    nome: "HANIEL",
    horario: "noite",
    folga: 4,
    trabDomingo: [false, "noite"],
    trabFeriado: false,
  },
  {
    nome: "ERICK",
    horario: "noite",
    folga: 5,
    trabDomingo: [true, "noite"],
    trabFeriado: false,
  },
  {
    nome: "CALDEIRA",
    horario: "noite",
    folga: 6,
    trabDomingo: [false, "manhã"],
    trabFeriado: false,
  },
  {
    nome: "SADAN",
    horario: "noite",
    folga: 6,
    trabDomingo: [false, "manhã"],
    trabFeriado: false,
  },
];*/
const url = "https://wbwlhifqyobcdilrwjog.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indid2xoaWZxeW9iY2RpbHJ3am9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDQxNDQsImV4cCI6MjA5ODkyMDE0NH0.3fIMSgxi9eSAf6TPzcCKca243I49gRWJcnpm95GCojY";

const dbSupabase = supabase.createClient(url,key)


 

let manha = [];
let noite = [];
let inter = [];
let trabDomingo = [[],[]]


const divsManha = Array.from(document.querySelector(".horariosManha").children);
const divsNoite = Array.from(document.querySelector(".horariosNoite").children);
const divsInter = Array.from(document.querySelector(".horariosInter").children);

const divsFolga = Array.from(document.querySelector(".horariosFolga").children)



 const buscarMotoboys = async ()=>{
   const {data,error}= await dbSupabase.from("escala_motoboys").select("*")
   return data
 }
window.onload = async () => {
  const escalaMotoboys = await buscarMotoboys();
  
   escalaMotoboys.forEach((moto) => {
  if (moto.horario == "manhã") {
    manha.push(moto);
  } else if (moto.horario == "noite") {
    noite.push(moto);
  } else {
    inter.push(moto);
  }
  
if(moto.trabDomingo[0]=== "true"){
moto.trabDomingo[1]=="manhã"?trabDomingo[0].push(moto):trabDomingo[1].push(moto)
  
}

});

divsManha.forEach((d,i) => {
if (divsManha.length-1 == i) {
  
}else{
  manha.forEach((m) => {
    if(d.id==m.folga){
      
    }
    else{
      let newLi = document.createElement("li");
    newLi.textContent = `${m.nome}`;
    d.children[0].append(newLi);
      
    }
    
  });
}

   
});
  
  
divsNoite.forEach((d,i) => {
  if(divsNoite.length-1 == i){}
  else{
    noite.forEach((n) => {
    
    if(d.id==n.folga){}
    else{
    
    let newLi = document.createElement("li");
    newLi.textContent = `${n.nome}`;
    d.children[0].append(newLi);
    }
    
  });
  }
});
  
  
divsInter.forEach((d,i) => {
  if(divsInter.length-1==i){
    
  }else{
    inter.forEach((n) => {
    let newLi = document.createElement("li");
    newLi.textContent = `${n.nome}`;
    d.children[0].append(newLi);
  });
  }
  
  
});



trabDomingo.forEach((turnos,i)=>{
  turnos.forEach(moto=>{
  let newLi = document.createElement("li");
    newLi.textContent =`${moto.nome}`
    i==0?divsManha[6].children[0].append(newLi):divsNoite[6].children[0].append(newLi)
    
  })
})
   
 divsFolga.forEach( d=>{
  escalaMotoboys.forEach(m=>{
  if(d.id==m.folga){
    let newLi = document.createElement('li')

    newLi.textContent=`${m.nome}`
    d.children[0].append(newLi)
  }
  })
})

};
 

const mudarEscala=async()=>{
await  manhaToNoite()
await noiteToManha()
tiriri()
}
const manhaToNoite=async ()=>{
  
  const idManha = manha.map(moto=>moto.id)
  const {data,error} = await dbSupabase.from("escala_motoboys").update({horario:"noite"}).in("id",idManha).select()
  console.log(data)
  
}
const noiteToManha = async ()=>{
  const idNoite = noite.map(moto=>moto.id)
  const {data,error}= await dbSupabase.from("escala_motoboys").update({horario:'manhã'}).in('id',idNoite).select()
  console.log('dados noite para manha',data)
}


const tiriri =()=>{
  const idTiriri=inter.map(moto=>moto.horario == "tiriri")
  console.log(idTiriri)
}

 
