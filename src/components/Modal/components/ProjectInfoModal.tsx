import React from "react";
import { Card } from "react-bootstrap";

const ProjectInfoModal = (): JSX.Element => (
    <Card className="text-center">
        <Card.Header>Trabalho para disciplina de Grafos - Professora Fernanda</Card.Header>
        <Card.Body>
            <Card.Title>Alunos</Card.Title>
            <Card.Text>
                Douglas Martins
            </Card.Text>
            <Card.Text>
                Gabriel Burich
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">UNIVALI - Universidade do Vale do Itajaí</Card.Footer>
    </Card>
);

export default ProjectInfoModal;