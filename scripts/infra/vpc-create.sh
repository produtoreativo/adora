aws ec2 create-vpc \
    --cidr-block 10.0.0.0/16 \
    --tag-specification ResourceType=vpc,Tags='[{Key=Name,Value=adora-vpc}]'
# Pegar o ID das VPC
vpcId=$(aws ec2 describe-vpcs --query "Vpcs[*].VpcId" --filter "Name=tag:Name,Values=adora-vpc" --output text)
echo "ID da VPC: $vpcId"

# Pegar os IDs das zonas disponiveis
# aws ec2 describe-availability-zones --query "AvailabilityZones[*].ZoneId"

aws ec2 create-subnet \
  --availability-zone-id use1-az1 \
  --vpc-id $vpcId \
  --cidr-block 10.0.1.0/24 \
  --tag-specification ResourceType=subnet,Tags='[{Key=Name,Value=adora-subnet1}]'

aws ec2 create-subnet \
  --availability-zone-id use1-az2 \
  --vpc-id $vpcId \
  --cidr-block 10.0.0.0/24 \
  --tag-specification ResourceType=subnet,Tags='[{Key=Name,Value=adora-subnet2}]'

subnet1=$(aws ec2 describe-subnets --query "Subnets[*].SubnetId" --filter "Name=tag:Name,Values=adora-subnet1" --output text)
subnet2=$(aws ec2 describe-subnets --query "Subnets[*].SubnetId" --filter "Name=tag:Name,Values=adora-subnet2" --output text)
echo "Subnets da VPC($vpcId): [$subnet1, $subnet2]"

aws ec2 modify-subnet-attribute \
  --subnet-id $subnet1 \
  --map-public-ip-on-launch

aws ec2 modify-subnet-attribute \
  --subnet-id $subnet2 \
  --map-public-ip-on-launch

aws ec2 create-internet-gateway \
  --tag-specification ResourceType=internet-gateway,Tags='[{Key=Name,Value=adora-internet-gateway}]'
igw=$(aws ec2 describe-internet-gateways --query "InternetGateways[*].InternetGatewayId" --filter "Name=tag:Name,Values=adora-internet-gateway" --output text)
echo "Internet Gateway: $igw"

echo "Anexar o internet gateway ao VPC"
aws ec2 attach-internet-gateway --vpc-id $vpcId --internet-gateway-id $igw

echo "Criar um custom route table para o VPC"
# rtb=$(aws ec2 create-route-table --vpc-id $vpcId --query RouteTable.RouteTableId --output text)
aws ec2 create-route-table \
  --vpc-id $vpcId \
  --tag-specification ResourceType=route-table,Tags='[{Key=Name,Value=adora-route-table}]'
rtb=$(aws ec2 describe-route-tables --query "RouteTables[*].RouteTableId" --filter "Name=tag:Name,Values=adora-route-table" --output text)
echo "Route Table: $rtb"

echo "Criar uma route na route table que aponta todo o trafego (0.0.0.0/0) para o internet gateway"
aws ec2 create-route \
  --route-table-id $rtb \
  --destination-cidr-block 0.0.0.0/0 \
  --gateway-id $igw

echo "verifica se funcionou adicionar uma rota ao internet gateway"
aws ec2 describe-route-tables --route-table-id $rtb

echo "Associar as subnets ($subnet1, $subnet2) com a custom route table ($rtb)"
aws ec2 associate-route-table  --subnet-id $subnet1 --route-table-id $rtb
aws ec2 associate-route-table  --subnet-id $subnet2 --route-table-id $rtb

echo "(Opcional) Modificar as subnets ($subnet1, $subnet2) para receber um IP público"
aws ec2 modify-subnet-attribute --subnet-id $subnet1 --map-public-ip-on-launch
aws ec2 modify-subnet-attribute --subnet-id $subnet2 --map-public-ip-on-launch