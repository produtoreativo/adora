# chmod +x scripts/infra/ecr-create.sh

aws ecr create-repository \
    --repository-name adora \

REPO_URL=$(aws ecr describe-repositories --repository-names adora --query "repositories[*].repositoryUri" --output text)
echo "Create Repository: $REPO_URL "

# echo "Auth para o docker"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $REPO_URL

hash=$(git rev-parse --short HEAD)
echo "Pega o nome da branch atual ($hash) para compor o nome da imagem"

docker build -t $REPO_URL:$hash .
echo "Build a imagem docker"
#echo "Verificar a execucao do docker"
#docker run --rm -d -p 3100:3100 --name adora $REPO_URL:$hash
echo "Push da imagem na AWS ECR"
docker push $REPO_URL:$hash