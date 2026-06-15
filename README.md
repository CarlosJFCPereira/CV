# GadoApp — Sistema de Gestão de Gado Bovino

Sistema completo de gestão de explorações bovinas. Interface desktop JavaFX, backend Spring Boot REST API, app móvel Android e página web.

---

## Funcionalidades

- **Vacas** — registo completo de cada animal (identificação, genealogia, raça, estado reprodutivo)
- **Reprodução** — inseminações, deteção de gravidez, partos, períodos de espera
- **Cascos** — avaliações, problemas e tratamentos por pata
- **Financeiro** — movimentos de receitas e custos com categorias e resumos mensais
- **Calendário** — eventos automáticos (testes de gravidez, partos previstos, secagens, reavaliações)
- **Funcionários** — gestão de staff com roles e permissões granulares por módulo
- **Histórico de alterações** — registo imutável de todas as operações de escrita
- **Relatórios PDF** — exportação de fichas de animais, histórico reprodutivo, registos veterinários e financeiros
- **App móvel** — módulo financeiro e gestão de anexos com câmara (Android, em beta)

---

## Arquitetura

```
┌──────────────────┐   HTTP/REST + JWT   ┌──────────────────┐
│  Cliente JavaFX  │ ◄─────────────────► │  Spring Boot API │
│  (ApiClient)     │                     │  (porta 8080)    │
└──────────────────┘                     └────────┬─────────┘
                                                  │ JPA
┌──────────────────┐                     ┌────────▼─────────┐
│  App Android     │ ◄─────────────────► │  MySQL (XAMPP)   │
│  (React Native)  │   HTTP/REST + JWT   │  gestao_gado     │
└──────────────────┘                     └──────────────────┘
```

| Módulo | Tecnologia |
|--------|-----------|
| Desktop (UI) | Java 17 + JavaFX 20.0.2 |
| Backend (API) | Spring Boot 3.3.3 + Spring Security + JWT |
| DTOs partilhados | Módulo Maven `gadoapp-common` |
| Base de dados | MySQL 8.0 via XAMPP |
| App móvel | React Native 0.85 (TypeScript) |
| Página web | HTML5 + CSS3 (estático) |

---

## Estrutura do Repositório

```
GadoApp/
├── GadoApp/              — Cliente desktop JavaFX
├── GadoServers/
│   ├── gadoapp-server/   — REST API Spring Boot
│   └── gadoapp-common/   — DTOs e enums partilhados
├── GadoExtras/
│   ├── database/         — SQL (schema + seed + migrações)
│   └── instalacao/       — Scripts de instalação Windows
└── GadoWeb/              — Página web estática (ADIFAL)
```

---

## Pré-requisitos

| Software | Versão |
|----------|--------|
| Java JDK | 17+ |
| Maven | 3.8+ (wrapper incluído) |
| XAMPP | Qualquer (MySQL na porta 3306) |

---

## Instalação

### Automática (Windows)

Correr `GadoExtras/instalacao/INSTALAR.bat` como administrador.

O script instala as dependências, clona o repositório, cria a base de dados e compila os módulos Maven automaticamente.

### Manual

**1. Base de dados**

Iniciar o XAMPP e executar no MySQL:

```sql
source GadoExtras/database/criar_base_dados.sql
-- Opcional: dados de teste
source GadoExtras/database/seed_dados_teste.sql
```

**2. Compilar**

```bash
# Módulo comum (sempre primeiro)
cd GadoServers/gadoapp-common
mvn clean install

# Backend
cd ../gadoapp-server
mvn clean compile

# Cliente desktop
cd ../../GadoApp
mvn clean compile
```

**3. Executar**

```bash
# Terminal 1 — arrancar o servidor
cd GadoServers/gadoapp-server
mvn compile exec:java

# Terminal 2 — arrancar o cliente
cd GadoApp
mvn compile exec:java
```

Ou usar `GadoExtras/instalacao/INICIAR.bat` para gerir tudo a partir de um menu.

---

## Configuração

O ficheiro de configuração do servidor é `GadoServers/gadoapp-server/src/main/resources/application.properties`.

Para usar em rede (cliente noutro computador), alterar o `baseUrl` em `GadoApp/src/main/java/service/ApiClient.java`:

```java
private String baseUrl = "http://<IP_DO_SERVIDOR>:8080";
```

---

## Principais Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login — retorna JWT |
| POST | `/api/auth/registar` | Registar utilizador |
| GET | `/api/vacas` | Listar animais (paginado) |
| POST | `/api/vacas` | Criar animal |
| PUT | `/api/vacas/{id}` | Editar animal |
| DELETE | `/api/vacas/{id}` | Eliminar animal |
| POST | `/api/vacas/{id}/inseminacao` | Registar inseminação |
| POST | `/api/vacas/{id}/parto` | Registar parto |
| GET | `/api/cascos/{vacariaId}` | Estado dos cascos |
| POST | `/api/cascos/avaliacao` | Registar avaliação de casco |
| GET | `/api/financeiro/{vacariaId}/movimentos` | Movimentos financeiros |
| POST | `/api/financeiro/{vacariaId}/movimentos` | Registar movimento |
| GET | `/api/calendario` | Eventos do calendário |
| GET | `/api/staff` | Listar funcionários |
| POST | `/api/staff` | Criar funcionário |
| GET | `/api/historico` | Histórico de alterações |
| GET | `/api/test/ping` | Health check |

---

## Permissões e Roles

O sistema suporta multi-vacaria com roles independentes por exploração:

| Role | Acesso |
|------|--------|
| `ADMIN_VACARIA` | Total |
| `OPERADOR` | Geral (exceto staff) |
| `VETERINARIO` | Leitura total + edição reprodução |
| `TRATADOR_CASCOS` | Apenas cascos |
| `CONSULTOR_LEITURA` | Só leitura |

Permissões granulares por módulo (VACAS, INSEMINACOES, CASCOS, FINANCEIRO, CALENDARIO, STAFF) e ação (READ, CREATE, UPDATE, DELETE).

---

## Tecnologias

- Java 17, Maven (multi-módulo)
- Spring Boot 3.3.3 — Web, JPA, Security
- JavaFX 20.0.2
- MySQL 8.0 / XAMPP
- JJWT 0.11.5 — autenticação JWT
- Jackson 2.15 — serialização JSON
- OpenPDF 1.3.30 — geração de relatórios PDF
- React Native 0.85 — app Android
