import { useEffect, useState } from 'react'

const NODE_WINDOW_MAP = {
  'Equipment Structure': 'equipment-explorer',
  'Find Equipment': 'find-equipment',
  'Find Part': 'find-part',
  'Maintenance Plan': 'mp',
  'Service Explorer': 'hierarchy',
  'Spares Storage Locations': 'purchasing',
  'Vessel Certificate': 'vessel-certificate',
  'Vessel Certificate Dashboard': 'vessel-certificate-dashboard',
  'Compliance Hierarchy': 'compliance-hierarchy',
  'Compliance Plan': 'cp',
  'Survey Certificate': 'survey-certificate-manager',
  'Survey/Certificate Manager': 'survey-certificate-manager',
  'Risk Safety Analysis': 'jsa-query',
  'Simple Task': 'simple-task',
  'Non Conformity': 'non-conformity',
  'Permit to Work': 'permit-to-work',
  'Work Order': 'wo',
  'Work Order Wizard': 'work-order-wizard',
  Reconciliation: 'reconciliation-search',
  Findings: 'ob',
  Contract: 'contract-search',
  'Landing Order': 'landing-order-search',
  'Maintenance Events': 'event-lists',
  'Purchase Order': 'purchase-order-search',
  Project: 'project-search',
  'Request For Quotation': 'rfq-search',
  'Serialized Item Query': 'serialized-item-query',
  'Standard Job': 'standard-job-query',
  'Technical Defect': 'technical-defect-list',
  'Update Serial No.': 'update-serial-no',
  'Attachment Replication Queue': 'attachment-replication-queue',
  'Change Password': 'change-password',
  'Document Exchange': 'document-exchange',
  'Find Record by ID': 'find-record-by-id',
  Mail: 'mail',
}

const NODE_PATH_WINDOW_MAP = {
  'Documents/Create/Create REQ from Wizard': 'create-req-from-wizard',
  'Documents/Create/Reconciliation': 'reconciliation',
  'Documents/Create/Requisition': 'requisition',
  'Documents/Create/Transfer Order': 'to',
  'Documents/Search/Contract': 'contract-search',
  'Documents/Search/Findings': 'ob',
  'Documents/Search/Insurance Claim': 'insurance-claim-list',
  'Documents/Search/Risk Safety Analysis': 'jsa-query',
  'Documents/Search/Landing Order': 'landing-order-search',
  'Documents/Search/Maintenance Events': 'event-lists',
  'Documents/Search/Order': 'order-search',
  'Documents/Search/Purchase Order': 'purchase-order-search',
  'Documents/Search/Reconciliation': 'reconciliation-search',
  'Documents/Search/Requisition': 'requisition-search',
  'Documents/Search/Transfer Order': 'transfer-order-search',
  'Documents/Search/Project': 'project-search',
  'Documents/Search/Request For Quotation': 'rfq-search',
  'Documents/Search/Serialized Item Query': 'serialized-item-query',
  'Documents/Search/Standard Job': 'standard-job-query',
  'Documents/Search/Technical Defect': 'technical-defect-list',
  'Documents/Search/Update Serial No.': 'update-serial-no',
  'Documents/Search/Work Order': 'work-order-search',
  'Tools/Hide/Merge/Move Storage Locations': 'purchasing',
  'Tools/Recalculate Maintenance Schedule': 'recalculate-maintenance-schedule',
  'Tools/Running Hours': 'record-elapsed-running-hours',
  'Tools/Spaces & Structures': 'spaces-structures',
  'Inventory Reports/Equipment Hierarchy': 'equipment-hierarchy-report',
  'Inventory Reports/Equipment Particulars': 'equipment-particulars-report',
  'Inventory Reports/Inventory Adjustment': 'inventory-adjustment-report',
  'Inventory Reports/Inventory Cost': 'inventory-cost-report',
  'Inventory Reports/Inventory Items with no Price': 'inventory-items-with-no-price-report',
  'Inventory Reports/Inventory of Hazardous Materials': 'inventory-of-hazardous-materials-report',
  'Inventory Reports/Quick Inventory Cost': 'quick-inventory-cost-report',
  'Inventory Reports/Shelf Life Expiration Listing': 'shelf-life-expiration-listing-report',
  "Inventory Reports/Ship's Storage Locations": 'ships-storage-locations-report',
  'Inventory Reports/SI Inventory Cost': 'si-inventory-cost-report',
  'Inventory Reports/Spares List by Equipment': 'spares-list-by-equipment-report',
  'Inventory Reports/Spares List by Location': 'spares-list-by-location-report',
  'Inventory Reports/Parts Manual by Equipment/Barcode Format': 'barcode-format-report',
  'Inventory Reports/Parts Manual by Equipment/Extended Format': 'extended-format-report',
  'Inventory Reports/Parts Manual by Equipment/Standard Format': 'standard-format-report',
  'Maintenance Reports/Overdue Jobs': 'overdue-jobs-report',
  'Maintenance Reports/Standard Job Descriptions': 'standard-job-descriptions-report',
  'Maintenance Reports/Surveys by Category': 'surveys-by-category-report',
  'Maintenance Reports/Units w/Running-Hour Maintenance': 'units-running-hour-maintenance-report',
  'Other Reports/Ship Cost Details By Project': 'ship-cost-details-by-project-report',
  'Other Reports/Shipped Item Variance Report': 'shipped-item-variance-report',
  'Other Reports/Warranty Coverage Listing': 'warranty-coverage-listing-report',
  'Other Reports/Warranty Expiration Listing': 'warranty-expiration-listing-report',
  'Purchasing Reports/Goods in Transit Report': 'goods-in-transit-report',
  'Purchasing Reports/Non Contract Purchasing': 'non-contract-purchasing-report',
  'Purchasing Reports/PO Listing by Shipment Status': 'po-listing-by-shipment-status-report',
  'Purchasing Reports/PO Performance Monitoring Report': 'po-performance-monitoring-report',
  'Purchasing Reports/PO Receiving Exceptions Report': 'po-receiving-exceptions-report',
  'Purchasing Reports/POs Received Not Delivered': 'pos-received-not-delivered-report',
  'Purchasing Reports/Received Goods Report': 'received-goods-report',
  'Purchasing Reports/Requisition Stock and Order Status': 'requisition-stock-and-order-status-report',
  'Purchasing Reports/Top 50 Vendors by Total Spend': 'top-50-vendors-by-total-spend-report',
  'Purchasing Reports/Inventory Replenishment Preview/Preview (Maximum Level)': 'replenish-to-maximum-level-report',
  'Purchasing Reports/Inventory Replenishment Preview/Preview (Minimum Level)': 'replenish-to-minimum-level-report',
  'Purchasing Reports/Inventory Replenishment Preview/Preview (Reorder Level)': 'replenish-to-reorder-level-report',
  'Purchasing Reports/Requisition Performance Monitoring Report': 'requisition-performance-monitoring-report',
  'Master Data/Companies': 'drawing',
  'Master Data/Currencies & Exchange Rates': 'currencies-exchange-rates-list',
  'Master Data/Performance Review Attributes Setup': 'performance-review-attributes-setup',
  'Master Data/Position Requirements and Watch/Work Hours': 'crew-position-titles-list',
  'Master Data/Ship Details': 'ship-details',
  'Master Data/Vessel Requirements': 'vessel-requirements',
  'Master Data/Index Terms/General-purpose/Account Category': 'account-category-list',
  'Master Data/Index Terms/General-purpose/Authorization Profile': 'authorization-profile-list',
  'Master Data/Index Terms/General-purpose/Charter Type': 'charter-type-list',
  'Master Data/Index Terms/General-purpose/Company Type': 'company-type-list',
  'Master Data/Index Terms/General-purpose/Contact Title': 'contact-title-list',
  'Master Data/Index Terms/General-purpose/Department': 'department-list',
  'Master Data/Index Terms/General-purpose/Drawing Category': 'drawing-category',
  'Master Data/Index Terms/General-purpose/Impacts': 'impacts',
  'Master Data/Index Terms/General-purpose/Legal/Administrative': 'legal-administrative',
  'Master Data/Index Terms/General-purpose/Maintenance Notation': 'maintenance-notation-list',
  'Master Data/Index Terms/General-purpose/Project Index': 'project-index',
  'Master Data/Index Terms/General-purpose/Questionnaire Category': 'questionnaire-category-list',
  'Master Data/Index Terms/General-purpose/Ship Fleet/Trade': 'ship-fleet-trade-list',
  'Master Data/Index Terms/General-purpose/Ship Team': 'ship-team-list',
  'Master Data/Index Terms/General-purpose/Ship Type': 'ship-type-list',
  'Master Data/Index Terms/General-purpose/Skill': 'skill-list',
  'Master Data/Index Terms/General-purpose/Subject Index': 'subject-index',
  'Master Data/Index Terms/General-purpose/Vendor Certification': 'vendor-certification-list',
  'Master Data/Index Terms/General-purpose/Vendor Evaluation Criteria':
    'vendor-evaluation-criteria-list',
  'Master Data/Index Terms/General-purpose/Vendor Filtration Category':
    'vendor-filtration-category-list',
  'Master Data/Index Terms/General-purpose/Vessel Sub-Type': 'vessel-sub-type-list',
  'Master Data/Index Terms/HSQE/Audit Category': 'audit-category-list',
  'Master Data/Index Terms/HSQE/Audit Description': 'audit-description',
  'Master Data/Index Terms/HSQE/Audit Type': 'audit-type',
  'Master Data/Index Terms/HSQE/CAR Category': 'car-category-list',
  'Master Data/Index Terms/HSQE/CAR Type': 'car-type-list',
  'Master Data/Index Terms/HSQE/External Inspectors': 'external-inspectors-list',
  'Master Data/Index Terms/HSQE/Findings Type': 'findings-type-list',
  'Master Data/Index Terms/HSQE/Hazard Category': 'hazard-category-list',
  'Master Data/Index Terms/HSQE/Hazard Impact': 'hazard-impact',
  'Master Data/Index Terms/HSQE/Incident Category': 'incident-category-list',
  'Master Data/Index Terms/HSQE/Incident Type': 'incident-type',
  'Master Data/Index Terms/HSQE/Inspection Description': 'inspection-description',
  'Master Data/Index Terms/HSQE/Inspection Type': 'inspection-type-list',
  'Master Data/Index Terms/HSQE/Internal Reference#1': 'car-internal-reference-one-list',
  'Master Data/Index Terms/HSQE/Internal Reference#2': 'car-internal-reference-two-list',
  'Master Data/Index Terms/HSQE/JSA Category': 'jsa-category-list',
  'Master Data/Index Terms/HSQE/JSA Identifier': 'jsa-identifier-list',
  'Master Data/Index Terms/HSQE/JSA Type': 'jsa-type-list',
  'Master Data/Index Terms/HSQE/Personal Protective Equipment (PPE)': 'ppe-list',
  'Master Data/Index Terms/HSQE/Product': 'product-list',
  'Master Data/Index Terms/HSQE/SMM Ref.': 'smm-reference-list',
  'Master Data/Index Terms/HSQE/Spill Type': 'spill-type-list',
  'Master Data/Index Terms/HSQE/Standard Ref.': 'standard-reference',
  'Master Data/Index Terms/HSQE/Work Certificate Category': 'work-certificate-category-list',
  'Master Data/Index Terms/HSQE/Work Permit': 'work-permit-list',
  'Master Data/Index Terms/General-purpose/Intracompany Ship Class': 'intracompany-ship-class-list',
  'Documents/Create/Permit to Work': 'permit-to-work',
  'Documents/Search/Permit to Work': 'permit-to-work-list',
}

export default function NavTree({ nodes, onOpenWindow, activeWindow }) {
  return (
    <ul className="space-y-[5px]">
      {nodes.map((node, i) => (
        <TreeNode
          key={`${node.label}-${i}`}
          node={node}
          depth={0}
          path={[node.label]}
          onOpenWindow={onOpenWindow}
          activeWindow={activeWindow}
        />
      ))}
    </ul>
  )
}

function TreeNode({ node, depth, path, onOpenWindow, activeWindow }) {
  const hasChildren = Array.isArray(node.children)
  const pathKey = path.join('/')
  const windowKey = node.windowKey ?? NODE_PATH_WINDOW_MAP[pathKey] ?? NODE_WINDOW_MAP[node.label]
  const isActive = Boolean(windowKey && activeWindow === windowKey)
  const hasActiveDescendant = hasChildren ? containsActiveWindow(node.children, [...path], activeWindow) : false
  const [open, setOpen] = useState(Boolean(node.defaultOpen || hasActiveDescendant))

  useEffect(() => {
    if (hasActiveDescendant) {
      setOpen(true)
    }
  }, [hasActiveDescendant])

  return (
    <li>
      <div
        className="group relative flex items-start gap-[10px]"
        style={{ paddingLeft: depth * 16 }}
      >
        {depth > 0 ? (
          <span
            aria-hidden="true"
            className="absolute left-[12px] top-0 bottom-0 w-px bg-[linear-gradient(180deg,rgba(143,213,255,0.24),rgba(255,255,255,0.04))]"
          />
        ) : null}

        <span className="relative z-[1] flex h-[24px] w-[22px] shrink-0 items-center justify-center">
          {hasChildren ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Collapse' : 'Expand'}
            className="flex h-[20px] w-[20px] items-center justify-center text-white transition-colors hover:text-[#9fddff]"
            >
              <svg
                viewBox="0 0 12 12"
                className={`h-[10px] w-[10px] stroke-current transition-transform ${open ? 'rotate-90' : ''}`}
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4,2.5 8,6 4,9.5" />
              </svg>
            </button>
          ) : (
            <span
              className={`h-[8px] w-[8px] rounded-full transition-colors ${
                isActive ? 'bg-[#a8e2ff]' : 'bg-white/58 group-hover:bg-white'
              }`}
            />
          )}
        </span>

        <button
          type="button"
          onClick={() => {
            if (windowKey) {
              onOpenWindow?.(windowKey)
            }
          }}
          className={`flex min-w-0 items-center gap-[10px] rounded-[16px] px-[12px] py-[8px] text-left text-[13px] leading-[18px] transition-colors ${
            isActive
              ? 'border border-[#9fdcff] bg-[linear-gradient(135deg,rgba(74,159,224,0.42),rgba(143,215,255,0.14))] text-white shadow-[0_10px_20px_rgba(8,25,39,0.14)]'
              : hasActiveDescendant
                ? 'border border-white/10 bg-white/11 text-white'
                : windowKey
                  ? 'bg-white/6 text-white hover:bg-white/15'
                  : 'text-white hover:bg-white/11'
          }`}
        >
          <span className="min-w-0 flex-1 truncate">{node.label}</span>
          {hasChildren ? (
            <span
              className={`shrink-0 rounded-full px-[7px] py-[3px] text-[9px] font-semibold uppercase tracking-[0.14em] ${
                open || hasActiveDescendant ? 'bg-white/16 text-white' : 'bg-white/11 text-white'
              }`}
            >
              {node.children.length}
            </span>
          ) : null}
        </button>
      </div>

      {hasChildren && open && node.children.length > 0 && (
        <ul className="mt-[6px] space-y-[6px]">
          {node.children.map((child, i) => (
            <TreeNode
              key={`${child.label}-${i}`}
              node={child}
              depth={depth + 1}
              path={[...path, child.label]}
              onOpenWindow={onOpenWindow}
              activeWindow={activeWindow}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function containsActiveWindow(nodes, path, activeWindow) {
  return nodes.some((child) => {
    const childPath = [...path, child.label]
    const pathKey = childPath.join('/')
    const windowKey = child.windowKey ?? NODE_PATH_WINDOW_MAP[pathKey] ?? NODE_WINDOW_MAP[child.label]
    if (windowKey && windowKey === activeWindow) {
      return true
    }

    return Array.isArray(child.children) ? containsActiveWindow(child.children, childPath, activeWindow) : false
  })
}
