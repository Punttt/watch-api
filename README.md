# Watch API

En REST-webbtjänst för att hantera en klocksamling, skapad med **Fastify** och **MySQL**. Webbtjänsten har full CRUD-funktionalitet (Create, Read, Update, Delete) och returnerar data i JSON-format. Data som skickas in valideras innan den sparas.

Skapad av Pontus Johansson som Laboration 2.2 i kursen DT193G Fullstack-utveckling med ramverk, Mittuniversitetet.

## Tekniker
- Node.js
- Fastify
- MySQL (via XAMPP)
- mysql2

## Installation

1. Klona repot:
   ```
   git clone https://github.com/Punttt/watch-api.git
   cd watch-api
   ```
2. Installera paketen:
   ```
   npm install
   ```
3. Skapa databasen och tabellen genom att köra följande SQL, till exempel i phpMyAdmin:
   ```sql
   CREATE DATABASE watch_api;
   USE watch_api;

   CREATE TABLE watches (
     id INT AUTO_INCREMENT PRIMARY KEY,
     brand VARCHAR(100) NOT NULL,
     model VARCHAR(100) NOT NULL,
     price INT NOT NULL,
     is_owned BOOLEAN NOT NULL DEFAULT FALSE
   );
   ```
4. Kopiera `.env.example` till `.env` och ändra värdena vid behov.
5. Starta servern:
   ```
   npm run dev
   ```
   Servern körs på `http://localhost:5000`.

## Databastabell: watches

| Fält | Typ | Beskrivning |
|---|---|---|
| id | INT | Unikt id, skapas automatiskt |
| brand | VARCHAR | Klockans märke |
| model | VARCHAR | Klockans modell |
| price | INT | Pris i kronor |
| is_owned | BOOLEAN | true = äger klockan, false = äger den inte |

## Endpoints

| Metod | URL | Beskrivning |
|---|---|---|
| GET | `/watches` | Hämtar alla klockor |
| GET | `/watches/:id` | Hämtar en klocka med angivet id |
| POST | `/watches` | Lägger till en ny klocka |
| PUT | `/watches/:id` | Uppdaterar en klocka med angivet id |
| DELETE | `/watches/:id` | Raderar en klocka med angivet id |

### Exempel på body för POST och PUT
```json
{
  "brand": "Seiko",
  "model": "SKX007",
  "price": 3500,
  "is_owned": true
}
```

## Validering
Vid POST och PUT måste alla fält skickas med:
- `brand` och `model` måste vara text och får inte vara tomma
- `price` måste vara ett heltal, 0 eller större
- `is_owned` måste vara `true` eller `false`

Om något fält saknas eller har fel typ returneras statuskod **400** med ett felmeddelande, till exempel:
```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "body must have required property 'model'"
}
```
Om en klocka med angivet id inte finns returneras **404**.

## Testning
Webbtjänsten kan testas med Thunder Client, Postman eller PowerShell. Exempel med PowerShell:
```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:5000/watches -ContentType "application/json" -Body '{"brand":"Rolex","model":"Submariner","price":120000,"is_owned":false}'
```

## Projektstruktur
```
watch-api/
├── server.js           # Startar servern och registrerar routes
├── db.js               # Databasanslutning
├── routes/             # Routes och valideringsschema
├── controllers/        # Tar emot anrop och skickar svar
└── models/             # SQL-frågor mot databasen
```