## Database schema for Edutech application.

### Prerequisites

- Install Node JS.
- Install npm.
- Install TypeScript.
- Install PostgreSQL.
- Install PgAdmin 4 (optional).

### Execute the database

1. Clone the repository

```sh
git clone git@github.com:danielRamosMencia/edutech-db.git
```

```sh
git clone https://github.com/danielRamosMencia/edutech-db.git
```

2. Install dependencies:

```sh
npm install
```

3. Generate prisma client for the schema.

```sh
npx prisma generate
```

4. Run migrations:

Overwrite the schema

```sh
npx prisma migrate dev
```

Just apply them

```sh
npx prisma migrate deploy
```

5. Optionally, execute seeders:

```sh
npx prisma db seed
```
