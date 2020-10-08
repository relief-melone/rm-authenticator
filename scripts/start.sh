BASEDIR=$(dirname $0)
echo "Current Environment: $NODE_ENV"

if [[ $NODE_ENV == "development" ]]; then
  echo "RUNNING SERVER IN DEVELOPMENT MODE"
  npm run dev
elif [[ $NODE_ENV == "debug" ]]; then
  echo "RUNNING SERVER IN DEBUG MODE"
  npm run debug
else
  echo "RUNNING SERVER IN PRODUCTION MODE"
  npm run start
fi