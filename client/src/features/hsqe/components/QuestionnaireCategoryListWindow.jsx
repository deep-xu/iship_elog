import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = [
  'AUDITS',
  'CAMPAIGNS',
  'COMPLIANCE VERIFICATION',
  'INSPECTIONS',
  'MAINTENANCE JOBS',
  'PERMITS',
  'QUALITY JOB',
  'REVIEWS',
  'SAFETY CONTROL CATEGORY',
  'SAFETY DRILLS',
  'Vessel Inspection',
]

export default function QuestionnaireCategoryListWindow(props) {
  return <DescriptionListWindow {...props} title="Questionnaire Category List" rows={ROWS} />
}
