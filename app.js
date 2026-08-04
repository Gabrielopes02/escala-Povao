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
    horario: "intermedio",
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
escalaMotoboys.forEach((moto) => {
  if (moto.horario == "manhã") {
    manha.push(moto);
    console.log(moto);
  }

  if (moto.horario == "noite") {
    noite.push(moto);
    console.log(moto);
  }
});

