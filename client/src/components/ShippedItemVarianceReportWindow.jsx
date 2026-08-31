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
        {checked ? <span style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: '#2e8bcf' }} /> : null}
      </span>
      <span>{label}</span>
    </label>
  )
}

function DateField({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 18, color: '#1f3a5f' }}>
      <span style={{ width: 100 }}>{label}</span>
      <div
        style={{
          width: 190,
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

export default function ShippedItemVarianceReportWindow({ onMinimize, onClose, preview = false }) {
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
      <div style={{ width: '100%', height: '100%', background: '#efefef', border: '1px solid #a7a7a7', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            height: 42,
            background: '#dce8ef',
            borderBottom: '1px solid #9c9c9c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            color: '#1f3a5f',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', border: '3px solid #1f3a5f', background: '#fff', boxSizing: 'border-box' }} />
            <span>Report Option</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={onMinimize} style={{ width: 34, height: 26, border: 'none', background: 'transparent', color: '#1f3a5f', fontSize: 28, cursor: 'pointer' }}>_</button>
            <button type="button" onClick={onClose} style={{ width: 34, height: 30, border: '1px solid #8f8f8f', background: '#1f3a5f', color: '#fff', fontSize: 22, cursor: 'pointer' }}>×</button>
          </div>
        </div>

        <div style={{ padding: 20, overflow: 'auto' }}>
          <div style={{ background: '#fff', border: '1px solid #d4d4d4', textAlign: 'center', padding: '8px 16px', color: '#1f3a5f', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
            Shipped Item Variance Report
          </div>

          <div style={{ border: '1px solid #dce8ef', background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 16 }}>
            <DateField label="Start Date:" value="08/23/2026" />
            <DateField label="End Date:" value="02/23/2027" />
          </div>

          <div style={{ border: '1px solid #dce8ef', background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Radio checked label="Screen" />
            <Radio checked={false} label="Printer/Fax" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Radio checked={false} label="File" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, color: '#1f3a5f', marginLeft: 36 }}>
                <span>As</span>
                <div style={{ width: 320, borderBottom: '3px solid #d8dde6', minHeight: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 4 }}>
                  <span>PDF (*.pdf)</span>
                  <span style={{ fontSize: 22 }}>⌄</span>
                </div>
              </div>
            </div>
            <Radio checked={false} label="Email" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 20 }}>
            <button style={{ minWidth: 120, height: 48, border: 'none', background: '#1f3a5f', color: '#fff', fontSize: 18, fontWeight: 700 }}>Ok</button>
            <button style={{ minWidth: 120, height: 48, border: 'none', background: '#1f3a5f', color: '#fff', fontSize: 18, fontWeight: 700 }}>Help</button>
          </div>
        </div>
      </div>
    </div>
  )
}
