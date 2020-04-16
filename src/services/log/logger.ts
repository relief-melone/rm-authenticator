import winston, { format, transports } from 'winston';

import configMain from '@/configs/config.main';

const logger = winston.createLogger({
  level: 'info',  
  format: format.json(),
  defaultMeta: { service: 'query-bouncer' },
  transports: [    
    new transports.Console({ level: configMain.logLevel })
  ]
});

export default logger;