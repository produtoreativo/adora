# chmod +x scripts/infra/ecr-docker-run.sh

REPO_URL=$(aws ecr describe-repositories --repository-names adora --query "repositories[*].repositoryUri" --output text)
echo "Repository: $REPO_URL "

hash=$(git rev-parse --short HEAD)
echo "Pega o nome da branch atual ($hash) para compor o nome da imagem"

echo "Verificar a execucao do docker"
docker run --rm -d -p 3100:3100 --name adora $REPO_URL:$hash