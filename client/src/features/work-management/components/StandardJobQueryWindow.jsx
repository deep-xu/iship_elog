import QueryWindow from '@/components/ui/QueryWindow.jsx'
import { STANDARD_JOB_COLUMNS, STANDARD_JOB_SECTIONS } from '@/data/standardJobQuery.js'
import { getAllStandardJobs } from '@/stores/createdStandardJobsStore.js'

const MENUS = [
  { label: 'Standard Job', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function StandardJobQueryWindow(props) {
  return (
    <QueryWindow
      {...props}
      showBookmarks={false}
      onCreate={() => props.onOpenWindow?.('standard-job-detail')}
      createLabel="Create"
      onRowActivate={(row) => props.onOpenWindow?.('standard-job-detail', row)}
      title="Standard Job Query"
      menus={MENUS}
      toolbar={['open', 'find']}
      sections={STANDARD_JOB_SECTIONS}
      columns={STANDARD_JOB_COLUMNS}
      rows={getAllStandardJobs()}
      panelWidth="42%"
    />
  )
}
