/*
TO DO LIST
Arrumar sistema de 2 folgas na semana
esacala da perfumaria tem horário diferente
 trocar escala pra proxima semana 
escala do balçao roda diferente:
*fabricio e douglas abrindo na primeira quinzena do mes
*/

const url = "https://wbwlhifqyobcdilrwjog.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indid2xoaWZxeW9iY2RpbHJ3am9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDQxNDQsImV4cCI6MjA5ODkyMDE0NH0.3fIMSgxi9eSAf6TPzcCKca243I49gRWJcnpm95GCojY";

const dbSupabase = supabase.createClient(url, key);

let trabalhadores = "";
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
  // modal.showModal();
  // modoEdit();
  teste();
});

const modoEdit = () => {
  const liDivsManha = document
    .querySelector("#divsManha")
    .querySelectorAll("li");

  liDivsManha.forEach((li) => {
    li.classList.add("modeEdit");

    li.addEventListener("mousedown", () => {
      window.addEventListener("mousemove", (event) => {
        li.style.position = "absolute";
        li.style.left = `${event.pageX}px`;
        li.style.top = `${event.pageY}px`;
        li.style.transform = `translate(-50%,-50%)`;
        li.style.backgroundColor = "white";
      });
    });
    li.addEventListener("mouseup", () => {});
  });
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
  trabalhadores = await buscarTrabalhadores();
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
        folgas.forEach((folga) => {
          if (folga[0][0] == ul.id || folga[0][1] == ul.id) {
            const newLi = document.createElement("li");
            let formatacaoLi = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded whitespace-nowrap"><i class="fa-solid fa-user text-blue-700"></i>${folga[1]}</div>`;

            newLi.innerHTML = formatacaoLi;
            ul.appendChild(newLi);
          }
        });
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

const teste = async () => {
  motoboys.forEach((trabs) => {
    trabs.folgas = trabs.folga;
  });
  //  await uploadToSupaBase(motoboys);
};

const uploadToSupaBase = async (mudancas) => {
  const { data, error } = await dbSupabase
    .from("escala_motoboys")
    .upsert(mudancas)
    .select();
  console.log(data, error);
};

// const objTeste = [
//   {
//     horario: "noite",
//     cargo: "motoboy",
//     folga: [2],
//     id: 14,
//     nome: "Caldeira",
//     trabDomingo: ["noite", "false"],
//     trabFeriado: null,
//   },
// ];

const mudarEscala = async (trabalhadores) => {
  let mudancas = trabalhadores;

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
        console.log("ultimodia");
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
      if (trabs.folga == 1) {
        trabs.folga = 7;
      } else {
        trabs.folga--;
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
  // preencherEscalaPorArea(mudancas);
  // teste();
  //    await uploadToSupaBase(motoboys)
};
