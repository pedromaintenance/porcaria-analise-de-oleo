# P.O.R.C.A.R.I.A. — ANÁLISE DE ÓLEO

**Versão:** 2.0.0 · **Tipo:** Progressive Web App, instalável e executável offline · **Idiomas:** português (Brasil)

> Jogo educacional de manutenção, análise de fluidos, tribologia e gestão de decisões técnicas. Não substitui o procedimento do fabricante, laudo laboratorial, análise de segurança ou autorização operacional.

## 1. O que há nesta edição

- 72 missões com início, triagem, coleta de evidências, hipóteses, escolha de intervenção e relatório final;
- 24 mecanismos temáticos, trabalhados em três variações (inspeção inicial, comparação de tendência e retorno de campo), organizados em 8 campanhas;
- 17 manuais didáticos próprios, dos quais 2 começam disponíveis sem compra;
- loja com 7 ferramentas reutilizáveis, 13 itens ou conjuntos substituíveis e análises adicionais de fluido;
- créditos fictícios, ganhos por preservação fundamentada, perdas por condenação indevida, controle logístico de peças e histórico financeiro;
- 7 missões com **substituição localizada corretamente indicada**, pois o retorno de inspeção simulado confirma dano; a troca arbitrária do conjunto completo continua incorreta;
- desbloqueio gradual de campanhas, conquistas, sequência de acertos, perfil técnico, armazenamento local e importação/exportação JSON;
- Modo Instrutor: todos os manuais e missões abertos, **sempre acompanhado de reset**, com modal alertando e pedindo exportação de save antes de confirmação explícita.

## 2. Jogabilidade

1. Abra `Missões` e selecione uma ocorrência.
2. Faça a triagem de segurança e operação.
3. Consulte histórico, inspeção, teste com ferramenta e/ou análise extra de fluido. Nada exige aquisição para chegar à resposta, mas evidência melhora qualidade e recompensa.
4. Selecione a hipótese mais defensável — inclusive quando a causa raiz permanece inconclusiva.
5. Escolha a ação técnica e verifique resultado, custo fictício, evidência e riscos.
6. Gaste créditos em conhecimento, ferramentas e kits para missões posteriores.

**Regra central:** dano possível não é dano confirmado; substituir à revelia da evidência gera penalidade. Se há dano confirmado por inspeção, substituir o item certo pode ser a decisão correta.

### Créditos e estoque

O jogador começa com 1.200 Cr$, 1 análise adicional de fluido e 2 manuais gratuitos. Inspeções e análises podem gastar créditos e suprimentos. Decisões corretas são recompensadas conforme a qualidade da evidência; decisões de substituição integral prematura, negligência ou intervenção incoerente causam perdas de créditos. O jogador pode ficar em saldo negativo depois de uma falha grave, mas continua jogando para recuperar. Os números são **ficcionais**, não se baseiam em preços, custos reais de mineração ou estimativas de probabilidade de falha.

Ferramentas são reutilizáveis. Kits e componentes são consumíveis em reparos ou substituições direcionadas (quando indicados). Em missões que exigiriam componente não disponível, o jogo mantém a intervenção em planejamento e aplica custo logístico fictício.

### Modo Instrutor

Acesse `Configurações` → `Ativar Modo Instrutor`. Aparece um aviso de perda integral de progresso, opção **Exportar meu save JSON** e caixa de confirmação. Só depois de aceitar é possível ativar. Ativar ou desativar cria um save novo, com saldo, instrumentos e resultados reiniciados. **Exportar não apaga dados**. O download deve ser confirmado na pasta de downloads pelo usuário. Para recuperar o save anterior, use `Importar JSON`.

## 3. Publicação e instalação (GitHub Pages)

1. Crie um repositório (público, se for publicar no GitHub Pages público).
2. Extraia o ZIP e envie para a raiz do repositório **todos** os arquivos deste pacote, preservando `css`, `js` e `icons`.
3. No GitHub, acesse **Settings → Pages**.
4. Em Build and deployment, escolha **Deploy from a branch**, `main`, pasta `/(root)`.
5. Abra o endereço HTTPS fornecido pelo GitHub e aguarde todos os arquivos carregarem.
6. No Android/Chrome, selecione **Instalar app** ou **Adicionar à tela inicial**. Em navegadores iOS compatíveis, use **Compartilhar → Adicionar à Tela de Início**.
7. Depois do primeiro carregamento conectado, entre em modo avião e abra novamente: o service worker mantém os arquivos essenciais locais.

**Atenção:** abrir `index.html` por `file://` pode permitir jogar, mas não instala o service worker. A instalação requer HTTPS ou ambiente local seguro. O save usa `localStorage` por origem do navegador; trocar domínio/navegador ou limpar dados do site pode eliminá-lo. Exporte o JSON periodicamente.

## 4. Origem do conteúdo, anonimização e limitações

Foram avaliados três tipos de referência:

- uma carteira com 1.656 resultados de análise de fluidos;
- 67 registros de amostras em uma exportação de telemetria/laboratório;
- um histórico de 49.233 ordens de serviço;
- procedimentos de manutenção, arrefecimento, rodas e comandos finais, além de documentação de análise de fluidos.

**Não foram carregados no aplicativo os dados brutos dessas fontes.** O código inclui **apenas cenários autorais adaptados por categoria, modelo genérico, compartimento e indício técnico**, sem tags, número de série, número da OS, número de laudo, colaboradores, datas ou textos originais dos registros. Os gabaritos são didáticos, não conclusões sobre uma máquina real. A associação com as ordens históricas foi temática; não foi presumida uma vinculação causal entre registros que não pôde ser confirmada pelos campos fornecidos.

A exportação de análise disponível traz principalmente interpretação textual, e não uma série quantitativa completa em ppm para todos os compartimentos. Por isso, o pequeno gráfico de tendência do jogo é um **índice fictício, explicitamente sinalizado**, e não a reprodução de uma medição real.

**Manuais:** os 17 textos da biblioteca são sínteses educacionais originais. PDFs e figuras técnicas comerciais não são distribuídos com o aplicativo. Referências orientadoras incluem temas como inspeção de roda dianteira, coleta, condições do óleo, sistemas de arrefecimento e depleção de nitrito em ELC com radiador de alumínio; consulte a documentação completa e atualizada antes de qualquer atividade real.

## 5. Arquivos principais

- `index.html`: tela inicial HTML, carregamento do aplicativo;
- `css/style.css`: interface responsiva e estilo mobile-first;
- `js/cases.js`: 72 casos de treinamento anonimizados;
- `js/library.js`: manuais didáticos, ferramentas e materiais da loja;
- `js/app.js`: navegação, pontuação, loja, salvamento, modo instrutor;
- `manifest.webmanifest`: metadados de instalação;
- `service-worker.js`: cache offline;
- `icons/`: ícones próprios;
- `tests/smoke.cjs`: testes locais de lógica, economia, segurança e modo instrutor.

Para rodar testes de lógica, execute `node tests/smoke.cjs` (Node.js 18+). Não é necessário Node.js nem Python para jogar.

## 6. Restrições relevantes

- Este jogo é uma **simulação educativa**, não procedimento de trabalho.
- Os limites técnicos, torques, volumes, sequências de montagem e aplicação de lubrificantes variam por equipamento, configuração e revisão OEM; não estão inventados nos casos.
- O gabarito não confirma por si só a causa raiz de registros históricos e não autoriza retorno de equipamento à produção.
- O aplicativo não faz login, não usa Google Analytics, não envia dados nem faz requisições de dados externos; armazenamento é local.
- Antes de publicar, faça um teste de instalação/offline em dispositivo real e revise manualmente casos de maior risco com especialistas.
