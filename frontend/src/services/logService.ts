import { isProduction } from '../utils/environment';

const logService = (description: string) => <T>(arg: T) => {
  if (!isProduction()) {
    // eslint-disable-next-line no-console
    console.info(`${description}\n`, arg);
  }
  return arg;
};

export default logService;
