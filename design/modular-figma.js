const created = [], mutated = [];
const track = n => {created.push(n.id); return n;};
await figma.loadFontAsync({family:'IBM Plex Sans',style:'Regular'});
await figma.loadFontAsync({family:'IBM Plex Mono',style:'Regular'});
await figma.loadFontAsync({family:'Fraunces',style:'SemiBold'});
const navComponent = await figma.getNodeByIdAsync('3:3');
const buttonComponent = await figma.getNodeByIdAsync('3:5');
const paper = await figma.variables.getVariableByIdAsync('VariableID:2:5');
const ink = await figma.variables.getVariableByIdAsync('VariableID:2:7');
const leaf = await figma.variables.getVariableByIdAsync('VariableID:2:13');
const page = track(figma.createPage()); page.name = '02 · Plataforma modular';
await figma.setCurrentPageAsync(page);
const paint = variable => figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:1,g:1,b:1}},'color',variable);
function frame(name,w,parent,pad=0){
 const f=track(figma.createAutoLayout('VERTICAL')); f.name=name;f.resize(w,100);f.paddingTop=f.paddingBottom=f.paddingLeft=f.paddingRight=pad;f.itemSpacing=24;f.fills=[];parent.appendChild(f);f.layoutSizingVertical='HUG';return f;
}
function text(parent,content,size=18,heading=false){
 const t=track(figma.createText());t.fontName={family:heading?'Fraunces':'IBM Plex Sans',style:heading?'SemiBold':'Regular'};t.fontSize=size;t.characters=content;t.fills=[paint(ink)];parent.appendChild(t);t.resize(parent.width-parent.paddingLeft-parent.paddingRight,30);t.textAutoResize='HEIGHT';return t;
}
function action(parent,label){
 const n=track(buttonComponent.createInstance());parent.appendChild(n);const t=n.findAllWithCriteria({types:['TEXT']})[0];t.characters=label;mutated.push(t.id);n.resize(Math.max(180,label.length*9),52);return n;
}
function rule(parent){const n=track(figma.createRectangle());n.resize(parent.width-parent.paddingLeft-parent.paddingRight,1);n.fills=[paint(ink)];n.opacity=.18;parent.appendChild(n);return n;}
function row(parent,title,detail,symbol='○') {const f=frame(title,parent.width-parent.paddingLeft-parent.paddingRight,parent,20);f.itemSpacing=10;f.fills=[paint(paper)];rule(f);text(f,symbol+'  '+title,26,true);text(f,detail,16);return f;}
function board(name,index,width=1000){const f=frame(name,width,page,48);f.x=200+(index%3)*1120;f.y=200+Math.floor(index/3)*1500;f.fills=[paint(paper)];text(f,'A LITERACIA  /  '+name.toUpperCase(),12);return f;}
const boards=[];
let b=board('Área · Financeira',0);boards.push(b);
text(b,'Cada escolha conta.',58,true);text(b,'Perceber dinheiro antes de decidir o que fazer com ele.');
const art=track(figma.createNodeFromSvg(SCENE));b.appendChild(art);art.resize(560,330);art.findAll().forEach(n=>created.push(n.id));
action(b,'Começar percurso →');rule(b);text(b,'O teu mapa de aprendizagem',34,true);
row(b,'Fundamentos','01 · O dinheiro entra ou sai?\n02 · Planear um orçamento','◇');
row(b,'Uma decisão de cada vez','Escolhe qualquer lição. O desafio final fica disponível quando terminares o percurso.','↗');

b=board('Percurso de aprendizagem',1);boards.push(b);text(b,'Um passo. Uma descoberta.',48,true);
text(b,'Financeira / Fundamentos · 1 de 4 lições concluídas');
for(const [title,detail,symbol] of [['O dinheiro entra ou sai?','Concluída · 20 XP','✓'],['Planear um orçamento','Em curso · continuar a aprender','◉'],['Poupar com um objetivo','Disponível · 3 minutos','○'],['Rever e consolidar','Dominado · sem repetir XP','◆'],['Desafio final','Bloqueado · conclui as lições para abrir','⌑']]) row(b,title,detail,symbol);
action(b,'Continuar percurso →');

b=board('Lição',2);boards.push(b);text(b,'O dinheiro entra\nou sai?',58,true);text(b,'FINANCEIRA  /  3 MINUTOS  /  20 XP',13);rule(b);
text(b,'A ideia em poucas palavras',30,true);text(b,'Receita é dinheiro que entra; despesa é dinheiro que sai.');
text(b,'Olha para o mesmo período',30,true);text(b,'Um orçamento regista ambos no mesmo período. O saldo é a diferença entre receitas e despesas. Separar os movimentos ajuda a compreender as escolhas.');
row(b,'Experimenta no teu dia','Pensa em três movimentos: um rendimento, uma compra e uma poupança. Identifica o que entra e o que sai.','✎');
action(b,'Experimentar o quiz →');text(b,'Fontes e aprofundamento ↓',16);

b=board('Quiz · feedback',3);boards.push(b);text(b,'Põe a ideia à prova.',48,true);text(b,'Qual destes movimentos é uma receita?');
row(b,'A · Comprar um livro','Ainda não. Uma compra é dinheiro que sai. Tenta novamente.','↻');
const correct=row(b,'B · Receber um salário','Boa. O salário é dinheiro que entra. +10 XP.','✓');correct.fills=[paint(leaf)];
row(b,'C · Pagar uma conta','Uma despesa reduz o saldo disponível.','○');action(b,'Concluir lição →');

b=board('Missão',4);boards.push(b);text(b,'Dá um destino\na cada euro.',52,true);text(b,'LABORATÓRIO FINANCEIRO  /  +25 XP',13);text(b,'Distribui um orçamento de 100 €. Experimentar ajuda-te a perceber as escolhas.');
for(const [a,c] of [['Necessidades','50 €'],['Objetivos','30 €'],['Lazer','20 €']])row(b,a,c+'     −     +','◇');
action(b,'Testar a minha decisão →');

b=board('Progresso',5);boards.push(b);text(b,'O que já levas contigo.',52,true);text(b,'Cada pequena descoberta faz parte do teu caminho.');
text(b,'Nível 2 · A ganhar confiança',30,true);rule(b);text(b,'120 XP  /  4 de 60 lições concluídas',18);
row(b,'Financeira','4 de 4 lições · percurso concluído','✓');row(b,'Digital','A próxima descoberta está à tua espera.','○');action(b,'Continuar a aprender →');

b=board('Conquistas',6);boards.push(b);text(b,'Pequenos marcos.\nNovas possibilidades.',48,true);text(b,'O conhecimento que ganhaste vai contigo.');
row(b,'Primeiro Passo','Concluíste a tua primeira lição.','★');row(b,'Radar Digital','Conclui a lição sobre phishing.','⌑');row(b,'Explorador','Continua a descobrir outras literacias.','◇');action(b,'Explorar mundos →');

b=board('Pesquisa',7);boards.push(b);text(b,'Segue a tua curiosidade.',48,true);row(b,'⌕  orçamento','Pesquisar literacias e lições');text(b,'Resultados para “orçamento”',26,true);row(b,'Planear um orçamento','Financeira · Fundamentos · 3 minutos','↗');row(b,'O dinheiro entra ou sai?','Receita, despesa e escolhas do dia a dia.','↗');action(b,'Abrir lição →');

b=board('Fontes',8);boards.push(b);text(b,'Aprender.\nVerificar. Aprofundar.',52,true);text(b,'As referências acompanham cada lição e cada área.');rule(b);text(b,'Fontes principais',32,true);row(b,'Todos Contam','Portal de formação financeira · todoscontam.pt','↗');row(b,'Banco de Portugal','Informação e ferramentas para clientes bancários.','↗');text(b,'Referências complementares',26,true);text(b,'Consulta os materiais originais para aprofundar os conceitos e verificar informação atualizada.');

const opened=board('Sidebar · aberto',9);boards.push(opened);text(opened,'Aprender com espaço.',48,true);const menu=frame('Menu lateral',216,opened,16);menu.itemSpacing=8;
for(const label of ['Início','Missões','Progresso','Conquistas','Favoritos','Definições']){const inst=track(navComponent.createInstance());menu.appendChild(inst);const t=inst.findAllWithCriteria({types:['TEXT']})[0];t.characters=label;mutated.push(t.id);}
const close=action(opened,'Recolher menu ←');text(opened,'Scroll descendente: recolher. Scroll ascendente: revelar. Fixar mantém o menu visível.',16);
const closed=board('Sidebar · recolhido e oculto',10);boards.push(closed);text(closed,'O foco fica na leitura.',48,true);text(closed,'⌂      ◎      ↗      ★      ♡',28);const open=action(closed,'Mostrar menu →');rule(closed);text(closed,'O dinheiro entra ou sai?',40,true);text(closed,'O menu oculto disponibiliza um botão de revelação acessível por teclado. Em telemóvel, a navegação abre numa gaveta.');
await close.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:closed.id,navigation:'NAVIGATE',transition:null,preserveScrollPosition:false}]}]);
await open.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:opened.id,navigation:'NAVIGATE',transition:null,preserveScrollPosition:false}]}]);
return {createdNodeIds:created,mutatedNodeIds:mutated,pageId:page.id,boards:boards.map(n=>({id:n.id,name:n.name,width:n.width,height:n.height})),note:'11 vistas interiores; homepage desktop e mobile mantidas na página 1. Dados de progresso são exemplos de design.'};
