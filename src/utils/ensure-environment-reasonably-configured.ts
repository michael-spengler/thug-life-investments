

export const ensureEnvironmentIsReasonablyConfigured = async (): Promise<any | undefined> => {
  console.log("ensuring the environment is reasonably configured...");

  if (process.env.ACCOUNT === undefined || process.env.ACCOUNT.length < 10) {
    throw new Error(
      `Please copy the .env.example file to .env and add your data for the wallet you want to optimize.`
    );
  } else {
    console.log(
      `optimizing crypto investments for wallet: ${process.env.ACCOUNT} on a regular basis`
    );
  }
  
};
