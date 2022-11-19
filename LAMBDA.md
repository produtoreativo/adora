# Portando o projeto para lambda
## Versões

```sh
node -v 
# v18.8.0
npm -v
# 8.18.0
yarn -v
# 1.22.19
```
## criar credenciais

```sh
source .env
mkdir ~/.aws
touch ~/.aws/credentials

echo "[default]" >> ~/.aws/credentials
echo "aws_access_key_id = $APP_ACCESS_KEY_ID" >> ~/.aws/credentials
echo "aws_secret_access_key = $APP_SECRET_ACCESS_KEY" >> ~/.aws/credentials
```

## deploy

Usando o https://www.serverless.com/ para deploy e execução local no formato de lambda

```sh
npm install -g serverless
```
## Configuração 

Conf no serverless.yaml e main adaptada em src/lambda.ts

## Execução

sls offline start
