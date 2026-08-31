import ReportOptionWindow, {
  ReportCard,
  ReportContentStack,
  ReportFieldRow,
  ReportFileOptionRow,
  ReportOptionRow,
  SelectPill,
} from './ReportOptionWindow.jsx'

export default function StandardFormatReportWindow({ onMinimize, onClose, preview = false }) {
  return (
    <ReportOptionWindow title="Standard Format" onMinimize={onMinimize} onClose={onClose} preview={preview}>
      <ReportCard>
        <ReportContentStack>
          <ReportFieldRow label="Item Category:">
            <SelectPill />
          </ReportFieldRow>
        </ReportContentStack>
      </ReportCard>

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
