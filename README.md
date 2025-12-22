# 🚗 Bill Parking - Sistema Inteligente de Gestão de Estacionamentos

> **"Eficiência, segurança e controle total para o seu estacionamento."**

Bem-vindo ao **Bill Parking**, uma solução Full-Stack robusta e moderna projetada para transformar a administração de estacionamentos. Combinando o poder do Java Spring Boot no backend com a interatividade do Angular no frontend, este sistema oferece uma experiência completa para gestores e operadores.

---

## 🌟 Destaques do Projeto

* **🖥️ Frontend Moderno**: Interface reativa e elegante construída com **Angular 21** e estilizada com **TailwindCSS**.
* **🔙 Backend Poderoso**: API RESTful segura e escalável com **Spring Boot 3.5.8** e **Java 21**.
* **💾 Dados Flexíveis**: Persistência ágil com **MongoDB**, ideal para logs de alto volume e estruturas de dados dinâmicas.
* **🔐 Segurança Avançada**: Autenticação robusta via **JWT (JSON Web Tokens)** e OAuth2.
* **📊 Relatórios Inteligentes**: Insights detalhados com relatórios diários e mensais.

---

## 🛠️ Tech Stack

### Backend

| Tecnologia | Descrição |
| :--- | :--- |
| ![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat&logo=openjdk&logoColor=white) | Linguagem base, versão LTS moderna. |
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.8-6DB33F?style=flat&logo=spring-boot&logoColor=white) | Framework principal para APIs e Injeção de Dependência. |
| ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat&logo=mongodb&logoColor=white) | Banco de dados NoSQL orientado a documentos. |
| ![Spring Security](https://img.shields.io/badge/Safe-Security-6DB33F?style=flat&logo=spring-security&logoColor=white) | Gestão de autenticação e autorização. |
| ![Swagger](https://img.shields.io/badge/API-Swagger-85EA2D?style=flat&logo=swagger&logoColor=black) | Documentação interativa da API. |

### Frontend

| Tecnologia | Descrição |
| :--- | :--- |
| ![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat&logo=angular&logoColor=white) | Framework SPA para interfaces dinâmicas. |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Framework CSS utilitário para design rápido e responsivo. |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white) | Superset JavaScript tipado. |

---

## 🚀 Funcionalidades

O sistema abrange todo o ciclo operacional de um estacionamento:

### 🎮 Painel de Controle (Dashboard)

Visão geral do sistema com métricas chave e status atual.

### 🅿️ Operações de Pátio

* **Registro de Entrada**: Cadastro rápido de veículos chegando.
* **Sessões Ativas**: Monitoramento em tempo real de quem está estacionado.
* **Saída e Pagamento**: Cálculo automático de tarifas e processamento de pagamentos na saída.

### 📋 Gestão de Cadastros (CRUDs)

* **Clientes**: Base de dados de clientes recorrentes.
* **Veículos**: Associação de veículos a clientes.
* **Vagas (`ParkingSpots`)**: Mapeamento e status das vagas físicas.
* **Operadores**: Gestão de funcionários e permissões.

### 💸 Financeiro e Configurações

* **Tarifas (`Tariffs`)**: Configuração flexível de preços (hora, diária, mensal).
* **Reservas**: Agendamento antecipado de vagas.
* **Pagamentos**: Histórico completo de transações.

### 📈 Relatórios

* **Relatório Diário**: Fechamento de caixa e movimento do dia.
* **Relatório Mensal**: Análise macro de desempenho.

---

## 🏁 Como Executar

Siga os passos abaixo para rodar o projeto completo em sua máquina.

### Pré-requisitos

* Java 21 JDK
* Node.js (v18+) e NPM
* MongoDB (Rodando na porta padrão 27017)
* Maven

### 1. Backend (API)

```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências e rode o projeto
mvn spring-boot:run
```

*A API estará disponível em `http://localhost:8080`*
*Documentação Swagger: `http://localhost:8080/swagger-ui.html`*

### 2. Frontend (Aplicação Web)

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
# ou
ng serve
```

*A aplicação abrirá em `http://localhost:4200`*

---

## 🔒 Acesso Padrão

Caso haja usuários pré-configurados (Seed), utilize:

* **Admin**: `admin@parking.com` / `admin123` (Exemplo)

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

Feito com ☕ e código por **Antonio**.
