"use client"
import { useEnv } from '@/context/EnvContext';
import { useSettingsStore } from '../Store/SettingsStore';

export default function Config(){
    const env = useEnv();
    const addressSettings = useSettingsStore(state => state.comfyUIAddress);

    return { comfyUIBaseAddress: addressSettings == null ? env.ComfyUI_BASE_ADDRESS : addressSettings};
}