# GaleraDoVolei API

## 1\. Descrição

Este projeto é uma API RESTful desenvolvida em Node.js e TypeScript, utilizando o framework Express. A API é projetada para gerenciar entidades relacionadas a partidas de vôlei, incluindo jogadores, partidas, arenas e o registro de jogadores em partidas.

A arquitetura do projeto é inspirada na Arquitetura Limpa (Clean Architecture), separando as responsabilidades em:

* **Presentation (Apresentação):** Controladores (Controllers) e Rotas (Routes).
* **Application (Aplicação):** Casos de Uso (Use Cases).
* **Infrastructure (Infraestrutura):** Repositórios de dados.
* **Domain (Domínio):** (Implícito nos imports, ex: `Player`, `Match`).

Atualmente, o projeto utiliza repositórios em memória (`InMemory...Repository`), o que significa que os dados **não são persistentes** e serão perdidos sempre que o servidor for reiniciado.

## 2\. Funcionalidades Principais

A API oferece operações CRUD (Criar, Ler, Atualizar, Deletar) para as seguintes entidades:

* **Jogadores (Players)**
* **Partidas (Matches)**
* **Arenas (Arenas)**

Além disso, possui funcionalidades específicas para:

* **Inscrições (Registrations):**
  * Registrar um jogador em uma partida (`RegisterPlayerForMatch`).
  * Cancelar a inscrição de um jogador em uma partida (`CancelRegistration`).

## 3\. Tecnologias Utilizadas

* **Node.js**
* **TypeScript**
* **Express.js**
* **CORS**
* **UUID** (para geração de IDs)
