// vite.config.ts
import vue from "file:///C:/code/store-operations-admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/code/store-operations-admin/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "file:///C:/code/store-operations-admin/node_modules/vite/dist/node/index.js";
import mkcert from "file:///C:/code/store-operations-admin/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import postCssPxToRem from "file:///C:/code/store-operations-admin/node_modules/wa-postcss-pxtorem/index.js";
import tailwindCss from "file:///C:/code/store-operations-admin/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/code/store-operations-admin/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [vue(), vueJsx(), mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      hooks: path.resolve(__dirname, "src/hooks"),
      styles: path.resolve(__dirname, "src/styles"),
      pages: path.resolve(__dirname, "src/pages"),
      components: path.resolve(__dirname, "src/components"),
      mocks: path.resolve(__dirname, "mocks")
    }
  },
  server: {
    https: false
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 75,
          propList: ["*"],
          selectorBlackList: ["./to", "html"],
          // to开头的不进行转换,
          exclude: "/node_modules",
          unit: "wx"
        }),
        tailwindCss()
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/main.scss";'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxjb2RlXFxcXHN0b3JlLW9wZXJhdGlvbnMtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGNvZGVcXFxcc3RvcmUtb3BlcmF0aW9ucy1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovY29kZS9zdG9yZS1vcGVyYXRpb25zLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgcGF0aCwgeyBkaXJuYW1lIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IG1rY2VydCBmcm9tICd2aXRlLXBsdWdpbi1ta2NlcnQnXG5pbXBvcnQgcG9zdENzc1B4VG9SZW0gZnJvbSAnd2EtcG9zdGNzcy1weHRvcmVtJ1xuaW1wb3J0IHRhaWx3aW5kQ3NzIGZyb20gJ3RhaWx3aW5kY3NzJ1xuXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKF9fZmlsZW5hbWUpXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdnVlKCksIHZ1ZUpzeCgpLCBta2NlcnQoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICBob29rczogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9ob29rcycpLFxuICAgICAgc3R5bGVzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0eWxlcycpLFxuICAgICAgcGFnZXM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcGFnZXMnKSxcbiAgICAgIGNvbXBvbmVudHM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cycpLFxuICAgICAgbW9ja3M6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdtb2NrcycpXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBodHRwczogZmFsc2VcbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICBwb3N0Q3NzUHhUb1JlbSh7XG4gICAgICAgICAgcm9vdFZhbHVlOiA3NSxcbiAgICAgICAgICBwcm9wTGlzdDogWycqJ10sXG4gICAgICAgICAgc2VsZWN0b3JCbGFja0xpc3Q6IFsnLi90bycsICdodG1sJ10sIC8vIHRvXHU1RjAwXHU1OTM0XHU3Njg0XHU0RTBEXHU4RkRCXHU4ODRDXHU4RjZDXHU2MzYyLFxuICAgICAgICAgIGV4Y2x1ZGU6ICcvbm9kZV9tb2R1bGVzJyxcbiAgICAgICAgICB1bml0OiAnd3gnXG4gICAgICAgIH0pLFxuICAgICAgICB0YWlsd2luZENzcygpXG4gICAgICBdXG4gICAgfSxcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4vc3JjL3N0eWxlcy9tYWluLnNjc3NcIjsnXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUixPQUFPLFNBQVM7QUFDbFMsT0FBTyxZQUFZO0FBQ25CLE9BQU8sUUFBUSxlQUFlO0FBQzlCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUNuQixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLGlCQUFpQjtBQVBpSixJQUFNLDJDQUEyQztBQVMxTixJQUFNLGFBQWEsY0FBYyx3Q0FBZTtBQUNoRCxJQUFNLFlBQVksUUFBUSxVQUFVO0FBR3BDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUFBLEVBQ25DLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLFdBQVcsS0FBSztBQUFBLE1BQ2xDLE9BQU8sS0FBSyxRQUFRLFdBQVcsV0FBVztBQUFBLE1BQzFDLFFBQVEsS0FBSyxRQUFRLFdBQVcsWUFBWTtBQUFBLE1BQzVDLE9BQU8sS0FBSyxRQUFRLFdBQVcsV0FBVztBQUFBLE1BQzFDLFlBQVksS0FBSyxRQUFRLFdBQVcsZ0JBQWdCO0FBQUEsTUFDcEQsT0FBTyxLQUFLLFFBQVEsV0FBVyxPQUFPO0FBQUEsSUFDeEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsZUFBZTtBQUFBLFVBQ2IsV0FBVztBQUFBLFVBQ1gsVUFBVSxDQUFDLEdBQUc7QUFBQSxVQUNkLG1CQUFtQixDQUFDLFFBQVEsTUFBTTtBQUFBO0FBQUEsVUFDbEMsU0FBUztBQUFBLFVBQ1QsTUFBTTtBQUFBLFFBQ1IsQ0FBQztBQUFBLFFBQ0QsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBQUEsSUFDQSxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
