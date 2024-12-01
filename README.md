# Sistema de Automação de Processos Jurídicos

Este projeto visa otimizar a gestão de processos jurídicos em escritórios de advocacia, utilizando **inteligência artificial (IA)** para automação de tarefas repetitivas, como a criação de documentos e análise de jurisprudência. O sistema permite que advogados e assistentes acompanhem casos, monitorem prazos processuais e integrem com sistemas de pagamento, garantindo maior eficiência e agilidade no ambiente jurídico. A aplicação está hospedada na **AWS/Heroku** e utiliza uma arquitetura robusta para frontend e backend.

## Funcionalidades

- **Gestão de Casos Jurídicos**: Criação e acompanhamento de processos, com histórico completo de movimentações processuais.
- **Automação de Documentos**: Geração automática de documentos jurídicos (contratos, petições) com base nas informações dos casos.
- **Gestão de Tarefas e Prazos**: Notificação e acompanhamento de prazos processuais com alertas automáticos para vencimento de prazos.
- **Armazenamento de Documentos**: Armazenamento seguro e pesquisa eficiente de documentos jurídicos.
- **Dashboard de Métricas e Relatórios**: Exibição de estatísticas e relatórios sobre a performance dos casos e da equipe jurídica.

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

### Backend

### Backend (Django)

1. **Clone o repositório do backend**:
   ```bash
   git clone https://github.com/seuusuario/projeto.git
   cd projeto
Instale o Python (se não tiver instalado):

Para instalar o Python, siga as instruções para o seu sistema operacional no site oficial do Python.
Crie e ative um ambiente virtual:

bash
Copiar código
python -m venv venv
source venv/bin/activate  # No Windows, use: venv\Scripts\activate
Instale as dependências:

bash
Copiar código
pip install -r requirements.txt
Instale o PostgreSQL (se não tiver instalado):

Para instalar o PostgreSQL, siga as instruções para o seu sistema operacional no site oficial do PostgreSQL.
Crie o banco de dados:

Abra o terminal do PostgreSQL e execute:
sql
Copiar código
CREATE DATABASE sistema_juridico;
Configure o banco de dados no Django:

Abra o arquivo settings.py do seu projeto Django e configure a conexão com o banco de dados PostgreSQL:
python
Copiar código
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
Execute as migrações do banco de dados:

bash
Copiar código
python manage.py migrate
Execute o servidor:

bash
Copiar código
python manage.py runserver
Agora o servidor Django está rodando localmente.

Frontend (React.js)
Clone o repositório do frontend:

bash
Copiar código
git clone https://github.com/seuusuario/projeto-frontend.git
cd projeto-frontend
Instale as dependências:

bash
Copiar código
npm install
Execute o servidor:

bash
Copiar código
npm start
