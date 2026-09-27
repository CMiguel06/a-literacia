(function () {
  function mount(container, area) {
    const hint =
      '<p class="lab-hint">Prática livre, sem XP extra. Usa os botões com o rato, toque ou teclado.</p>';
    const feedback = () => container.querySelector(".lab-feedback");
    const result = (text) => {
      feedback().textContent = text;
    };
    if (area.id === "financeira") {
      const names = ["Necessidades", "Poupança", "Lazer", "Investimento"];
      const values = [0, 0, 0, 0];
      container.innerHTML = `<div class="lab-heading"><span class="lab-tag">EXPERIÊNCIA INTERATIVA</span><h2>Dá um destino a 100 €.</h2><p>Cenário fictício: reserva pelo menos 40 € para compromissos e 10 € para um objetivo. Distribui o restante como preferires.</p></div><div class="budget-bank"><span>Por distribuir</span><strong id="budget-left">100 €</strong><button type="button" class="money-token" draggable="true" aria-label="Selecionar 10 euros para distribuir">10 €</button><span class="small">Arrasta a ficha ou usa os botões.</span></div><div class="budget-buckets">${names.map((name, i) => `<section class="budget-bucket" data-bucket="${i}"><span class="bucket-mark">${["◎", "◈", "☆", "↗"][i]}</span><h3>${name}</h3><output id="budget-${i}">0 €</output><div class="budget-bar"><span></span></div><div class="stepper"><button data-change="${i},-10" aria-label="Retirar 10 euros de ${name}">−</button><button data-change="${i},10" aria-label="Adicionar 10 euros a ${name}">+</button></div></section>`).join("")}</div><button class="button primary lab-check">Verificar o meu plano</button><p class="lab-feedback" role="status"></p>${hint}<p class="small">Exercício de orçamento, não uma recomendação de investimento. Podes atribuir 0 € a investimento.</p>`;
      function update() {
        const remaining = 100 - values.reduce((a, b) => a + b, 0);
        container.querySelector("#budget-left").textContent = remaining + " €";
        values.forEach((v, i) => {
          container.querySelector("#budget-" + i).textContent = v + " €";
          container.querySelectorAll(".budget-bar span")[i].style.width =
            v + "%";
        });
        container.querySelectorAll("[data-change]").forEach((b) => {
          const [i, n] = b.dataset.change.split(",").map(Number);
          b.disabled = n < 0 ? values[i] === 0 : remaining < 10;
        });
      }
      function change(i, n) {
        if (values[i] + n < 0 || values.reduce((a, b) => a + b, 0) + n > 100)
          return;
        values[i] += n;
        update();
        result("Plano atualizado.");
      }
      container
        .querySelectorAll("[data-change]")
        .forEach(
          (b) =>
            (b.onclick = () =>
              change(...b.dataset.change.split(",").map(Number))),
        );
      const token = container.querySelector(".money-token");
      token.ondragstart = (event) =>
        event.dataTransfer.setData("text/plain", "literacia-money");
      token.onclick = () =>
        result(
          "Escolhe “Adicionar 10 euros” na categoria a que queres atribuir a ficha.",
        );
      container.querySelectorAll("[data-bucket]").forEach((b) => {
        b.ondragover = (ev) => ev.preventDefault();
        b.ondrop = (ev) => {
          ev.preventDefault();
          if (ev.dataTransfer.getData("text/plain") === "literacia-money")
            change(Number(b.dataset.bucket), 10);
        };
      });
      container.querySelector(".lab-check").onclick = () =>
        result(
          values.reduce((a, b) => a + b, 0) !== 100
            ? "Ainda há dinheiro por distribuir. Ajusta o plano até totalizar 100 €."
            : values[0] < 40
              ? "O cenário tem 40 € de compromissos. Revê a categoria Necessidades."
              : values[1] < 10
                ? "Faltam os 10 € previstos para o objetivo de poupança."
                : "✓ O plano respeita os compromissos, a reserva e o limite de 100 €. Há várias distribuições possíveis.",
        );
      update();
    } else if (area.id === "alimentar") {
      const foods = [
        ["Hortícolas", "Folhas e legumes"],
        ["Cereais ou tubérculos", "Arroz, massa ou batata"],
        ["Fonte de proteína", "Feijão, ovo, peixe ou outra opção"],
      ];
      let picked = new Set();
      container.innerHTML = `<div class="lab-heading"><span class="lab-tag">EXPERIÊNCIA INTERATIVA</span><h2>Constrói uma refeição variada.</h2><p>Junta os três grupos ao prato. Esta imagem explora variedade, não quantidades ou um plano alimentar individual.</p></div><div class="plate-lab"><div class="food-options">${foods.map(([name, desc], i) => `<button class="food-token" data-food="${i}" draggable="true" aria-pressed="false"><span class="food-dot food-${i}"></span><span><strong>${name}</strong><small>${desc}</small></span><span>+</span></button>`).join("")}</div><div class="plate" aria-label="Prato com grupos selecionados"><div class="plate-center"><span>O teu prato</span><strong id="plate-count">0 de 3 grupos</strong></div>${foods.map(([name], i) => `<span class="plate-sector sector-${i}" id="food-sector-${i}" aria-hidden="true"></span>`).join("")}</div></div><button class="button primary lab-check">Verificar a variedade</button><p class="lab-feedback" role="status"></p>${hint}<p class="small">Clica num grupo para adicionar ou remover. Também podes arrastá-lo até ao prato.</p>`;
      function select(i, force = false) {
        picked.has(i) && !force ? picked.delete(i) : picked.add(i);
        container.querySelectorAll("[data-food]").forEach((b, j) => {
          b.setAttribute("aria-pressed", String(picked.has(j)));
          container
            .querySelector("#food-sector-" + j)
            .classList.toggle("selected", picked.has(j));
        });
        container.querySelector("#plate-count").textContent =
          picked.size + " de 3 grupos";
        result(
          "Grupos no prato: " +
            ([...picked].map((i) => foods[i][0]).join(", ") || "nenhum") +
            ".",
        );
      }
      container.querySelectorAll("[data-food]").forEach((b) => {
        b.onclick = () => select(Number(b.dataset.food));
        b.ondragstart = (ev) =>
          ev.dataTransfer.setData("text/plain", "food-" + b.dataset.food);
      });
      const plate = container.querySelector(".plate");
      plate.ondragover = (ev) => ev.preventDefault();
      plate.ondrop = (ev) => {
        ev.preventDefault();
        const val = ev.dataTransfer.getData("text/plain");
        if (/^food-[0-2]$/.test(val)) select(Number(val.slice(-1)), true);
      };
      container.querySelector(".lab-check").onclick = () =>
        result(
          picked.size === 3
            ? "✓ Juntaste grupos diferentes. A variedade também se constrói ao longo do dia e pode adaptar-se às necessidades de cada pessoa."
            : "Explora os grupos que ainda faltam. A variedade ajuda a combinar contributos diferentes.",
        );
    } else if (area.id === "digital") {
      const selected = new Set();
      container.innerHTML = `<div class="lab-heading"><span class="lab-tag">EXPERIÊNCIA INTERATIVA</span><h2>O que te faz parar nesta mensagem?</h2><p>Marca os três elementos suspeitos no telemóvel. É uma simulação: nenhum endereço é uma ligação real.</p></div><div class="phone-lab"><div class="simulated-phone"><div class="device-top"><span>9:41</span><span>•••</span></div><p class="sender">BANCO EXEMPLO <small>Mensagem fictícia</small></p><div class="sms-bubble"><button class="message-mark" data-mark="urgencia" aria-pressed="false">A tua conta será bloqueada em 10 minutos.</button><button class="message-mark" data-mark="codigo" aria-pressed="false">Envia-nos o teu código de autenticação.</button><button class="message-mark" data-mark="link" aria-pressed="false">banco-verificar.invalid/confirmar</button></div><span class="device-bottom"></span></div><div class="lab-notebook"><h3>O teu radar</h3><p>Não precisas de responder depressa. Procura pressão, pedidos de segredos e endereços que precisam de confirmação.</p><output id="signal-count">0 de 3 sinais identificados</output><div class="signal-list"></div></div></div><p class="lab-feedback" role="status"></p>${hint}`;
      const labels = {
        urgencia: "Pressão para agir depressa",
        codigo: "Pedido de um código privado",
        link: "Endereço a confirmar por um canal independente",
      };
      container.querySelectorAll("[data-mark]").forEach(
        (b) =>
          (b.onclick = () => {
            const k = b.dataset.mark;
            selected.has(k) ? selected.delete(k) : selected.add(k);
            b.setAttribute("aria-pressed", String(selected.has(k)));
            container.querySelector("#signal-count").textContent =
              selected.size + " de 3 sinais identificados";
            container.querySelector(".signal-list").replaceChildren(
              ...[...selected].map((k) => {
                const p = document.createElement("p");
                p.textContent = "✓ " + labels[k];
                return p;
              }),
            );
            result(
              selected.size === 3
                ? "✓ Identificaste os três sinais. Abre o serviço por um canal oficial conhecido, sem seguir esta mensagem."
                : labels[k] + ". Continua a observar a mensagem.",
            );
          }),
      );
    } else if (area.id === "mediatica") {
      const selected = new Set();
      container.innerHTML = `<div class="lab-heading"><span class="lab-tag">EXPERIÊNCIA INTERATIVA</span><h2>Abre a notícia por dentro.</h2><p>Encontra autor, data, fonte original e evidência. O texto é inteiramente fictício.</p></div><article class="news-lab"><div class="news-masthead">O JORNAL DO EXEMPLO <span>SIMULAÇÃO</span></div><h3>Biblioteca do bairro testa novo horário</h3><div class="news-byline"><button data-news="autor" aria-pressed="false">Por Ana Exemplo</button><button data-news="data" aria-pressed="false">Publicado em 12 de setembro de 2026</button></div><p>A biblioteca vai experimentar abrir mais tarde durante um mês.</p><button class="news-highlight" data-news="fonte" aria-pressed="false">Fonte: comunicado original da biblioteca, identificado no artigo.</button><button class="news-highlight" data-news="evidencia" aria-pressed="false">Evidência: registos de utilização, com período e método de recolha descritos.</button><p class="small">A existência de uma fonte não basta: é preciso abrir, ler e perceber se sustenta a afirmação.</p></article><output id="news-count">0 de 4 elementos encontrados</output><p class="lab-feedback" role="status"></p>${hint}`;
      const explanations = {
        autor: "O autor permite saber quem assina a peça.",
        data: "A data ajuda a interpretar a atualidade e o contexto.",
        fonte: "Procura e consulta o documento original.",
        evidencia:
          "Pergunta como os dados foram obtidos e o que permitem concluir.",
      };
      container.querySelectorAll("[data-news]").forEach(
        (b) =>
          (b.onclick = () => {
            const k = b.dataset.news;
            selected.has(k) ? selected.delete(k) : selected.add(k);
            b.setAttribute("aria-pressed", String(selected.has(k)));
            container.querySelector("#news-count").textContent =
              selected.size + " de 4 elementos encontrados";
            result(
              selected.size === 4
                ? "✓ Encontraste os quatro elementos. Agora seria necessário confirmar a fonte e avaliar a evidência."
                : explanations[k],
            );
          }),
      );
    } else if (area.id === "seguranca") {
      container.innerHTML = `<div class="lab-heading"><span class="lab-tag">EXPERIÊNCIA INTERATIVA</span><h2>Escolhe o caminho com apoio.</h2><p>Cenário fictício: sentes-te desconfortável numa praça. Um balcão de apoio público está aberto e visível. Qual opção reduz a exposição?</p></div><div class="route-scene"><svg viewBox="0 0 660 280" role="img" aria-label="Mapa fictício: estás à esquerda. A rota A segue até um balcão de apoio aberto. A rota B entra num atalho isolado. A rota C volta ao conflito."><rect x="8" y="8" width="644" height="264" rx="20" fill="#F1F5F9"/><path class="route-path route-a" d="M90 150 Q210 60 450 75"/><path class="route-path route-b" d="M90 150 Q270 260 480 220"/><path class="route-path route-c" d="M90 150 H280"/><circle cx="90" cy="150" r="22" fill="#334BA8"/><text x="90" y="156" text-anchor="middle" fill="white">Tu</text><rect x="410" y="35" width="220" height="80" rx="14" fill="#DCFCE7" stroke="#15803D"/><text x="520" y="66" text-anchor="middle">A · Apoio aberto</text><text x="520" y="91" text-anchor="middle">Pessoas e saída</text><rect x="420" y="188" width="210" height="63" rx="14" fill="#E2E8F0"/><text x="525" y="224" text-anchor="middle">B · Atalho isolado</text><rect x="240" y="124" width="170" height="50" rx="12" fill="#FEE2E2"/><text x="325" y="155" text-anchor="middle">C · Confronto</text></svg></div><div class="route-choices"><button data-route="a" class="button secondary" aria-pressed="false">A · Procurar apoio</button><button data-route="b" class="button secondary" aria-pressed="false">B · Ir para o atalho</button><button data-route="c" class="button secondary" aria-pressed="false">C · Voltar ao confronto</button></div><p class="lab-feedback" role="status"></p>${hint}`;
      container.querySelectorAll("[data-route]").forEach(
        (b) =>
          (b.onclick = () => {
            container
              .querySelectorAll("[data-route]")
              .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
            container
              .querySelectorAll(".route-path")
              .forEach((p) =>
                p.classList.toggle(
                  "selected",
                  p.classList.contains("route-" + b.dataset.route),
                ),
              );
            result(
              b.dataset.route === "a"
                ? "✓ Neste cenário, afastar-te para o local com apoio é a opção prudente. Perante perigo imediato, procura segurança e contacta o 112."
                : b.dataset.route === "b"
                  ? "O atalho está isolado neste cenário. Procura uma opção com saída e apoio visível."
                  : "Voltar ao confronto aumenta a exposição. Prioriza distância, saída e ajuda.",
            );
          }),
      );
    } else {
      container.remove();
      return;
    }
    container.classList.add("interactive-lab");
  }
  window.Experiences = { mount };
})();
