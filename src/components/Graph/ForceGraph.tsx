import React, { useEffect, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { useWindowDimensions } from '@customHooks/useWindowDimensions';
import { GraphType } from '@components/Graph/graphType';
import { Link } from '@components/Graph/link';
import { useStoreActions, useStoreState } from '../../store/storeHooks';

const ForceGraph = (): JSX.Element => {
    const { height } = useWindowDimensions();
    const forceGraphData = useStoreState((state) => state.forceGraphData);
    const graphType = useStoreState((state) => state.type);
    const deleteVertex = useStoreActions((actions) => actions.deleteVertex);
    const deleteEdge = useStoreActions((actions) => actions.deleteEdge);
    const [arrowSize, setArrowSize] = useState<number>(1);

    useEffect(() => {
        setArrowSize(graphType === GraphType.DIRECTED ? 3.5 : 0);
    }, [graphType])

    const removeVertex = (vertexName: string): void => {
        deleteVertex(vertexName);
    }

    const removeEdge = (vertexOneName: string, vertexTwoName: string): void => {
        deleteEdge(new Link(vertexOneName, vertexTwoName, 0))
    }

    return (
        <ForceGraph3D
            graphData={forceGraphData} height={height - 61}
            linkDirectionalArrowLength={arrowSize}
            linkWidth={2}
            linkColor={link => {
              const json = JSON.stringify(link);
              const usableLink = JSON.parse(json);
              return usableLink.highlighted ? usableLink.highlightedColor : 'grey';
            }}
            onNodeRightClick={(node) => removeVertex(`${node.id}`)}
            onLinkRightClick={(link) => {
                const { source, target } = link;
                if (
                  source && typeof source !== 'string' && typeof source !== 'number' &&
                  target && typeof target !== 'string' && typeof target !== 'number'
                ) {
                    removeEdge(`${source.id}`, `${target.id}`);
                }
            }}
            linkLabel="weight"
        />
    );
};

export default ForceGraph;