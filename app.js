const escalaMotoboys = [
  // Folga: Segunda-feira
  {
    nome: "SILAS",
    horario: "intermedio",
    folga: ["segunda"],
    trabDomingo: true,
    trabFeriado: false,
  },
  {
    nome: "RODRIGO",
    horario: "noite",
    folga: ["segunda"],
    trabDomingo: false,
    trabFeriado: false,
  },

  // Folga: Terça-feira
  {
    nome: "FABRICIO",
    horario: "intermedio",
    folga: ["terça"],
    trabDomingo: false,
    trabFeriado: false,
  },
  {
    nome: "MARLON",
    horario: "manhã",
    folga: ["terça"],
    trabDomingo: false,
    trabFeriado: false,
  },

  // Folga: Quarta-feira
  {
    nome: "GABRIEL P",
    horario: "noite",
    folga: ["quarta"],
    trabDomingo: true,
    trabFeriado: false,
  },
  {
    nome: "JOAO",
    horario: "manhã",
    folga: ["quarta"],
    trabDomingo: true,
    trabFeriado: false,
  },
  {
    nome: "RENAN",
    horario: "noite",
    folga: ["quarta"],
    trabDomingo: true,
    trabFeriado: false,
  },

  // Folga: Quinta-feira
  {
    nome: "RHAYAM",
    horario: "manhã",
    folga: ["quinta"],
    trabDomingo: false,
    trabFeriado: false,
  },
  {
    nome: "HANIEL",
    horario: "noite",
    folga: ["quinta"],
    trabDomingo: false,
    trabFeriado: false,
  },

  // Folga: Sexta-feira
  {
    nome: "THIAGO",
    horario: "manhã",
    folga: ["sexta"],
    trabDomingo: true,
    trabFeriado: false,
  },
  {
    nome: "ERICK",
    horario: "noite",
    folga: ["sexta"],
    trabDomingo: true,
    trabFeriado: false,
  },
  {
    nome: "LUIS",
    horario: "manhã",
    folga: ["sexta"],
    trabDomingo: true,
    trabFeriado: false,
  },

  // Folga: Sábado
  {
    nome: "CALDEIRA",
    horario: "noite",
    folga: ["sábado"],
    trabDomingo: false,
    trabFeriado: false,
  },
  {
    nome: "SADAN",
    horario: "noite",
    folga: ["sábado"],
    trabDomingo: false,
    trabFeriado: false,
  },
  {
    nome: "MARCOS",
    horario: "manhã",
    folga: ["domingo"],
    trabDomingo: false,
    trabFeriado: false,
  },
];
let manha = [];
let noite = [];
let inter = [];
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

  // if (moto.horario == "noite") {
  //   noite.push(moto);
  // }
});

divsManha.forEach((d) => {
  manha.forEach((m) => {
    let newLi = document.createElement("li");
    newLi.textContent = `${m.nome}`;
    d.children[0].append(newLi);
  });
});

divsNoite.forEach((d) => {
  noite.forEach((n) => {
    let newLi = document.createElement("li");
    newLi.textContent = `${n.nome}`;
    d.children[0].append(newLi);
  });
});
divsInter.forEach((d) => {
  inter.forEach((n) => {
    let newLi = document.createElement("li");
    newLi.textContent = `${n.nome}`;
    d.children[0].append(newLi);
  });
});
