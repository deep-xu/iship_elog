import LibraryTreeWindow from '@/features/setup/components/LibraryTreeWindow.jsx'

const ITEMS = [
  {
    label: 'Incident - Operational',
    children: [
      'Allision',
      'Blackout',
      'Breach of Regulations',
      'Breach of Security',
      'Cargo Damage / Cargo Loss',
      'Collision',
      'Contact Damage',
      'Cyber Security Breach',
      'Equipment Failure/Damage',
      'Fire / Explosion',
      'Flooding',
      'Foundering(Sinking)',
      'Grounding/Touching Bottom',
      'Improper IMDG segregation',
      'Loss of Communication with Charterers',
      'Loss of Container Overboard',
      'Loss of Stability',
      'Man Overboard',
      'Moorings',
      'Operational',
      'Search and Rescue (SAR)',
      'Spills / Emissions',
      'Structural Damage/Failure',
    ],
  },
  {
    label: 'Incident - Personnel',
    children: ['Caught In / Between', 'Chronic Health Disorder'],
  },
]

export default function IncidentTypeWindow(props) {
  return <LibraryTreeWindow {...props} title="Incident Type" items={ITEMS} showIcons={false} />
}
