import React, { useEffect, useState } from "react";
import { useStoreState } from "../../../store/storeHooks";

const RoyAlgorithmOutput = (): JSX.Element => {
    const graph = useStoreState((state) => state.graph);
    const [output, setOutput] = useState<string>('');

    useEffect(() => {
        const { distances, nextVertices } = graph.roy();
        console.log(JSON.stringify(distances));
        console.log(JSON.stringify(nextVertices));
        setOutput(`${JSON.stringify(distances)}
        
        ${JSON.stringify(nextVertices)}
        `)
    }, [])

    return <div>{output}</div>
};

export default RoyAlgorithmOutput;