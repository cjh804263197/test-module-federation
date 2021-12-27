import React, { Suspense } from "react";
// 两种引入方式
// import { Button as RemoteButton, ButtonProps } from "app2/Button";
// import { ModelPlayer } from 'MeshModelPlayer/ModelPlayer';
// or
const RemoteButton = React.lazy(() => import("app2/Button").then(({ Button }) => ({ default: Button }) ));
const ModelPlayer = React.lazy(() => import("mesh/ModelPlayer"));

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>App 1</h2>
    <Suspense fallback="Loading Button">
      <RemoteButton />
    </Suspense>
    <Suspense fallback="Loading Player">
      <ModelPlayer modelUrl="https://oss.meshkit.cn/mesh-share-bucket/cc_projects/210317hongxingwenzhoushengmingjiankangxiaozhen/terra_b3dms/tileset.json" />
    </Suspense>
  </div>
);

export default App;
