# RELATÓRIO DE IMPLEMENTAÇÃO DE SERVIÇOS AWS

Data: 16/01/2026
Empresa: Bill Parking
Responsável: Antonio Carioca Junior

## Introdução

Este relatório apresenta o processo de implementação de ferramentas na empresa Bill Parking, realizado por Antonio Carioca Junior. O objetivo do projeto foi elencar 3 serviços AWS, com a finalidade de realizar diminuição de custos imediatos.

## Descrição do Projeto

O projeto de implementação de ferramentas foi dividido em 3 etapas, cada uma com seus objetivos específicos. A seguir, serão descritas as etapas do projeto:

### Etapa 1

- **Amazon S3 e AWS CloudFront**
- **Foco da ferramenta**: Hospedagem de Frontend Estático e Distribuição de Conteúdo.
- **Descrição de caso de uso**: O frontend do Bill Parking (Angular) será hospedado no Amazon S3 como um site estático e distribuído via AWS CloudFront. Isso elimina a necessidade de servidores web (como Nginx ou Apache) rodando em instâncias EC2 24/7, reduzindo drasticamente os custos de infraestrutura e melhorando a velocidade de carregamento para o usuário final.

### Etapa 2

- **AWS App Runner**
- **Foco da ferramenta**: Implantação de Aplicações em Contêineres de forma gerenciada.
- **Descrição de caso de uso**: A API Java Spring Boot será containerizada (Docker) e implantada no AWS App Runner. O serviço escala automaticamente conforme a demanda e pode ser configurado para reduzir recursos ao mínimo (ou pausar) durante períodos de baixa atividade (ex: madrugada), garantindo que a empresa pague apenas pelo que consome e eliminando custos operacionais de gerenciamento de servidores.

### Etapa 3

- **AWS Lambda e Amazon SES (Simple Email Service)**
- **Foco da ferramenta**: Processamento Serverless e Envio de Notificações.
- **Descrição de caso de uso**: A geração de relatórios diários e mensais, bem como o envio de recibos por email, será movida para funções Lambda disparadas por eventos. Isso retira o processamento pesado e a gestão de conexões SMTP da aplicação principal, permitindo que a API Spring Boot rode em instâncias menores e mais baratas, enquanto o Lambda e o SES cobram apenas por execução/envio.

## Conclusão

A implementação dessas ferramentas no Bill Parking trará uma redução significativa nos custos operacionais ao adotar o modelo "Pay-as-you-go" da AWS. A transição para uma arquitetura serverless no frontend e no processamento de relatórios, somada à escalabilidade automática do backend, aumentará a eficiência e a disponibilidade do sistema sem a necessidade de investimentos pesados em infraestrutura fixa.

## Anexos

[\[projetos AWS](https://github.com/antoniocariocajr/Bill-Parking/)

Assinatura do Responsável pelo Projeto:

Antonio Carioca Junior
