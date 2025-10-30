import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    envPrefix: 'STRESSOFF_',
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT || 3000,
      __BASE_URL__: JSON.stringify(
        mode === 'development'
          ? 'localhost'
          : (process.env.SERVER_HOST ?? 'http://www.sd.lapev.ru'),
      ),
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'ssr.tsx'),
        name: 'Client',
        formats: ['cjs'],
      },
      rollupOptions: {
        output: {
          dir: 'dist-ssr',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
        },
        onwarn(warning, warn) {
          // Suppress "Module level directives cause errors when bundled" warnings
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return
          }
          warn(warning)
        },
      },
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, './src/assets'),
        data: path.resolve(__dirname, './src/data'),
        main: path.resolve(__dirname, './src'),
        api: path.resolve(__dirname, './src/api'),
        pages: path.resolve(__dirname, './src/pages'),
        images: path.resolve(__dirname, './src/images'),
        icons: path.resolve(__dirname, './src/images/icons'),
        routes: path.resolve(__dirname, './src/data/Routes'),
        functions: path.resolve(__dirname, './src/functions'),
        components: path.resolve(__dirname, './src/components'),
        utils: path.resolve(__dirname, './src/utils'),
        hooks: path.resolve(__dirname, './src/hooks'),
        store: path.resolve(__dirname, './src/store'),
        storeUsers: path.resolve(__dirname, './src/store/Users/'),
        storeData: path.resolve(__dirname, './src/store/Data/'),
        storeModals: path.resolve(__dirname, './src/store/Modals/'),
      },
    },
  }
})
