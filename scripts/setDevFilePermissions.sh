BASEDIR=$(dirname $0)

if [[ ${NODE_ENV} == "development" ]]; then
  chmod 777 -R $BASEDIR/../dist/
fi
