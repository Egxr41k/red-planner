#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}📤 Pushing images to registry...${NC}"

# Тегирование
docker tag red-planner-backend localhost:5000/red-planner-backend:latest
docker tag red-planner-frontend localhost:5000/red-planner-frontend:latest

# Пуш
docker push localhost:5000/red-planner-backend:latest
docker push localhost:5000/red-planner-frontend:latest

# Пуш с commit hash
COMMIT_HASH=$(git rev-parse --short HEAD)
docker tag red-planner-backend localhost:5000/red-planner-backend:${COMMIT_HASH}
docker tag red-planner-frontend localhost:5000/red-planner-frontend:${COMMIT_HASH}
docker push localhost:5000/red-planner-backend:${COMMIT_HASH}
docker push localhost:5000/red-planner-frontend:${COMMIT_HASH}

echo -e "${GREEN}✅ Images pushed successfully!${NC}"
echo ""
echo "Images in registry:"
curl -s http://localhost:5000/v2/_catalog | python3 -m json.tool 2>/dev/null || echo "Check manually: curl http://localhost:5000/v2/_catalog"
