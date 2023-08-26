import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import api from '../../service/service.api'
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap'


interface ITask {
  title: string
  description: string
  status: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    const response = await api.get('/tasks')
    console.log(response)
    setTasks(response.data)
  }

  return (
    <div className="conteiner">
      <br />
      <h1>Pagina de Tarefas</h1>
      <br />
      <Table striped bordered hover className='text-center'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.title}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <Badge bg="light" text="dark">
                  { task.status ? "finalizado" : " Pendente"}
                </Badge>
              </td>
              <td>
                <Button size='sm'>Editar</Button>{' '}
                <Button size='sm' variant='dark'>Finalizar</Button>{' '}
                <Button size='sm' variant='info'>Visualizar</Button>{' '}
                <Button size='sm' variant='danger'>Remover</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Tasks
