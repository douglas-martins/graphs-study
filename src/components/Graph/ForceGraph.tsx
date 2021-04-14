import React, { useEffect, useState } from 'react';
import { ForceGraph3D } from "react-force-graph";

import { useModal } from '@components/Modal/customHooks/useModal'

import { useWindowDimensions } from "@customHooks/useWindowDimensions";
import { useGraph } from "@customHooks/useGraph";
import { useStoreActions, useStoreState } from '../../store/storeHooks';

export type GraphDataNode = { id: string, name: string, value: number };
export type GraphDataLink = { source: string, target: string };
export type GraphData = {
    nodes: Array<GraphDataNode>,
    links: Array<{ source: string, target: string }>
};

const ForceGraph = (): JSX.Element => {
    const { show, toggle, currentModal, changeCurrentModal } = useModal();
    const { height } = useWindowDimensions();
    const { graph, graphData, updateGraphData } = useGraph();

    const todos = useStoreState((state) => state.todos);
    const addTodo = useStoreActions((actions) => actions.addTodo);


    console.log(graphData)
    return (
        <>
            <ForceGraph3D graphData={graphData} height={height - 54} />
        </>
    );
};

export default ForceGraph;