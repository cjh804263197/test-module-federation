declare module 'app2/App' {
  /// <reference types="react" />
  const App: () => JSX.Element;
  export default App;

}
declare module 'app2/Button' {
  import { FC, ReactNode } from "react";
  interface Props {
      text?: string | ReactNode;
  }
  const Button: FC<Props>;
  export default Button;

}
declare module 'app2/bootstrap' {
  export {};

}
declare module 'app2' {

}
declare module 'app2/webpack.config' {
  import { ModuleFederationPlugin } from "webpack";
  import HtmlWebpackPlugin = require("html-webpack-plugin");
  import { TuneDtsPlugin } from "@efox/emp-tune-dts-plugin";
  export const entry: string;
  export const mode: string;
  export namespace devServer {
      const contentBase: string;
      const port: number;
  }
  export namespace output {
      const publicPath: string;
  }
  export namespace resolve {
      const extensions: string[];
  }
  export namespace module {
      const rules: {
          test: RegExp;
          use: string;
          exclude: RegExp;
      }[];
  }
  export const plugins: (ModuleFederationPlugin | HtmlWebpackPlugin | TuneDtsPlugin)[];

}
declare module 'app2' {
  import main = require('app2/index.ts');
  export = main;
}