// // import react from '@vitejs/plugin-react'
// // import { defineConfig } from 'vite'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Courses-learning-project/",
  server: {
    port: 5177,
    strictPort: true,
    proxy: {
      "/api": {
        target: "https://mockapi-mauve.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],

//   // Required for GitHub Pages deployment
//   base: "/skillora-lms-project/",

//   server: {
//     port: 5177,
//     strictPort: true,
//     proxy: {
//       "/api": {
//         target: "https://mockapi-mauve.vercel.app",
//         changeOrigin: true,
//         secure: true,
//       },
//     },
//   },
// });
