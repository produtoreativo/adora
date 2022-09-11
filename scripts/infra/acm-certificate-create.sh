# chmod +x scripts/infra/acm-certificate-create.sh

DNS=api.adora.produtoreativo.com.br

# aws acm request-certificate \
#       --domain-name $DNS \
#       --validation-method DNS

ACM_ARN=$(aws acm list-certificates --query "CertificateSummaryList[?DomainName=='$DNS'].CertificateArn" --output text)

aws acm describe-certificate --certificate-arn $ACM_ARN