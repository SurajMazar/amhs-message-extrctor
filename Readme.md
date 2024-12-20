Create .env file and paste content of .env.example
```
cp .env.example .env
```
Create 2 folders named messages and read-messages
```
mkdir messages
mkdir read-messages
```
Run 
```
docker compose up
```

and inside  the app container

```
npx prisma migrate dev
```

Any json file added to messages will be saved in the database and the file is moved to read-messages directory

To see the saved messages visit
http://0.0.0.0:4444/amhs-messages
