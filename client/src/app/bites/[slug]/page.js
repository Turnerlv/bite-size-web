import { Sandpack } from "@codesandbox/sandpack-react"

export default function App() {
    return (
        <div className="pt-20 page-padding">
            <Sandpack
                template="react"
                files={{
                    "/App.js": `export default function App() {
                    return <h1>Hello Sandpack</h1>
                    }`,
                }}
            />
        </div>
    );
}
