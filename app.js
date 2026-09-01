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
const mudarletra = "";

const ulManha = Array.from(document.querySelectorAll(".ulManha"));
const ulTarde = Array.from(document.querySelectorAll(".ulTarde"));
const ulNoite = Array.from(document.querySelectorAll(".ulNoite"));
const ulFolgas = Array.from(document.querySelectorAll(".ulFolgas"));

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
    } else if(moto.horario == "inter"){
      inter.push(moto);
    }
    if (moto.id == 16) {
      mudarLetra = moto;
    }
    console.log(escalaMotoboys);
    if (moto.trabDomingo[1] === "true") {
      moto.trabDomingo[0] == "manhã"
        ? trabDomingo[0].push(moto)
        : trabDomingo[1].push(moto);
    } else {
      moto.trabDomingo[0] == "manhã"
        ? trabDomingo2[0].push(moto)
        : trabDomingo2[1].push(moto);
    }

    if (moto.nome == "Mudar Escala") {
      mudarLetra = moto;
    }

    let auxidAndFolgas = [];
    auxidAndFolgas.push(moto.id);
    auxidAndFolgas.push(Number(moto.folga));
    idAndFolgas.push(auxidAndFolgas);
    auxidAndFolgas = [];
  });
  inter.push({ nome: "Virtualista" });

  ulManha.forEach((d, i) => {
    manha.forEach((m) => {
      if (d.id !== m.folga) {
        const newLi = document.createElement("li");
        newLi.innerHTML = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded whitespace-nowrap"><i class="fa-solid fa-user text-blue-700"></i>${m.nome}</div>`;
        d.append(newLi);
      }
    });
  });
  ulTarde.forEach((d, i) => {
    inter.forEach((m) => {
      if (d.id !== m.folga) {
        const newLi = document.createElement("li");
        newLi.innerHTML = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded"><i class="fa-solid fa-user text-blue-700"></i>${m.nome}</div>`;
        d.append(newLi);
      }
    });
  });

  ulNoite.forEach((d, i) => {
    noite.forEach((m) => {
      if (d.id !== m.folga) {
        const newLi = document.createElement("li");
        newLi.innerHTML = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded"><i class="fa-solid fa-user text-blue-700"></i>${m.nome}</div>`;
        d.append(newLi);
      }
    });
  });
  ulFolgas.forEach((d, i) => {
    escalaMotoboys.forEach((m) => {
      if (d.id == m.folga) {
        let newLi = document.createElement("li");
        newLi.innerHTML = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded"><i class="fa-solid fa-user text-blue-700"></i>${m.nome}</div>`;

        d.append(newLi);
      }
    });
  });
  trabDomingo.forEach((turnos, i) => {
    const divManha = document.querySelector("#ulManhaDom");
    const divNoite = document.querySelector("#ulNoiteDom");
    turnos.forEach((moto) => {
      let newLi = document.createElement("li");
      newLi.innerHTML = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded whitespace-nowrap"><i class="fa-solid fa-user text-blue-700"></i>${moto.nome}</div>`;

      i == 0 ? divManha.append(newLi) : divNoite.append(newLi);
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
    if (mudarLetra.trabFeriado) {
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
    }
  });

  const { data, error } = await dbSupabase
    .from("escala_motoboys")
    .upsert(mudancas)
    .select();

  console.log(data);
  console.log(error);
  //location.reload()
};

const escalaAnterior = () => {
  console.log(mudarLetra);
};
