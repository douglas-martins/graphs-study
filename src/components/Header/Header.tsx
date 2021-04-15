import React from "react";
import { Form } from "react-bootstrap";

import { Vertex } from "@components/Graph/vertex";
import AddVertexModal from "@components/Modal/components/AddVertexModal";
import AddEdgesModal from "@components/Modal/components/AddEdgesModal";
import SystemModal from "@components/Modal/SystemModal";
import { useModal } from "@components/Modal/customHooks/useModal";
import { Link } from '@components/Graph/link';


import "bootstrap/dist/css/bootstrap.min.css";
import { GraphType } from "@components/Graph/graphType";
import { useStoreState, useStoreActions } from "../../store/storeHooks";


const Header = (): JSX.Element => {
    const { show, toggle, currentModal, changeCurrentModal } = useModal();
    const graph = useStoreState((state) => state.graph);
    const graphType = useStoreState((state) => state.type);
    const createNewGraph = useStoreActions((actions) => actions.createNewGraph);
    const addVertex = useStoreActions((actions) => actions.addVertex);
    const addEdge = useStoreActions((actions) => actions.addEdge);

    const handleAddVertex: Function = (name: string, label: string): void => {
        const vertex = new Vertex(name, label);
        addVertex(vertex);
        toggle();
    }

    const handleAddEdge: Function =
        (vertexOne: string, vertexTwo: string, value: number): void => {
            const link = new Link(vertexOne, vertexTwo, value);
            addEdge(link);
            toggle();
        }

    const renderModal: Function = (): JSX.Element | boolean => {
        if (!show) {
            return false;
        }

        const { type, title } = currentModal;
        const body: JSX.Element = type === 'vertex' ?
            <AddVertexModal addVertex={handleAddVertex} /> :
            (<AddEdgesModal addEdge={handleAddEdge} vertexes={graph.adjacencyList} />);
        const onSave: Function = type === 'vertex' ? handleAddVertex : handleAddEdge;
        return (
            <SystemModal
                size="lg"
                title={title}
                body={body}
                onClickSave={onSave}
                show={show}
                toggle={toggle}
            />
        );
    }

    const onChangeGraphType = (): void => {
        const newType: GraphType = graphType === 0 ? 1 : 0;
        createNewGraph(newType);
    };

    const getToggleLabel = (): string =>
        graphType === 1 ? 'Não Direcionado' : 'Direcionado';

    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="form-inline">
                <a className="navbar-brand">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQxcHgiIGhlaWdodD0iODFweCIgdmVyc2lvbj0iMS4xIj48ZGVmcy8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC41LDAuNSkiPjxpbWFnZSB4PSItMC41IiB5PSItMC41IiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0S1BITjJaeUIzYVdSMGFEMGlOVFl6Y0hnaUlHaGxhV2RvZEQwaU5UWXljSGdpSUhacFpYZENiM2c5SWpBZ01DQTFOak1nTlRZeUlpQjJaWEp6YVc5dVBTSXhMakVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZUcxc2JuTTZlR3hwYm1zOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2ZUd4cGJtc2lQZ29nSUNBZ1BDRXRMU0JIWlc1bGNtRjBiM0k2SUZOclpYUmphQ0ExTWk0eUlDZzJOekUwTlNrZ0xTQm9kSFJ3T2k4dmQzZDNMbUp2YUdWdGFXRnVZMjlrYVc1bkxtTnZiUzl6YTJWMFkyZ2dMUzArQ2lBZ0lDQThkR2wwYkdVK1kybHlZMnhsSUhKbFpDQmpiM0I1SURJdWJXbHVQQzkwYVhSc1pUNEtJQ0FnSUR4a1pYTmpQa055WldGMFpXUWdkMmwwYUNCVGEyVjBZMmd1UEM5a1pYTmpQZ29nSUNBZ1BHY2dhV1E5SWtWa2NISmxjM052SWlCemRISnZhMlU5SW01dmJtVWlJSE4wY205clpTMTNhV1IwYUQwaU1TSWdabWxzYkQwaWJtOXVaU0lnWm1sc2JDMXlkV3hsUFNKbGRtVnViMlJrSWo0S0lDQWdJQ0FnSUNBOFp5QnBaRDBpUVhKMFltOWhjbVFpSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtDMDNOVFU0TGpBd01EQXdNQ3dnTFRFMk5EUXdMakF3TURBd01Da2lQZ29nSUNBZ0lDQWdJQ0FnSUNBOFp5QnBaRDBpWTJseVkyeGxMWEpsWkMxamIzQjVMVEl1YldsdUlpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2czTlRVd0xqQXdNREF3TUN3Z01UWTBNekV1TURBd01EQXdLU0krQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WTJseVkyeGxJR2xrUFNKUGRtRnNJaUJtYVd4c1BTSWpOelJETTBVeElpQmplRDBpTWpnNExqZ2lJR041UFNJeU9EUXVPQ0lnY2owaU1qWTFMalFpUGp3dlkybHlZMnhsUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRVM01DNDJMREk0TkM0NElFdzFOekF1Tml3eU56Y3VPQ0JETlRjd0xqVXhOelk1T0N3eU56Y3VNek0yT1RZeUlEVTNNQzQxTVRjMk9UZ3NNamMyTGpnMk16QXpPQ0ExTnpBdU5pd3lOell1TkNCRE5UWTVMakUwTXpNMk5Td3lOek11TWpneE9EQTFJRFUyT0M0Mk5UVTJOemdzTWpZNUxqYzVPRE15T1NBMU5qa3VNaXd5TmpZdU5DQkROVGN3TGpBNU16QTROeXd5TlRndU1USXhNalU1SURVMk9TNDJPRGd5TVRJc01qUTVMamMxTXpnMElEVTJPQ3d5TkRFdU5pQkROVFl4TGpNME5USXpOQ3d5TURrdU9URTJOVFlnTlRVd0xqZzJPRFU1TERFM09TNHhOVGd5TURjZ05UTTJMamdzTVRVd0lFTTFNalV1TURnM05Ea3hMREV5Tmk0M01EQXlOVGtnTlRBNUxqVXpOamsxTlN3eE1EVXVOVE00TURBNElEUTVNQzQ0TERnM0xqUWdRelEyT1M0NE1EVTROeklzTmpndU5UazFOVEF5T0NBME5EVXVPRGt6T0RnMUxEVXpMak15T1RZMU56a2dOREl3TERReUxqSWdRek00TWk0ME1EazNOamdzTWpVdU5qQTJOemM0TmlBek5ESXVNek0zTXl3eE5TNHpNelV5TlRJZ016QXhMalFzTVRFdU9DQkRNamc0TGpJc01UQXVOaUF5TnpVdU1pd3hNQzR5SURJMk1TNDBMRGt1TkNCRE1qUTNMamMxTVRZNE5DdzRMamMzTmpBME1qa3hJREl6TkM0eE1qUTBNVElzTVRFdU1ESTBOVFF5T0NBeU1qRXVOQ3d4TmlCRE1qRTRMak16TXpReU1pd3hOeTQwT0RVd05UZ3lJREl4TlM0eE9UWXpOemNzTVRndU9ERTVPVGN4SURJeE1pd3lNQ0JETVRnekxqWXNNamt1TWlBeE5USXNNelF1T0NBeE1qZ3VOaXcxTmk0NElFTXhNak11TURjM05UWXhMRFl5TGpJd056VTNNeUF4TVRjdU1USTBOakU0TERZM0xqRTFOekl4TVNBeE1UQXVPQ3czTVM0MklFdzVNaTQyTERnMkxqZ2dRell6TGpnd01UTTBOelFzTVRFMUxqYzJPRFF5TVNBME1TNHpPRGN4TWpjeExERTFNQzQwTkRVM05DQXlOaTQ0TERFNE9DNDJJRU15TUM0d05qTXdOelV5TERJd05pNDFNVFEwT1RnZ01UUXVPVEV3TURBMk15d3lNalF1T1RnMU1qTTVJREV4TGpRc01qUXpMamdnUXpRc01qY3dMaklnTVRFdU5Dd3lPVFl1T0NBeE1TNDBMRE15TXk0NElFTXhNUzQwTERNeU5TNHlJREV5TGpnc016STJMallnTVRNdU1pd3pNamd1TWlCRE1UWXNNelEwTGpnZ01qTXVPQ3d6TlRrdU5DQXlOUzQ0TERNM05pNDBJRU15Tmk0ME9UTXhNVEF6TERNNE9DNDBNVE16TXpRZ01qa3VOVFV4TmpBNU55dzBNREF1TVRjeE5UWTFJRE0wTGpnc05ERXhJRU0wTnk0d01ERXdNVGswTERRek15NHhNelV6TlRRZ05qQXVPRE01TlRjekxEUTFOQzR6TWpjM01qa2dOell1TWl3ME56UXVOQ0JET0RJdU1qSTNOakE0TWl3ME9ESXVOekkwTXpFeUlEZzRMamt4TlRnNU9UVXNORGt3TGpVME9UWXhNeUE1Tmk0eUxEUTVOeTQ0SUVNeE1qZ3VNek0zT0RZNExEVXlOaTQ1TWpreU1UWWdNVFkzTGpJMU1qWXhOQ3cxTkRjdU5UVTFOREEzSURJd09TNDBMRFUxTnk0NElFTXlNekV1TWl3MU5qTWdNalV6TGpJc05UWTBJREkzTlM0eUxEVTJPUzQwSUVNeU9EVXVORE0zTURZc05UY3dMalV3TWpZMk1TQXlPVFV1TnpZeU9UUXNOVGN3TGpVd01qWTJNU0F6TURZc05UWTVMalFnUXpNeE15NDRNelE0T0RZc05UY3dMalF3TURBeE9DQXpNakV1TnpZMU1URTBMRFUzTUM0ME1EQXdNVGdnTXpJNUxqWXNOVFk1TGpRZ1F6TXpOeTQxTXpReU5qa3NOVFk0TGpnNU16Z3pPU0F6TkRVdU16ZzBPVFl6TERVMk55NDBPRFEzTkNBek5UTXNOVFkxTGpJZ1F6TTROQzQzTVRZMU9UTXNOVFUzTGpNM056Y3dNeUEwTVRVdU16azJORFV6TERVME5TNDRNekEzT1RjZ05EUTBMalFzTlRNd0xqZ2dRelEyTmk0NU1qZzFNRFFzTlRFNExqVXhNemMxTXlBME9EY3VPRGd4T0RRc05UQXpMalV6TnpRNU1TQTFNRFl1T0N3ME9EWXVNaUJETlRFekxqZzFPRGczTml3ME56a3VOek13T0RBeklEVXhPUzR3T1RrMU5UVXNORGN4TGpVeU5UQXdNaUExTWpJc05EWXlMalFnUXpVeU5TNHlOekk0TWpNc05EVXpMalUzTnpVeE5TQTFNekF1TVRVMU5qQTJMRFEwTlM0ME16azFORE1nTlRNMkxqUXNORE00TGpRZ1F6VTBNUzR6TVRreE1qWXNORE15TGpBNE1qWXlNaUExTkRRdU5ESTVPRGMwTERReU5DNDFORGMyT1RrZ05UUTFMalFzTkRFMkxqWWdRelUwTnl3ME1UQXVNaUExTlRRdU9DdzBNRGN1TkNBMU5UUXVOaXcwTURBdU1pQkROVFUwTGpjNU1ERTBOaXd6T0RjdU56QTBNVGtnTlRVM0xqQTRPVEV6Tnl3ek56VXVNek13TWpFeUlEVTJNUzQwTERNMk15NDJJRU0xTmpNdU9Dd3pOVFF1T0NBMU5qRXVOQ3d6TkRNdU5pQTFOall1Tml3ek16Y3VPQ0JETlRjeExqZ3NNek15SURVMk9TNDRMRE15TlM0MElEVTJPUzQ0TERNeE9TNDBJRU0xTmprdU9Dd3pNVFl1TmlBMU5qY3VPQ3d6TVRNdU9DQTFOamt1T0N3ek1URXVNaUJETlRjeExqZ3NNekE0TGpZZ05UWTRMallzTXpBekxqZ2dOVFk1TGpnc016QXdMaklnUXpVM01TNDBMREk1TUM0NElEVTJNaXd5T1RFdU5DQTFOVFF1TkN3eU9UQXVOaUJETlRRMkxqZ3NNamc1TGpnZ05UUXpMalFzTWprekxqUWdOVFF6TGpRc01qazRMallnUXpVME15NHpNVFl5TkRnc01qazVMamM1TmpFNElEVTBNaTQ0TWpFMk5qVXNNekF3TGpreU5qWTFOeUExTkRJc016QXhMamdnUXpVek55NDFNVGcwTWl3ek1EVXVNVGswTnpRMElEVXpOQzQxTmpnNE1qTXNNekV3TGpJek1EWTBNU0ExTXpNdU9Dd3pNVFV1T0NCRE5UTXpMakl4TkRBeE5Dd3pNakV1TVRVd05qY3hJRFV6TXk0NE9Ua3lOVGtzTXpJMkxqVTJOREV3TlNBMU16VXVPQ3d6TXpFdU5pQkROVE00TGpVMk9Ea3pNaXd6TXpjdU1UY3pORFlnTlRNM0xqQTJPRGcxTVN3ek5ETXVPVEl6T0RJMUlEVXpNaTR5TERNME55NDRJRU0xTWprdU9Dd3pORGt1T0NBMU1qZ3VOQ3d6TlRJdU5pQTFNekF1T0N3ek5UVXVOQ0JETlRNekxqSXNNelU0TGpJZ05UTXlMRE0yTlM0eUlEVXlOeTQwTERNMk5pNDRJRU0xTWpJdU9Dd3pOamd1TkNBMU1qQXVOaXd6TnpNdU5DQTFNVGt1T0N3ek56Y3VPQ0JETlRFNUxqRTBORFkyTml3ek9EQXVORFkxTnpNMklEVXhPQzR5TnpVeE56UXNNemd6TGpBM05ESXhJRFV4Tnk0eUxETTROUzQySUVNMU1URXVPRGd6T0RVNUxETTVOeTQ0TmpVd056SWdOVEExTGpnM05ERTBOaXcwTURrdU9ERTNOekl6SURRNU9TNHlMRFF5TVM0MElFTTBPVGN1T0RNd016QXpMRFF5TlM0ek9UY3dOak1nTkRrMkxqWTVOVEF6T1N3ME1qa3VORGN3TmpVMUlEUTVOUzQ0TERRek15NDJJRU0wT1RJdU9EVXdNRFV5TERRME1DNHdNelV4TmpVZ05EZzRMak13TmpjeExEUTBOUzQyTVRFd09EVWdORGd5TGpZc05EUTVMamdnUXpRM05DNDBMRFExTlNBME56TXVPQ3cwTmpZdU5pQTBOalV1T0N3ME56SXVOQ0JETkRVeExqZ3dNekV4TkN3ME9ESXVNVE0wTURNMUlEUXpOeTR6TVRjMU1qVXNORGt4TGpFME5UZ3dOeUEwTWpJdU5DdzBPVGt1TkNCRE5ERTBMamdzTlRBekxqUWdOREExTGpRc05UQXlMamdnTXprNExqWXNOVEEzTGpJZ1F6TTNPUzQzTkRrM05qVXNOVEU1TGpNM01qYzNOQ0F6TlRndU5EUXhNVFExTERVeU55NHlNalk1TVRNZ016TTJMaklzTlRNd0xqSWdRek15T0M0ek5EZzRNamdzTlRNd0xqZzVPREkzSURNeU1DNDBOVEV4TnpJc05UTXdMamc1T0RJM0lETXhNaTQyTERVek1DNHlJRU16TURRdU56YzVNVEF6TERVeU9DNDVPVGs1TVRNZ01qazJMamd5TURnNU55dzFNamd1T1RrNU9URXpJREk0T1N3MU16QXVNaUJNTWpnMkxEVXpNQzR5SUVNeU5qY3VOQ3cxTWpVdU1pQXlORGtzTlRJMUxqZ2dNak13TGpRc05USXlMaklnUXpJeE9TNDNOelEzTmpNc05USXdMamc0TURJME55QXlNRGt1TlRFek1URTVMRFV4Tnk0ME9ESXpOVEVnTWpBd0xqSXNOVEV5TGpJZ1F6RTVNQzQ0TkRNME1qSXNOVEEzTGpFek56Y3pOQ0F4T0RBdU9Ua3hOelUxTERVd015NHdORGsyTWpjZ01UY3dMamdzTlRBd0lFTXhOakl1TURVNU5Ea3pMRFE1Tmk0d016a3pNREVnTVRVekxqazJPREExTERRNU1DNDNOems0TmpNZ01UUTJMamdzTkRnMExqUWdUREV6TlM0NExEUTNOUzQwSUVNeE16SXVNamMwT0RJMExEUTNNaTR4Tmpnd01Ua2dNVEk0TGpZd05ETTFPU3cwTmprdU1EazRNVGMxSURFeU5DNDRMRFEyTmk0eUlFTXhNVGdzTkRZeExqZ2dNVEUyTGpRc05EVXpMaklnTVRFd0xqZ3NORFE0SUVNeE1EUXVNelEwTXpVMExEUTBNaTQ0TVRFeU5qUWdPVGt1TURNeU9EZ3lMRFF6Tmk0ek5ESXhOak1nT1RVdU1pdzBNamtnUXprd0xqZ3lOelV5TERReE9DNDNOelUxTnpZZ09EUXVOek01T0RrMU55dzBNRGt1TXpjek5UYzVJRGMzTGpJc05EQXhMaklnUXpjekxqRXpOelV4TVRJc016azNMamN6TmpnME55QTNNQzQxTURFek5Ea3NNemt5TGpnNU1qQXdPQ0EyT1M0NExETTROeTQySUVNM01Td3pOelV1TmlBMk15d3pOamN1TmlBMk1DNDBMRE0xTmk0NElFTTFNeTQzTnpZd01EVTNMRE16T1M0NE16RTJNelFnTkRrdU56TXhNVEkyTnl3ek1qRXVPVFkyTnpVeUlEUTRMalFzTXpBekxqZ2dURFE0TGpRc01qYzRMallnUXpRM0xqa3lPVGMyTnpVc01qY3dMakV6T0RBNU9DQTBPQzQyTnpBMU9ERTJMREkyTVM0Mk5USTBNRGtnTlRBdU5pd3lOVE11TkNCRE5UVXVNRFl4T1RJMk5pd3lNekV1TXpjME5EZ3lJRFl4TGpjMk16UXhOek1zTWpBNUxqZzJNalk1TnlBM01DNDJMREU0T1M0eUlFTTNNaTQ0TERFNE5DQTNOU3d4TnpndU9DQTNOaTQ0TERFM015NDBJRU0zT1M0M05ETTBPREUyTERFMk15NDFNVEV6TnpZZ09EVXVOelk1T1RFeE15d3hOVFF1T0RJeU1UQTJJRGswTERFME9DNDJJRU01TlM0ME16RXlOemN4TERFME55NDRNamd5TnlBNU5pNDNNVGN4TmpjMkxERTBOaTQ0TVRNd09UTWdPVGN1T0N3eE5EVXVOaUJETVRBNExqZzRPVEEzTVN3eE1qZ3VPREExTURFeklERXlNaTR6TmpNMk5EZ3NNVEV6TGpjeE16UTROaUF4TXpjdU9Dd3hNREF1T0NCRE1UVXhMams0T0RneE9TdzRPUzR3TnpreU1EQTRJREUyTnk0NE1qVXhNRFlzTnprdU5URXdNRFF3TVNBeE9EUXVPQ3czTWk0MElFTXhPRGt1T0N3M01DNDBJREU1TXl3Mk15NDRJREU1T1M0eUxEWXpMamdnUXpJd09DNDJNakl5T0Rrc05qTXVNelF5T1RNM01pQXlNVGN1T0RBME1EUTVMRFl3TGpZM01EWXpOREVnTWpJMkxEVTJJRU15TXpFdU9EQTBPVFk1TERVeUxqWTFOekV6T0RFZ01qTTRMakUzT1RNeU5DdzFNQzQwTVRrek16STJJREkwTkM0NExEUTVMalFnUXpJMU1pNDBOakUwT1Rnc05Ea3VNREF4T0RZM055QXlOakF1TVRNNE5UQXlMRFE1TGpBd01UZzJOemNnTWpZM0xqZ3NORGt1TkNCRE1qYzFMak0zT1RBeU5TdzFNQzR4T1RnMU1qRXpJREk0TXk0d01qQTVOelVzTlRBdU1UazROVEl4TXlBeU9UQXVOaXcwT1M0MElFTXpNREF1TXpBeE1EUTFMRFE0TGpRMk16UTRNemdnTXpFd0xqQTRPVEl5Tnl3ME9TNHdOekV3TWpZeElETXhPUzQyTERVeExqSWdRek15T0M0MExEVTBMalFnTXpNM0xqUXNOVGN1TWlBek5EVXVPQ3cxT1M0NElFTXpOVE11TnpBMk5EazNMRFl4TGpZd016STBOemdnTXpZeExqVXhOalV4TlN3Mk15NDRNRFl3TnpNMklETTJPUzR5TERZMkxqUWdRek0zTmk0NU5URXdOemdzTmpndU56UXdNVEF6TnlBek9EUXVOVEEzTkRFNExEY3hMalk0TWpNNU5USWdNemt4TGpnc056VXVNaUJETkRBeUxqTXlNelkzTml3M09DNHdNakF5TlRNeUlEUXhNaTQyTVRrMU5qWXNPREV1TmpNd05UQXdNaUEwTWpJdU5pdzROaUJETkRReUxqWXdOakF3Tnl3NU5pNHhORGM1T1RFNElEUTJNQzR5TlRRMU1UTXNNVEV3TGpNNE9UUTFJRFEzTkM0MExERXlOeTQ0SUVNME9EY3VORGt3TnpFeExERTBNUzQ0TURrMk5DQTBPVGt1TXpNMU5USTJMREUxTmk0NU16TTFNamdnTlRBNUxqZ3NNVGN6SUVNMU1USXVNaXd4T0RBZ05USXhMREU0TlM0MElEVXlNU3d4T1RNZ1F6VXhPUzQwTERJd05TNHlJRFV5T0M0MExESXhNeUExTXpJc01qSXlMalFnUXpVek5pNHdOall3TlRjc01qTXdMamMxT0RNMElEVXpPQzR5TlRBMk5URXNNak01TGprd05qTXlOeUExTXpndU5Dd3lORGt1TWlCRE5UTTVMakU1T0RVd09Dd3lOVGd1TXpFMU9EZ2dOVE01TGpFNU9EVXdPQ3d5TmpjdU5EZzBNVElnTlRNNExqUXNNamMyTGpZZ1F6VXpPQzQwTERJNE1pNDJJRFUwTUM0MExESTROaUExTkRrc01qZzRMaklnUXpVMU5TNDFOekU0TlRNc01qZzVMall3TmpNNU55QTFOakl1TWpjNU56ZzVMREk1TUM0eU56Y3hPVEVnTlRZNUxESTVNQzR5SUV3MU56QXVOaXd5T0RRdU9DQmFJaUJwWkQwaVVHRjBhQ0lnWm1sc2JEMGlJelExTlRrM1JTSStQQzl3WVhSb1Bnb2dJQ0FnSUNBZ0lDQWdJQ0E4TDJjK0NpQWdJQ0FnSUNBZ1BDOW5QZ29nSUNBZ1BDOW5QZ284TDNOMlp6ND0iIHBvaW50ZXItZXZlbnRzPSJub25lIi8+PGltYWdlIHg9IjE1OS41IiB5PSItMC41IiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0S1BITjJaeUIzYVdSMGFEMGlOVFkwY0hnaUlHaGxhV2RvZEQwaU5UWXhjSGdpSUhacFpYZENiM2c5SWpBZ01DQTFOalFnTlRZeElpQjJaWEp6YVc5dVBTSXhMakVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZUcxc2JuTTZlR3hwYm1zOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2ZUd4cGJtc2lQZ29nSUNBZ1BDRXRMU0JIWlc1bGNtRjBiM0k2SUZOclpYUmphQ0ExTWk0eUlDZzJOekUwTlNrZ0xTQm9kSFJ3T2k4dmQzZDNMbUp2YUdWdGFXRnVZMjlrYVc1bkxtTnZiUzl6YTJWMFkyZ2dMUzArQ2lBZ0lDQThkR2wwYkdVK1kybHlZMnhsSUhKbFpDQmpiM0I1SURVdWJXbHVQQzkwYVhSc1pUNEtJQ0FnSUR4a1pYTmpQa055WldGMFpXUWdkMmwwYUNCVGEyVjBZMmd1UEM5a1pYTmpQZ29nSUNBZ1BHY2dhV1E5SWtWa2NISmxjM052SWlCemRISnZhMlU5SW01dmJtVWlJSE4wY205clpTMTNhV1IwYUQwaU1TSWdabWxzYkQwaWJtOXVaU0lnWm1sc2JDMXlkV3hsUFNKbGRtVnViMlJrSWo0S0lDQWdJQ0FnSUNBOFp5QnBaRDBpUVhKMFltOWhjbVFpSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtDMDJORFUzTGpBd01EQXdNQ3dnTFRFNU1EazBMakF3TURBd01Da2lQZ29nSUNBZ0lDQWdJQ0FnSUNBOFp5QnBaRDBpWTJseVkyeGxMWEpsWkMxamIzQjVMVFV1YldsdUlpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2cyTkRVd0xqQXdNREF3TUN3Z01Ua3dPREV1TURBd01EQXdLU0krQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WTJseVkyeGxJR2xrUFNKUGRtRnNJaUJtYVd4c1BTSWpPVFpFTVVORUlpQmplRDBpTWpnNExqZ2lJR041UFNJeU9EZ3VPQ0lnY2owaU1qWTFMalFpUGp3dlkybHlZMnhsUGdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRVM01DNDJMREk0T0M0NElFdzFOekF1Tml3eU9ERXVPQ0JETlRjd0xqVXhOelk1T0N3eU9ERXVNek0yT1RZeUlEVTNNQzQxTVRjMk9UZ3NNamd3TGpnMk16QXpPQ0ExTnpBdU5pd3lPREF1TkNCRE5UWTVMakUwTXpNMk5Td3lOemN1TWpneE9EQTFJRFUyT0M0Mk5UVTJOemdzTWpjekxqYzVPRE15T1NBMU5qa3VNaXd5TnpBdU5DQkROVGN3TGpBNU16QTROeXd5TmpJdU1USXhNalU1SURVMk9TNDJPRGd5TVRJc01qVXpMamMxTXpnMElEVTJPQ3d5TkRVdU5pQkROVFl4TGpNNE1UWTFPQ3d5TVRNdU9UY3dOelU0SURVMU1DNDVNRE14T1RZc01UZ3pMakkzTkRJek55QTFNell1T0N3eE5UUXVNaUJETlRJMUxqRTBNamswT0N3eE16QXVPREEzTURnZ05UQTVMalU0TnpJME55d3hNRGt1TlRjd01UWTJJRFE1TUM0NExEa3hMalFnUXpRMk9TNDRNRFU0TnpJc056SXVOVGsxTlRBeU9DQTBORFV1T0Rrek9EZzFMRFUzTGpNeU9UWTFOemtnTkRJd0xEUTJMaklnUXpNNE1pNDBNRGszTmpnc01qa3VOakEyTnpjNE5pQXpOREl1TXpNM015d3hPUzR6TXpVeU5USWdNekF4TGpRc01UVXVPQ0JETWpnNExqSXNNVFF1TmlBeU56VXVNaXd4TkM0eUlESTJNUzQwTERFekxqUWdRekkwTnk0M05URTJPRFFzTVRJdU56YzJNRFF5T1NBeU16UXVNVEkwTkRFeUxERTFMakF5TkRVME1qZ2dNakl4TGpRc01qQWdRekl4Tnk0NU9UUTNPQ3d5TVM0ek1UTXpNVEF5SURJeE5DNDFNak0wTURFc01qSXVORFE0TVRnek9TQXlNVEVzTWpNdU5DQkRNVGd5TGpZc016SXVOaUF4TlRFc016Z3VNaUF4TWpjdU5pdzJNQzR5SUVNeE1qSXVNRGMzTlRZeExEWTFMall3TnpVM015QXhNVFl1TVRJME5qRTRMRGN3TGpVMU56SXhNU0F4TURrdU9DdzNOU0JNT1RFdU5pdzVNQzR5SUVNMk1pNDRNREV6TkRjMExERXhPUzR4TmpnME1qRWdOREF1TXpnM01USTNNU3d4TlRNdU9EUTFOelFnTWpVdU9Dd3hPVElnUXpFNUxqQTJNekEzTlRJc01qQTVMamt4TkRRNU9DQXhNeTQ1TVRBd01EWXpMREl5T0M0ek9EVXlNemtnTVRBdU5Dd3lORGN1TWlCRE15d3lOek11TmlBeE1DNDBMRE13TUM0eUlERXdMalFzTXpJM0xqSWdRekV3TGpRc016STRMallnTVRFdU9Dd3pNekFnTVRJdU1pd3pNekV1TmlCRE1UVXNNelE0TGpJZ01qSXVPQ3d6TmpJdU9DQXlOQzQ0TERNM09TNDRJRU15TlM0ME9UTXhNVEF6TERNNU1TNDRNVE16TXpRZ01qZ3VOVFV4TmpBNU55dzBNRE11TlRjeE5UWTFJRE16TGpnc05ERTBMalFnUXpRMkxqQXdNVEF4T1RRc05ETTJMalV6TlRNMU5DQTFPUzQ0TXprMU56TXNORFUzTGpjeU56Y3lPU0EzTlM0eUxEUTNOeTQ0SUVNNE1TNHhOelk0TmpJc05EZzJMakUyTkRFek55QTROeTQ0TmpnMk5UYzJMRFE1TXk0NU9UTTFNemdnT1RVdU1pdzFNREV1TWlCRE1USTNMak16TnpnMk9DdzFNekF1TXpJNU1qRTJJREUyTmk0eU5USTJNVFFzTlRVd0xqazFOVFF3TnlBeU1EZ3VOQ3cxTmpFdU1pQkRNak13TGpJc05UWTJMalFnTWpVeUxqSXNOVFkzTGpRZ01qYzBMaklzTlRjeUxqZ2dRekk0TkM0ME16Y3dOaXcxTnpNdU9UQXlOall4SURJNU5DNDNOakk1TkN3MU56TXVPVEF5TmpZeElETXdOU3cxTnpJdU9DQkRNekV5TGpnek5EZzROaXcxTnpNdU9EQXdNREU0SURNeU1DNDNOalV4TVRRc05UY3pMamd3TURBeE9DQXpNamd1Tml3MU56SXVPQ0JETXpNMkxqVXpOREkyT1N3MU56SXVNamt6T0RNNUlETTBOQzR6T0RRNU5qTXNOVGN3TGpnNE5EYzBJRE0xTWl3MU5qZ3VOaUJETXpnekxqY3hOalU1TXl3MU5qQXVOemMzTnpBeklEUXhOQzR6T1RZME5UTXNOVFE1TGpJek1EYzVOeUEwTkRNdU5DdzFNelF1TWlCRE5EWTFMamt5T0RVd05DdzFNakV1T1RFek56VXpJRFE0Tmk0NE9ERTROQ3cxTURZdU9UTTNORGt4SURVd05TNDRMRFE0T1M0MklFTTFNVEl1T0RVNE9EYzJMRFE0TXk0eE16QTRNRE1nTlRFNExqQTVPVFUxTlN3ME56UXVPVEkxTURBeUlEVXlNU3cwTmpVdU9DQkROVEkwTGpJM01qZ3lNeXcwTlRZdU9UYzNOVEUxSURVeU9TNHhOVFUyTURZc05EUTRMamd6T1RVME15QTFNelV1TkN3ME5ERXVPQ0JETlRRd0xqZ3lNelF5TWl3ME16VXVOak01T0RReklEVTBOQzQwTWpRMU5pdzBNamd1TURreE16QTBJRFUwTlM0NExEUXlNQ0JETlRRM0xqUXNOREV6TGpZZ05UVTFMaklzTkRFd0xqZ2dOVFUxTERRd015NDJJRU0xTlRVdU1Ua3dNVFEyTERNNU1TNHhNRFF4T1NBMU5UY3VORGc1TVRNM0xETTNPQzQzTXpBeU1USWdOVFl4TGpnc016WTNJRU0xTmpRdU1pd3pOVGd1TWlBMU5qRXVPQ3d6TkRjZ05UWTNMRE0wTVM0eUlFTTFOekl1TWl3ek16VXVOQ0ExTnpBdU1pd3pNamd1T0NBMU56QXVNaXd6TWpJdU9DQkROVGN3TGpJc016SXdJRFUyT0M0eUxETXhOeTR5SURVM01DNHlMRE14TkM0MklFTTFOekl1TWl3ek1USWdOVFk1TERNd055NHlJRFUzTUM0eUxETXdNeTQySUVNMU56RXVPQ3d5T1RRdU1pQTFOakl1TkN3eU9UUXVPQ0ExTlRRdU9Dd3lPVFFnUXpVME55NHlMREk1TXk0eUlEVTBNeTQ0TERJNU5pNDRJRFUwTXk0NExETXdNaUJETlRRekxqY3hOakkwT0N3ek1ETXVNVGsyTVRnZ05UUXpMakl5TVRZMk5Td3pNRFF1TXpJMk5qVTNJRFUwTWk0MExETXdOUzR5SUVNMU16Y3VPRGN5TmpZMkxETXdPQzQyTkRFNE5qWWdOVE0wTGpreE9EQTBOU3d6TVRNdU56VTROREEwSURVek5DNHlMRE14T1M0MElFTTFNek11TmpJek1URTNMRE15TkM0Mk9EUTVPVGNnTlRNMExqTXdPRFUyTERNek1DNHdNekUwTlRRZ05UTTJMaklzTXpNMUlFTTFNemd1T1RZNE9UTXlMRE0wTUM0MU56TTBOaUExTXpjdU5EWTRPRFV4TERNME55NHpNak00TWpVZ05UTXlMallzTXpVeExqSWdRelV6TUM0eUxETTFNeTR5SURVeU9DNDRMRE0xTmlBMU16RXVNaXd6TlRndU9DQkROVE16TGpZc016WXhMallnTlRNeUxqUXNNelk0TGpZZ05USTNMamdzTXpjd0xqSWdRelV5TXk0eUxETTNNUzQ0SURVeU1Dd3pOellnTlRJd0xETTRNQ0JETlRFNUxqTTBORFkyTml3ek9ESXVOalkxTnpNMklEVXhPQzQwTnpVeE56UXNNemcxTGpJM05ESXhJRFV4Tnk0MExETTROeTQ0SUVNMU1USXVNRGd6T0RVNUxEUXdNQzR3TmpVd056SWdOVEEyTGpBM05ERTBOaXcwTVRJdU1ERTNOekl6SURRNU9TNDBMRFF5TXk0MklFTTBPVGd1TURNd016QXpMRFF5Tnk0MU9UY3dOak1nTkRrMkxqZzVOVEF6T1N3ME16RXVOamN3TmpVMUlEUTVOaXcwTXpVdU9DQkRORGt6TGpFeE16RTRPQ3cwTkRJdU1qYzBNak0zSURRNE9DNDFOVGMzTWprc05EUTNMamcyTlRBeU9DQTBPREl1T0N3ME5USWdRelEzTkM0MkxEUTFOeTR5SURRM05DdzBOamd1T0NBME5qWXNORGMwTGpZZ1F6UTFNaTR3TURNeE1UUXNORGcwTGpNek5EQXpOU0EwTXpjdU5URTNOVEkxTERRNU15NHpORFU0TURjZ05ESXlMallzTlRBeExqWWdRelF4TlN3MU1EVXVOaUEwTURVdU5pdzFNRFVnTXprNExqZ3NOVEE1TGpRZ1F6TTNPUzQ1TkRrM05qVXNOVEl4TGpVM01qYzNOQ0F6TlRndU5qUXhNVFExTERVeU9TNDBNalk1TVRNZ016TTJMalFzTlRNeUxqUWdRek15T0M0MU56ZzBOekVzTlRNekxqUXpNVFUzTkNBek1qQXVOamd3TnpVNExEVXpNeTQzTmpZeU1qTWdNekV5TGpnc05UTXpMalFnUXpNd05DNDVOemt4TURNc05UTXlMakU1T1RreE15QXlPVGN1TURJd09EazNMRFV6TWk0eE9UazVNVE1nTWpnNUxqSXNOVE16TGpRZ1RESTROaXcxTXpNdU5DQkRNalkzTGpRc05USTRMalFnTWpRNUxEVXlPU0F5TXpBdU5DdzFNalV1TkNCRE1qRTVMamMzTkRjMk15dzFNalF1TURnd01qUTNJREl3T1M0MU1UTXhNVGtzTlRJd0xqWTRNak0xTVNBeU1EQXVNaXcxTVRVdU5DQkRNVGt3TGpnNE16azJMRFV3T1M0NU9USTVOamdnTVRneExqQXpNRGs1TVN3MU1EVXVOVFk1TVRnMklERTNNQzQ0TERVd01pNHlJRU14TmpJdU1EVTVORGt6TERRNU9DNHlNemt6TURFZ01UVXpMamsyT0RBMUxEUTVNaTQ1TnprNE5qTWdNVFEyTGpnc05EZzJMallnVERFek5TNDRMRFEzTnk0MklFTXhNekl1TWpjME9ESTBMRFEzTkM0ek5qZ3dNVGtnTVRJNExqWXdORE0xT1N3ME56RXVNams0TVRjMUlERXlOQzQ0TERRMk9DNDBJRU14TVRnc05EWTBJREV4Tmk0MExEUTFOUzQwSURFeE1DNDRMRFExTUM0eUlFTXhNRFF1TXpRME16VTBMRFEwTlM0d01URXlOalFnT1RrdU1ETXlPRGd5TERRek9DNDFOREl4TmpNZ09UVXVNaXcwTXpFdU1pQkRPVEF1T0RJM05USXNOREl3TGprM05UVTNOaUE0TkM0M016azRPVFUzTERReE1TNDFOek0xTnprZ056Y3VNaXcwTURNdU5DQkROek11TVRNM05URXhNaXd6T1RrdU9UTTJPRFEzSURjd0xqVXdNVE0wT1N3ek9UVXVNRGt5TURBNElEWTVMamdzTXpnNUxqZ2dRemN4TERNM055NDRJRFl6TERNMk9TNDRJRFl3TGpRc016VTVJRU0xTXk0M056WXdNRFUzTERNME1pNHdNekUyTXpRZ05Ea3VOek14TVRJMk55d3pNalF1TVRZMk56VXlJRFE0TGpRc016QTJJRXcwT0M0MExESTRNQzQ0SUVNME55NDVNamszTmpjMUxESTNNaTR6TXpnd09UZ2dORGd1Tmpjd05UZ3hOaXd5TmpNdU9EVXlOREE1SURVd0xqWXNNalUxTGpZZ1F6VTFMakEyTVRreU5qWXNNak16TGpVM05EUTRNaUEyTVM0M05qTTBNVGN6TERJeE1pNHdOakkyT1RjZ056QXVOaXd4T1RFdU5DQkROekl1T0N3eE9EWXVNaUEzTlN3eE9ERWdOell1T0N3eE56VXVOaUJETnprdU56UXpORGd4Tml3eE5qVXVOekV4TXpjMklEZzFMamMyT1RreE1UTXNNVFUzTGpBeU1qRXdOaUE1TkN3eE5UQXVPQ0JET1RVdU5ETXhNamMzTVN3eE5UQXVNREk0TWpjZ09UWXVOekUzTVRZM05pd3hORGt1TURFek1Ea3pJRGszTGpnc01UUTNMamdnUXpFd09DNDRPRGt3TnpFc01UTXhMakF3TlRBeE15QXhNakl1TXpZek5qUTRMREV4TlM0NU1UTTBPRFlnTVRNM0xqZ3NNVEF6SUVNeE5USXVNRE01TWpRc09URXVNelV3TkRVNE55QXhOamN1T0RZME56TTVMRGd4TGpjNE56Z3hOamdnTVRnMExqZ3NOelF1TmlCRE1UZzVMamdzTnpJdU5pQXhPVE1zTmpZZ01UazVMaklzTmpZZ1F6SXdOeTQ1T1RNME1Ua3NOalV1T0RBd09ERXhOaUF5TVRZdU5qUTJPVE15TERZekxqYzFOalkzTkRjZ01qSTBMallzTmpBZ1F6SXpNQzR6TlRRek9EVXNOVFl1TlRFd05ETTBNaUF5TXpZdU56UTBOemM0TERVMExqRTVPVEF4TlRNZ01qUXpMalFzTlRNdU1pQkRNalV4TGpBMk1UUTVPQ3cxTWk0NE1ERTROamMzSURJMU9DNDNNemcxTURJc05USXVPREF4T0RZM055QXlOall1TkN3MU15NHlJRU15TnpNdU9UYzVNREkxTERVekxqazVPRFV5TVRNZ01qZ3hMall5TURrM05TdzFNeTQ1T1RnMU1qRXpJREk0T1M0eUxEVXpMaklnUXpJNU9DNDVNREV3TkRVc05USXVNall6TkRnek9DQXpNRGd1TmpnNU1qSTNMRFV5TGpnM01UQXlOakVnTXpFNExqSXNOVFVnUXpNeU55dzFPQzR5SURNek5pdzJNU0F6TkRRdU5DdzJNeTQySUVNek5USXVNekEyTkRrM0xEWTFMalF3TXpJME56Z2dNell3TGpFeE5qVXhOU3cyTnk0Mk1EWXdOek0ySURNMk55NDRMRGN3TGpJZ1F6TTNOUzQxTlRFd056Z3NOekl1TlRRd01UQXpOeUF6T0RNdU1UQTNOREU0TERjMUxqUTRNak01TlRJZ016a3dMalFzTnprZ1F6UXdNQzQ1TWpNMk56WXNPREV1T0RJd01qVXpNaUEwTVRFdU1qRTVOVFkyTERnMUxqUXpNRFV3TURJZ05ESXhMaklzT0RrdU9DQkRORFF4TGpJd05qQXdOeXc1T1M0NU5EYzVPVEU0SURRMU9DNDROVFExTVRNc01URTBMakU0T1RRMUlEUTNNeXd4TXpFdU5pQkRORGcyTGpBNU1EY3hNU3d4TkRVdU5qQTVOalFnTkRrM0xqa3pOVFV5Tml3eE5qQXVOek16TlRJNElEVXdPQzQwTERFM05pNDRJRU0xTVRBdU9Dd3hPRE11T0NBMU1Ua3VOaXd4T0RrdU1pQTFNVGt1Tml3eE9UWXVPQ0JETlRFNExESXdPU0ExTWpjc01qRTJMamdnTlRNd0xqWXNNakkyTGpJZ1F6VXpOQzQyTmpZd05UY3NNak0wTGpVMU9ETTBJRFV6Tmk0NE5UQTJOVEVzTWpRekxqY3dOak15TnlBMU16Y3NNalV6SUVNMU16Y3VOems0TlRBNExESTJNaTR4TVRVNE9DQTFNemN1TnprNE5UQTRMREkzTVM0eU9EUXhNaUExTXpjc01qZ3dMalFnUXpVek55d3lPRFl1TkNBMU16a3NNamc1TGpnZ05UUTNMallzTWpreUlFTTFOVFF1TVRjeE9EVXpMREk1TXk0ME1EWXpPVGNnTlRZd0xqZzNPVGM0T1N3eU9UUXVNRGMzTVRreElEVTJOeTQyTERJNU5DQk1OVGN3TGpZc01qZzRMamdnV2lJZ2FXUTlJbEJoZEdnaUlHWnBiR3c5SWlNME5UVTVOMFVpUGp3dmNHRjBhRDRLSUNBZ0lDQWdJQ0FnSUNBZ1BDOW5QZ29nSUNBZ0lDQWdJRHd2Wno0S0lDQWdJRHd2Wno0S1BDOXpkbWMrIiBwb2ludGVyLWV2ZW50cz0ibm9uZSIvPjxpbWFnZSB4PSI3OS41IiB5PSItMC41IiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpUHo0S1BITjJaeUIzYVdSMGFEMGlNVFU1TjNCNElpQm9aV2xuYUhROUlqUTVPSEI0SWlCMmFXVjNRbTk0UFNJd0lEQWdNVFU1TnlBME9UZ2lJSFpsY25OcGIyNDlJakV1TVNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUkrQ2lBZ0lDQThJUzB0SUVkbGJtVnlZWFJ2Y2pvZ1UydGxkR05vSURVeUxqSWdLRFkzTVRRMUtTQXRJR2gwZEhBNkx5OTNkM2N1WW05b1pXMXBZVzVqYjJScGJtY3VZMjl0TDNOclpYUmphQ0F0TFQ0S0lDQWdJRHgwYVhSc1pUNWhjbkp2ZHlBekxtMXBiand2ZEdsMGJHVStDaUFnSUNBOFpHVnpZejVEY21WaGRHVmtJSGRwZEdnZ1UydGxkR05vTGp3dlpHVnpZejRLSUNBZ0lEeG5JR2xrUFNKRlpIQnlaWE56YnlJZ2MzUnliMnRsUFNKdWIyNWxJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqRWlJR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJK0NpQWdJQ0FnSUNBZ1BHY2dhV1E5SWtGeWRHSnZZWEprSWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZ3RPVFUwTmk0d01EQXdNREFzSUMwMU5ETXpMakF3TURBd01Da2lJR1pwYkd3OUlpTTBOVFU1TjBVaVBnb2dJQ0FnSUNBZ0lDQWdJQ0E4WnlCcFpEMGlZWEp5YjNjdE15NXRhVzRpSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtEazFOREl1TURBd01EQXdMQ0ExTkRJMExqQXdNREF3TUNraVBnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRUUTNMak1zTXpRMkxqRWdRekl6TGpVNE1qUTRORE1zTXpRMUxqTXdOekl3TkNBMExqWTRNRGs1T0RNMExETXlOaTR3TURReklEUXVNemcyTnpJM05ERXNNekF5TGpJM05UTTJNaUJETkM0d09USTBOVFkwT1N3eU56Z3VOVFEyTkRJMElESXlMalV3T1RRek9Ea3NNalU0TGpjNE1EY3lNU0EwTmk0eUxESTFOeTQwSUV3ek1USXVOU3d5TlRBdU9DQkRNek0zTGpFek1Ua3NNalV3TGpJeU1ERXdNU0F6TlRjdU5UY3dNVEF4TERJMk9TNDNNVGd4SURNMU9DNHhOU3d5T1RRdU16VWdRek0xT0M0M01qazRPVGtzTXpFNExqazRNVGtnTXpNNUxqSXpNVGtzTXpNNUxqUXlNREV3TVNBek1UUXVOaXd6TkRBZ1REUTRMalFzTXpRMkxqVWdURFEzTGpNc016UTJMakVnV2lCTk5UZ3dMRE16TXlCRE5UVTJMakk0TWpRNE5Dd3pNekl1TWpBM01qQTBJRFV6Tnk0ek9EQTVPVGdzTXpFeUxqa3dORE1nTlRNM0xqQTROamN5Tnl3eU9Ea3VNVGMxTXpZeUlFTTFNell1TnpreU5EVTJMREkyTlM0ME5EWTBNalFnTlRVMUxqSXdPVFF6T1N3eU5EVXVOamd3TnpJeElEVTNPQzQ1TERJME5DNHpJRXc0TkRVdU1pd3lNemN1TnlCRE9EWTVMamN5TVRRME15d3lNemN1TVRJd01UQXhJRGc1TUM0d056QXhMREkxTmk0MU1qZzFOVGNnT0Rrd0xqWTBPVGs1T1N3eU9ERXVNRFVnUXpnNU1TNHlNams0T1Rnc016QTFMalUzTVRRME15QTROekV1T0RJeE5EUXpMRE15TlM0NU1qQXhNREVnT0RRM0xqTXNNekkyTGpVZ1REVTRNUzR4TERNek15Qk1OVGd3TERNek15QmFJRTB4TXpjNExqWXNNekl3SUV3eE1URXlMak1zTXpJd0lFTXhNRGsxTGprMU1qZzBMRE15TUM0M056WTBOVGdnTVRBNE1DNDFNRE01TkN3ek1USXVORGszTXpFM0lERXdOekl1TURrM09UVXNNams0TGpRMU5UVXpJRU14TURZekxqWTVNVGszTERJNE5DNDBNVE0zTkRNZ01UQTJNeTQyT1RFNU55d3lOall1T0RnMk1qVTNJREV3TnpJdU1EazNPVFVzTWpVeUxqZzBORFEzSUVNeE1EZ3dMalV3TXprMExESXpPQzQ0TURJMk9ETWdNVEE1TlM0NU5USTROQ3d5TXpBdU5USXpOVFF5SURFeE1USXVNeXd5TXpFdU15Qk1NVE0zT0M0MkxESXpNUzR6SUVNeE16azBMamswTnpFMkxESXpNQzQxTWpNMU5ESWdNVFF4TUM0ek9UWXdOaXd5TXpndU9EQXlOamd6SURFME1UZ3VPREF5TURVc01qVXlMamcwTkRRM0lFTXhOREkzTGpJd09EQXpMREkyTmk0NE9EWXlOVGNnTVRReU55NHlNRGd3TXl3eU9EUXVOREV6TnpReklERTBNVGd1T0RBeU1EVXNNams0TGpRMU5UVXpJRU14TkRFd0xqTTVOakEyTERNeE1pNDBPVGN6TVRjZ01UTTVOQzQ1TkRjeE5pd3pNakF1TnpjMk5EVTRJREV6TnpndU5pd3pNakFnV2lCTk1UVXpOQzR6TERJM05pNDVJRU14TlRJekxqRTNNVEEzTERJM05pNDRPRE0zTWpNZ01UVXhNaTQwTlRjNE5pd3lOekl1TmpZNU9EWXhJREUxTURRdU15d3lOalV1TVNCTU1UTXdPQzQwTERnMUxqRWdRekV5T1RFdU1qYzNOeXcyT0M0ek16YzNOVFkxSURFeU9UQXVOVFEwTXprc05ERXVNREV6TXpVMU15QXhNekEyTGpjME1qazVMREl6TGpNMU5qZzNOVGdnUXpFek1qSXVPVFF4Tml3MUxqY3dNRE01TmpNeklERXpOVEF1TWpJM09Ea3NOQzR3T0RJd05EY3dNaUF4TXpZNExqUXNNVGt1TnlCTU1UVTJOQzQwTERFNU9TNDNJRU14TlRjM0xqZzNORFF5TERJeE1pNHdOell3TlNBeE5UZ3lMak0zTnpnM0xESXpNUzQwTlRBeE1UZ2dNVFUzTlM0M05ETTFNaXd5TkRndU5UQXdNemszSUVNeE5UWTVMakV3T1RFM0xESTJOUzQxTlRBMk56VWdNVFUxTWk0Mk9UVTFNeXd5TnpZdU56ZzFOems0SURFMU16UXVOQ3d5TnpZdU9DQk1NVFV6TkM0ekxESTNOaTQ1SUZvaUlHbGtQU0pUYUdGd1pTSWdabWxzYkMxeWRXeGxQU0p1YjI1NlpYSnZJajQ4TDNCaGRHZytDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThjR0YwYUNCa1BTSk5NVE0yT1M0eUxEVXdOaTQ1SUVNeE16VXhMakUyTURrekxEVXdOaTQ1TURRNE16VWdNVE16TkM0NU1USXNORGsxTGprNU5UQXpNU0F4TXpJNExqQTROemM1TERRM09TNHlPVFkxTnpnZ1F6RXpNakV1TWpZek5Ua3NORFl5TGpVNU9ERXlOU0F4TXpJMUxqSXlNRGMxTERRME15NDBNekEyTkNBeE16TTRMakVzTkRNd0xqZ2dUREUxTWpndU1Td3lORFFnUXpFMU5EVXVPRGd6Tnpjc01qSTVMakV4TWpNek9TQXhOVGN5TGpFek1EQXpMREl6TUM0ME1qQTBNRFlnTVRVNE9DNHpORFUwTERJME55NHdNREkxTWpRZ1F6RTJNRFF1TlRZd056Y3NNall6TGpVNE5EWTBNaUF4TmpBMUxqSTRNVFl4TERJNE9TNDROVE0xT0RVZ01UVTVNQ3d6TURjdU15Qk1NVFF3TUN3ME9UUXVNU0JETVRNNU1TNDNPVGc1TWl3MU1ESXVNakkxTWpZeUlERXpPREF1TnpRME16RXNOVEEyTGpneE9UTTROaUF4TXpZNUxqSXNOVEEyTGprZ1dpSWdhV1E5SWxCaGRHZ2lQand2Y0dGMGFENEtJQ0FnSUNBZ0lDQWdJQ0FnUEM5blBnb2dJQ0FnSUNBZ0lEd3ZaejRLSUNBZ0lEd3ZaejRLUEM5emRtYysiIHBvaW50ZXItZXZlbnRzPSJub25lIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjguNSwyMi41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiIHBvaW50ZXItZXZlbnRzPSJhbGwiIHdpZHRoPSIyMiIgaGVpZ2h0PSIzNCIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHZlcnRpY2FsLWFsaWduOiB0b3A7IHdpZHRoOiAyMnB4OyB3aGl0ZS1zcGFjZTogbm93cmFwOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OmlubGluZS1ibG9jazt0ZXh0LWFsaWduOmluaGVyaXQ7dGV4dC1kZWNvcmF0aW9uOmluaGVyaXQ7Ij48Zm9udCBzdHlsZT0iZm9udC1zaXplOiAzMHB4IiBjb2xvcj0iIzQ1NTk3ZSI+PGI+QTwvYj48L2ZvbnQ+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjExIiB5PSIyMyIgZmlsbD0iIzAwMDAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMnB4IiBmb250LWZhbWlseT0iSGVsdmV0aWNhIj5bTm90IHN1cHBvcnRlZCBieSB2aWV3ZXJdPC90ZXh0Pjwvc3dpdGNoPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODguNSwyMi41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiIHBvaW50ZXItZXZlbnRzPSJhbGwiIHdpZHRoPSIyMiIgaGVpZ2h0PSIzNCIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHZlcnRpY2FsLWFsaWduOiB0b3A7IHdpZHRoOiAyMnB4OyB3aGl0ZS1zcGFjZTogbm93cmFwOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OmlubGluZS1ibG9jazt0ZXh0LWFsaWduOmluaGVyaXQ7dGV4dC1kZWNvcmF0aW9uOmluaGVyaXQ7Ij48Zm9udCBzdHlsZT0iZm9udC1zaXplOiAzMHB4IiBjb2xvcj0iIzQ1NTk3ZSI+PGI+QjwvYj48L2ZvbnQ+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjExIiB5PSIyMyIgZmlsbD0iIzAwMDAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMnB4IiBmb250LWZhbWlseT0iSGVsdmV0aWNhIj5bTm90IHN1cHBvcnRlZCBieSB2aWV3ZXJdPC90ZXh0Pjwvc3dpdGNoPjwvZz48L2c+PC9zdmc+"
                         width="100" height="35"
                         className="d-inline-block align-top" alt=""
                    />
                    &nbsp;&nbsp;Grafos
                </a>
                <button
                    className="btn btn-outline-success mr-sm-2"
                    onClick={
                        () => changeCurrentModal({ title: 'Vertex Modal', type: 'vertex' })
                    } type="button">
                    Adicionar Vértice
                </button>
                <button
                    className="btn btn-outline-warning mr-sm-2"
                    onClick={
                        () => changeCurrentModal({ title: 'Edge Modal', type: 'edge' })
                    } type="button">
                    Adicionar Aresta
                </button>
                <Form>
                    <Form.Check
                        type="switch"
                        id="graph-type-switch"
                        label={getToggleLabel()}
                        value={graphType}
                        onChange={onChangeGraphType}
                    />
                </Form>
            </div>
            {renderModal()}
        </nav>
    )
}

export default Header;