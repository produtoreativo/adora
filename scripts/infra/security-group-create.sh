vpcId=$(aws ec2 describe-vpcs --query "Vpcs[*].VpcId" --filter "Name=tag:Name,Values=adora-vpc" --output text)
echo "ID da VPC: $vpcId"

aws ec2 create-security-group --group-name adora-sg --description "Adora security group" --vpc-id $vpcId
groupId=$(aws ec2 describe-security-groups --filter "Name=group-name,Values=adora-sg" --query "SecurityGroups[*].GroupId" --output text)
echo "Security Group $groupId"

# Com o Group-id, acrescentar 80
aws ec2 authorize-security-group-ingress \
    --group-id $groupId \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0 

# Com o Group-id, acrescentar 443
aws ec2 authorize-security-group-ingress \
    --group-id $groupId \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0
# ---------------------------