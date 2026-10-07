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
    let arrayFolgas = area.map((trabs) => [trabs.folga, trabs.nome]).sort();
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
          if (trabs.folga !== ul.id) {
            const newLi = document.createElement("li");
            let formatacaoLi = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded whitespace-nowrap"><i class="fa-solid fa-user text-blue-700"></i>${trabs.nome}</div>`;

            newLi.innerHTML = formatacaoLi;
            ul.appendChild(newLi);
          }
        });
      });
    };
    const preencherFolga = () => {
      ulFolgas.forEach((ul) => {
        ul.innerHTML = "";
        folgas.forEach((folga) => {
          if (folga[0] == ul.id) {
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

const teste = () => {
  console.log(motoboys);
  // let mudancas = [];
  // motoboys.forEach((boys) => {
  //   if (boys.horario == "noite") {
  //     boys.horario = "manha";
  //     mudancas.push(boys);
  //   } else if (boys.horario == "inter") {
  //   } else {
  //     boys.horario = "noite";
  //     mudancas.push(boys);
  //   }
  // });
};

const uploadToSupaBase = async (mudancas) => {
  const { data, error } = await dbSupabase
    .from("escala_motoboys")
    .upsert(mudancas)
    .select();
  console.log(data);
};

const mudarEscala = (trabalhadores) => {
  let mudancas = "";

  const mudarFolgas = () => {
    mudancas = trabalhadores.map((trabs) => {
      return {
        ...trabs,
        folga: trabs.folga - 1,
      };
    });
  };

  const mudarHorario = () => {
    let trabsManha = [];
    let trabsNoite = [];
    mudancas.forEach((trabs) => {
      if (trabs.horario == "manha") {
        trabsManha.push(trabs);
      } else if ((trabs.horario = "noite")) {
        trabsNoite.push(trabs);
      }
    });

    let trabsManhaToNoite = trabsManha.map((trabs) => {
      return { ...trabs, horario: "noite" };
    });
    let trabsNoiteToManha = trabsNoite.map((trabs) => {
      return { ...trabs, horario: "manha" };
    });
  };

  const mudarDomingo = () => {
    mudancas = mudancas.map((trabs) => {
      if (trabs.trabDomingo[1] == "true") {
        return {
          ...trabs,
          trabDomingo: [trabs.trabDomingo[0], "false"],
        };
      } else {
        if (trabs.trabDomingo[0] == "manhã") {
          return {
            ...trabs,
            trabDomingo: ["noite", "true"],
          };
        } else if (trabs.trabDomingo[0] == "noite") {
          return {
            ...trabs,
            trabDomingo: ["manha", "false"],
          };
        } else {
          return trabs;
        }
      }
    });
  };
  mudarFolgas();
  mudarHorario();
  mudarDomingo();
  console.log(mudancas);
};
