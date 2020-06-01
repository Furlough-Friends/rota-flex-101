const logger = (description: string) => (arg: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.info(`${description}\n`, arg);
  }
  return arg;
};

export default logger;
