"use server"

export const getEnvs = async () => {
  return {
    // Feature Flags
    //NEW_FEATURE_ENABLED: process.env.NEW_FEATURE_ENABLED,
    // Environment Variables
    ComfyUI_BASE_ADDRESS: process.env.ComfyUI_BASE_ADDRESS,
    // Values
    //HAS_SUBSCRIPTION: process.env.HAS_SUBSCRIPTION,
  };
};