 
const escalaMotoboys = [
  // --- TURNO: MANHÃ ---
  {
    nome: "MARLON",
    horario: "manhã",
    folga: "terça",
    trabDomingo: [false, "noite"],
    trabFeriado: false,
  },
  {
    nome: "RHAYAM",
    horario: "manhã",
    folga: "quinta",
    trabDomingo: [false, "noite"],
    trabFeriado: false,
  },
  {
    nome: "THIAGO",
    horario: "manhã",
    folga: "sexta",
    trabDomingo: [true, "manhã"],
    trabFeriado: false,
  },
  {
    nome: "LUIZ",
    horario: "manhã",
    folga: "sexta",
    trabDomingo: [true, "manhã"],
    trabFeriado: false, 
  },
  {
    nome: "J VITOR",
    horario: "manhã",
    folga: "domingo",
    trabDomingo: [true, "manhã"],
    trabFeriado: false,
  },
  {
    nome: "MARCOS",
    horario: "manhã",
    folga: "domingo",
    trabDomingo: [false, "noite"],
    trabFeriado: false,
  },

  // --- TURNO: INTERMÉDIO ---
  {
    nome: "SILAS",
    horario: "intermedio",
    folga: "segunda",
    trabDomingo: [true, "tarde"],
    trabFeriado: false,
  },
  {
    nome: "FABRICIO",
    horario: "intermedio",
    folga: "terça",
    trabDomingo: [false, "manhã"],
    trabFeriado: false,
  },

  // --- TURNO: NOITE ---
  {
    nome: "RODRIGO",
    horario: "noite",
    folga: "segunda",
    trabDomingo: [false, "manhã"],
    trabFeriado: false,
  },
  {
    nome: "GABRIEL P",
    horario: "noite",
    folga: "quarta",
    trabDomingo: [true, "noite"],
    trabFeriado: false,
  },
  {
    nome: "RENAN",
    horario: "noite",
    folga: "quarta",
    trabDomingo: [true, "noite"],
    trabFeriado: false,
  },
  {
    nome: "HANIEL",
    horario: "noite",
    folga: "quinta",
    trabDomingo: [false, "noite"],
    trabFeriado: false,
  },
  {
    nome: "ERICK",
    horario: "noite",
    folga: "sexta",
    trabDomingo: [true, "noite"],
    trabFeriado: false,
  },
  {
    nome: "CALDEIRA",
    horario: "noite",
    folga: "sábado",
    trabDomingo: [false, "manhã"],
    trabFeriado: false,
  },
  {
    nome: "SADAN",
    horario: "noite",
    folga: "sábado",
    trabDomingo: [false, "manhã"],
    trabFeriado: false,
  },
];

let manha = [];
let noite = [];
let inter = [];
let trabDomingo = [[],[]]





const divsManha = Array.from(document.querySelector(".horariosManha").children);
const divsNoite = Array.from(document.querySelector(".horariosNoite").children);
const divsInter = Array.from(document.querySelector(".horariosInter").children);



escalaMotoboys.forEach((moto) => {
  if (moto.horario == "manhã") {
    manha.push(moto);
  } else if (moto.horario == "noite") {
    noite.push(moto);
  } else {
    inter.push(moto);
  }
  
if(moto.trabDomingo[0]){
moto.trabDomingo[1]=="manhã"?trabDomingo[0].push(moto):trabDomingo[1].push(moto)
  
}

});
divsManha.forEach((d,i) => {
if (divsManha.length-1 == i) {
  
}else{
  manha.forEach((m) => {
    let newLi = document.createElement("li");
    newLi.textContent = `${m.nome}`;
    d.children[0].append(newLi);
  });
}

   
});
  
  
divsNoite.forEach((d,i) => {
  if(divsNoite.length-1 == i){
   
  }
  else{
    
    noite.forEach((n) => {
    
    let newLi = document.createElement("li");
    newLi.textContent = `${n.nome}`;
    d.children[0].append(newLi);
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
   console.log(divsManha[6])
