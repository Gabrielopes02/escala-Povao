/*
TO DO LIST
Arrumar sistema de 2 folgas na semana
esacala da perfumaria tem horário diferente
 trocar escala pra proxima semana 
escala do balçao roda diferente:
fabricio e douglas abrindo na primeira quinzena do mes

*/

const url = "https://wbwlhifqyobcdilrwjog.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indid2xoaWZxeW9iY2RpbHJ3am9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDQxNDQsImV4cCI6MjA5ODkyMDE0NH0.3fIMSgxi9eSAf6TPzcCKca243I49gRWJcnpm95GCojY";

const dbSupabase = supabase.createClient(url, key);
let trabalhadores = [
  {
    cargo: "motoboy",
    folgas: [5],
    horario: "manha",
    id: 14,
    nome: "Caldeira",
    trabDomingo: ["manhã", "false"],
  },
  {
    cargo: "motoboy",
    folgas: [4],
    horario: "inter",
    id: 14,
    nome: "pablo",
    trabDomingo: ["manhã", "false"],
  },
  {
    cargo: "motoboy",
    folgas: [3],
    horario: "noite",
    id: 14,
    nome: "paloma",
    trabDomingo: ["manhã", "false"],
  },
];
// let trabalhadores = ""
let motoboys = [];
let caixas = [];
let separadores = [];
let vendedores = [];
let expedidores = [];
let perfumistas = [];
let balconistas = [];

const ulManha = Array.from(document.querySelectorAll(".ulManha"));
const ulTarde = Array.from(document.querySelectorAll(".ulTarde"));
const ulNoite = Array.from(document.querySelectorAll(".ulNoite"));
const ulFolgas = Array.from(document.querySelectorAll(".ulFolgas"));
const ulDomManha = document.querySelector("#ulManhaDom");
const ulDomInter = document.querySelector("#ulInterDom");
const ulDomNoite = document.querySelector("#ulNoiteDom");
const nav = document.querySelector("#menuLateral");
const botoesNav = Array.from(nav.getElementsByTagName("li"));
const btnEdit = document.querySelector("#btnEdit");
const btnOk = document.querySelector("#btnOk");
const btnVoltar = document.querySelector("#btnVoltar");
const modal = document.querySelector("#modal");
const passWord = "senha123";

btnVoltar.addEventListener("click", () => {
  modal.close();
});

btnOk.addEventListener("click", () => {
  let input = document.querySelector("#inputModal");
  let p = document.querySelector("#pModal");
  if (input.value == passWord) {
    input.value = "";
    modal.close();
    p.classList.add("hidden");
    modoEdit();
  } else {
    p.classList.toggle("hidden");
    input.value = "";
  }
});

btnEdit.addEventListener("click", () => {
  //modal.showModal();
  modoEdit();
  // teste();
});

const modoEdit = () => {
  const liDivsManha = document
    .querySelector("#divsManha")
    .querySelectorAll("li");
  const liDivsInter = document
    .querySelector("#divsInter")
    .querySelectorAll("li");
  const liDivsNoite = document
    .querySelector("#divsNoite")
    .querySelectorAll("li");

  const divTarde = document.querySelector("#divsInter");
  const divManha = document.querySelector("#divsManha");
  let divMudanca = "";
  const dragStart = (liStart) => {
    liStart.forEach((li) => {
      li.classList.add("modeEdit");
      li.draggable = "true";
      li.addEventListener("dragstart", (event) => {
        console.log("comecou a arrastar", li);
        divMudanca = li;
      });
    });
  };
  dragStart(liDivsManha);
  dragStart(liDivsInter);
  dragStart(liDivsNoite);
  console.log(divMudanca)
  const dragOverAndDrop = (div, horario) => {
    div.addEventListener("dragover", (event) => {
      event.preventDefault();
      console.log("dragover em ", horario);
    });
    div.addEventListener("drop", (event) => {
      event.preventDefault();
      console.log("drop ", horario);
    
      let trabMudar = trabalhadores.find((trab) => trab.nome == divMudanca.textContent);
       trabMudar.horario = horario
      preencherEscalaPorArea(motoboys);
    });
  };
  dragOverAndDrop(divTarde, "inter");
  dragOverAndDrop(divManha,"manha")
  // divTarde.addEventListener("dragover", (event) => {
  //   event.preventDefault();
  //   console.log("dragover em divTarde");
  // });
  //   divTarde.addEventListener("drop", (event) => {
  //     event.preventDefault();
  //     console.log("drop aconteceu em divTarde");
  //     let trabMudar = trabalhadores.find(
  //       (trab) => trab.nome == liDivsManha[0].textContent,
  //     );
  //     // console.log(trabMudar);
  //     trabMudar.horario = "inter";
  //     preencherEscalaPorArea(motoboys);
  //   });
};

botoesNav.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let cargo = event.currentTarget.dataset.option;
    switch (cargo) {
      case "motoboys":
        preencherEscalaPorArea(motoboys);
        break;
      case "caixas":
        preencherEscalaPorArea(caixas);
        break;
      case "separadores":
        preencherEscalaPorArea(separadores);
        break;
      case "vendedores":
        preencherEscalaPorArea(vendedores);
        break;
      case "expedidores":
        preencherEscalaPorArea(expedidores);
        break;
      case "perfumistas":
        preencherEscalaPorArea(perfumistas);
        break;
      case "balconistas":
        preencherEscalaPorArea(balconistas);
        break;
    }
  });
});

nav.addEventListener("mouseenter", () => {
  nav.classList.toggle("open");
});
nav.addEventListener("mouseleave", () => {
  nav.classList.toggle("open");
});
const buscarTrabalhadores = async () => {
  const { data, error } = await dbSupabase.from("escala_motoboys").select("*");
  return data;
}; // funcao de consumir o banco

window.onload = async () => {
  // trabalhadores = await buscarTrabalhadores();
  separacaoDeCargo();
  preencherEscalaPorArea(motoboys);
}; //função para consumir o banco supabase assim que carregar a pagina
const separacaoDeCargo = () => {
  trabalhadores.forEach((trabs) => {
    if (trabs.cargo == "Balcão") {
      balconistas.push(trabs);
    }
    if (trabs.cargo == "Perfumaria") {
      perfumistas.push(trabs);
    }

    if (trabs.cargo == "Expedição") {
      expedidores.push(trabs);
    }
    if (trabs.cargo == "Vendas") {
      vendedores.push(trabs);
    }

    if (trabs.cargo == "Separação") {
      separadores.push(trabs);
    }

    if (trabs.cargo == "Caixa") {
      caixas.push(trabs);
    }

    if (trabs.cargo == "motoboy") {
      motoboys.push(trabs);
    }
  });
}; // function to separate the colaborators by their positions

const preencherEscalaPorArea = (area) => {
  // preenchendo conforme a area especificada como argumento da funcao
  const separarPorHorario = (horario) => {
    return area.filter((trabs) => trabs.horario == horario);
  };
  const retornarArrayFolgas = (area) => {
    let arrayFolgas = area.map((trabs) => [trabs.folgas, trabs.nome]).sort();
    // motoboys => [dia da folga,nome] => ordena em ordem crescente=>[nome sem a folga]
    return arrayFolgas;
  };

  let trabalhadoresDomingoAtual = area.filter(
    (trabs) => trabs.trabDomingo[1] == "true",
  );

  let folgas = retornarArrayFolgas(area);
  let trabsManha = separarPorHorario("manha");
  let trabsNoite = separarPorHorario("noite");
  let trabsIntermedio = separarPorHorario("inter");
  const preencherEscala = (area) => {
    const preencherUls = (ul, trabalhadores) => {
      ul.forEach((ul) => {
        ul.innerHTML = "";
        trabalhadores.forEach((trabs) => {
          if (trabs.folgas == null) return;
          if (trabs.folgas[0] != ul.id) {
            if (trabs.folgas[1] != ul.id) {
              const newLi = document.createElement("li");
              let formatacaoLi = `<div class="flex  justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded whitespace-nowrap"><i class="fa-solid fa-user text-blue-700"></i>${trabs.nome}</div>`;

              newLi.innerHTML = formatacaoLi;
              ul.appendChild(newLi);
            }
          }
        });
      });
    };
    const preencherFolga = () => {
      ulFolgas.forEach((ul) => {
        ul.innerHTML = "";
        folgas.forEach((dias) => {
          if (dias[0] == null) return;
          dias[0].forEach((folga) => {
            if (folga == ul.id) {
              const newLi = document.createElement("li");
              let formatacaoLi = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded whitespace-nowrap"><i class="fa-solid fa-user text-blue-700"></i>${dias[1]}</div>`;

              newLi.innerHTML = formatacaoLi;
              ul.appendChild(newLi);
            }
          });
        });
        // if (folga[0] == ul.id) {
        //   const newLi = document.createElement("li");
        //   let formatacaoLi = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded whitespace-nowrap"><i class="fa-solid fa-user text-blue-700"></i>${folga[1]}</div>`;

        //   newLi.innerHTML = formatacaoLi;
        //   ul.appendChild(newLi);
        // }
      });
    };
    const preencherDomingo = () => {
      ulDomManha.innerHTML = "";
      ulDomInter.innerHTML = "";
      ulDomNoite.innerHTML = "";
      trabalhadoresDomingoAtual.forEach((trabs) => {
        let newLi = document.createElement("li");
        newLi.innerHTML = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded whitespace-nowrap"><i class="fa-solid fa-user text-blue-700"></i>${trabs.nome}</div>`;
        if (trabs.trabDomingo[0] == "manhã") {
          ulDomManha.appendChild(newLi);
        }
        if (trabs.trabDomingo[0] == "inter") {
          ulDomInter.appendChild(newLi);
        }
        if (trabs.trabDomingo[0] == "noite") {
          ulDomNoite.appendChild(newLi);
        }
      });
    };

    preencherFolga();
    preencherUls(ulManha, trabsManha);
    preencherUls(ulTarde, trabsIntermedio);
    preencherUls(ulNoite, trabsNoite);
    preencherDomingo();
  };

  preencherEscala(area);
}; // funcao que faz varias coisas (mudar isso e o nome dela)

const teste = async () => {};

const folgasPerfumaria = [
  {
    nome: "Fabiano",
    folgas: [1],
  },
  {
    nome: "Eloana",
    folgas: [1],
  },
  {
    nome: "Mariana",
    folgas: [2],
  },
  {
    nome: "Adriana",
    folgas: [2],
  },
  {
    nome: "Erica",
    folgas: [3],
  },
  {
    nome: "Adriana P",
    folgas: [3],
  },
  {
    nome: "Mel",
    folgas: [4],
  },
  {
    nome: "Eloah",
    folgas: [5],
  },
  {
    nome: "Grazi",
    folgas: [6],
  },
];

const uploadToSupaBase = async (mudancas) => {
  const { data, error } = await dbSupabase
    .from("escala_motoboys")
    .upsert(mudancas)
    .select();
  console.log(data, error);
};

const mudarEscala = async (trabalhadores) => {
  let mudancas = trabalhadores;
  console.log(mudancas);
  const mudarDatas = () => {
    const feriados = [
      ["02/11", "15/11", "20/11", "25/12"],
      [
        "01/01",
        "09/02",
        "26/03",
        "21/04",
        "23/04",
        "01/05",
        "27/05",
        "13/06",
        "17/07",
        "07/09",
        "12/10",
        "02/11",
        "15/11",
        "20/11",
        "25/12",
      ],
    ];
    let date = new Date();
    const datas = document.querySelectorAll(".datas");
    let ultimoDia = datas[datas.length - 1].textContent.split("/")[0];
    let dias = Number(ultimoDia) + 1;
    let ultimoDiaDoMes = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    let mes = date.getMonth() + 1;
    datas.forEach((data) => {
      if (dias == ultimoDiaDoMes) {
        dias = 1;
        mes++;
      }
      data.textContent = "";
      data.textContent = `${dias}/${mes}`;
      if (date.getFullYear() == "2026") {
        feriados[0].forEach((feriado) => {
          if (`${dias}/${mes}` == feriado) {
            data.textContent = "";
            data.textContent = `Feriado`;
          }
        });
      } else {
        feriados[1].forEach((feriado) => {
          if (`${dias}/${mes}` == feriado) {
            data.textContent = "";
            data.textContent = `Feriado`;
          }
        });
      }

      dias++;
    });
  };
  const mudarHorario = () => {
    mudancas.forEach((trabs) => {
      if (trabs.horario == "manha") {
        trabs.horario = "noite";
      } else if (trabs.horario == "noite") {
        trabs.horario = "manha";
      }
    });
  };
  const mudarFolgas = () => {
    mudancas.forEach((trabs) => {
      // quando a folga for cair na segunda e trabalhar no domingo vai folgar no sábado também

      if (trabs.folgas.length > 1) trabs.folgas.pop();

      if (trabs.folgas[0] == 1) {
        trabs.folgas[0] = 6;
      } else {
        trabs.folgas[0]--;
      }
    });
  };

  const mudarDomingo = () => {
    mudancas.forEach((trabs) => {
      if (trabs.trabDomingo[1] == "true") {
        trabs.trabDomingo[1] = "false";
      } else {
        trabs.trabDomingo[1] = "true";
        if (trabs.trabDomingo[0] == "manhã") {
          trabs.trabDomingo[0] = "noite";
        } else if (trabs.trabDomingo[0] == "noite") {
          trabs.trabDomingo[0] = "manhã";
        }
      }
    });
  };
  mudarDatas();
  mudarHorario();
  mudarFolgas();
  mudarDomingo();
  // uploadToSupaBase(mudancas);
  preencherEscalaPorArea(mudancas);
  // teste();
  //    await uploadToSupaBase(motoboys)
};
