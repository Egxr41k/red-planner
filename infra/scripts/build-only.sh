#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🏗️ Building images locally...${NC}"

docker build --no-cache -t red-planner-backend ./apps/backend
docker build --no-cache -t red-planner-frontend ./apps/frontend

echo -e "${GREEN}✅ Images built successfully!${NC}"
echo ""
echo "To push to registry, run: ./push.sh"
echo "To deploy, run: ./deploy.sh"
