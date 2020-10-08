BASEDIR=$(dirname $0)
echo "Starting Script: $RUN_SCRIPT"

if [[ $NODE_ENV == "development" ]]; then
  echo "RUNNING SERVER IN DEVELOPMENT MODE"
  npm run dev
else
  echo "RUNNING SERVER IN PRODUCTION MODE"
  npm run start
fi