# chmod +x scripts/infra/loadbalancer-list.sh

LB_ARN=$(aws elbv2 describe-load-balancers --names adora-load-balancer --query "LoadBalancers[*].LoadBalancerArn" --output text)

echo "Load Balancer ($LB_ARN)"