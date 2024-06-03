# Desafio NodeJS

Neste repositório você irá encontrar um pequeno projeto de registro de horas trabalhadas realizado em NodeJS como parte dos exercícios opcionais da Pós-Graduação FIAP em Full-stack.

## Proposta

Uma empresa de tecnologia deseja implementar um sistema de gestão de horas trabalhads para poder monitorar de uma maneira mais eficiente as atividades do home-office.

## Requisitos de Implementação

-   Utilizar Node.js com o framework Express
-   Seguir o padrão arquitetural Model-View-Controller
-   Utilizar um banco de dados relacional (como o SQLite ou MySQL).
-   O front-end pode ser implementado utilizando EJS (Embedded JavaScript) para renderização de templates.
-   Utilizar CSS básico para estilização das páginas.

## Requisitos Técnicos

### 1. Gestão de Usuários

-   CRUD (Create, Read, Update, Delete) para usuários.
-   Cada usuário deve ter um perfil com informações básicas (nome e e-mail).

### 2. Registro de Horas Trabalhadas

-   Permitir que os usuários registrem suas horas trabalhadas diariamente.
-   Cada registro deve conter data, hora de início e hora de término.

### 3. Visualização de Registros

-   Permitir que os usuários visualizem seus registros de horas trabalhadas em uma lista.

## Implementação

-   O sistema foi implementado em NodeJS.
-   Frontend e backend desenvolvido utilizando ExpressJs. Os templates de frontend utilizam EJS.
-   Banco de dados SQLite.

## Screenshots

As telas abaixo são auto-explicativas:

<img src="screenshots/loginScreen.png" alt="Tela de Login" width="300"/>

<img src="screenshots/homeScreen.png" alt="Tela de Login" width="300"/>

<img src="screenshots/userChange.png" alt="Tela de Login" width="300"/>

<img src="screenshots/newTime.png" alt="Tela de Login" width="300"/>

<img src="screenshots/timeList.png" alt="Tela de Login" width="300"/>

## O que aprendi nesse projeto?

-   Este foi o meu primeiro projeto significativo utilizando NodeJS e ExpressJS, então entender como a arquitetura MVC funciona com essa stack foi bem interessante.
-   Também aprendi a implementar JWT Authentication em Express para manter o usuário logado nas diversas telas.
-   Foi também minha primeira vez utilizando [Sequelize](https://sequelize.org/) como biblioteca ORM. É incrivelmente fácil de usar e com uma documentação excelente.
