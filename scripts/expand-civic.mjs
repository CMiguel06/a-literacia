import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "data/literacies.json"), "utf8"),
);
const civic = data.find((a) => a.id === "civica");
const old = civic.categories.flatMap((c) => c.lessons);
const institutional = [
  "instituicoes",
  "parlamento-e-governo",
  "participar",
  "dinheiro-publico",
];
const respect = {
  title: "Conselho da Europa — competências para uma cultura democrática",
  url: "https://www.coe.int/en/web/compasito/competences-for-democratic-culture",
};
const consent = {
  title: "APAV — educação para a cidadania, respeito e consentimento",
  url: "https://apav.pt/wp-content/uploads/2025/08/PARECER-APAV_Referencial-para-a-disciplina-de-cidadania_JUL_2025.pdf",
};
const volunteer = {
  title: "Portugal Voluntário — enquadramento do voluntariado",
  url: "https://portugalvoluntario.pt/cs2i/docs/Regulamento-Apoio-Voluntariado.pdf",
};
const groups = [
  [
    "viver-sociedade",
    "Viver em Sociedade",
    "O espaço comum também é nosso.",
    [
      [
        "respeito-reciproco",
        "Respeito não depende de concordar",
        "Respeitar alguém é reconhecer a sua dignidade, mesmo quando discordas.",
        "Pessoas diferentes podem ter hábitos, necessidades e opiniões diferentes. Ouvir antes de julgar ajuda a compreender. O respeito é recíproco: não exige aceitar humilhação ou discriminação.",
        "Num grupo, uma pessoa prefere não participar numa brincadeira. É possível continuar sem a pressionar.",
        "Alguém recusa participar numa brincadeira. O que fazes?",
        [
          "Respeito a decisão e sigo sem excluir a pessoa",
          "Insisto até ceder",
          "Digo que estragou o ambiente",
        ],
        0,
        "Respeitar a escolha permite convivência sem pressão.",
        "Pensa numa regra de convivência que proteja tanto o teu espaço como o dos outros.",
        "respeito dignidade convivência diferença regras sociais",
      ],
      [
        "responsabilidade-partilhada",
        "Usar, cuidar, deixar pronto",
        "Num espaço partilhado, as tuas ações afetam quem vem a seguir.",
        "Usar uma sala, cozinha ou equipamento comum implica cuidar e cumprir os acordos feitos. Uma regra pode ser discutida quando não é justa ou acessível. Responsabilidade inclui reparar um problema que causaste.",
        "Depois de usar a cozinha comum, limpas a zona e avisas se algum utensílio se partiu.",
        "Partiste sem querer um objeto partilhado. Qual é um passo responsável?",
        [
          "Esconder o que aconteceu",
          "Avisar e combinar como reparar",
          "Culpar quem usou antes",
        ],
        1,
        "Assumir o ocorrido e procurar uma solução cuida da confiança.",
        "Escolhe um espaço partilhado e propõe um acordo claro para o seu uso.",
        "responsabilidade espaço partilhado regras cuidado",
      ],
    ],
  ],
  [
    "civilidade",
    "Civilidade e Cortesia",
    "Pequenos gestos tornam o encontro mais fácil.",
    [
      [
        "cumprimentar-agradecer",
        "Palavras pequenas, atenção concreta",
        "Cumprimentar, agradecer e pedir licença reconhece a presença dos outros.",
        "A cortesia adapta-se ao contexto e à cultura. Um cumprimento pode ser verbal, um aceno ou outro gesto confortável. Não exige contacto físico nem uma resposta entusiástica de quem não pode ou não quer.",
        "Precisas de passar num corredor ocupado: pedes licença e esperas que exista espaço.",
        "Para passar por alguém num corredor apertado, podes…",
        [
          "empurrar discretamente",
          "exigir que saia",
          "pedir licença e dar tempo para se afastar",
        ],
        2,
        "Pedir licença comunica a necessidade sem invadir o espaço.",
        "Pratica um agradecimento específico por uma ajuda que recebeste.",
        "cumprimentar agradecer licença cortesia desculpa",
      ],
      [
        "esperar-pela-vez",
        "A tua vez também chega",
        "Respeitar a vez dos outros evita transformar um espaço comum numa disputa.",
        "Observa a fila e pergunta onde começa se não for claro. Dá espaço a quem está a ser atendido. Algumas pessoas podem ter prioridade ou precisar de apoio; confirma com o serviço sem fazer suposições sobre o aspeto delas.",
        "Chegas a um balcão sem senhas e perguntas quem é a última pessoa.",
        "Não percebes a ordem de uma fila. Qual é a melhor abordagem?",
        [
          "Perguntar com calma onde deves esperar",
          "Passar à frente",
          "Decidir pela aparência de quem está à espera",
        ],
        0,
        "Perguntar esclarece a ordem sem retirar a vez a ninguém.",
        "Imagina uma forma respeitosa de esclarecer a ordem numa fila.",
        "vez fila silêncio espaço prioridade",
      ],
    ],
  ],
  [
    "cavalheirismo",
    "Cavalheirismo Contemporâneo",
    "Consideração de pessoa para pessoa.",
    [
      [
        "gentileza-sem-divida",
        "Gentileza não cria dívida",
        "Um gesto de cuidado não obriga a outra pessoa a dar atenção, afeto ou recompensa.",
        "Cavalheirismo contemporâneo significa consideração, não superioridade ou um papel reservado a um género. Qualquer pessoa pode segurar uma porta, oferecer lugar ou ajudar alguém carregado. O gesto deve ser adequado, seguro e livre de cobranças.",
        "Seguras a porta a quem vem imediatamente atrás e segues o teu caminho, sem esperar mais do que a passagem.",
        "Depois de fazeres uma gentileza, a outra pessoa…",
        [
          "fica obrigada a aceitar um convite",
          "continua livre de decidir o que quer",
          "tem de retribuir com afeto",
        ],
        1,
        "Uma ajuda oferecida não cria uma dívida emocional.",
        "Escolhe um gesto simples que possas oferecer sem esperar nada em troca.",
        "cavalheirismo gentileza porta lugar género dívida emocional",
      ],
      [
        "oferecer-sem-impor",
        "Ajuda que respeita um não",
        "Oferecer ajuda é abrir uma possibilidade, não decidir pela outra pessoa.",
        "Pergunta antes de pegar em objetos, tocar ou acompanhar alguém. Não deduzas incapacidade com base na idade ou deficiência. Proteger não é controlar: combinar uma mensagem de chegada não dá direito a exigir localização contínua.",
        "Perguntas se alguém quer ajuda com os sacos. A pessoa recusa; respeitas e deixas espaço.",
        "Uma pessoa recusa a tua oferta de ajuda. Como respondes?",
        [
          "Insisto porque sei melhor",
          "Agarro nos sacos mesmo assim",
          "Respeito a recusa",
        ],
        2,
        "A autonomia da pessoa inclui poder recusar ajuda.",
        "Escreve uma oferta de ajuda que deixe claro que a pessoa pode dizer não.",
        "ajuda recusa autonomia acompanhar proteger controlar segurança",
      ],
    ],
  ],
  [
    "etiqueta-social",
    "Etiqueta Social",
    "Cuidar de um encontro antes, durante e depois.",
    [
      [
        "convites-e-horarios",
        "Um convite também precisa de resposta",
        "Confirmar presença e avisar de um atraso ajuda quem está a organizar.",
        "Se recebeste um convite, responde no prazo combinado. Avisa assim que souberes que vais chegar mais tarde, sem exigir que todos esperem. A pontualidade é consideração, não motivo para humilhar quem teve um imprevisto.",
        "O jantar é às 20h e percebes que só chegas às 20h40. Avisas e perguntas como é melhor proceder.",
        "Vais chegar 40 minutos depois da hora combinada. O que ajuda?",
        [
          "Avisar assim que possível e respeitar o plano do anfitrião",
          "Chegar sem dizer nada",
          "Exigir que ninguém comece",
        ],
        0,
        "Avisar permite ajustar expectativas e a organização do encontro.",
        "Prepara uma mensagem curta para comunicar um atraso fictício.",
        "convite confirmar presença pontualidade horas atraso",
      ],
      [
        "receber-e-agradecer",
        "Ser convidado, receber com cuidado",
        "Um encontro acolhedor tem espaço para necessidades e limites diferentes.",
        "Ao receber, pergunta por necessidades relevantes sem invadir a privacidade. Como convidado, combina antes de levar alguém ou algo; oferecer comida ou um presente não é obrigatório. Agradece o convite e despede-te com consideração.",
        "Perguntas se faz sentido levar alguma coisa e confirmas antes de convidar outra pessoa.",
        "Queres levar mais alguém a um jantar. Primeiro…",
        [
          "apareces acompanhado",
          "confirmas com quem convidou",
          "anuncias a decisão à chegada",
        ],
        1,
        "O anfitrião precisa de poder planear e decidir sem pressão.",
        "Escreve uma mensagem de agradecimento por um convite.",
        "receber convidado anfitrião despedir agradecer convite",
      ],
    ],
  ],
  [
    "etiqueta-mesa",
    "Etiqueta à Mesa",
    "Partilhar a refeição, respeitar as pessoas.",
    [
      [
        "presenca-a-mesa",
        "Estar presente à mesa",
        "Dar atenção à refeição e às pessoas ajuda a partilhar o momento.",
        "Adota uma postura confortável que respeite o espaço dos outros, sem julgar necessidades físicas. Usa o guardanapo de forma prática. Combina o uso do telemóvel; se esperas uma chamada importante, podes explicar sem expor detalhes.",
        "Silencias notificações durante o jantar e avisas que precisas de atender uma chamada breve.",
        "Se precisas de atender uma chamada à mesa, podes…",
        [
          "pôr em alta-voz para todos ouvirem",
          "ignorar todos sem explicar",
          "avisar brevemente e afastar-te quando possível",
        ],
        2,
        "Uma explicação curta e menos ruído respeitam o encontro e a privacidade.",
        "Pensa num acordo simples sobre telemóveis numa refeição partilhada.",
        "mesa postura guardanapo telemóvel atenção",
      ],
      [
        "partilha-refeicao",
        "Partilhar sem fiscalizar o prato",
        "Cortesia à mesa inclui repartir, perguntar e respeitar as escolhas alimentares.",
        "Confirma como a refeição será servida e se faz sentido esperar. Usa utensílios adequados para partilhar e evita ocupar o espaço dos outros. Não comentes corpos, quantidades ou restrições alimentares sem convite. Trata com respeito quem prepara e serve.",
        "Passas a travessa e deixas que cada pessoa decida o que quer comer.",
        "Alguém não quer provar um prato. Qual reação respeita a pessoa?",
        [
          "Aceitar sem insistir nem comentar o corpo",
          "Obrigar a provar por educação",
          "Interrogar em público sobre a saúde",
        ],
        0,
        "Uma recusa não precisa de ser justificada com informação privada.",
        "Descreve como oferecer comida deixando espaço para a pessoa recusar.",
        "mesa partilha refeição servir respeito alimentos",
      ],
    ],
  ],
  [
    "comunicacao",
    "Comunicação",
    "Compreender antes de responder.",
    [
      [
        "ouvir-discordar",
        "Discordar sem diminuir",
        "Podes questionar uma ideia sem atacar a dignidade de quem a expressa.",
        "Deixa a pessoa terminar e confirma o que entendeste. Faz perguntas e apresenta razões concretas. Ouvir não significa concordar; podes terminar uma conversa que se tornou ofensiva, explicando o teu limite quando seguro.",
        "Não concordas com uma proposta e perguntas como resolveria um problema específico, em vez de insultar o autor.",
        "Qual frase ajuda a discordar de forma clara?",
        [
          "Isso só pode vir de alguém como tu",
          "Vejo de outra forma; posso explicar a minha razão?",
          "Cala-te, não sabes nada",
        ],
        1,
        "A frase apresenta desacordo e abre espaço para razões sem ataque pessoal.",
        "Reescreve uma discordância de forma focada na ideia, sem insultos.",
        "ouvir interromper discordar perguntar diálogo conversa",
      ],
      [
        "pedir-desculpa",
        "Uma desculpa reconhece e repara",
        "Pedir desculpa implica reconhecer o que fizeste e o efeito que teve.",
        "Descreve o erro sem transferir a culpa para quem ficou magoado. Quando possível, propõe uma reparação e muda o comportamento. A outra pessoa pode precisar de tempo; uma desculpa não obriga ao perdão imediato.",
        "Interrompeste alguém várias vezes: reconheces isso e dás espaço para terminar.",
        "Qual frase assume melhor um erro?",
        [
          "Desculpa se és sensível demais",
          "Desculpa, mas a culpa é tua",
          "Interrompi-te. Desculpa. Quero ouvir o que faltava dizer",
        ],
        2,
        "Reconhece uma ação concreta e propõe um comportamento reparador.",
        "Escreve uma desculpa com reconhecimento do erro e um passo de reparação.",
        "erro desculpa reparação responsabilidade perdão",
      ],
    ],
  ],
  [
    "limites-consentimento",
    "Limites e Consentimento",
    "Respeito também é saber parar.",
    [
      [
        "espaco-e-toque",
        "O corpo e o espaço de cada pessoa",
        "Proximidade e toque precisam de respeitar o conforto e a vontade da outra pessoa.",
        "Não presumir é uma forma de cuidado. Pergunta quando houver dúvida e aceita a resposta sem pressionar. Um sim anterior não vale para todas as situações e pode mudar. Uma pessoa não precisa de se justificar para recusar um abraço.",
        "Vais cumprimentar alguém e perguntas se prefere um abraço ou um aceno.",
        "Uma pessoa que antes aceitava abraços hoje recusa. O que fazes?",
        [
          "Respeito a escolha de hoje",
          "Lembro que aceitou ontem",
          "Abraço para mostrar carinho",
        ],
        0,
        "A vontade pode mudar; o consentimento não é uma autorização permanente.",
        "Imagina um cumprimento que não dependa de toque físico.",
        "espaço pessoal toque consentimento não retirar limites",
      ],
      [
        "fotografias-e-privacidade",
        "Perguntar antes de publicar",
        "Aceitar uma fotografia não significa aceitar qualquer partilha dessa imagem.",
        "Confirma se a pessoa quer ser fotografada e onde a imagem pode ser usada. Não partilhes mensagens ou detalhes privados sem autorização. Se alguém retirar a autorização, interrompe novas partilhas e procura remover o que controlas.",
        "Uma amiga aceita uma foto para guardar, mas não quer que apareça nas redes.",
        "Podes publicar a foto só porque a pessoa aceitou tirá-la?",
        [
          "Sim, são a mesma decisão",
          "Não; confirma a autorização para publicar",
          "Sim, se tiver muitos gostos",
        ],
        1,
        "Tirar e publicar são utilizações diferentes e merecem acordo claro.",
        "Antes de publicar uma foto fictícia de grupo, que duas perguntas farias?",
        "fotografias partilha privacidade imagem consentimento",
      ],
    ],
  ],
  [
    "espaco-publico",
    "Espaço Público",
    "O caminho deve continuar aberto para todos.",
    [
      [
        "ruido-e-lixo",
        "O teu volume ocupa espaço",
        "Reduzir ruído e recolher o teu lixo cuida de quem partilha o lugar.",
        "Usa auscultadores quando adequado e mantém volume que te permita perceber o ambiente. Não deixes resíduos para outra pessoa resolver. Se não houver recipiente adequado, guarda o lixo até encontrares um destino correto.",
        "No transporte, desligas a reprodução em alta-voz e levas a embalagem contigo.",
        "Não há caixote perto de ti. O que fazes com a embalagem?",
        [
          "Deixo num banco",
          "Atiro para uma zona escondida",
          "Guardo até encontrar um local adequado",
        ],
        2,
        "Um espaço partilhado não transfere para outros a responsabilidade pelos teus resíduos.",
        "Identifica uma forma de reduzir ruído ou resíduos numa deslocação.",
        "ruído lixo volume transporte espaço público",
      ],
      [
        "acessibilidade-e-prioridade",
        "Deixar passagem é incluir",
        "Passagens, rampas e lugares de apoio precisam de estar utilizáveis.",
        "Evita bloquear portas, rampas e corredores com objetos ou com o corpo. Dá tempo para as pessoas entrarem e saírem. Podes oferecer o lugar sem fazer diagnósticos pela aparência; algumas necessidades não são visíveis.",
        "Num autocarro cheio, perguntas se alguém precisa do teu lugar, sem exigir explicações.",
        "Uma passagem acessível parece livre. Podes ocupá-la por conveniência?",
        [
          "Não; deve continuar desimpedida",
          "Sim, se for por poucos minutos",
          "Sim, se ninguém reclamar",
        ],
        0,
        "A acessibilidade precisa de estar disponível quando a pessoa chega, não só depois de pedir.",
        "Num trajeto imaginário, identifica uma barreira que poderias evitar criar.",
        "acessibilidade passagem prioridade transporte rampa lugar",
      ],
    ],
  ],
  [
    "respeito-trabalhadores",
    "Respeito por Trabalhadores",
    "A função nunca reduz a dignidade.",
    [
      [
        "atendimento-com-respeito",
        "Pedir um serviço com respeito",
        "Um problema no serviço pode ser resolvido sem humilhar quem está a trabalhar.",
        "Dirige-te às pessoas com clareza e educação, seja na restauração, transportes, segurança ou serviços públicos. Distingue o problema de um ataque pessoal. A pressão do momento não justifica insultos ou ameaças.",
        "O pedido veio trocado. Explicas o que pediste e perguntas como corrigir.",
        "Como comunicas um erro no pedido?",
        [
          "Com um insulto para acelerar",
          "Descrevendo o erro e pedindo correção",
          "Filmando o trabalhador para o expor",
        ],
        1,
        "O pedido de correção pode ser firme sem retirar dignidade.",
        "Transforma uma reclamação agressiva numa descrição clara do problema.",
        "trabalhadores atendimento restauração transportes dignidade",
      ],
      [
        "trabalho-invisivel",
        "Respeitar também quem não está à vista",
        "Limpeza, manutenção e apoio tornam os espaços utilizáveis e merecem consideração.",
        "Evita criar trabalho desnecessário por descuido. Cumpre indicações de segurança e dá espaço a quem está a realizar tarefas. Podes contestar uma regra ou serviço pelos canais adequados sem desvalorizar a profissão de ninguém.",
        "Uma zona está a ser limpa e sinalizada; usas o percurso alternativo em vez de atravessar.",
        "Perante uma zona de limpeza sinalizada, uma atitude cuidadosa é…",
        [
          "atravessar para poupar segundos",
          "retirar o sinal",
          "respeitar o desvio e o trabalho em curso",
        ],
        2,
        "A sinalização protege quem trabalha e quem utiliza o espaço.",
        "Reconhece uma tarefa de apoio que facilita o teu dia e como a podes respeitar.",
        "limpeza manutenção segurança serviços públicos trabalho",
      ],
    ],
  ],
  [
    "solidariedade",
    "Solidariedade",
    "Ajudar com atenção, compromisso e limites.",
    [
      [
        "ajuda-na-comunidade",
        "Perguntar o que faz falta",
        "Uma ajuda útil parte das necessidades de quem a recebe.",
        "Escuta antes de oferecer uma solução. Na vizinhança ou numa associação, combina o que podes fazer e cumpre o acordo. Evita expor histórias, imagens ou dificuldades de pessoas vulneráveis para mostrar a tua ajuda.",
        "Uma associação explica quais os bens de que precisa; confirmas a lista antes de doar.",
        "Antes de organizar uma ajuda, convém…",
        [
          "confirmar necessidades e combinar o apoio",
          "decidir tudo sem ouvir",
          "publicar os dados de quem vai receber",
        ],
        0,
        "Escutar evita ajuda desadequada e protege a autonomia e privacidade.",
        "Identifica uma necessidade fictícia da comunidade e uma forma de a confirmar.",
        "solidariedade comunidade vizinhança ajuda vulnerabilidade",
      ],
      [
        "voluntariado-responsavel",
        "Um compromisso que cabe na tua vida",
        "Voluntariado responsável combina disponibilidade, preparação e respeito pelas pessoas.",
        "Escolhe uma atividade adequada às tuas capacidades e ao tempo que podes dar. Confirma orientação e regras da organização. Não substituas serviços especializados numa emergência: procura segurança e pede ajuda competente quando necessário.",
        "Queres colaborar semanalmente; perguntas pelas tarefas, formação e compromisso antes de aceitar.",
        "Antes de assumir uma tarefa de voluntariado, verificas…",
        [
          "se rende boas fotografias",
          "se tens disponibilidade, orientação e condições para a cumprir",
          "se podes ignorar todas as regras",
        ],
        1,
        "Um compromisso sustentável beneficia quem ajuda e quem recebe apoio.",
        "Escreve duas perguntas que farias a uma organização antes de colaborar.",
        "voluntariado compromisso comunidade emergência apoio",
      ],
    ],
  ],
];
for (const area of data)
  for (const c of area.categories)
    for (const l of c.lessons) l.introducedIn ??= 1;
const newCats = groups.map(([id, title, description, rows]) => ({
  id,
  title,
  description,
  lessons: rows.map(
    ([
      id,
      title,
      quick,
      explain,
      example,
      question,
      answers,
      correct,
      explanation,
      activity,
      words,
    ]) => ({
      id,
      title,
      summary: quick,
      quick,
      explain: [explain],
      example: { title: "Uma situação do dia a dia", text: example },
      quiz: { question, answers, correct, explanation },
      activity,
      keywords: words.split(" "),
      aliases: words.split(" "),
      xp: 20,
      minutes: 3,
      variants: {},
      introducedIn: 2,
      sources: [
        id.includes("consentimento") ||
        ["espaco-e-toque", "fotografias-e-privacidade"].includes(id)
          ? consent
          : id.includes("voluntariado")
            ? volunteer
            : respect,
      ],
      sourceNote:
        "Os princípios de respeito e autonomia apoiam estes exercícios. Os exemplos de cortesia são propostas de convivência, não regras universais de etiqueta.",
    }),
  ),
}));
civic.categories = [
  ...newCats,
  {
    id: "civica-0",
    title: "Instituições",
    description: "Compreender quem decide e quem faz.",
    lessons: old.filter((l) => institutional.slice(0, 2).includes(l.id)),
  },
  {
    id: "civica-1",
    title: "Participação",
    description: "Fazer parte das decisões em comum.",
    lessons: old.filter((l) => institutional.slice(2).includes(l.id)),
  },
];
civic.description =
  "Viver em sociedade com respeito, autonomia e participação.";
civic.sources = [
  respect,
  consent,
  volunteer,
  ...civic.sources.filter(
    (s) =>
      ![
        "https://www.coe.int/en/web/compasito/competences-for-democratic-culture",
        consent.url,
        volunteer.url,
      ].includes(s.url),
  ),
];
civic.missions = [
  civic.mission,
  {
    id: "civica-porta",
    title: "Uma porta, um gesto",
    question:
      "Alguém vem imediatamente atrás quando entras. Qual gesto pode ajudar?",
    answers: [
      "Segurar a porta quando for seguro, sem esperar recompensa",
      "Fechar de propósito",
      "Exigir agradecimento antes de deixar passar",
    ],
    correct: 0,
    explanation:
      "Uma pequena atenção pode facilitar a passagem, sem criar obrigação.",
    scene: "door",
  },
  {
    id: "civica-jantar",
    title: "Jantar às 20h",
    question: "Só vais chegar às 20h40. Qual é a decisão mais atenciosa?",
    answers: [
      "Não dizer nada",
      "Avisar assim que possível e aceitar que comecem",
      "Exigir que mudem todos os planos",
    ],
    correct: 1,
    explanation:
      "O aviso dá a quem recebe a possibilidade de ajustar a organização.",
    scene: "clock",
  },
  {
    id: "civica-transporte",
    title: "Um lugar disponível",
    question: "Uma pessoa idosa entra num transporte cheio. Como podes agir?",
    answers: [
      "Decidir que é incapaz",
      "Ignorar qualquer pedido",
      "Oferecer o lugar com discrição, aceitando a resposta",
    ],
    correct: 2,
    explanation:
      "Oferecer ajuda não implica fazer suposições nem impor a aceitação.",
    scene: "seat",
  },
  {
    id: "civica-recusa",
    title: "Obrigado, não preciso",
    question: "Uma pessoa recusa ajuda com os sacos. O que fazes?",
    answers: [
      "Respeito a recusa e deixo espaço",
      "Insisto até aceitar",
      "Pego nos sacos sem perguntar",
    ],
    correct: 0,
    explanation:
      "A ajuda é uma oferta; a pessoa mantém a autonomia para recusar.",
    scene: "help",
  },
];
for (const area of data) {
  area.missions ??= [area.mission];
  for (const c of area.categories)
    for (const l of c.lessons) {
      l.sources ??=
        area.id === "civica"
          ? area.sources.filter((s) => s.url.includes("parlamento"))
          : area.sources;
      l.sourceNote ??=
        "Consulta a fonte principal e compara com as referências complementares da literacia.";
    }
}
fs.writeFileSync(
  path.join(root, "data/literacies.json"),
  JSON.stringify(data, null, 2) + "\n",
);
fs.writeFileSync(
  path.join(root, "data/literacies.js"),
  "window.LITERACIES = " + JSON.stringify(data) + ";\n",
);
console.log(
  "60 lições; Cívica: 12 categorias, 24 lições e 5 missões. IDs originais preservados.",
);
