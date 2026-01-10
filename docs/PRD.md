

# PRD FINAL — **Idol’s Drill**

## 1) Visão Geral do Produto

### 1.1 O que é

**Idol’s Drill** é um webapp **mobile-first** que conduz o usuário por um exercício curto, intenso e reflexivo para identificar seu **Ídolo Mestre** entre quatro categorias fundamentais: **Dinheiro, Poder, Prazer e Fama**.

A experiência ocorre por meio de uma **conversa com um assistente de IA**, em formato de chat, que atua como **advogado do diabo**: desafia escolhas, recontextualiza significados e força clareza, reduzindo autoengano.

A duração-alvo de uma sessão é **~5 minutos**.

---

### 1.2 Problema que resolve

Durante decisões introspectivas comparativas, usuários perdem contexto, esquecem definições e racionalizam escolhas.
O produto resolve isso ao:

* Manter o **chat como eixo central**.
* Disponibilizar um **modo de consulta visual dos 4 ídolos**, acessível a qualquer momento.
* Introduzir um **sinal explícito de resistência** (slider 1–5) para calibrar o rigor do assistente.
* Permitir **recuos conscientes**, sem punição, mas sem atalhos.

---

## 2) Contexto Teórico (Aquino → Modernização)

### 2.1 Origem

O exercício se inspira na tradição filosófica associada a **São Tomás de Aquino**, segundo a qual a infelicidade humana surge quando se tenta preencher um desejo infinito (plenitude, sentido, felicidade última) com bens finitos.

Esses bens finitos recorrentes são organizados aqui como **quatro ídolos**.

---

### 2.2 Os Quatro Ídolos (definições modernas)

* **Dinheiro**: segurança absoluta, status material, acumulação, medo da perda.
* **Poder**: controle, autoridade, influência, aversão a subordinação.
* **Prazer**: conforto, dopamina, experiências, fuga da dor e do esforço.
* **Fama**: reconhecimento, reputação, validação social, medo da irrelevância.

O app apresenta essas definições de forma **curta, prática e contemporânea**, sem linguagem arcaica.

---

## 3) Público e Escopo do MVP

### 3.1 Público

Qualquer pessoa.

### 3.2 Escopo do MVP

* **Sem login**
* **Sem histórico persistente entre sessões**
* **Sem compartilhamento**
* **Sem exportação**

Cada sessão é **autônoma**. Ao finalizar, o resultado é exibido, mas não armazenado como histórico navegável.

---

## 4) Idiomas e Tom

### 4.1 Idiomas suportados

O produto suporta os seguintes idiomas:

1. Português (PT-BR)
2. Inglês (EN-US)
3. Espanhol (ES)
4. Francês (FR)
5. Mandarim (ZH-CN, simplificado)
6. Coreano (KO)
7. Hindi (HI)

O idioma é selecionável pelo usuário.

---

### 4.2 Tom do assistente

O usuário escolhe um tom no início da sessão.
O tom **persiste entre sessões**.

Tons disponíveis:

* Neutro
* Suave
* Duro
* Provocativo
* Formal

O assistente deve ser **friendly**, mas **não usar gírias**.
Pode usar analogias variadas (pessoais, corporativas, sociais).

---

## 5) Estrutura de Páginas (MVP)

### 5.1 Home / Intro

Objetivo: explicar o método e iniciar rápido.

Conteúdo:

* Explicação curta do exercício e sua origem.
* Apresentação dos quatro ídolos (1 frase cada).
* Imagem ilustrativa simples.
* Botão “Começar”.

---

### 5.2 Chat (Core)

Objetivo: conduzir todo o exercício.

Elementos:

* Área principal de chat (histórico da conversa).
* Campo de input do usuário.
* **Bottom toggle fixo** com dois modos:

  * **Conversa**
  * **Ídolos**

---

### 5.3 Resultado (Página dedicada)

Gerada **automaticamente** ao final do exercício.

Conteúdo:

* Ídolo Mestre identificado.
* Resumo narrativo do perfil.
* Registro da jornada (ordem de eliminações e resistências).
* Insights menos óbvios.
* Possível quinto eixo (como hipótese).
* Recomendações práticas de hábitos.
* Botão “Nova sessão”.

---

## 6) Modo Ídolos (Decisão Fechada)

* **Read-only**
* Pode ser aberto **a qualquer momento**
* **Chat pausa logicamente**:

  * nenhuma mensagem é gerada,
  * nenhum estado avança,
  * nenhum slider dispara.
* Ao retornar para “Conversa”, tudo continua exatamente de onde parou.

Conteúdo exibido:

* Os quatro ídolos.
* Definição curta de cada um.
* Estado visual:

  * ativo (em discussão),
  * eliminado,
  * pendente.

---

## 7) Fluxo do Exercício (Regras de Produto)

### 7.1 Loop principal

1. O assistente apresenta os quatro ídolos.
2. O usuário tenta eliminar um ídolo.
3. O assistente **obrigatoriamente desafia** (advogado do diabo).
4. O usuário confirma ou recua.
5. **No momento da eliminação**, aparece o slider 1–5.
6. O assistente ajusta o rigor final e confirma a eliminação.
7. Repete até restar um ídolo.
8. Resultado é gerado automaticamente.

---

### 7.2 Slider de resistência (regra fechada)

* Escala: **1 (fácil) → 5 (muito difícil)**
* **Obrigatório**
* Aparece **somente no momento da eliminação**
* **Apenas uma vez por ídolo**
* Se o usuário fechar o app, o slider reaparece ao retornar.

Uso do slider:

* **1–2 (fácil)**: o assistente faz **mais uma e última provocação forte**.
* **3 (médio)**: faz **um último questionamento, mais suave**.
* **4–5 (difícil)**: o assistente **valida e confirma**, sem pressionar mais.

---

### 7.3 Ritmo e aceleração

* Respostas do assistente: **médias por padrão**.
* Máximo implícito: **2 interações por ídolo**.
* Na segunda rodada sobre o mesmo ídolo, o assistente deve **forçar uma decisão** (confirmar ou recuar).

---

## 8) Regras do Assistente (Produto)

* Nunca aceitar eliminação sem desafiar.
* Evitar prompt injection explicitamente.
* Se o usuário pedir “resuma os 4 ídolos”:

  * responder **de forma ultra sucinta**,
  * mencionar que há mais detalhes na aba Ídolos.
* Pode usar exemplos pessoais e analogias diversas.
* Não usar gírias.
* Se o usuário pedir para parar:

  * agradecer,
  * encerrar a sessão.
* Se o usuário tentar eliminar o último ídolo:

  * bloquear,
  * explicar que todos os outros já foram eliminados,
  * mostrar **um bullet por ídolo eliminado com o porquê**,
  * forçar a escolha de um ídolo final.
* Não existe botão explícito de “reiniciar”.

  * Se o usuário pedir no chat, o exercício recomeça do zero.

---

## 9) Dados e Persistência (MVP)

* **Sem login**
* **Sem histórico**
* Estado da sessão existe apenas durante a execução atual.
* Ao finalizar, o resultado é exibido, mas não armazenado como histórico navegável.

---

## 10) Critérios de Aceite (Definition of Done)

O MVP está pronto quando:

* O usuário completa o exercício em ~5 minutos.
* O assistente desafia todas as eliminações.
* O slider aparece corretamente e influencia o rigor final.
* O modo Ídolos pode ser acessado a qualquer momento sem quebrar o fluxo.
* O resultado final é gerado automaticamente e faz sentido com a jornada.
* O usuário consegue interromper e encerrar sem erros de estado.

---

## 11) Fora de Escopo (MVP)

* Login e autenticação
* Histórico entre sessões
* Compartilhamento social
* Exportação
* Gamificação avançada
* Analytics

