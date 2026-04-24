#!/bin/bash
set -e  # Остановить скрипт при любой ошибке

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment process...${NC}"

# Проверка, что мы в правильной директории
if [ ! -d "apps/backend" ] || [ ! -d "apps/frontend" ]; then
    echo -e "${RED}❌ Error: apps/backend or apps/frontend not found!${NC}"
    echo "Make sure you're in the project root directory"
    exit 1
fi

# 1. Получение последних изменений из Git
echo -e "${YELLOW}📦 Pulling latest code from Git...${NC}"
git pull

# 2. Сборка образов (как ты и делал)
echo -e "${YELLOW}🏗️ Building backend image...${NC}"
docker build --no-cache -t red-planner-backend ./apps/backend

echo -e "${YELLOW}🏗️ Building frontend image...${NC}"
docker build --no-cache -t red-planner-frontend ./apps/frontend

# 3. Тегирование для локального registry
echo -e "${YELLOW}🏷️ Tagging images for registry...${NC}"
docker tag red-planner-backend localhost:5000/red-planner-backend:latest
docker tag red-planner-frontend localhost:5000/red-planner-frontend:latest

# Дополнительно тег с commit hash (опционально, но полезно)
COMMIT_HASH=$(git rev-parse --short HEAD)
docker tag red-planner-backend localhost:5000/red-planner-backend:${COMMIT_HASH}
docker tag red-planner-frontend localhost:5000/red-planner-frontend:${COMMIT_HASH}

# 4. Пуш в локальный registry
echo -e "${YELLOW}📤 Pushing images to local registry...${NC}"
docker push localhost:5000/red-planner-backend:latest
docker push localhost:5000/red-planner-frontend:latest
docker push localhost:5000/red-planner-backend:${COMMIT_HASH}
docker push localhost:5000/red-planner-frontend:${COMMIT_HASH}

# 5. Обновление Kubernetes деплойментов
echo -e "${YELLOW}🔄 Restarting Kubernetes deployments...${NC}"

# Перезапуск деплойментов (подтянут новые образы)
if kubectl get deployment backend 2>/dev/null; then
    kubectl rollout restart deployment/backend
    echo -e "${GREEN}✓ Backend deployment restarted${NC}"
else
    echo -e "${YELLOW}⚠️ Backend deployment not found, applying config...${NC}"
    kubectl apply -f k8s/backend-deployment.yaml
fi

if kubectl get deployment frontend 2>/dev/null; then
    kubectl rollout restart deployment/frontend
    echo -e "${GREEN}✓ Frontend deployment restarted${NC}"
else
    echo -e "${YELLOW}⚠️ Frontend deployment not found, applying config...${NC}"
    kubectl apply -f k8s/frontend-deployment.yaml
fi

# 6. Применение сервисов (если изменились)
echo -e "${YELLOW}📡 Applying Kubernetes services...${NC}"
kubectl apply -f k8s/backend-service.yaml 2>/dev/null || true
kubectl apply -f k8s/frontend-service.yaml 2>/dev/null || true

# 7. Ожидание готовности деплойментов
echo -e "${YELLOW}⏳ Waiting for deployments to be ready...${NC}"
kubectl rollout status deployment/backend --timeout=120s
kubectl rollout status deployment/frontend --timeout=120s

# 8. Проверка статуса
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo -e "${GREEN}📊 Current status:${NC}"
kubectl get pods
echo ""
kubectl get svc

# 9. Показ последних логов (опционально)
echo ""
echo -e "${YELLOW}📋 Recent logs from backend:${NC}"
kubectl logs --tail=5 deployment/backend 2>/dev/null || echo "No logs yet"

echo ""
echo -e "${GREEN}🎉 Application is ready!${NC}"
echo -e "Access frontend at: ${YELLOW}http://$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[0].address}'):$(kubectl get svc frontend -o jsonpath='{.spec.ports[0].nodePort}')${NC}"
