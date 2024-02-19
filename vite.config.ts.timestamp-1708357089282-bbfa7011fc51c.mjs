// vite.config.ts
import vue from "file:///D:/code/wa-store-set/node_modules/.store/@vitejs+plugin-vue@4.6.2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/code/wa-store-set/node_modules/.store/@vitejs+plugin-vue-jsx@3.1.0/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "file:///D:/code/wa-store-set/node_modules/.store/vite@4.5.2/node_modules/vite/dist/node/index.js";
import mkcert from "file:///D:/code/wa-store-set/node_modules/.store/vite-plugin-mkcert@1.17.3/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import postCssPxToRem from "file:///D:/code/wa-store-set/node_modules/.store/wa-postcss-pxtorem@0.0.1/node_modules/wa-postcss-pxtorem/index.js";
import tailwindCss from "file:///D:/code/wa-store-set/node_modules/.store/tailwindcss@3.4.1/node_modules/tailwindcss/lib/index.js";
import { viteMockServe } from "file:///D:/code/wa-store-set/node_modules/.store/vite-plugin-mock@2.9.8/node_modules/vite-plugin-mock/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/code/wa-store-set/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig(
  // @ts-ignore
  ({ command, mode }) => {
    const envData = loadEnv(mode, path.resolve(process.cwd(), "env"));
    console.log("envData\u73AF\u5883\u53D8\u91CF", envData);
    return {
      base: "admin",
      plugins: [
        vue(),
        vueJsx(),
        mkcert(),
        viteMockServe({
          mockPath: "mock",
          injectFile: command === "serve" ? path.resolve(process.cwd(), "mock/test/*.ts") : path.resolve(process.cwd(), "mock/prod/*.ts"),
          localEnabled: command === "serve",
          prodEnabled: true
        })
      ],
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
        https: false,
        port: 5500,
        proxy: {
          "api": {
            target: "127.0.0.1:12001",
            changeOrigin: true
          }
        }
      },
      css: {
        postcss: {
          plugins: [
            postCssPxToRem({
              rootValue: 32,
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
      },
      envDir: "env"
      // 注册进vite的参数
    };
  }
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXHdhLXN0b3JlLXNldFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFx3YS1zdG9yZS1zZXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvd2Etc3RvcmUtc2V0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgcGF0aCwgeyBkaXJuYW1lIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnXG5pbXBvcnQgeyBDb25maWdFbnYsIFVzZXJDb25maWdFeHBvcnQsIGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCdcbmltcG9ydCBwb3N0Q3NzUHhUb1JlbSBmcm9tICd3YS1wb3N0Y3NzLXB4dG9yZW0nXG5pbXBvcnQgdGFpbHdpbmRDc3MgZnJvbSAndGFpbHdpbmRjc3MnXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcblxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKVxuY29uc3QgX19kaXJuYW1lID0gZGlybmFtZShfX2ZpbGVuYW1lKVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKFxuICAvLyBAdHMtaWdub3JlXG4gICh7IGNvbW1hbmQsIG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZ0V4cG9ydCA9PiB7XG4gICAgY29uc3QgZW52RGF0YSA9IGxvYWRFbnYobW9kZSwgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdlbnYnKSlcbiAgICBjb25zb2xlLmxvZygnZW52RGF0YVx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRicsIGVudkRhdGEpXG4gICAgcmV0dXJuIHtcbiAgICAgIGJhc2U6ICdhZG1pbicsXG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIHZ1ZSgpLFxuICAgICAgICB2dWVKc3goKSxcbiAgICAgICAgbWtjZXJ0KCksXG4gICAgICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgICAgIG1vY2tQYXRoOiAnbW9jaycsXG4gICAgICAgICAgaW5qZWN0RmlsZTpcbiAgICAgICAgICAgIGNvbW1hbmQgPT09ICdzZXJ2ZSdcbiAgICAgICAgICAgICAgPyBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ21vY2svdGVzdC8qLnRzJylcbiAgICAgICAgICAgICAgOiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ21vY2svcHJvZC8qLnRzJyksXG4gICAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnLFxuICAgICAgICAgIHByb2RFbmFibGVkOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICBdLFxuICAgICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgICAgIGhvb2tzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2hvb2tzJyksXG4gICAgICAgICAgc3R5bGVzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0eWxlcycpLFxuICAgICAgICAgIHBhZ2VzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyksXG4gICAgICAgICAgY29tcG9uZW50czogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXG4gICAgICAgICAgbW9ja3M6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdtb2NrcycpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgaHR0cHM6IGZhbHNlLFxuICAgICAgICBwb3J0OiA1NTAwLFxuICAgICAgICBwcm94eToge1xuICAgICAgICAgICdhcGknOiB7XG4gICAgICAgICAgICB0YXJnZXQ6ICcxMjcuMC4wLjE6MTIwMDEnLFxuICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNzczoge1xuICAgICAgICBwb3N0Y3NzOiB7XG4gICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgcG9zdENzc1B4VG9SZW0oe1xuICAgICAgICAgICAgICByb290VmFsdWU6IDMyLFxuICAgICAgICAgICAgICBwcm9wTGlzdDogWycqJ10sXG4gICAgICAgICAgICAgIHNlbGVjdG9yQmxhY2tMaXN0OiBbJy4vdG8nLCAnaHRtbCddLCAvLyB0b1x1NUYwMFx1NTkzNFx1NzY4NFx1NEUwRFx1OEZEQlx1ODg0Q1x1OEY2Q1x1NjM2MixcbiAgICAgICAgICAgICAgZXhjbHVkZTogJy9ub2RlX21vZHVsZXMnLFxuICAgICAgICAgICAgICB1bml0OiAnd3gnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhaWx3aW5kQ3NzKClcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvbWFpbi5zY3NzXCI7J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVudkRpcjogJ2VudicgLy8gXHU2Q0U4XHU1MThDXHU4RkRCdml0ZVx1NzY4NFx1NTNDMlx1NjU3MFxuICAgIH1cbiAgfVxuKVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUCxPQUFPLFNBQVM7QUFDcFEsT0FBTyxZQUFZO0FBQ25CLE9BQU8sUUFBUSxlQUFlO0FBQzlCLFNBQVMscUJBQXFCO0FBQzlCLFNBQXNDLGNBQWMsZUFBZTtBQUNuRSxPQUFPLFlBQVk7QUFDbkIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxxQkFBcUI7QUFSdUgsSUFBTSwyQ0FBMkM7QUFVdE0sSUFBTSxhQUFhLGNBQWMsd0NBQWU7QUFDaEQsSUFBTSxZQUFZLFFBQVEsVUFBVTtBQUdwQyxJQUFPLHNCQUFRO0FBQUE7QUFBQSxFQUViLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBbUM7QUFDbEQsVUFBTSxVQUFVLFFBQVEsTUFBTSxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ2hFLFlBQVEsSUFBSSxtQ0FBZSxPQUFPO0FBQ2xDLFdBQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNQLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLGNBQWM7QUFBQSxVQUNaLFVBQVU7QUFBQSxVQUNWLFlBQ0UsWUFBWSxVQUNSLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxnQkFBZ0IsSUFDNUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGdCQUFnQjtBQUFBLFVBQ2xELGNBQWMsWUFBWTtBQUFBLFVBQzFCLGFBQWE7QUFBQSxRQUNmLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxPQUFPO0FBQUEsVUFDTCxLQUFLLEtBQUssUUFBUSxXQUFXLEtBQUs7QUFBQSxVQUNsQyxPQUFPLEtBQUssUUFBUSxXQUFXLFdBQVc7QUFBQSxVQUMxQyxRQUFRLEtBQUssUUFBUSxXQUFXLFlBQVk7QUFBQSxVQUM1QyxPQUFPLEtBQUssUUFBUSxXQUFXLFdBQVc7QUFBQSxVQUMxQyxZQUFZLEtBQUssUUFBUSxXQUFXLGdCQUFnQjtBQUFBLFVBQ3BELE9BQU8sS0FBSyxRQUFRLFdBQVcsT0FBTztBQUFBLFFBQ3hDO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsT0FBTztBQUFBLFlBQ0wsUUFBUTtBQUFBLFlBQ1IsY0FBYztBQUFBLFVBQ2hCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEtBQUs7QUFBQSxRQUNILFNBQVM7QUFBQSxVQUNQLFNBQVM7QUFBQSxZQUNQLGVBQWU7QUFBQSxjQUNiLFdBQVc7QUFBQSxjQUNYLFVBQVUsQ0FBQyxHQUFHO0FBQUEsY0FDZCxtQkFBbUIsQ0FBQyxRQUFRLE1BQU07QUFBQTtBQUFBLGNBQ2xDLFNBQVM7QUFBQSxjQUNULE1BQU07QUFBQSxZQUNSLENBQUM7QUFBQSxZQUNELFlBQVk7QUFBQSxVQUNkO0FBQUEsUUFDRjtBQUFBLFFBQ0EscUJBQXFCO0FBQUEsVUFDbkIsTUFBTTtBQUFBLFlBQ0osZ0JBQWdCO0FBQUEsVUFDbEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
