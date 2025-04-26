import PythonRunner from "../../components/PythonRunner";
export default function WorkspaceScreen() {
    return <div className="w-screen h-screen flex px-6">
    <PythonRunner showLintButton expandOutput  />
    </div>;
}