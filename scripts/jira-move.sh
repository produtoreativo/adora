# chmod +x scripts/jira-move.sh

# scripts/jira-move.sh "AD-1"
JIRA_ID=$1
echo "Movendo $JIRA_ID para o status Selected for Development"
jira issue move $JIRA_ID "Selected for Development"