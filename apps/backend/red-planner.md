docker run \  
--name red-planner-frontend \  
--network red-planner \  
--publish 3000:3000 \  
-d red-planner-frontend:latest

docker run \  
--name red-planner-backend \  
--network red-planner \  
--publish 4200:4200 \  
-d red-planner-backend:latest

docker run \  
--name red-planner-postgres \  
-e POSTGRES_PASSWORD=mysecretpassword \  
-p 5432:5432 \  
-v pgdata:/var/lib/postgresql/data \  
-d postgres:latest --network red-planner

docker start …

docker stop …
