# Adora (DORA Metrics tool)

> So we fix our eyes not on what is seen, but on what is unseen, since what is seen is temporary, but what is unseen is eternal.
> 
> [2 Coríntios 4:18](https://www.bibliaonline.com.br/niv/2co/4/18)


docker build -t adora .
docker run -p 3100:3100 adora
docker rm $(docker stop $(docker ps -a -q --filter ancestor=adora --format="{{.ID}}"))

https://linearb.io/blog/cycle-time-measuring-and-improving-team-process/