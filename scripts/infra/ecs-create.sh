# chmod +x scripts/infra/ecs-create.sh

aws ecs create-cluster \
--cluster-name adora-prod \
--tags key=env,value=production

CLUSTER_ID=$(aws ecs describe-clusters --clusters adora-prod --query "clusters[*].clusterArn" --output text)

ECR_REPO_URL=$(aws ecr describe-repositories --repository-names adora --query "repositories[*].repositoryUri" --output text)
echo "Repository: $ECR_REPO_URL "

PATH_JSON=$(pwd)

aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file://$PATH_JSON/scripts/infra/task-execution-assume-role.json

aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

ROLE_ARN=$(aws iam get-role --role-name ecsTaskExecutionRole --query "Role.Arn" --output text)
echo " Role ARN: $ROLE_ARN"
IMAGE_TAG=$(aws ecr describe-images --repository-name adora --output text --query 'sort_by(imageDetails,& imagePushedAt)[*].imageTags[*]' | tr '\t' '\n' | tail -1)
IMAGE_URL=$ECR_REPO_URL:$IMAGE_TAG
echo " Image URL $IMAGE_URL"

aws ecs register-task-definition \
  --family adora_prod_family \
  --network-mode awsvpc \
  --execution-role-arn $ROLE_ARN\
  --requires-compatibilities FARGATE \
  --cpu 256\
  --memory 512 \
  --container-definitions "[{\"name\": \"adora-ms\",\"image\": \"$IMAGE_URL\",\"memory\": 300, \"memoryReservation\": 128,\"portMappings\": [{\"containerPort\": 3100}]}]"

# aws ecs list-task-definitions --family-prefix adora_prod_family
groupId=$(aws ec2 describe-security-groups --filter "Name=group-name,Values=adora-sg" --query "SecurityGroups[*].GroupId" --output text) 
subnet1=$(aws ec2 describe-subnets --query "Subnets[*].SubnetId" --filter "Name=tag:Name,Values=adora-subnet1" --output text)
subnet2=$(aws ec2 describe-subnets --query "Subnets[*].SubnetId" --filter "Name=tag:Name,Values=adora-subnet2" --output text)

echo "Subnets da VPC : [$subnet1, $subnet2] de zonas diferentes"
echo "Security Group $groupId"

# aws ec2 describe-subnets --filter "Name=tag:Name,Values=adora-subnet2"
# aws ec2 describe-subnets --filter "Name=tag:Name,Values=adora-subnet1"

LB_ARN=$(aws elbv2 describe-load-balancers --names adora-load-balancer --query "LoadBalancers[*].LoadBalancerArn" --output text)
echo "Load Balancer: $LB_ARN"
TARGET_GROUP_ARN=$(aws elbv2 describe-target-groups --names adora-alb-tg-https --query "TargetGroups[*].TargetGroupArn" --output text)
TARGET_GROUP_ARN2=$(aws elbv2 describe-target-groups --names adora-alb-tg-http --query "TargetGroups[*].TargetGroupArn" --output text)
echo "Target Groups: $TARGET_GROUP_ARN & $TARGET_GROUP_ARN2"

LB_CONF=targetGroupArn=$TARGET_GROUP_ARN,containerName=adora-ms,containerPort=3100
echo "Load Balancer config: $LB_CONF"

LB_CONF2=targetGroupArn=$TARGET_GROUP_ARN2,containerName=adora-ms,containerPort=3100
echo "Load Balancer config: $LB_CONF2"

aws ecs create-service \
  --cluster adora-prod \
  --service-name adora-prod-service \
  --task-definition adora_prod_family:3 \
  --desired-count 1 \
  --load-balancers $LB_CONF $LB_CONF2 \
  --network-configuration "awsvpcConfiguration={subnets=[$subnet1, $subnet2],securityGroups=[$groupId],assignPublicIp=ENABLED}" \
  --launch-type "FARGATE"


# aws elbv2 register-targets \
#     --target-group-arn $TARGET_GROUP_ARN \
#     --targets Id=10.0.0.198

# aws elbv2 register-targets \
#     --target-group-arn $TARGET_GROUP_ARN2 \
#     --targets Id=10.0.0.198

# excluir o service
aws ecs delete-service --cluster adora-prod --service adora-prod-service 
#desregistrar a task_definition
aws ecs deregister-task-definition \
  --task-definition adora_prod_family:1
# excluir o cluster

# curl -f http://localhost:3100/api/health || exit 1