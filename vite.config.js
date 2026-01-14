import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        watch: {
            ignored: ['**/.env', '**/vite.config.js'],
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                services: resolve(__dirname, 'services.html'),
                agents: resolve(__dirname, 'agents.html'),
                casestudies: resolve(__dirname, 'case-studies.html'),
            },
        },
    },
});
