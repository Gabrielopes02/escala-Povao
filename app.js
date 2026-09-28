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

const buscarTrabalhadores = async () => {
  const { data, error } = await dbSupabase.from("escala_motoboys").select("*");
  return data;
};

window.onload = async () => {
  trabalhadores = await buscarTrabalhadores();
  separacaoDeCargo();
  mBoysFunction();
};
const mudarEscala = async () => {
  const mudarDomingo = () => {
    trabDomingo[0].forEach((m) => {
      const obj = {
        folga: m.folga,
        horario: m.horario,
        id: m.id,
        nome: m.nome,
        trabDomingo: ["noite", false],
        trabFeriado: m.trabFeriado,
      };
      mudancas.push(obj);
    });
    trabDomingo[1].forEach((m) => {
      const obj = {
        folga: m.folga,
        horario: m.horario,
        id: m.id,
        nome: m.nome,
        trabDomingo: ["manhã", false],
        trabFeriado: m.trabFeriado,
      };
      mudancas.push(obj);
    });
    trabDomingo2[0].forEach((m) => {
      const obj = {
        folga: m.folga,
        horario: m.horario,
        id: m.id,
        nome: m.nome,
        trabDomingo: ["manhã", true],
        trabFeriado: m.trabFeriado,
      };
      mudancas.push(obj);
    });
    trabDomingo2[1].forEach((m) => {
      const obj = {
        folga: m.folga,
        horario: m.horario,
        id: m.id,
        nome: m.nome,
        trabDomingo: ["noite", true],
        trabFeriado: m.trabFeriado,
      };
      mudancas.push(obj);
    });
  };
  const funcMudarLetra = () => {
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
    const obj = {
      nome: mudarLetra.nome,
      id: 16,
      trabFeriado: !mudarLetra.trabFeriado,
      trabDomingo: ["nao se aplica", "nao se aplica"],
    };

    mudancas.push(obj);
  };
  const uploadToSupabase = async () => {
    const { data, error } = await dbSupabase
      .from("escala_motoboys")
      .upsert(mudancas)
      .select();

    console.log(data);
    console.log(error);
    location.reload();
  };

  const mudarFolga = () => {
    mudancasFolga = mudancas.map((m) => {
      if (m.folga == 1) {
        m.folga = 6;
      } else {
        m.folga = m.folga - 1;
      }

      return m;
    });
    mudancas = mudancasFolga;
  };

  // mudarDomingo();
  // funcMudarLetra();
  mudarFolga();
  uploadToSupabase();
};

const escalaAnterior = () => {
  const mudarFolga = () => {
    const arrayFolgasVoltadas = mudancas.map((m) => {
      if (m.folga == 6) {
        m.folga = 1;
      } else {
        m.folga = Number(m.folga) + 1;
      }
      return m;
    });

    console.log(arrayFolgasVoltadas);
    mudancas = arrayFolgasVoltadas;
  };

  const uploadToSupabase = async () => {
    const { data, error } = await dbSupabase
      .from("escala_motoboys")
      .upsert(mudancas)
      .select();

    console.log(data);
    console.log(error);
    location.reload();
  };
  mudarFolga();
  uploadToSupabase();
};

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
};
const mBoysFunction = () => {


  const separarPorHorario = (horario) => {
    return motoboys.filter((boys) => boys.horario == horario);
  };
  const retornarArrayFolgas = () => {
    let arrayFolgas = motoboys
      .map((boys) => [boys.folga, boys.nome])
      .sort()
      .map((array) => array[1]);
    // motoboys => [dia da folga,nome] => ordena em ordem crescente=>[nome sem a folga]
    return arrayFolgas;
  };
  let trabalhadoresDomingoAtual = motoboys.filter(
    (boys) => boys.trabDomingo[1] == "true",
  );

  let folgas = retornarArrayFolgas();
  let motoboysManha = separarPorHorario("manhã");
  let motoboysNoite = separarPorHorario("noite");
  let motoboysIntermedio = separarPorHorario("inter");

  const preencherEscala = () => {

    const preencherUls = (ul, trabalhadores) => {
      ul.forEach((ul) => {
        trabalhadores.forEach((trabs) => {
          const newLi = document.createElement("li");
          let formatacaoLi = `<div class="flex justify-start px-1 gap-2 items-center border-2 border-blue-0 rounded whitespace-nowrap"><i class="fa-solid fa-user text-blue-700"></i>${trabs.nome}</div>`;

          newLi.innerHTML = formatacaoLi;
          ul.appendChild(newLi);
        });
      });
    };
    preencherUls(ulManha, motoboysManha);
    preencherUls(ulTarde,motoboysIntermedio)
    preencherUls(ulNoite,motoboysNoite)

   
  };
  preencherEscala();
  
};
