# chmod +x scripts/infra/loadbalancer-delete.sh

LB_ARN=$(aws elbv2 describe-load-balancers --names adora-load-balancer --query "LoadBalancers[*].LoadBalancerArn" --output text)

echo "Load Balancer ($LB_ARN)"

aws elbv2 delete-load-balancer \
  --load-balancer-arn $LB_ARN