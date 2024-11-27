# (Em construção..) Sistema de Automação de Processos Jurídicos com IA
Este projeto visa otimizar a gestão de processos jurídicos em escritórios de advocacia, utilizando inteligência artificial (IA) para automação de tarefas repetitivas, como a criação de documentos e análise de jurisprudência. O sistema permite que advogados e assistentes acompanhem casos, monitorem prazos processuais e integrem com sistemas de pagamento, garantindo maior eficiência e agilidade no ambiente jurídico. A aplicação está hospedada na AWS/Heroku e utiliza uma arquitetura robusta para frontend e backend.
## Funcionalidades
- **Gestão de Casos Jurídicos**: Criação e acompanhamento de processos, com histórico completo de movimentações processuais.
- **Automação de Documentos**: Geração automática de documentos jurídicos (contratos, petições) com base nas informações dos casos.
- **IA para Análise de Jurisprudência**: Consultas automáticas a uma base de jurisprudência e sugestões de ações com base em precedentes jurídicos.
- **Gestão de Tarefas e Prazos**: Notificação e acompanhamento de prazos processuais com alertas automáticos para vencimento de prazos.
- **Integração com API de Pagamento**: Processamento de pagamentos de honorários e taxas judiciais por meio de gateways de pagamento como Stripe ou PagSeguro.
- **Armazenamento de Documentos**: Armazenamento seguro e pesquisa eficiente de documentos jurídicos.
- **Dashboard de Métricas e Relatórios**: Exibição de estatísticas e relatórios sobre a performance dos casos e da equipe jurídica.
## Tecnologias Utilizadas
### Backend
- **Django**: Framework Python para desenvolvimento rápido e escalável de APIs.
- **Django Rest Framework (DRF)**: Framework para criação de APIs RESTful.
- **PostgreSQL**: Banco de dados relacional para armazenar informações de casos e usuários.
- **Redis**: Sistema de cache para melhorar a performance da aplicação.
- **JWT e OAuth2**: Gerenciamento de autenticação e autorização para garantir segurança nas requisições.
### Frontend
- **React.js**: Biblioteca JavaScript para criação de interfaces de usuário dinâmicas.
- **Material-UI**: Biblioteca de componentes com Material Design para um design consistente.
- **Axios**: Biblioteca para realização de chamadas HTTP e comunicação com o backend.
- **React Router**: Biblioteca de roteamento para navegação dinâmica dentro da aplicação.
### Outras Bibliotecas
- **SpaCy**: Biblioteca de NLP (Natural Language Processing) para análise de jurisprudência.
- **Hugging Face**: Modelos pré-treinados de IA para análise de dados jurídicos.
- **Stripe/PagSeguro**: Integração para pagamentos de honorários e taxas judiciais.
- **SendGrid**: Envio de e-mails automáticos para notificações e alertas.
### Protótipo criado no Figma
![sapj](https://github.com/user-attachments/assets/84030252-f965-439a-9dd5-8cb732e8aa30)
