import React, { useEffect, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { useWindowDimensions } from '@customHooks/useWindowDimensions';
import { GraphType } from "@components/Graph/graphType";
import { useStoreState } from '../../store/storeHooks';


const ForceGraph = (): JSX.Element => {
    const { height } = useWindowDimensions();
    const forceGraphData = useStoreState((state) => state.forceGraphData);
    const graphType = useStoreState((state) => state.type);
    const [arrowSize, setArrowSize] = useState<number>(1);

    useEffect(() => {
        setArrowSize(graphType === GraphType.DIRECTED ? 3.5 : 0);
    }, [graphType])

    return (
        <>
            <span>É sério isso????????????????????????????????????????</span>
            <ForceGraph3D
                graphData={forceGraphData} height={height - 61}
                linkDirectionalArrowLength={arrowSize}
            />
        </>
    );
};

export default ForceGraph;