# Masterthesis 2021

## Frontend: single-spa

This project implements the single-spa example with React.

To properly use this project, a [MongoDB](https://github.com/DavidWich/mt21-backend-db) and an [auth service](https://github.com/DavidWich/mt21-backend-auth) are required.

The result can be accessed on http://localhost:9000/.

The ports 8999, 9000 and 9200 need to be free.

### Usage

Download with:

```bash
git clone https://github.com/DavidWich/mt21-frontend-sspa.git
```

Usage with yarn:

```bash
yarn             // Installs dependencies on root-level
yarn init:yarn   // Installs dependencies on project-level
yarn build:yarn  // Builds all projects
yarn start:yarn  // Starts all projects
```

Usage with npm:

```bash
npm install        // Installs dependencies on root-level
npm run init:npm   // Installs dependencies on project-level
npm run build:npm  // Builds all projects
npm run start:npm  // Starts all projects
```

### Aufteilung Projekt

| Projekt                    | Inhalt                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| single-spa-root            | Hauptanwendung. App-Shell. Orchestriert alle Microfrontends über single-spa Root-Config. |
| backend                    | REST-API zur Kommunikation mit der Datenbank.                                            |
| cdn                        | Static-File-Server. Stellt Skripte für Microfrontends zur Verfügung.                     |
| hfu-api                    | In-Browser Utility Module. Stellt Methoden zur Kommunikation mit dem Backend bereit.     |
| hfu-cart                   | In-Browser Utility Module. Stellt React-Komponente für den Warenkorb zur Verfügung.      |
| hfu-utility                | In-Browser Utility Module. Stellt globalen Application State (mit Redux) zur Verfügung   |
| studi-app-bib              | single-spa Application. Microfrontend für Bibliothek.                                    |
| studi-app-course           | single-spa Application. Microfrontend für Kurse.                                         |
| studi-app-dashboard        | single-spa Application. Microfrontend für Dashboard und Landing-Page.                    |
| studi-app-dashboard-bib    | single-spa Utility Module. Microfrontend für Dashboard-Widget "Bibliothek".              |
| studi-app-dashboard-course | single-spa Utility Module. Microfrontend für Dashboard-Widget "Kurse".                   |
| studi-app-dashboard-mail   | single-spa Utility Module. Microfrontend für Dashboard-Widget "Email".                   |
| studi-app-dashboard-news   | single-spa Utility Module. Microfrontend für Dashboard-Widget "Neuigkeiten".             |
| studi-app-login            | single-spa Application. Microfrontend für Login-Page.                                    |
| studi-app-mail             | single-spa Application. Microfrontend für Emails.                                        |
| studi-app-nav              | single-spa Application. Microfrontend für Navigation (oben).                             |
| studi-app-news             | single-spa Application. Microfrontend für Neuigkeiten.                                   |

### Funktionsweise:

Das Backend ist für die Kommunikation zwischen Datenbank (mongodb) und Frontend (single-spa) mithilfe von Node.js + Express.js.

CDN dient dazu, alle single-spa Bundles bereitzustellen, ebenso wie all Shared Vendor Libraries. Statt diese in jedem Microfrontend neu zu laden, werden diese einmalig global bereitgestellt und über eine Import-Map in der Root-Config deklariert.

Die Root-Config orchestriert alle Microfrontends.
