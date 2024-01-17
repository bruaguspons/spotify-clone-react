import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@hooks',
        replacement: path.resolve(path.join(__dirname, '/src/hooks'))
      },
      {
        find: '@',
        replacement: path.resolve(path.join(__dirname, '/'))
      },
    ]
  }
})
