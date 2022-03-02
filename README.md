# Adora (DORA Metrics tool)

> So we fix our eyes not on what is seen, but on what is unseen, since what is seen is temporary, but what is unseen is eternal.
> 
> [2 Coríntios 4:18](https://www.bibliaonline.com.br/niv/2co/4/18)


docker build -t adora .
docker run --rm -d -p 3100:3100 adora
docker rm $(docker stop $(docker ps -a -q --filter ancestor=adora --format="{{.ID}}"))

docker pull 467588053624.dkr.ecr.us-east-2.amazonaws.com/adora:b6d40f9ea33da5beb1b72f2461ac58cdfe146570

docker run --rm -d -p 3100:3100 --name adora 467588053624.dkr.ecr.us-east-2.amazonaws.com/adora:b6d40f9ea33da5beb1b72f2461ac58cdfe146570

https://linearb.io/blog/cycle-time-measuring-and-improving-team-process/