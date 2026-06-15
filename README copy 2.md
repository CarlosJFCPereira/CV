# 🐄 GadoApp — Sistema de Gestão de Gado

Sistema de gestão de gado bovino com interface JavaFX e backend REST API (Spring Boot + MySQL).

---

## 📋 Índice

- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Setup](#instalação-e-setup)
- [Como Executar](#como-executar)
- [Configuração para Rede/WiFi](#configuração-para-redewifi)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Utilizadores de Teste](#utilizadores-de-teste)

---

## Arquitetura

```
┌─────────────────┐         HTTP/REST (JSON)         ┌─────────────────┐
│   JavaFX UI     │ ◄──────────────────────────────► │  Spring Boot    │
│   (ApiClient)   │          JWT Auth                │  REST API       │
│                 │                                  │  (port 8080)    │
└─────────────────┘                                  └────────┬────────┘
                                                              │ JPA
                                                     ┌────────▼────────┐
                                                     │  MySQL (XAMPP)  │
                                                     │  gestao_gado    │
                                                     │  (port 3306)    │
                                                     └─────────────────┘
```

- **Frontend**: JavaFX 20.0.2 — ecrãs FXML (login, menu, lista de vacas, formulário, detalhes, inseminações, calendário, período espera, cascos, financeiro)
- **Backend**: Spring Boot 3.3.3 — REST controllers + Spring Security + JWT (JJWT 0.11.5)
- **Common**: Módulo partilhado com DTOs usados pelo cliente e servidor
- **Base de Dados**: MySQL via XAMPP — base de dados `gestao_gado`
- **Comunicação**: O UI comunica com o backend **exclusivamente via HTTP** (classe `ApiClient`), autenticado com tokens JWT

---

## Pré-requisitos

| Software  | Versão   | Notas                  |
|-----------|----------|------------------------|
| Java JDK  | 17+      | OpenJDK ou Oracle      |
| Maven     | 3.8+     | Gestão de dependências |
| XAMPP     | Qualquer | MySQL na porta 3306    |
| Git       | Qualquer | Opcional               |

---

## Instalação e Setup

### 1. Base de Dados

1. Iniciar o **XAMPP** — ou correr **`iniciar.bat`** (abre o painel + inicia Apache e MySQL)
2. Correr **`creat database.bat`** para criar a estrutura da base de dados
3. *(Opcional)* Correr **`seeddatabase.bat`** para carregar dados de teste

> **Atenção**: `seeddatabase.bat` apaga **todos** os dados existentes antes de carregar os dados de teste.  
> Para partir do zero a qualquer momento, corre **`delete database.bat`** e depois `creat database.bat`.

### 2. Compilar e instalar os módulos Maven

```bash
# Na raiz do projeto (GadoApp/)
cd GadoServers\gadoapp-common
mvn clean install

cd ..\gadoapp-server
mvn clean compile

cd ..\..\GadoApp
mvn clean compile
```

---

## Como Executar

### Passo 1: Iniciar o Servidor (REST API)

```bash
cd GadoServers\gadoapp-server
mvn compile exec:java
```

O servidor arranca em `http://localhost:8080`.

### Passo 2: Iniciar o Cliente JavaFX

```bash
cd GadoApp
mvn compile exec:java
```

Ou usar o ficheiro **`Iniciar GadoApp.bat`** na pasta `GadoExtras`.

---

## ⚠️ Configuração para Rede/WiFi

> **ESTADO ATUAL: O cliente liga-se a `localhost:8080` — funciona apenas na mesma máquina.**

### Para funcionar em rede (outro computador via WiFi):

#### No computador SERVIDOR (que tem o MySQL + Spring Boot):

1. **Descobrir o IP local**:
   ```bash
   ipconfig
   ```
   Procurar o **IPv4 Address** do adaptador WiFi (ex: `192.168.1.100`)

2. **Firewall**: Permitir conexões na porta `8080`:
   ```bash
   # PowerShell (Administrador)
   New-NetFirewallRule -DisplayName "Gestao Gado API" -Direction Inbound -Port 8080 -Protocol TCP -Action Allow
   ```

3. **MySQL (se remoto)**: No `application.properties`, mudar `localhost` para `0.0.0.0` se o MySQL estiver noutro computador

4. **Arrancar o servidor normalmente**:
   ```bash
   cd backend
   mvn compile exec:java
   ```

#### No computador CLIENTE (que só executa o JavaFX UI):

1. **Alterar o `ApiClient.java`** — mudar o `baseUrl`:
   ```java
   // Em service/ApiClient.java, linha 31:
   private String baseUrl = "http://192.168.1.100:8080";  // ← IP do servidor
   ```

2. **Ou usar `setBaseUrl()` dinamicamente** (já existe o método):
   ```java
   apiClient.setBaseUrl("http://192.168.1.100:8080");
   ```

3. Compilar e executar o cliente

#### TODO — Melhorias futuras para rede:
- [ ] Adicionar campo de "Endereço do Servidor" no ecrã de login
- [ ] Guardar o IP do servidor num ficheiro `config.properties`
- [ ] Separar o projeto em 2 JARs: `server.jar` e `client.jar`
- [ ] Suporte para descoberta automática do servidor na rede (mDNS/broadcast)

---

## Estrutura do Projeto

```
GadoApp/
├── GadoApp/                        ← Cliente JavaFX (Maven module)
│   └── src/main/
│       ├── java/
│       │   ├── app/                ← Ponto de entrada JavaFX
│       │   ├── controller/view/    ← Controladores FXML
│       │   └── service/
│       │       └── ApiClient.java  ← Cliente HTTP (comunica com o servidor)
│       └── resources/              ← Ficheiros FXML + CSS
├── GadoExtras/                     ← Utilitários e scripts
│   ├── database/
│   │   ├── criar_base_dados.sql    ← Cria estrutura da BD
│   │   └── seed_dados_teste.sql    ← Dados de teste
│   ├── iniciar.bat                 ← Inicia XAMPP + servidor
│   ├── desligar.bat                ← Para tudo (servidor, Apache, MySQL, XAMPP)
│   ├── creat database.bat          ← Cria a base de dados
│   ├── seeddatabase.bat            ← Carrega dados de teste (apaga dados existentes)
│   ├── delete database.bat         ← Apaga a base de dados completamente
│   └── Iniciar GadoApp.bat         ← Lança o cliente JavaFX
├── GadoServers/
│   ├── gadoapp-common/             ← DTOs partilhados (Maven module)
│   └── gadoapp-server/             ← REST API Spring Boot (Maven module)
│       └── src/main/java/
│           ├── controller/api/     ← REST Controllers
│           ├── model/              ← Entidades JPA
│           ├── repository/         ← Spring Data Repositories
│           ├── security/           ← JWT + Spring Security
│           └── service/            ← Lógica de negócio
└── GadoWeb/                        ← Página web estática (informação do produto)
```

---

## API Endpoints

### Autenticação
| Método | Endpoint             | Descrição           | Auth |
|--------|----------------------|---------------------|------|
| POST   | `/api/auth/login`    | Login (retorna JWT) | Não  |
| POST   | `/api/auth/registar` | Registar novo user  | Não  |

### Vacas (CRUD)
| Método | Endpoint             | Descrição                 | Auth |
|--------|----------------------|---------------------------|------|
| GET    | `/api/vacas`         | Listar todas              | JWT  |
| GET    | `/api/vacas/{id}`    | Buscar por ID             | JWT  |
| POST   | `/api/vacas`         | Criar nova                | JWT  |
| PUT    | `/api/vacas/{id}`    | Atualizar                 | JWT  |
| DELETE | `/api/vacas/{id}`    | Eliminar                  | JWT  |
| GET    | `/api/vacas/filtrar` | Filtrar por género/estado | JWT  |

### Reprodução
| Método | Endpoint                                   | Descrição                   | Auth |
|--------|--------------------------------------------|-----------------------------|------|
| POST   | `/api/vacas/{id}/inseminacao`              | Registar inseminação        | JWT  |
| POST   | `/api/vacas/{id}/confirmar-gravidez`       | Confirmar gravidez          | JWT  |
| POST   | `/api/vacas/{id}/inseminacao-sem-gravidez` | Inseminação sem sucesso     | JWT  |
| POST   | `/api/vacas/{id}/parto`                    | Registar parto              | JWT  |
| POST   | `/api/vacas/{id}/periodo-espera`           | Definir período de espera   | JWT  |

### Estatísticas e Histórico
| Método | Endpoint                          | Descrição               | Auth |
|--------|-----------------------------------|-------------------------|------|
| GET    | `/api/vacas/{id}/reproducao-stats`| Estatísticas reprodução | JWT  |
| GET    | `/api/vacas/{id}/historico`       | Histórico reprodutivo   | JWT  |
| GET    | `/api/vacas/estatisticas`         | Contadores gerais       | JWT  |
| GET    | `/api/calendario`                 | Eventos do calendário   | JWT  |

### Financeiro
| Método | Endpoint                                          | Descrição                      | Auth |
|--------|---------------------------------------------------|--------------------------------|------|
| GET    | `/api/financeiro/{vacariaId}/categorias`          | Listar categorias              | JWT  |
| GET    | `/api/financeiro/{vacariaId}/subcategorias/{catId}` | Listar subcategorias         | JWT  |
| GET    | `/api/financeiro/{vacariaId}/movimentos`          | Listar movimentos (filtráveis) | JWT  |
| POST   | `/api/financeiro/{vacariaId}/movimentos`          | Registar movimento             | JWT  |
| DELETE | `/api/financeiro/{vacariaId}/movimentos/{id}`     | Eliminar movimento             | JWT  |
| GET    | `/api/financeiro/{vacariaId}/resumo`              | Resumo mensal (receitas/custos)| JWT  |
| GET    | `/api/financeiro/{vacariaId}/media-3-meses`       | Média dos últimos 3 meses      | JWT  |

### Cascos
| Método | Endpoint                              | Descrição                  | Auth |
|--------|---------------------------------------|----------------------------|------|
| GET    | `/api/cascos/{vacariaId}`             | Estado dos cascos (vacaria)| JWT  |
| GET    | `/api/cascos/vaca/{vacaId}`           | Histórico de cascos         | JWT  |
| POST   | `/api/cascos/avaliacao`               | Registar avaliação          | JWT  |
| PUT    | `/api/cascos/{historicoId}/fechar`    | Fechar problema             | JWT  |

### Teste
| Método | Endpoint         | Descrição   | Auth |
|--------|------------------|-------------|------|
| GET    | `/api/test/ping` | Health check| Não  |

---

## Utilizadores de Teste

Os utilizadores de teste são criados pelo script `database/seed_dados_teste.sql`.

| Email              | Tipo    | Vacaria         |
|--------------------|---------|-----------------|
| `admin@gado.pt`    | ADMIN   | —               |
| `hugo@gado.pt`     | CLIENTE | Vacaria Hugo    |
| `carlos@gado.pt`   | CLIENTE | Vacaria Carlos  |
| `teste@gado.pt`    | CLIENTE | Vacaria Teste   |

> As credenciais de acesso encontram-se **apenas** no ficheiro `database/seed_dados_teste.sql`.  
> **Não partilhar esse ficheiro publicamente.**

---

## Tecnologias

- **Java 17** + **Maven** (multi-módulo)
- **Spring Boot 3.3.3** (Web, JPA, Security)
- **JavaFX 20.0.2** (Interface gráfica)
- **MySQL** via XAMPP (porta 3306)
- **JWT** (JJWT 0.11.5) para autenticação
- **Jackson** para serialização JSON

---

*Março 2026*
