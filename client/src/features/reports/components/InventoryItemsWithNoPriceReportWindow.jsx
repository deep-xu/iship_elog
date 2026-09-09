import ReportOptionWindow, {
  DatePill,
  ReportCard,
  ReportContentStack,
  ReportFieldRow,
  ReportFileOptionRow,
  ReportOptionRow,
} from '@/features/reports/components/ReportOptionWindow.jsx'

export default function InventoryItemsWithNoPriceReportWindow({ onMinimize, onClose, preview = false }) {
  return (
    <ReportOptionWindow title="Inventory Items with no Price" onMinimize={onMinimize} onClose={onClose} preview={preview}>
      <ReportCard>
        <ReportContentStack>
          <ReportFieldRow label="Date Time:">
            <DatePill value="08/23/2026" />
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
