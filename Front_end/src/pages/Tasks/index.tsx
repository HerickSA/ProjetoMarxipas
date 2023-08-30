import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import api from '../../service/service.api'
import Badge from 'react-bootstrap/Badge'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

interface ITask {
  id: string
  title: string
  description: string
  status: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const history = useHistory()

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    const response = await api.get('/tasks')
    console.log(response)
    setTasks(response.data)
  }

  async function finishedTask(id: string) {
    console.log(id)
    await api.put(`/tasks/${id}`, { status: 'FINALIZADO' })
    loadTasks()
  }

  async function deleteTask(id: string) {
    await api.delete(`/tasks/${id}`)
    loadTasks()
  }

  function newTask() {
    history.push('/tarefas_cadastro')
  }

  function editTask(id: string) {
    console.log('alguma coisa', id)
    history.push(`/tarefas_cadastro/${id}`)
  }

  function viewTask(id: string) {
    history.push(`/tarefas/${id}`)
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Pagina de tarefas</h1>
        <Button variant="dark" size="sm" onClick={newTask}>
          Nova Tarefa
        </Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task._id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <Badge variant={task.status ? 'success' : 'warning'}>
                  {task.status ? 'FINALIZADO' : 'PENDENTE'}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  disabled={task.status}
                  onClick={() => editTask(task._id)}
                >
                  Editar
                </Button>{' '}
                <Button
                  size="sm"
                  disabled={task.status}
                  variant="success"
                  onClick={() => finishedTask(task._id)}
                >
                  Finalizar
                </Button>{' '}
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => viewTask(task._id)}
                >
                  Visualizar
                </Button>{' '}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteTask(task._id)}
                >
                  Deletar
                </Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Tasks
