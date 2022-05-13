Database Setup (psql)

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