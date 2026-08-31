const FLEET_LABEL = 'Fleet'

const RAW_VESSELS = [
  {
    label: '[MV Genco] MV Genco',
    rows: `
Main Propulsion Engine (MAN B&W 6S60ME-C)	1	Major System		
Fuel Injection System	2	Sub-System		
Fuel Injector / Injection Valve	3	Component		
Injector Nozzle	4	Spare Part	GEN-ME-FI-001	MAN B&W
Nozzle Tip	4	Spare Part	GEN-ME-FI-002	MAN B&W
Injector Spindle	4	Spare Part	GEN-ME-FI-003	MAN B&W
Injector Spring	4	Spare Part	GEN-ME-FI-004	MAN B&W
O-ring / Copper Washer Set	4	Spare Part	GEN-ME-FI-005	MAN B&W
Fuel Injection Pump	3	Component		
Plunger & Barrel	4	Spare Part	GEN-ME-FP-001	MAN B&W
Suction Valve	4	Spare Part	GEN-ME-FP-002	MAN B&W
Delivery Valve	4	Spare Part	GEN-ME-FP-003	MAN B&W
VIT Actuator Seal Kit	4	Spare Part	GEN-ME-FP-004	MAN B&W
Cylinder Unit	2	Sub-System		
Cylinder Liner	3	Component		
Cylinder Liner	4	Spare Part	GEN-ME-CL-001	MAN B&W
Liner O-ring Set	4	Spare Part	GEN-ME-CL-002	MAN B&W
Anti-Polishing Ring	4	Spare Part	GEN-ME-CL-003	MAN B&W
Piston Assembly	3	Component		
Piston Crown	4	Spare Part	GEN-ME-PA-001	MAN B&W
Piston Ring Set	4	Spare Part	GEN-ME-PA-002	MAN B&W
Piston Rod	4	Spare Part	GEN-ME-PA-003	MAN B&W
Stuffing Box Sealing Ring Set	4	Spare Part	GEN-ME-PA-004	MAN B&W
Cylinder Cover	3	Component		
Exhaust Valve Spindle	4	Spare Part	GEN-ME-CC-001	MAN B&W
Exhaust Valve Seat	4	Spare Part	GEN-ME-CC-002	MAN B&W
Rotocap	4	Spare Part	GEN-ME-CC-003	MAN B&W
Cylinder Cover Gasket	4	Spare Part	GEN-ME-CC-004	MAN B&W
Turbocharger	2	Sub-System		
Rotor & Bearings	3	Component		
Radial Bearing Set	4	Spare Part	GEN-ME-TC-001	MAN B&W
Thrust Bearing Set	4	Spare Part	GEN-ME-TC-002	MAN B&W
Sealing Air Filter	4	Spare Part	GEN-ME-TC-003	MAN B&W
Compressor & Turbine Side	3	Component		
Compressor Wheel Cleaning Nozzle	4	Spare Part	GEN-ME-TC-004	MAN B&W
Turbine Blade Set	4	Spare Part	GEN-ME-TC-005	MAN B&W
Silencer Element	4	Spare Part	GEN-ME-TC-006	MAN B&W
Crankshaft & Running Gear	2	Sub-System		
Main Bearing	3	Component		
Main Bearing Shell (Upper)	4	Spare Part	GEN-ME-CS-001	MAN B&W
Main Bearing Shell (Lower)	4	Spare Part	GEN-ME-CS-002	MAN B&W
Thrust Pad Segment	4	Spare Part	GEN-ME-CS-003	MAN B&W
Crosshead Bearing	3	Component		
Bottom End Bearing Shell	4	Spare Part	GEN-ME-CH-001	MAN B&W
Guide Shoe	4	Spare Part	GEN-ME-CH-002	MAN B&W
Lubricating Oil System	2	Sub-System		
LO Pump	3	Component		
Gear Set / Impeller	4	Spare Part	GEN-ME-LO-001	MAN B&W
Mechanical Seal	4	Spare Part	GEN-ME-LO-002	MAN B&W
Relief Valve	4	Spare Part	GEN-ME-LO-003	MAN B&W
LO Cooler & Filter	3	Component		
Cooler Plate / Gasket Set	4	Spare Part	GEN-ME-LO-004	MAN B&W
Duplex Filter Element	4	Spare Part	GEN-ME-LO-005	MAN B&W
Auto Backflush Filter Cartridge	4	Spare Part	GEN-ME-LO-006	MAN B&W
Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	1	Major System		
Fuel System	2	Sub-System		
Injector & Fuel Pump	3	Component		
Injector Nozzle	4	Spare Part	GEN-AE-FS-001	Yanmar
Fuel Pump Element	4	Spare Part	GEN-AE-FS-002	Yanmar
Fuel Filter Element	4	Spare Part	GEN-AE-FS-003	Yanmar
Delivery Valve	4	Spare Part	GEN-AE-FS-004	Yanmar
Cooling Water System	2	Sub-System		
Pumps & Cooler	3	Component		
FW Pump Mechanical Seal	4	Spare Part	GEN-AE-CW-001	Yanmar
Thermostatic Valve Element	4	Spare Part	GEN-AE-CW-002	Yanmar
HT/LT Cooler Gasket Set	4	Spare Part	GEN-AE-CW-003	Yanmar
Turbocharger	2	Sub-System		
Bearing & Cartridge	3	Component		
Bearing Cartridge Kit	4	Spare Part	GEN-AE-TC-001	Yanmar
Compressor Cleaning Nozzle	4	Spare Part	GEN-AE-TC-002	Yanmar
Auxiliary Boiler (Aalborg)	1	Major System		
Burner Unit	2	Sub-System		
Burner Assembly	3	Component		
Atomizer / Nozzle	4	Spare Part	GEN-BLR-BN-001	Aalborg
Ignition Electrode	4	Spare Part	GEN-BLR-BN-002	Aalborg
Solenoid Valve	4	Spare Part	GEN-BLR-BN-003	Aalborg
Photocell / Flame Sensor	4	Spare Part	GEN-BLR-BN-004	Aalborg
Feed Water System	2	Sub-System		
Feed Pump & Fittings	3	Component		
Feed Pump Mechanical Seal	4	Spare Part	GEN-BLR-FW-001	Aalborg
Feed Check Valve	4	Spare Part	GEN-BLR-FW-002	Aalborg
Water Level Gauge Glass	4	Spare Part	GEN-BLR-FW-003	Aalborg
Steering Gear (Rolls-Royce)	1	Major System		
Hydraulic Power Unit	2	Sub-System		
Hydraulic Pump	3	Component		
Variable Displacement Pump Seal Kit	4	Spare Part	GEN-STG-HP-001	Rolls-Royce
Relief Valve	4	Spare Part	GEN-STG-HP-002	Rolls-Royce
Solenoid Valve	4	Spare Part	GEN-STG-HP-003	Rolls-Royce
Rudder Actuator	2	Sub-System		
Rotary Vane Actuator	3	Component		
Vane Seal Kit	4	Spare Part	GEN-STG-RV-001	Rolls-Royce
O-ring Set	4	Spare Part	GEN-STG-RV-002	Rolls-Royce
Deck Machinery (MacGregor)	1	Major System		
Windlass / Mooring Winch	2	Sub-System		
Winch Drive	3	Component		
Hydraulic Motor	4	Spare Part	GEN-DM-WM-001	MacGregor
Brake Band Lining	4	Spare Part	GEN-DM-WM-002	MacGregor
Gear Oil Seal Set	4	Spare Part	GEN-DM-WM-003	MacGregor
Anchor & Chain	2	Sub-System		
Chain Fittings	3	Component		
Kenter Shackle	4	Spare Part	GEN-DM-AC-001	MacGregor
Swivel Piece	4	Spare Part	GEN-DM-AC-002	MacGregor
Fresh Water Generator (Alfa Laval)	1	Major System		
Evaporator	2	Sub-System		
Plate Pack	3	Component		
Titanium Plate Set	4	Spare Part	GEN-FWG-EV-001	Alfa Laval
Plate Gasket Set	4	Spare Part	GEN-FWG-EV-002	Alfa Laval
Ejector / Vacuum System	2	Sub-System		
Ejector Pump	3	Component		
Mechanical Seal	4	Spare Part	GEN-FWG-EJ-001	Alfa Laval
Impeller	4	Spare Part	GEN-FWG-EJ-002	Alfa Laval
Air Compressor - Main & Service (Sperre)	1	Major System		
Compressor Unit	2	Sub-System		
Cylinder Assembly	3	Component		
Piston Ring Set	4	Spare Part	GEN-AC-CU-001	Sperre
Valve Plate Set	4	Spare Part	GEN-AC-CU-002	Sperre
Air Filter Element	4	Spare Part	GEN-AC-CU-003	Sperre
FO & LO Purifiers (Alfa Laval)	1	Major System		
Bowl Assembly	2	Sub-System		
Separator Bowl	3	Component		
Gravity Disc Set	4	Spare Part	GEN-PUR-BW-001	Alfa Laval
O-ring / Gasket Kit	4	Spare Part	GEN-PUR-BW-002	Alfa Laval
Sliding Bowl Bottom Seal Ring	4	Spare Part	GEN-PUR-BW-003	Alfa Laval
Ballast / Bilge / GS Pumps (Framo)	1	Major System		
Centrifugal Pumps	2	Sub-System		
Pump Assembly	3	Component		
Mechanical Seal	4	Spare Part	GEN-PMP-CP-001	Framo
Impeller	4	Spare Part	GEN-PMP-CP-002	Framo
Wear Ring	4	Spare Part	GEN-PMP-CP-003	Framo
Fire Fighting System (Skum)	1	Major System		
Fire Pump	2	Sub-System		
Pump Assembly	3	Component		
Mechanical Seal	4	Spare Part	GEN-FF-FP-001	Skum
Impeller	4	Spare Part	GEN-FF-FP-002	Skum
CO2 / Foam System	2	Sub-System		
Release & Nozzles	3	Component		
Cylinder Release Valve	4	Spare Part	GEN-FF-CO2-001	Skum
Discharge Nozzle	4	Spare Part	GEN-FF-CO2-002	Skum
Hatch Cover System (Hydraulic Folding Type - MacGregor)	1	Major System		
Hydraulic System	2	Sub-System		
Hydraulic Cylinder	3	Component		
Cylinder Seal Kit	4	Spare Part	GEN-HC-HY-001	MacGregor
Piston Rod	4	Spare Part	GEN-HC-HY-002	MacGregor
Cleating System	2	Sub-System		
Cleats & Wedges	3	Component		
Rubber Packing (Compression Bar)	4	Spare Part	GEN-HC-CL-001	MacGregor
Cleat Pin	4	Spare Part	GEN-HC-CL-002	MacGregor
Deck Cranes (4 x Electro-Hydraulic - TTS)	1	Major System		
Hoist Winch	2	Sub-System		
Winch Assembly	3	Component		
Brake Lining Set	4	Spare Part	GEN-CR-HW-001	TTS
Wire Rope	4	Spare Part	GEN-CR-HW-002	TTS
Gear Oil Seal	4	Spare Part	GEN-CR-HW-003	TTS
Slewing Gear	2	Sub-System		
Slew Ring Assembly	3	Component		
Slew Bearing	4	Spare Part	GEN-CR-SL-001	TTS
Pinion Gear	4	Spare Part	GEN-CR-SL-002	TTS
Cargo Hold Ventilation	1	Major System		
Fan Units	2	Sub-System		
Ventilation Fan	3	Component		
Motor Bearing Set	4	Spare Part	GEN-VT-FN-001	Novenco
Fan Blade Impeller	4	Spare Part	GEN-VT-FN-002	Novenco
Drive Belt	4	Spare Part	GEN-VT-FN-003	Novenco
Ballast Water Treatment System (Alfa Laval PureBallast)	1	Major System		
Filter & UV Unit	2	Sub-System		
Treatment Unit	3	Component		
UV Lamp	4	Spare Part	GEN-BWT-UV-001	Alfa Laval
Filter Element	4	Spare Part	GEN-BWT-UV-002	Alfa Laval
UV Intensity Sensor	4	Spare Part	GEN-BWT-UV-003	Alfa Laval
Stores & Consumables	1	Major System		
Lubricating Oils	2	Sub-System		
System Oil (Main / Aux Engine Sump)	3	Component		
System Oil SAE 30 (TBN 5-10) - 209L Drum	4	Consumable / Store Item	GEN-STR-LO-001	Shell/Castrol
Aux Engine Sump Oil SAE 40 - 209L Drum	4	Consumable / Store Item	GEN-STR-LO-002	Shell/Castrol
Used Oil Sample Kit / Bottles	4	Consumable / Store Item	GEN-STR-LO-003	Shell/Castrol
Cylinder Oil (Main Engine)	3	Component		
Cylinder Oil 70 BN - 209L Drum	4	Consumable / Store Item	GEN-STR-LO-004	Shell/Castrol
Cylinder Oil 100 BN - 209L Drum	4	Consumable / Store Item	GEN-STR-LO-005	Shell/Castrol
Cylinder Oil Feed Rate Test Kit	4	Consumable / Store Item	GEN-STR-LO-006	Shell/Castrol
Turbine & Hydraulic Oils	3	Component		
Turbine Oil ISO VG46 - 209L Drum	4	Consumable / Store Item	GEN-STR-LO-007	Shell/Castrol
Hydraulic Oil ISO VG32 - 209L Drum	4	Consumable / Store Item	GEN-STR-LO-008	Shell/Castrol
Boiler & Cooling Water Chemicals	2	Sub-System		
Boiler Water Treatment	3	Component		
Boiler Compound (Alkalinity Control) - 25L Drum	4	Consumable / Store Item	GEN-STR-CH-001	Drew Marine
Oxygen Scavenger Chemical - 25L Drum	4	Consumable / Store Item	GEN-STR-CH-002	Drew Marine
Boiler Water Test Kit	4	Consumable / Store Item	GEN-STR-CH-003	Drew Marine
Cooling Water Treatment (Jacket Water)	3	Component		
Nitrite-Based Coolant Treatment - 25L Drum	4	Consumable / Store Item	GEN-STR-CH-004	Drew Marine
Coolant Test Strips / Refractometer Kit	4	Consumable / Store Item	GEN-STR-CH-005	Drew Marine
Cleaning & Purifier Chemicals	2	Sub-System		
Purifier / Tank Cleaning Chemicals	3	Component		
Purifier Bowl Cleaning Chemical - 25L Drum	4	Consumable / Store Item	GEN-STR-CH-006	Unitor
Tank Cleaning Detergent - 25L Drum	4	Consumable / Store Item	GEN-STR-CH-007	Unitor
Engine Room Degreaser - 25L Drum	4	Consumable / Store Item	GEN-STR-CH-008	Unitor
Paints & Coatings	2	Sub-System		
Hull & Deck Paints	3	Component		
Anti-Corrosive Epoxy Paint - 20L Pail	4	Consumable / Store Item	GEN-STR-PT-001	Jotun/Hempel
Anti-Fouling Paint - 20L Pail	4	Consumable / Store Item	GEN-STR-PT-002	Jotun/Hempel
Deck Non-Skid Paint - 20L Pail	4	Consumable / Store Item	GEN-STR-PT-003	Jotun/Hempel
Paint Thinner - 20L Drum	4	Consumable / Store Item	GEN-STR-PT-004	Jotun/Hempel
Welding & Gas Stores	2	Sub-System		
Welding Consumables & Gas Cylinders	3	Component		
Oxygen Cylinder (Industrial)	4	Consumable / Store Item	GEN-STR-WG-001	BOC/Linde
Acetylene Cylinder	4	Consumable / Store Item	GEN-STR-WG-002	BOC/Linde
Welding Electrodes E6013 - Box	4	Consumable / Store Item	GEN-STR-WG-003	BOC/Linde
Cutting/Grinding Disc - Box	4	Consumable / Store Item	GEN-STR-WG-004	BOC/Linde
Engine Room General Stores	2	Sub-System		
Gaskets, Packing & Jointing	3	Component		
Jointing Sheet Roll (Klingersil-type)	4	Consumable / Store Item	GEN-STR-ER-001	Klinger
Gland Packing / Rope Seal - Roll	4	Consumable / Store Item	GEN-STR-ER-002	Klinger
Assorted Gasket Set (O-ring/Copper)	4	Consumable / Store Item	GEN-STR-ER-003	Klinger
Tools, PPE & Cleaning Materials	3	Component		
Engine Room Wiping Rags - Bale	4	Consumable / Store Item	GEN-STR-ER-004	General Stores
Safety Gloves / Goggles / Ear Muffs - Set	4	Consumable / Store Item	GEN-STR-ER-005	General Stores
Wire Brush / Hand Tool Consumables	4	Consumable / Store Item	GEN-STR-ER-006	General Stores
Safety Stores - LSA	2	Sub-System		
Life Saving Appliances	3	Component		
Lifebuoy (SOLAS)	4	Consumable / Store Item	GEN-STR-LSA-001	Viking/RFD
Lifejacket (SOLAS)	4	Consumable / Store Item	GEN-STR-LSA-002	Viking/RFD
Immersion Suit	4	Consumable / Store Item	GEN-STR-LSA-003	Viking/RFD
EPIRB Battery	4	Consumable / Store Item	GEN-STR-LSA-004	Viking/RFD
Pyrotechnics - Rocket Parachute Flares (Set)	4	Consumable / Store Item	GEN-STR-LSA-005	Viking/RFD
Safety Stores - FFA	2	Sub-System		
Fire Fighting Appliances	3	Component		
Portable CO2 Fire Extinguisher	4	Consumable / Store Item	GEN-STR-FFA-001	Kidde/Skum
Portable Dry Powder Fire Extinguisher	4	Consumable / Store Item	GEN-STR-FFA-002	Kidde/Skum
Foam Concentrate - 25L Drum	4	Consumable / Store Item	GEN-STR-FFA-003	Kidde/Skum
SCBA Air Cylinder (Refill)	4	Consumable / Store Item	GEN-STR-FFA-004	Kidde/Skum
Fireman's Outfit (Complete Set)	4	Consumable / Store Item	GEN-STR-FFA-005	Kidde/Skum
Bosun / Deck Stores	2	Sub-System		
Ropes, Wires & Rigging	3	Component		
Mooring Rope (Polypropylene) - Coil	4	Consumable / Store Item	GEN-STR-BS-001	Bridon/Bexco
Mooring Wire Rope - Reel	4	Consumable / Store Item	GEN-STR-BS-002	Bridon/Bexco
D-Shackle / Bow Shackle - Set	4	Consumable / Store Item	GEN-STR-BS-003	Bridon/Bexco
Paint Brushes & Rollers - Set	4	Consumable / Store Item	GEN-STR-BS-004	General Stores
Stationery & General Stores	2	Sub-System		
Record Books & Office Stationery	3	Component		
Engine/Deck Log Book	4	Consumable / Store Item	GEN-STR-ST-001	General Stores
Oil Record Book	4	Consumable / Store Item	GEN-STR-ST-002	General Stores
Printer Paper / Toner / Stationery Set	4	Consumable / Store Item	GEN-STR-ST-003	General Stores
Provisions & Catering Stores	2	Sub-System		
Dry / Frozen Provisions & Galley Consumables	3	Component		
Dry Provisions - Assorted	4	Consumable / Store Item	GEN-STR-PR-001	General Stores
Frozen Provisions - Assorted	4	Consumable / Store Item	GEN-STR-PR-002	General Stores
Galley Cleaning & Catering Consumables	4	Consumable / Store Item	GEN-STR-PR-003	General Stores
`,
  },
]

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseRows(rowsText) {
  return rowsText
    .trim()
    .split('\n')
    .map((line) => line.split('\t'))
    .map(([label, level, category, partNo, makerRemarks]) => ({
      label: label ?? '',
      level: Number(level ?? 0),
      category: category ?? '',
      partNo: partNo ?? '',
      makerRemarks: makerRemarks ?? '',
    }))
}

function buildVesselTree(vesselLabel, rowsText) {
  const vesselNode = { label: vesselLabel, category: 'Vessel', children: [] }
  const stack = [vesselNode]
  for (const row of parseRows(rowsText)) {
    const node = {
      label: row.label,
      category: row.category,
      partNo: row.partNo,
      makerRemarks: row.makerRemarks,
      children: [],
    }
    while (stack.length > row.level) {
      stack.pop()
    }
    stack[stack.length - 1].children.push(node)
    if (row.category !== 'Spare Part' && row.category !== 'Consumable / Stores') {
      stack.push(node)
    }
  }
  return vesselNode
}

const RAW_TREE = {
  label: FLEET_LABEL,
  category: 'Fleet',
  children: RAW_VESSELS.map((vessel) => buildVesselTree(vessel.label, vessel.rows)),
}

function decorateTree(node, path = 'equipment', level = 0) {
  const id = level === 0 ? 'equipment-root' : `${path}-${slugify(node.label)}`
  const children = (node.children ?? []).map((child) => decorateTree(child, id, level + 1))
  return {
    id,
    label: node.label,
    level,
    category: node.category,
    partNo: node.partNo ?? '',
    makerRemarks: node.makerRemarks ?? '',
    children,
  }
}

export const EQUIPMENT_TREE = decorateTree(RAW_TREE)
export const EQUIPMENT_ROOT_ID = EQUIPMENT_TREE.id
export const EQUIPMENT_VESSEL_IDS = EQUIPMENT_TREE.children.map((node) => node.id)
export const EQUIPMENT_DEFAULT_SELECTED_ID = EQUIPMENT_VESSEL_IDS[0] ?? EQUIPMENT_ROOT_ID
export const EQUIPMENT_VESSEL_NAMES = EQUIPMENT_TREE.children.map((node) =>
  node.label.replace(/^\[(.+?)\]\s+/, '')
)
export const DEFAULT_EXPANDED_IDS = [EQUIPMENT_ROOT_ID, ...EQUIPMENT_VESSEL_IDS]

export function findEquipmentNodeById(node, id) {
  if (node.id === id) {
    return node
  }
  for (const child of node.children) {
    const match = findEquipmentNodeById(child, id)
    if (match) {
      return match
    }
  }
  return null
}

export function flattenEquipmentBranch(node, includeSelf = true) {
  const rows = []
  function visit(current, shouldInclude) {
    if (shouldInclude) {
      rows.push(current)
    }
    for (const child of current.children) {
      visit(child, true)
    }
  }
  visit(node, includeSelf)
  return rows.map((row, index) => ({
    ...row,
    rowNumber: index + 1,
  }))
}

export function filterEquipmentTree(node, query) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) {
    return node
  }
  const matches =
    node.label.toLowerCase().includes(normalizedQuery) ||
    node.partNo.toLowerCase().includes(normalizedQuery) ||
    node.makerRemarks.toLowerCase().includes(normalizedQuery)
  const children = node.children
    .map((child) => filterEquipmentTree(child, normalizedQuery))
    .filter(Boolean)
  if (matches || children.length > 0) {
    return { ...node, children }
  }
  return null
}

// ---------------------------------------------------------------------------
// Hierarchy authoring: Vessel > Major System > Sub-System > Component > Part
// ---------------------------------------------------------------------------

// Each entry: the category being added, and the category its parent must be.
export const HIERARCHY_RULES = [
  { category: 'Major System', parentCategory: 'Vessel' },
  { category: 'Sub-System', parentCategory: 'Major System' },
  { category: 'Component', parentCategory: 'Sub-System' },
  { category: 'Spare Part', parentCategory: 'Component' },
]

export const LEAF_CATEGORIES = ['Spare Part', 'Consumable / Store Item', 'Consumable / Stores']

export function parentCategoryFor(category) {
  return HIERARCHY_RULES.find((rule) => rule.category === category)?.parentCategory ?? null
}

// The chain of ancestor categories that must be chosen before `category`,
// ordered outermost first. e.g. 'Spare Part' -> ['Major System','Sub-System','Component']
export function ancestorChainFor(category) {
  const chain = []
  let parent = parentCategoryFor(category)
  while (parent && parent !== 'Vessel') {
    chain.unshift(parent)
    parent = parentCategoryFor(parent)
  }
  return chain
}

export function childrenOfCategory(node, category) {
  if (!node) return []
  return node.children.filter((child) => child.category === category)
}

function makeChildNode(parent, draft) {
  return {
    id: `${parent.id}-${slugify(draft.label)}`,
    label: draft.label,
    level: parent.level + 1,
    category: draft.category,
    partNo: draft.partNo ?? '',
    makerRemarks: draft.makerRemarks ?? '',
    children: [],
  }
}

// Immutably insert a child under `parentId`. Returns the new tree, or null if
// the parent was not found.
export function addEquipmentNode(tree, parentId, draft) {
  let inserted = null

  function visit(node) {
    if (node.id === parentId) {
      inserted = makeChildNode(node, draft)
      return { ...node, children: [...node.children, inserted] }
    }
    if (node.children.length === 0) return node
    return { ...node, children: node.children.map(visit) }
  }

  const next = visit(tree)
  return inserted ? { tree: next, node: inserted } : null
}

export function validateEquipmentDraft(tree, parentId, draft) {
  const label = draft.label.trim()
  if (!label) return 'Enter a name.'

  const parent = findEquipmentNodeById(tree, parentId)
  if (!parent) return 'Choose where it belongs.'

  const clash = parent.children.some(
    (child) => child.label.trim().toLowerCase() === label.toLowerCase(),
  )
  if (clash) return `"${label}" already exists under ${parent.label}.`

  if (draft.category === 'Spare Part' && draft.partNo.trim()) {
    const partNo = draft.partNo.trim().toLowerCase()
    const duplicate = flattenEquipmentBranch(tree).some(
      (row) => row.partNo && row.partNo.trim().toLowerCase() === partNo,
    )
    if (duplicate) return `Part No. "${draft.partNo.trim()}" is already used.`
  }

  return null
}

// --- equipment detail (double-click form) ---------------------------------

// Walk the tree collecting the ancestor chain for `nodeId`.
function findEquipmentPath(node, id, trail = []) {
  const nextTrail = [...trail, node]
  if (node.id === id) return nextTrail
  for (const child of node.children) {
    const match = findEquipmentPath(child, id, nextTrail)
    if (match) return match
  }
  return null
}

function deriveEquipmentCode(label) {
  const cleaned = String(label ?? '')
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .trim()
  const compact = cleaned
    .split(/[^a-z0-9]+/i)
    .filter(Boolean)
    .map((word) => word.slice(0, 4).toUpperCase())
    .join('')
  return compact.slice(0, 12) || 'EQUIP'
}

// Build the read-only detail model the EquipmentDetailWindow renders. Derives
// what it can from the hierarchy node and fills the rest with the realistic
// blanks/defaults seen on the ABS "Equipment - ..." card.
export function buildEquipmentDetail(tree, nodeId) {
  const path = findEquipmentPath(tree, nodeId)
  if (!path) return null

  const node = path[path.length - 1]
  const vesselNode = path.find((entry) => entry.category === 'Vessel') ?? null
  const parentNode = path.length >= 2 ? path[path.length - 2] : null
  const vesselName = vesselNode
    ? vesselNode.label.replace(/^\[(.+?)\]\s+/, '')
    : ''
  const hierarchyPath = path
    .filter((entry) => entry.category !== 'Fleet' && entry.category !== 'Vessel')
    .map((entry) => entry.label)

  return {
    id: node.id,
    name: node.label,
    completeName: node.label,
    equipmentCode: deriveEquipmentCode(node.label),
    category: node.category,
    partNo: node.partNo ?? '',
    manufacturer: node.makerRemarks ?? '',
    vesselName,
    parentLabel: parentNode?.label ?? '',
    hierarchyReference: hierarchyPath.slice(0, -1).join(' / ') || vesselName,
    hierarchyPath: hierarchyPath.join(' / '),
    status: 'Active',
    type: 'Spare',
    designation: 'Unit',
    model: '',
    equipmentType: '',
    serialNo: '',
    size: '',
    dateInstalled: '',
    yearMade: '',
    softwareVersion: '',
    imoNo: '',
    barcode: '',
    sparesStorage: '',
    admin: {
      criticality: 'D',
      department: 'ENGINE',
      accountMaterials: '50118',
      accountMaterialsName: 'Spares-Aux Engines/PTO',
      accountServices: '50218',
      accountServicesName: 'R&M-Aux Engines/PTO',
      requisitioning: 'Stock',
    },
    remarks: 'Volume: 1.5 Ltrs',
    partNoReferences: [{ mainPartNo: false, reference: "Maker's Manual - Parts list" }],
    crossReferences: [
      {
        ship: vesselName,
        hierarchyReference: hierarchyPath.slice(0, -1).join(' / ') || vesselName,
        equipment: node.label,
      },
    ],
    documents: [{ name: node.label, status: '' }],
    maintenanceHistory: [
      {
        documentNo: 'WO 000015301446',
        scheduled: '22-02-2026',
        completed: '18-02-2026',
        status: 'CLOS',
        jobTitle: `${node.label} malfunction`,
      },
    ],
  }
}

// Build the read-only model for the PartDetailWindow (Component / Spare Part
// / Consumable rows). Derives name, part number and breadcrumb from the node;
// fills the rest with the defaults / sample rows seen on the ABS "Part -" card.
export function buildPartDetail(tree, nodeId) {
  const path = findEquipmentPath(tree, nodeId)
  if (!path) return null

  const node = path[path.length - 1]
  const partNumber = node.partNo || deriveEquipmentCode(node.label)
  const breadcrumb = path
    .filter((entry) => entry.category !== 'Fleet')
    .map((entry) => entry.label.replace(/^\[(.+?)\]\s+/, ''))
    .join('*')

  return {
    id: node.id,
    name: node.label,
    fullDescription: node.label,
    partCode: `0144-00001-${String(Math.abs(hashCode(node.id))).padStart(8, '0').slice(0, 8)}`,
    partNumber,
    pinNumber: '83500003784',
    unit: 'EA',
    designation: node.category === 'Component' ? 'Component' : 'Sub-Component',
    manufacturer: node.makerRemarks ?? '',
    breadcrumb,
    sources: [
      { type: 'RFQ', dateTime: '23-02-2026', curr: 'USD', unitPrice: '272.8000', uom: 'EA', net: '272.8000', delivery: '1', vendor: 'JAPAN MARINE (S) PTE LTD' },
      { type: 'RFQ', dateTime: '23-02-2026', curr: 'USD', unitPrice: '350.0000', uom: 'EA', net: '350.0000', delivery: '10', vendor: 'DAN MARINE SHANGHAI LTD.' },
      { type: 'RFQ', dateTime: '23-02-2026', curr: 'USD', unitPrice: '0.0000', uom: 'EA', net: '0.0000', delivery: '0', vendor: 'Vessel Link Marine Supply & Service Ltd' },
      { type: 'PO', dateTime: '01-03-2026', curr: 'USD', unitPrice: '350.0000', uom: 'EA', net: '350.0000', delivery: 'N/A', vendor: 'DAN MARINE SHANGHAI LTD.' },
    ],
    poHistory: [
      { poNo: '000012707718-0', vendor: 'DAN MARINE SHANGHAI LTD.', ship: 'Seaspan Benefactor', dateTime: '01-03-2026', status: 'RECEIVED', qty: '1.00', unitPrice: '350.0000', dept: 'ENGINE' },
      { poNo: '000012707716-0', vendor: 'DAN MARINE SHANGHAI LTD.', ship: 'Seaspan Benefactor', dateTime: '01-03-2026', status: 'CANCELLED', qty: '1.00', unitPrice: '350.0000', dept: 'ENGINE' },
    ],
  }
}

function hashCode(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return hash
}

// --- persistence -----------------------------------------------------------

const ADDITIONS_KEY = 'ns5-equipment-additions'

export function loadEquipmentAdditions() {
  try {
    const raw = window.localStorage.getItem(ADDITIONS_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveEquipmentAdditions(additions) {
  try {
    window.localStorage.setItem(ADDITIONS_KEY, JSON.stringify(additions))
    return true
  } catch {
    return false
  }
}

export function applyEquipmentAdditions(tree, additions) {
  return additions.reduce((current, addition) => {
    const result = addEquipmentNode(current, addition.parentId, addition.draft)
    return result ? result.tree : current
  }, tree)
}
