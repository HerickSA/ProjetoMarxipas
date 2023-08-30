import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom' 
import { Button, Card, Badge } from 'react-bootstrap';
import api from '../../../service/service.api';

import moment from 'moment';

interface ITask {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const Detail: React.FC = () => {

    const history = useHistory()
    const { id } = useParams()
    const [task, setTask] = useState<ITask>()

    useEffect(() => {
        findTask()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function back() {
        history.goBack()
    }

    async function findTask() {

        const response = await api.get<ITask>(`/tasks/${id}`)
        console.log(response)
        setTask(response.data)

    }

    function formateDate(date: Date | undefined) {
        return moment(date).format("DD/MM/YYYY")
    }

    return(
        <div className="container">
            <br/>
            <div className="task-header">
                <h1>Tasks Detail</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br/>

            <Card>
                <Card.Body>
                    <Card.Title>{ task?.title }</Card.Title>
                    
                    <Card.Text>
                    {task?.description}
                    <br/>
                    <Badge variant={task?.status ? "success" : "warning"}>
                        {task?.status ? "FINALIZADO" : "PENDENTE"}
                    </Badge>
                    <br />
                    <strong>Data de Cadastro: </strong>
                    <Badge variant="info">
                        { formateDate(task?.createdAt) }
                    </Badge>
                    <br />
                    <strong>Data de Atualização: </strong>
                    <Badge variant="info">
                        { formateDate(task?.updatedAt) }
                    </Badge>
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}

export default Detail;
