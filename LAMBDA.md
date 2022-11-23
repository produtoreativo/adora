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

Criar pares de chaves em https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/security_credentials  
Lembrar de trocar a regiao na URL caso use outra.

## Instalar e autenticar o CLI da AWS
Encontra em https://docs.aws.amazon.com/pt_br/cli/latest/userguide/getting-started-install.html

Logar o cli e passar as info: dados da chave, region e formato json
```sh
aws configure
```

## configurar as crendentials para o CLI da AWS

```sh
source .env
# observar o .env-example para configurar
mkdir ~/.aws
touch ~/.aws/credentials

echo "[default]" >> ~/.aws/credentials
echo "aws_access_key_id = $APP_ACCESS_KEY_ID" >> ~/.aws/credentials
echo "aws_secret_access_key = $APP_SECRET_ACCESS_KEY" >> ~/.aws/credentials
```

## Provisionamento

Usando o https://www.serverless.com/ para deploy e execução local no formato de lambda

```sh
npm install -g serverless
```
## Como funcioa

O Serverless exige o arquivo serverless.yaml com a configuração adequada para deployar ou rodar localmente.  

O código do Nest foi adaptado pra rodar com o Express habilitado para Lambda e construímos isso em src/lambda.ts

Observar se precisa colocar mais algum plugin no serverless.

## Levantar o Dynamo local
```sh
cd ./dynamodb && docker-compose up -d
```

Ou usar a sessão custom no serverless.yaml e executar:
```sh
#sls dynamodb install 
#sls dynamodb start
sls dynamodb migrate
```

## Execução

```sh
sls offline start
```

Ou com hot-reload, esse parâmetro reloadHandler recarrega o nest em cada chamada, é aceitar isso em dev ou ter que configurar o nodemon porque o plugin offline recompila, mas não recarrega o handler.

```sh
sls offline start --reloadHandler
```

## Migration do Dynamo
```sh
serverless dynamodb migrate
```
## Deploy

```sh
sls deploy
```