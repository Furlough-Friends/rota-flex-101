const logService = (description: string) => (arg: any) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info(`${description}\n`, arg);
  }
  return arg;
};

export default logService;
