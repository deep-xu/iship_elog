import ReportOptionWindow, {
  ReportCard,
  ReportContentStack,
  ReportFileOptionRow,
  ReportOptionRow,
} from './ReportOptionWindow.jsx'

export default function QuickInventoryCostReportWindow({ onMinimize, onClose, preview = false }) {
  return (
    <ReportOptionWindow title="Quick Inventory Cost" onMinimize={onMinimize} onClose={onClose} preview={preview}>
      <ReportCard className="min-h-0 flex-1">
        <ReportContentStack>
          <ReportOptionRow label="Screen" checked />
          <ReportOptionRow label="Printer/Fax" />
          <ReportFileOptionRow />
          <ReportOptionRow label="Email" />
        </ReportContentStack>
      </ReportCard>
    </ReportOptionWindow>
  )
}
