import React from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { useWindowDimensions } from '@customHooks/useWindowDimensions';
import { useStoreState } from '../../store/storeHooks';


const ForceGraph = (): JSX.Element => {
    const { height } = useWindowDimensions();
    const forceGraphData = useStoreState((state) => state.forceGraphData);

    return (
        <>
            <ForceGraph3D graphData={forceGraphData} height={height - 61}  nodeAutoColorBy={d => d.name} />
        </>
    );
};

export default ForceGraph;