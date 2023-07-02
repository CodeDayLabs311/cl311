import { EnvironmentVariableKey } from '@/models';

const getEnv = (): Record<EnvironmentVariableKey, string | undefined> => {
    return process.env as unknown as Record<EnvironmentVariableKey, string | undefined>;
};

export const getStage = (): string | undefined => {
    return getEnv()[EnvironmentVariableKey.STAGE];
};

export const getTenant = (): string | undefined => {
    return getEnv()[EnvironmentVariableKey.TENANT];
};
