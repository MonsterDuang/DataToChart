import { createSSRApp } from "vue";
import App from "./App.vue";
import ViewUIPlus from "view-ui-plus";
import 'view-ui-plus/dist/styles/viewuiplus.css'
export function createApp() {
  const app = createSSRApp(App);
  app.use(ViewUIPlus);
  return {
    app,
  };
}
