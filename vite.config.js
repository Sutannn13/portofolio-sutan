const { defineConfig } = require('vite')

module.exports = defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                sertifikat: 'sertifikat.html',
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
})
