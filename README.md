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

docker run --rm -d -p 3100:3100 --name adora 467588053624.dkr.ecr.us-east-2.amazonaws.com/adora:addf4f6b5f61865da02c8d78d9452c0b6d7d907a


Branch created https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#create

Pull Request Opened https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request

Merge to master https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#push





{
  "event": "create",
  "repository": "produtoreativo/payments",
  "commit": "9e733d2e2f4e6780e3b434573e2e35f132de6913",
  "ref": "refs/heads/feat(104)",
  "head": "",
  "workflow": "Branch Created",
  "data": {
    "ref": "feat(104)",
    "eventType": "START_CYCLE",
    "name": "Coding Time"
  },
  "requestID": "2be41f26-cad0-4fff-8914-44c2cfa47504"
}

9e733d2e2f4e6780e3b434573e2e35f132de6913