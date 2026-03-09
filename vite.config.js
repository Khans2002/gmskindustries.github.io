import { defineConfig } from 'vite';

export default defineConfig({
    base: '/gmskindustries.github.io/',
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
    }
});
