import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for glitch.exe interactive narrative engine
export default defineConfig({
  plugins: [react()],
});
