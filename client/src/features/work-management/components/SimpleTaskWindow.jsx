import { useState } from 'react'
import { loadSimpleTasks, saveSimpleTasks } from '@/stores/simpleTasksStore.js'

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0">
      <circle cx="12" cy="12" r="10" className="fill-none stroke-ns-blue" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" className="fill-ns-blue" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 16 16" className="h-[14px] w-[14px] stroke-current" fill="none" strokeWidth="2">
      <polyline points="3,6 8,11 13,6" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] stroke-current" fill="none" strokeWidth="1.8">
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="8" y1="3.5" x2="8" y2="8" />
      <line x1="16" y1="3.5" x2="16" y2="8" />
    </svg>
  )
}

function SearchBar({ placeholder = 'Search...' }) {
  return (
    <div className="flex h-[38px] w-full max-w-[250px] items-center gap-[8px] rounded-full border border-[#dbe7ef] bg-[#f8fbfe] px-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 text-ns-navy">
        <circle cx="10" cy="10" r="6.5" className="fill-none stroke-current" strokeWidth="2" />
        <line x1="15" y1="15" x2="21" y2="21" className="stroke-current" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="text-[12px] text-ns-navy">▾</span>
      <input
        type="text"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[14px] text-ns-navy placeholder:text-[#8ba0b2] focus:outline-none"
      />
    </div>
  )
}

function WindowActionButton({ children, label, filled = false, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-[34px] w-[34px] items-center justify-center rounded-full border transition-colors focus:outline-none ${
        filled
          ? 'border-[#d7e6ef] bg-white text-ns-navy'
          : 'border-transparent bg-transparent text-[#8aa0b4] hover:bg-white'
      }`}
    >
      {children}
    </button>
  )
}

function WindowActions({ onMinimize, onClose, preview }) {
  return (
    <div className="ml-auto flex items-center gap-[8px]">
      <WindowActionButton label="Minimize" onClick={preview ? undefined : onMinimize}>
        <svg viewBox="0 0 16 16" className="h-[14px] w-[14px] stroke-current" strokeWidth="2.2">
          <line x1="3" y1="11" x2="13" y2="11" />
        </svg>
      </WindowActionButton>
      <WindowActionButton label="Close" filled onClick={preview ? undefined : onClose}>
        <svg viewBox="0 0 16 16" className="h-[12px] w-[12px] stroke-current" strokeWidth="2">
          <line x1="3" y1="3" x2="13" y2="13" />
          <line x1="13" y1="3" x2="3" y2="13" />
        </svg>
      </WindowActionButton>
    </div>
  )
}

function FormField({
  label,
  value = '',
  required = false,
  multiline = false,
  dropdown = false,
  calendar = false,
  options = [],
  onChange,
  placeholder = '',
}) {
  const baseClasses =
    'min-h-[48px] w-full rounded-[16px] border border-[#d7e5ee] bg-[#fbfdff] px-[16px] text-[15px] text-ns-navy outline-none transition-colors placeholder:text-[#8aa1b6] focus:border-[#7fc4f2]'
  const requiredClasses = required ? 'border-[#9ed3f3] bg-[#f7fbfe]' : ''

  return (
    <label className="flex flex-col gap-[8px]">
      <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#7992aa]">{label}</span>
      <div className="relative">
        {multiline ? (
          <textarea
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            placeholder={placeholder}
            className={`${baseClasses} ${requiredClasses} min-h-[136px] resize-none py-[14px]`}
          />
        ) : dropdown ? (
          <select
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            className={`${baseClasses} ${requiredClasses} appearance-none pr-[40px]`}
          >
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={calendar ? 'date' : 'text'}
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            placeholder={placeholder}
            className={`${baseClasses} ${requiredClasses} pr-[40px]`}
          />
        )}

        {(dropdown || calendar) && (
          <span className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-[#7992aa]">
            {calendar ? <CalendarIcon /> : <ChevronDown />}
          </span>
        )}
      </div>
    </label>
  )
}

const TASK_LIST_COLUMNS = [
  'Task No.',
  'Task Name',
  'Task Type',
  'Rank',
  'Department',
  'Ship',
  'Priority',
  'Due On',
  'Status',
]

function TaskListView({ onMinimize, onClose, preview, onCreate, tasks }) {
  return (
    <div className="flex h-full w-full flex-col border border-[#d7e6ef] bg-white shadow-[0_26px_60px_rgba(17,46,74,0.12)]">
      <div className="flex items-center gap-[12px] border-b border-[#e3edf4] bg-[#f8fbfd] px-[24px] py-[18px]">
        <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#e5f3fb,#f8fcff)]">
          <DotIcon />
        </span>
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#8aa1b6]">Quick Action</div>
          <div className="font-heading text-[24px] font-bold text-ns-navy">Simple Task</div>
        </div>
        <WindowActions onMinimize={onMinimize} onClose={onClose} preview={preview} />
      </div>

      <div className="flex shrink-0 items-center justify-between gap-[12px] border-b border-[#e3edf4] bg-white px-[24px] py-[16px]">
        <div>
          <div className="text-[15px] font-semibold text-ns-navy">Shipboard tasks</div>
          <div className="mt-[4px] text-[14px] text-[#6f87a0]">
            {tasks.length === 0 ? 'No tasks captured yet. Use Create to add one.' : `${tasks.length} task(s) captured.`}
          </div>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center gap-[8px] rounded-full bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)] px-[22px] py-[11px] text-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(46,139,207,0.24)] transition hover:brightness-110 focus:outline-none"
        >
          <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] stroke-current" strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-[#f5fafc] p-[18px]">
        <div className="overflow-x-auto rounded-[16px] border border-[#d7e5ee] bg-white">
          <div
            className="grid bg-ns-navy text-[13px] font-semibold text-white"
            style={{ gridTemplateColumns: `repeat(${TASK_LIST_COLUMNS.length}, minmax(100px, 1fr))` }}
          >
            {TASK_LIST_COLUMNS.map((column) => (
              <div key={column} className="border-r border-white/20 px-[12px] py-[10px] text-center last:border-r-0">
                {column}
              </div>
            ))}
          </div>
          {tasks.length === 0 ? (
            <div className="flex h-[280px] items-center justify-center text-[14px] text-[#8da3b7]">
              No entries.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.taskNo}
                className="grid border-t border-[#e9f0f5] text-[13px] text-ns-navy"
                style={{ gridTemplateColumns: `repeat(${TASK_LIST_COLUMNS.length}, minmax(100px, 1fr))` }}
              >
                {[task.taskNo, task.taskName, task.taskType, task.owner, task.department, task.ship, task.priority, task.dueOn, task.status].map(
                  (cell, index) => (
                    <div key={index} className="border-r border-[#eef3f7] px-[12px] py-[10px] text-center last:border-r-0">
                      {cell || '-'}
                    </div>
                  ),
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default function SimpleTaskWindow({ onMinimize, onClose, preview = false }) {
  const [view, setView] = useState('list')
  const [form, setForm] = useState({
    taskName: '',
    taskType: 'General',
    description: '',
    owner: '',
    ship: 'MV Genco',
    priority: 'Low',
    dueOn: '',
    extra: '',
    department: '',
  })

  const [tasks, setTasks] = useState(loadSimpleTasks)

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function resetForm() {
    setForm({
      taskName: '',
      taskType: 'General',
      description: '',
      owner: '',
      ship: 'MV Genco',
      priority: 'Low',
      dueOn: '',
      extra: '',
      department: '',
    })
  }

  function handleSave() {
    setTasks((current) => {
      const next = [
        ...current,
        {
          taskNo: `TSK-${String(current.length + 1).padStart(3, '0')}`,
          taskName: form.taskName,
          taskType: form.taskType,
          owner: form.owner,
          department: form.department,
          ship: form.ship,
          priority: form.priority,
          dueOn: form.dueOn,
          status: form.extra,
        },
      ]
      saveSimpleTasks(next)
      return next
    })
    resetForm()
    setView('list')
  }

  if (view === 'list') {
    return (
      <TaskListView
        onMinimize={onMinimize}
        onClose={onClose}
        preview={preview}
        onCreate={() => setView('form')}
        tasks={tasks}
      />
    )
  }

  return (
    <div className="flex h-full w-full flex-col border border-[#d7e6ef] bg-white shadow-[0_26px_60px_rgba(17,46,74,0.12)]">
      <div className="flex items-center gap-[12px] border-b border-[#e3edf4] bg-[#f8fbfd] px-[24px] py-[18px]">
        <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#e5f3fb,#f8fcff)]">
          <DotIcon />
        </span>
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#8aa1b6]">Quick Action</div>
          <div className="font-heading text-[24px] font-bold text-ns-navy">Task - New</div>
        </div>
        <WindowActions onMinimize={onMinimize} onClose={onClose} preview={preview} />
      </div>

      <div className="grid shrink-0 gap-[14px] border-b border-[#e3edf4] bg-white px-[24px] py-[18px] lg:grid-cols-[minmax(0,1.35fr)_280px]">
        <div>
          <div className="text-[15px] font-semibold text-ns-navy">Create a simple shipboard task</div>
          <div className="mt-[4px] max-w-[720px] text-[14px] leading-[22px] text-[#6f87a0]">
            Capture the task, assign ownership, and set the due date without changing any backend workflow.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[12px]">
          <SummaryCard label="Ship" value={form.ship || '-'} />
          <SummaryCard label="Priority" value={form.priority || 'Low'} />
        </div>

        <div className="flex justify-end lg:col-span-2">
          <SearchBar placeholder="Search..." />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-[#f5fafc] p-[18px]">
        <div className="grid gap-[18px] xl:grid-cols-[minmax(0,1.35fr)_320px]">
          <section className="rounded-[24px] border border-[#d7e5ee] bg-white p-[24px]">
            <div className="mb-[18px] flex items-center justify-between gap-[12px]">
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#8aa1b6]">
                  Task Details
                </div>
                <div className="mt-[4px] text-[22px] font-bold text-ns-navy">Core information</div>
              </div>
              <span className="rounded-full bg-[#eef7fd] px-[12px] py-[6px] text-[12px] font-semibold text-[#2e8bcf]">
                Minimal input
              </span>
            </div>

            <div className="grid gap-[18px] md:grid-cols-2">
              <FormField
                label="Task Name"
                value={form.taskName}
                onChange={(value) => updateField('taskName', value)}
                placeholder="Enter task name"
                required
              />
              <FormField
                label="Task Type"
                value={form.taskType}
                onChange={(value) => updateField('taskType', value)}
                options={['General', 'Operational', 'Administrative', 'Safety']}
                dropdown
              />

              <div className="md:col-span-2">
                <FormField
                  label="Description"
                  value={form.description}
                  onChange={(value) => updateField('description', value)}
                  placeholder="Add a clear summary for the crew"
                  multiline
                />
              </div>

              <FormField
                label="Rank"
                value={form.owner}
                onChange={(value) => updateField('owner', value)}
                options={['', 'Chief Engineer', 'Master', 'Chief Officer', 'Second Engineer']}
                dropdown
              />
              <FormField
                label="Department"
                value={form.department}
                onChange={(value) => updateField('department', value)}
                options={['', 'Deck', 'Engine', 'Electrical', 'Galley']}
                placeholder="-- Select --"
                dropdown
              />
            </div>
          </section>

          <aside className="space-y-[18px]">
            <section className="rounded-[24px] border border-[#d7e5ee] bg-white p-[22px]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#8aa1b6]">Assignment</div>
              <div className="mt-[6px] text-[20px] font-bold text-ns-navy">Schedule and context</div>

              <div className="mt-[18px] space-y-[16px]">
                <FormField
                  label="Ship"
                  value={form.ship}
                  onChange={(value) => updateField('ship', value)}
                  options={['MV Genco']}
                  dropdown
                />
                <FormField
                  label="Priority"
                  value={form.priority}
                  onChange={(value) => updateField('priority', value)}
                  options={['Low', 'Medium', 'High', 'Critical']}
                  dropdown
                />
                <FormField
                  label="Due On"
                  value={form.dueOn}
                  onChange={(value) => updateField('dueOn', value)}
                  calendar
                />
                <FormField
                  label="Status"
                  value={form.extra}
                  onChange={(value) => updateField('extra', value)}
                  options={['', 'Planned', 'Open', 'Closed']}
                  placeholder="-- Select --"
                  dropdown
                />
              </div>
            </section>

            <section className="rounded-[24px] border border-[#d7e5ee] bg-[linear-gradient(180deg,#f9fcff_0%,#f2f8fc_100%)] p-[22px]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#8aa1b6]">Guidance</div>
              <div className="mt-[8px] text-[16px] font-semibold text-ns-navy">Make it easier for the crew</div>
              <p className="mt-[8px] text-[14px] leading-[22px] text-[#6f87a0]">
                Use a short task name, one clear owner, and a concise description so the job is easy to pick up later.
              </p>
            </section>
          </aside>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[16px] border-t border-[#e3edf4] bg-white px-[24px] py-[18px]">
        <div className="text-[13px] text-[#7b93aa]">Required fields stay highlighted for faster entry.</div>
        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            onClick={() => setView('list')}
            className="min-w-[148px] rounded-full border border-[#d6e3ec] bg-white px-[24px] py-[12px] text-[15px] font-semibold text-ns-navy transition-colors focus:outline-none"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="min-w-[148px] rounded-full px-[24px] py-[12px] text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(46,139,207,0.24)] transition-colors focus:outline-none bg-[linear-gradient(135deg,#2e8bcf,#4aa8e2)]"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-[18px] border border-[#d9e6ee] bg-[#fbfdff] px-[16px] py-[14px]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8aa1b6]">{label}</div>
      <div className="mt-[6px] text-[16px] font-semibold text-ns-navy">{value}</div>
    </div>
  )
}
