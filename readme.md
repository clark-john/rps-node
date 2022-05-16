### Database Setup 
2 options:

**MySQL**

```sql
create user if not exists 'rps'@'localhost' 
  identified by 'rps'
  password expire never
  account unlock;
grant all on *.* to 'rps'@'localhost';
```

```sql
create database if not exists rps 
  character set = "utf8";
```
 
__PostgreSQL__

```sql
create user rps with
  superuser
  createdb
  nocreaterole
  login
  replication
  connection limit -1
  password 'rps';

create database rps with
  owner = rps
  encoding = utf8
  connection limit = -1;
``` 

After that, migrate it first with: `npm run migrate <migration_name>` before you play.