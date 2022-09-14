# https://github.com/ankitpokhrel/jira-cli
# No MAC
# brew tap ankitpokhrel/jira-cli
# brew install jira-cli

# exemplo:
# chmod +x scripts/jira-config.sh
# 
# scripts/jira-config.sh mQpeWBpiTFMozGZHNdUI38B4 https://adora-prodops.atlassian.net cmilfont@gmail.com "AD" "quadro AD"

JIRA_API_TOKEN=$1
SERVER=$2
LOGIN=$3
PROJECT=$4
BOARD=$5

echo "export JIRA_API_TOKEN=$JIRA_API_TOKEN" > ~/.bash_profile
source ~/.bash_profile
# cat ~/.bash_profile
# ? Config already exist. Do you want to overwrite? Yes
# ? Installation type: Cloud
# ? Link to Jira server: https://adora-prodops.atlassian.net
# ? Login email: cmilfont@gmail.com
# ? Default project: AD
# ? Default board: quadro AD

echo "jira init --installation cloud --server $SERVER --login $LOGIN --project $PROJECT --board \"$BOARD\" --force"
jira init \
  --installation cloud \
  --server $SERVER \
  --login $LOGIN \
  --project $PROJECT \
  --board "$BOARD" \
  --force