groupId=$(aws ec2 describe-security-groups --filter "Name=group-name,Values=adora-sg" --query "SecurityGroups[*].GroupId" --output text)
echo "Security Group $groupId"

aws ec2 delete-security-group --group-id $groupId