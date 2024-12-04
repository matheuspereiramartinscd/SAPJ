# Sistema de Automação de Processos Jurídicos

Este projeto visa otimizar a gestão de processos jurídicos em escritórios de advocacia para automação de tarefas repetitivas, como a criação de documentos e análise de jurisprudência. O sistema permite que advogados e assistentes acompanhem casos, monitorem prazos processuais e integrem com sistemas de pagamento, garantindo maior eficiência e agilidade no ambiente jurídico.

## Funcionalidades

- **Gestão de Casos Jurídicos**: Criação e acompanhamento de processos, com histórico completo de movimentações processuais.
- **Automação de Documentos**: Geração automática de documentos jurídicos (contratos, petições) com base nas informações dos casos.
- **Gestão de Tarefas e Prazos**: Notificação e acompanhamento de prazos processuais com alertas automáticos para vencimento de prazos.
- **Armazenamento de Documentos**: Armazenamento seguro e pesquisa eficiente de documentos jurídicos.
- **Dashboard de Métricas e Relatórios**: Exibição de estatísticas e relatórios sobre a performance dsos casos e da equipe jurídica.

## Tecnologias Utilizadas

### Backend
- **Django**: Framework Python para desenvolvimento rápido e escalável de APIs.
- **Django Rest Framework (DRF)**: Framework para criação de APIs RESTful.
- **PostgreSQL**: Banco de dados relacional para armazenar informações de casos e usuários.
- **Redis**: Sistema de cache para melhorar a performance da aplicação.
- **JWT**: Gerenciamento de autenticação e autorização para garantir segurança nas requisições.

### Frontend
- **React.js**: Biblioteca JavaScript para criação de interfaces de usuário dinâmicas.
- **Material-UI**: Biblioteca de componentes com Material Design para um design consistente.
- **Axios**: Biblioteca para realização de chamadas HTTP e comunicação com o backend.
- **React Router**: Biblioteca de roteamento para navegação dinâmica dentro da aplicação.


## Estrutura do Projeto

- **Cadastro e Login**: Tela de login e registro de usuários com autenticação segura utilizando JWT e OAuth2.
- **Gestão de Processos**: Cadastro, acompanhamento e histórico de movimentações dos processos.
- **Detalhes de Processos**: Visualização e gestão dos detalhes dos processos, incluindo histórico de andamentos e documentos relacionados.
- **Gestão de Pessoas**: Cadastro e gestão de informações sobre clientes, advogados, testemunhas e outros envolvidos nos processos.
- **Dashboard**: Painel interativo para visualização de métricas, estatísticas e status dos processos.
- **Automação de Documentos**: Geração automática de documentos jurídicos com templates personalizáveis.
- **Gestão de Tarefas**: Acompanhamento de tarefas com alertas e notificações de vencimento de prazos.
- **Gestão de Documentos**: Armazenamento e pesquisa eficiente de documentos jurídicos.
- **Pagamentos**: Integração com gateways de pagamento para honorários e taxas judiciais.

## Como Rodar o Projeto


## Instalação

  ### Backend (Django)

  1. **Clone o repositório do backend**:
     ```bash
     git clone https://github.com/seuusuario/projeto.git
     cd projeto
     ```

  2. **Instale o Python** (se não tiver instalado):
     Para instalar o Python, siga as instruções para o seu sistema operacional no [site oficial do Python](https://www.python.org/downloads/).

  3. **Crie e ative um ambiente virtual**:
     ```bash
     python -m venv venv
     source venv/bin/activate  # No Windows, use: venv\Scripts\activate
     ```

  4. **Instale as dependências**:
     ```bash
     pip install -r requirements.txt
     ```

  5. **Instale o PostgreSQL** (se não tiver instalado):
     Para instalar o PostgreSQL, siga as instruções para o seu sistema operacional no [site oficial do PostgreSQL](https://www.postgresql.org/download/).

  6. **Crie o banco de dados**:
     Abra o terminal do PostgreSQL e execute:
     ```sql
     CREATE DATABASE sistema_juridico;
     ```

  7. **Configure o banco de dados no Django**:
     Abra o arquivo `settings.py` do seu projeto Django e configure a conexão com o banco de dados PostgreSQL:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.postgresql',
             'NAME': 'sistema_juridico',
             'USER': 'seu_usuario',  # Substitua com seu nome de usuário do PostgreSQL
             'PASSWORD': 'sua_senha',  # Substitua com sua senha do PostgreSQL
             'HOST': 'localhost',
             'PORT': '5432',
         }
     }
     ```

  8. **Execute as migrações do banco de dados**:
     ```bash
     python manage.py makemigrations
     python manage.py migrate
     ```

  9. **Execute o servidor na pasta backend**:
     ```bash
     python manage.py runserver
     ```

  Agora o servidor Django está rodando localmente.

  ### Frontend (React.js)

  1. **Clone o repositório do frontend**:
     ```bash
     git clone https://github.com/seuusuario/projeto-frontend.git
     cd projeto-frontend
     ```

  2. **Instale as dependências**:
     ```bash
     npm install
     ```

  3. **Execute o servidor na pasta frontend**:
     ```bash
     npm start
     ```
![login](https://github.com/user-attachments/assets/768b4828-65ec-43a0-9d4c-9040c9290f89)
![cadastro](https://github.com/user-attachments/assets/3a888870-a0b3-4a89-8036-42e58c7880d9)
![home](https://github.com/user-attachments/assets/b53228a8-be12-4344-8673-817d43f36f46)
![pessoas](https://github.com/user-attachments/assets/fd505436-5447-4a91-bb34-15fee072daa4)
![pagamentos](https://github.com/user-attachments/assets/446a39e9-e13f-47c9-a4c1-e153fc1558d5)
![editar tarefa](https://github.com/user-attachments/assets/2b8b7c27-d68e-45d1-b999-a6dfc2d432b2)
![documentos](https://github.com/user-attachments/assets/f268909a-0cab-4bc1-9ed1-2cd38076cdea)
![detalhesprocesso](https://github.com/user-attachments/assets/d9bae4a9-fdb1-46ce-a4af-5c8ea842e0dd)
![detalhes tarefas](https://github.com/user-attachments/assets/5b9279f2-8ab7-4e95-952e-b7943f4a926d)
![detalhes pessoa](https://github.com/user-attachments/assets/cedfd7f7-7067-46f7-a804-c213fa9b7545)
![dashboard](https://github.com/user-attachments/assets/3b82b0f6-daf2-422d-abd6-79e7100a649b)
![consultas](https://github.com/user-attachments/assets/c70b7265-cc15-43bd-b2d3-995d47a0b295)
![automaçao](https://github.com/user-attachments/assets/b5fb3277-eba0-42f2-b852-65c10a6b2cf0)
![processos](https://github.com/user-attachments/assets/757b8ee2-4b88-48d1-8b2e-9567e0faa8b3)
![tarefas](https://github.com/user-attachments/assets/3fdd8b09-fbcf-4750-a958-6685dad88c0e)

