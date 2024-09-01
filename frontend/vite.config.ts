import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@frontend/': `${__dirname}/src/`,
      '@server/': `${__dirname}/../server/src/`,
    },
  },
})
