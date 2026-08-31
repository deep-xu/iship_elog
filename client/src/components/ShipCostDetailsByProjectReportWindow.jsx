import React from 'react'

function Radio({ checked, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 20, color: '#1f3a5f' }}>
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          border: `3px solid ${checked ? '#2e8bcf' : '#c7d6e0'}`,
          position: 'relative',
          flex: '0 0 auto',
          background: '#fff',
        }}
      >
        {checked ? (
          <span
            style={{
              position: 'absolute',
              inset: 3,
              borderRadius: '50%',
              background: '#2e8bcf',
            }}
          />
        ) : null}
      </span>
      <span>{label}</span>
    </label>
  )
}

function CheckboxRow({ label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, color: '#1f3a5f' }}>
      <span
        style={{
          width: 18,
          height: 18,
          border: '2px solid #8ea0b8',
          background: '#fff',
          flex: '0 0 auto',
        }}
      />
      <span>{label}</span>
    </label>
  )
}

function DateLine({ label, value = '', width = 180 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, color: '#1f3a5f' }}>
      <span>{label}</span>
      <div
        style={{
          width,
          borderBottom: '3px solid #d8dde6',
          minHeight: 34,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 4,
        }}
      >
        <span>{value}</span>
        <span style={{ fontSize: 18, color: '#1f3a5f', lineHeight: 1 }}>
          📅
        </span>
      </div>
    </div>
  )
}

function OutputOptions({ includeSchedule = false }) {
  return (
    <div
      style={{
        border: '1px solid #dce8ef',
        background: '#fff',
        padding: '24px 28px 22px',
        display: 'grid',
        gridTemplateColumns: includeSchedule ? '1fr auto' : '1fr',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Radio checked label="Screen" />
        <Radio checked={false} label="Printer/Fax" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Radio checked={false} label="File" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 18,
              color: '#1f3a5f',
              marginLeft: 36,
            }}
          >
            <span>As</span>
            <div
              style={{
                width: 320,
                borderBottom: '3px solid #d8dde6',
                minHeight: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 4,
              }}
            >
              <span>PDF (*.pdf)</span>
              <span style={{ fontSize: 22 }}>⌄</span>
            </div>
          </div>
        </div>
        <Radio checked={false} label="Email" />
        {includeSchedule ? <Radio checked={false} label="Schedule" /> : null}
      </div>
      {includeSchedule ? (
        <button
          style={{
            alignSelf: 'end',
            height: 48,
            padding: '0 28px',
            border: 'none',
            background: '#1f3a5f',
            color: '#fff',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          View Scheduled Tasks
        </button>
      ) : null}
    </div>
  )
}

export default function ShipCostDetailsByProjectReportWindow({ onMinimize, onClose, preview = false }) {
  const frameStyle = preview
    ? {}
    : {
        width: '100%',
        height: '100%',
        background: '#eef5fa',
        padding: 14,
        boxSizing: 'border-box',
      }

  return (
    <div style={frameStyle}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#efefef',
          border: '1px solid #a7a7a7',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: 42,
            background: '#dce8ef',
            borderBottom: '1px solid #9c9c9c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            boxSizing: 'border-box',
            color: '#1f3a5f',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '3px solid #1f3a5f',
                display: 'inline-block',
                boxSizing: 'border-box',
                background: '#fff',
              }}
            />
            <span>Report Option</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={onMinimize}
              style={{
                width: 34,
                height: 26,
                border: 'none',
                background: 'transparent',
                color: '#1f3a5f',
                fontSize: 28,
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              _
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                width: 34,
                height: 30,
                border: '1px solid #8f8f8f',
                background: '#1f3a5f',
                color: '#fff',
                fontSize: 22,
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div style={{ padding: 20, boxSizing: 'border-box', overflow: 'auto' }}>
          <div
            style={{
              background: '#fff',
              border: '1px solid #d4d4d4',
              textAlign: 'center',
              padding: '8px 16px',
              color: '#1f3a5f',
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Ship Cost Details By Project
          </div>

          <div
            style={{
              border: '1px solid #c7c7c7',
              background: '#fff',
              padding: 14,
              marginBottom: 18,
            }}
          >
            <div style={{ color: '#1f3a5f', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Reporting Period</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Radio checked label="Fiscal Year-To-Date" />
                <Radio checked={false} label="Arbitrary Time Period" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, color: '#1f3a5f' }}>
                  <span>Fiscal Year:</span>
                  <div style={{ width: 90, borderBottom: '3px solid #d8dde6', minHeight: 34, paddingBottom: 4 }}>2026</div>
                </div>
                <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap' }}>
                  <DateLine label="Start Date:" width={180} />
                  <DateLine label="End Date:" width={180} />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              border: '1px solid #c7c7c7',
              background: '#fff',
              padding: 14,
              marginBottom: 18,
            }}
          >
            <div style={{ color: '#1f3a5f', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Options</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <CheckboxRow label="Exclude Detail Lines" />
                <CheckboxRow label="Exclude PO's with Zero Committed Cost" />
                <CheckboxRow label="Exclude Requisitions" />
                <CheckboxRow label="Exclude Service Requisitions" />
                <CheckboxRow label="Exclude Transfer Orders" />
                <CheckboxRow label="Exclude Crew Overtime" />
                <CheckboxRow label="Include Subtotals by Document" />
                <CheckboxRow label="Include Service Requisition to be approved" />
                <CheckboxRow label="Use Actual Commitment Remaining" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, color: '#1f3a5f' }}>
                  <span>Currency:</span>
                  <div
                    style={{
                      flex: 1,
                      borderBottom: '3px solid #d8dde6',
                      minHeight: 34,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: 4,
                    }}
                  >
                    <span>US DOLLAR</span>
                    <span style={{ fontSize: 22 }}>⌄</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, color: '#1f3a5f' }}>
                  <span>Exclude Docs with Total Cost less than:</span>
                  <div style={{ width: 110, borderBottom: '3px solid #d8dde6', minHeight: 34, paddingBottom: 4 }}>0.00</div>
                </div>
              </div>
            </div>
          </div>

          <OutputOptions includeSchedule />

          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 20 }}>
            <button
              style={{
                minWidth: 120,
                height: 48,
                border: 'none',
                background: '#1f3a5f',
                color: '#fff',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Ok
            </button>
            <button
              style={{
                minWidth: 120,
                height: 48,
                border: 'none',
                background: '#1f3a5f',
                color: '#fff',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
