"use client"

import { useEffect, useState } from 'react'

type Todo = {
  id: number
  title: string
  description?: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  async function fetchTodos() {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => { fetchTodos() }, [])

  async function saveTodo(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    if (editingId !== null) {
      await fetch(`/api/todos/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })
    } else {
      await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })
    }

    setTitle('')
    setDescription('')
    setEditingId(null)
    fetchTodos()
  }

  async function toggleComplete(id: number, completed: boolean) {
    await fetch(`/api/todos/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !completed }) })
    fetchTodos()
  }

  async function deleteTodo(id: number) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    fetchTodos()
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Focused workflow</span>
          <h1>Daily task planning that stays calm and clear.</h1>
          <p>Capture your most important todos, keep personal projects organized, and stay on track without distractions. A simple local app for working quietly and effectively.</p>
        </div>
        <div className="hero-features">
          <div>
            <p className="feature-label">FOCUS</p>
            <p className="feature-value">Simple</p>
          </div>
          <div>
            <p className="feature-label">SCOPE</p>
            <p className="feature-value">Local-only</p>
          </div>
          <div>
            <p className="feature-label">TOOLS</p>
            <p className="feature-value">Todo CRUD</p>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <p className="section-label">{editingId ? 'Edit task' : 'Add a task'}</p>
            <h2>{editingId ? 'Edit todo' : 'Quick entry'}</h2>
          </div>
          <p className="section-copy">Create a todo with a title and optional note, then complete or remove it as you go.</p>
        </div>

        <form onSubmit={saveTodo} className="todo-form">
          <input
            className="form-field"
            placeholder="Task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="form-field"
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className="form-actions">
            <button className="primary-button" type="submit">{editingId ? 'Save changes' : 'Add todo'}</button>
            {editingId !== null && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setEditingId(null)
                  setTitle('')
                  setDescription('')
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <p className="section-label">Todo list</p>
            <h2>Your current tasks</h2>
          </div>
          <p className="section-copy">{todos.length} {todos.length === 1 ? 'task' : 'tasks'} in progress</p>
        </div>

        {todos.length === 0 ? (
          <div className="empty-state">No todos yet. Add your first task above to begin.</div>
        ) : (
          <ul className="todo-list">
            {todos.map(t => (
              <li key={t.id} className="todo-item">
                <label className="todo-main">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleComplete(t.id, t.completed)}
                    className="todo-checkbox"
                  />
                  <div>
                    <p className={`todo-title ${t.completed ? 'completed' : ''}`}>{t.title}</p>
                    {t.description && <p className="todo-description">{t.description}</p>}
                  </div>
                </label>
                <div className="todo-actions">
                  <button className="edit-button" onClick={() => {
                    setEditingId(t.id)
                    setTitle(t.title)
                    setDescription(t.description ?? '')
                  }}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => deleteTodo(t.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
