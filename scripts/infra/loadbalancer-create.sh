# chmod +x scripts/infra/loadbalancer-create.sh
vpcId=$(aws ec2 describe-vpcs --query "Vpcs[*].VpcId" --filter "Name=tag:Name,Values=adora-vpc" --output text)
groupId=$(aws ec2 describe-security-groups --filter "Name=group-name,Values=adora-sg-elb" --query "SecurityGroups[*].GroupId" --output text) 
subnet1=$(aws ec2 describe-subnets --query "Subnets[*].SubnetId" --filter "Name=tag:Name,Values=adora-subnet1" --output text)
subnet2=$(aws ec2 describe-subnets --query "Subnets[*].SubnetId" --filter "Name=tag:Name,Values=adora-subnet2" --output text)

echo "Subnets da VPC ($vpcId) : [$subnet1, $subnet2] de zonas diferentes"
echo "Security Group $groupId"

# Default é --type application --scheme internet-facing
aws elbv2 create-load-balancer \
  --name adora-load-balancer  \
  --security-groups $groupId \
  --subnets $subnet1 $subnet2

LB_ARN=$(aws elbv2 describe-load-balancers --names adora-load-balancer --query "LoadBalancers[*].LoadBalancerArn" --output text)
echo "Load Balancer ($LB_ARN)"

#______________________________________
## TODO: Falta colocar o Healthcheck

aws elbv2 create-target-group \
  --name adora-alb-tg \
  --protocol HTTP \
  --port 3100 \
  --vpc-id $vpcId \
  --target-type ip

TARGET_GROUP_ARN=$(aws elbv2 describe-target-groups --names adora-alb-tg --query "TargetGroups[*].TargetGroupArn" --output text)
echo "Target Group $TARGET_GROUP_ARN"
# aws elbv2 create-target-group \
#   --name adora-alb-tg-http \
#   --protocol HTTP \
#   --port 80 \
#   --vpc-id $vpcId \
#   --target-type ip

# aws elbv2 create-target-group \
#   --name adora-alb-tg-https \
#   --protocol HTTPS \
#   --port 443 \
#   --vpc-id $vpcId \
#   --target-type ip

# TARGET_GROUP_ARN=$(aws elbv2 describe-target-groups --names adora-alb-tg-https --query "TargetGroups[*].TargetGroupArn" --output text)
# TARGET_GROUP_ARN2=$(aws elbv2 describe-target-groups --names adora-alb-tg-http --query "TargetGroups[*].TargetGroupArn" --output text)
#______________________________________



# ENTENDI QUE AO CRIAR O ECS SERVICE ELE VAI ATRIBUIR
# aws elbv2 register-targets \
#     --target-group-arn $TARGET_GROUP_ARN \
#     --targets Id=$LB_ARN

# aws elbv2 register-targets \
#     --target-group-arn $TARGET_GROUP_ARN \
#     --targets Id=$LB_ARN

DNS=api.adora.produtoreativo.com.br
ACM_ARN=$(aws acm list-certificates --query "CertificateSummaryList[?DomainName=='$DNS'].CertificateArn" --output text)
aws elbv2 create-listener \
    --load-balancer-arn $LB_ARN \
    --protocol HTTPS --port 443  \
    --certificates CertificateArn=$ACM_ARN \
    --default-actions Type=forward,TargetGroupArn=$TARGET_GROUP_ARN

aws elbv2 create-listener \
    --load-balancer-arn $LB_ARN \
    --protocol HTTP --port 80  \
    --default-actions Type=forward,TargetGroupArn=$TARGET_GROUP_ARN