import { Suspense } from "react";
import { SettingForm } from "./components/settingForm";
import "./styles.css";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <SettingForm />
      </div>
    </Suspense>
  );
}
