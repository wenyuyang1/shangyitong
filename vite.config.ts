import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        // 代理尽量写域名，如果写ip时要把端口号带上
        target: 'http://syt.atguigu.cn',
        changeOrigin: true,
      }
    }
  }
})
