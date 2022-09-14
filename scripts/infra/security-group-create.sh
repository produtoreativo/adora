vpcId=$(aws ec2 describe-vpcs --query "Vpcs[*].VpcId" --filter "Name=tag:Name,Values=adora-vpc" --output text)
echo "ID da VPC: $vpcId"

aws ec2 create-security-group \
    --group-name adora-sg-elb \
    --description "Adora - ELB Allowed Ports" \
    --vpc-id $vpcId
SG_ELB_ID=$(aws ec2 describe-security-groups --filter "Name=group-name,Values=adora-sg-elb" --query "SecurityGroups[*].GroupId" --output text)
echo "Security Group $SG_ELB_ID"

# Com o Group-id, acrescentar 80
aws ec2 authorize-security-group-ingress \
    --group-id $SG_ELB_ID \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0 

# Com o Group-id, acrescentar 443
aws ec2 authorize-security-group-ingress \
    --group-id $SG_ELB_ID \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0
# ---------------------------


aws ec2 create-security-group \
    --group-name adora-sg-ecs \
    --description "Adora - ECS Allowed Ports" \
    --vpc-id $vpcId
SG_ECS_ID=$(aws ec2 describe-security-groups --filter "Name=group-name,Values=adora-sg-ecs" --query "SecurityGroups[*].GroupId" --output text)
echo "Security Group $SG_ECS_ID"

aws ec2 authorize-security-group-ingress \
    --group-id $SG_ECS_ID \
    --protocol tcp \
    --port 3100 \
    --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
    --group-id $SG_ECS_ID \
    --protocol tcp \
    --port "1 - 65535" \
    --source-group $SG_ELB_ID
    #--cidr $SG_ELB_ID