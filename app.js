const url = "https://wbwlhifqyobcdilrwjog.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indid2xoaWZxeW9iY2RpbHJ3am9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDQxNDQsImV4cCI6MjA5ODkyMDE0NH0.3fIMSgxi9eSAf6TPzcCKca243I49gRWJcnpm95GCojY";

const dbSupabase = supabase.createClient(url, key);

let manha = [];
let noite = [];
let inter = [];
let trabDomingo = [[], []];
let trabDomingo2 = [[], []];
let idTrabDom0Manha = [];
let idTrabDom0Noite = [];
let idTrabDom1Manha = [];
let idTrabDom1Noite = [];
let idAndFolgas = [];

const divsManha = Array.from(document.querySelector(".horariosManha").children);
const divsNoite = Array.from(document.querySelector(".horariosNoite").children);
const divsInter = Array.from(document.querySelector(".horariosInter").children);

const divsFolga = Array.from(document.querySelector(".horariosFolga").children);

const buscarMotoboys = async () => {
  const { data, error } = await dbSupabase.from("escala_motoboys").select("*");
  return data;
};

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

    if (moto.trabDomingo[1] === "true") {
      moto.trabDomingo[0] == "manhã"
        ? trabDomingo[0].push(moto)
        : trabDomingo[1].push(moto);
    } else {
      moto.trabDomingo[0] == "manhã"
        ? trabDomingo2[0].push(moto)
        : trabDomingo2[1].push(moto);
    }

    let auxidAndFolgas = [];
    auxidAndFolgas.push(moto.id);
    auxidAndFolgas.push(Number(moto.folga));
    idAndFolgas.push(auxidAndFolgas);
    auxidAndFolgas = [];
  });

  divsManha.forEach((d, i) => {
    if (divsManha.length - 1 == i) {
    } else {
      manha.forEach((m) => {
        if (d.id == m.folga) {
        } else {
          let newLi = document.createElement("li");
          newLi.textContent = `${m.nome}`;
          d.children[0].append(newLi);
        }
      });
    }
  });

  divsNoite.forEach((d, i) => {
    if (divsNoite.length - 1 == i) {
    } else {
      noite.forEach((n) => {
        if (d.id == n.folga) {
        } else {
          let newLi = document.createElement("li");
          newLi.textContent = `${n.nome}`;
          d.children[0].append(newLi);
        }
      });
    }
  });

  divsInter.forEach((d, i) => {
    if (divsInter.length - 1 == i) {
    } else {
      inter.forEach((n) => {
        let newLi = document.createElement("li");
        newLi.textContent = `${n.nome}`;
        d.children[0].append(newLi);
      });
    }
  });
  //colocar na tabela
  trabDomingo.forEach((turnos, i) => {
    turnos.forEach((moto) => {
      let newLi = document.createElement("li");
      newLi.textContent = `${moto.nome}`;
      i == 0
        ? divsManha[6].children[0].append(newLi)
        : divsNoite[6].children[0].append(newLi);
    });
  });

  divsFolga.forEach((d) => {
    escalaMotoboys.forEach((m) => {
      if (d.id == m.folga) {
        let newLi = document.createElement("li");

        newLi.textContent = `${m.nome}`;
        d.children[0].append(newLi);
      }
    });
  });
};

const mudarEscala = async () => {
  let mudancas = [];
  trabDomingo[0].forEach((m) => {
    const obj = {
      id: m.id,
      nome: m.nome,
      trabDomingo: ["noite", false],
    };
    mudancas.push(obj);
  });
  trabDomingo[1].forEach((m) => {
    const obj = {
      id: m.id,
      nome: m.nome,
      trabDomingo: ["manhã", false],
    };
    mudancas.push(obj);
  });
  trabDomingo2[0].forEach((m) => {
    const obj = {
      id: m.id,
      nome: m.nome,
      trabDomingo: ["manhã", true],
    };
    mudancas.push(obj);
  });
  trabDomingo2[1].forEach((m) => {
    const obj = {
      id: m.id,
      nome: m.nome,
      trabDomingo: ["noite", true],
    };
    mudancas.push(obj);
  });

  const idManha = manha.map((moto) => moto.id);
  const idNoite = noite.map((moto) => moto.id);
  mudancas.forEach((m) => {
    idManha.forEach((id) => {
      if (id == m.id) {
        m.horario = "noite";
      }
    });
    idNoite.forEach((id) => {
      if (id == m.id) {
        m.horario = "manhã";
      }
    });
  });

  // const {data,error}=await dbSupabase.from('escala_motoboys').upsert(mudancas).select()
  // console.log(data)
  // console.log(error)
  // location.reload()
  
};

const escalaAnterior = () => {};
