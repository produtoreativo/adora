# chmod +x scripts/jira-create-issue.sh

# scripts/jira-create-issue.sh

# Pass required parameters and use --no-input option to skip prompt
jira issue create \
  -tBug \
  -s"New Bug" \
  -yHigh \
  -lbug \
  -lurgent \
  -b"Bug description" \
  --no-input