"use client"

import { getEnvs } from "@/utils/env";
import { createContext, useContext, useEffect, useState } from "react";

export const EnvContext = createContext();

export const EnvProvider = ({ children }) => {
    const [env, setEnv] = useState();

    useEffect( () => {
        getEnvs().then((env) => {
            setEnv(env);
        });
    }, []);

    return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>
}

export const useEnv = () => {
    return useContext(EnvContext);
}