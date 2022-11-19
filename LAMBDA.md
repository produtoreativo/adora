# criar credenciais

```sh
source .env
mkdir ~/.aws
touch ~/.aws/credentials

echo "[default]" >> ~/.aws/credentials
echo "aws_access_key_id = $APP_ACCESS_KEY_ID" >> ~/.aws/credentials
echo "aws_secret_access_key = $APP_SECRET_ACCESS_KEY" >> ~/.aws/credentials
```

# 