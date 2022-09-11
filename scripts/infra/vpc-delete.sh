vpcId=$(aws ec2 describe-vpcs --query "Vpcs[*].VpcId" --filter "Name=tag:Name,Values=adora-vpc" --output text)

echo "ID da VPC: $vpcId"

subnet1=$(aws ec2 describe-subnets --query "Subnets[*].SubnetId" --filter "Name=tag:Name,Values=adora-subnet1" --output text)
subnet2=$(aws ec2 describe-subnets --query "Subnets[*].SubnetId" --filter "Name=tag:Name,Values=adora-subnet2" --output text)

echo "Subnets da VPC($vpcId): [$subnet1, $subnet2]"

igw=$(aws ec2 describe-internet-gateways --query "InternetGateways[*].InternetGatewayId" --filter "Name=tag:Name,Values=adora-internet-gateway" --output text)
echo "Internet Gateway: $igw"

rtb=$(aws ec2 describe-route-tables --query "RouteTables[*].RouteTableId" --filter "Name=tag:Name,Values=adora-route-table" --output text)
echo "Route Table: $rtb"

aws ec2 delete-subnet --subnet-id $subnet1
aws ec2 delete-subnet --subnet-id $subnet2
aws ec2 detach-internet-gateway --internet-gateway-id $igw --vpc-id $vpcId
aws ec2 delete-internet-gateway --internet-gateway-id $igw
aws ec2 delete-route-table --route-table-id $rtb
aws ec2 delete-vpc --vpc-id $vpcId