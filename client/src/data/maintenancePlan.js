// Maintenance Plan grid sourced from MV Genco PMS workbook.

export const PLAN_COLUMNS = [
  { key: 'check', label: '', width: 30 },
  { key: 'jobNo', label: 'Job No.', width: 120 },
  { key: 'majorSystem', label: 'Major System', width: 280 },
  { key: 'subSystem', label: 'Sub-System', width: 210 },
  { key: 'component', label: 'Component', width: 240 },
  { key: 'jobTitle', label: 'Job Title', width: 340 },
  { key: 'jobType', label: 'Job Type', width: 150 },
  { key: 'priority', label: 'Priority', width: 110 },
  { key: 'basis', label: 'Basis', width: 120 },
  { key: 'interval', label: 'Interval', width: 110 },
  { key: 'lastDone', label: 'Last Done', width: 110 },
  { key: 'nextDue', label: 'Next Due', width: 110 },
  { key: 'status', label: 'Status', width: 90 },
  { key: 'critical', label: 'Critical', width: 72 },
  { key: 'classRelated', label: 'Class Related', width: 110 },
  { key: 'department', label: 'Department', width: 170 },
  { key: 'responsible', label: 'Responsible', width: 150 },
  { key: 'linkedPartNo', label: 'Linked Part No.', width: 150 },
  { key: 'stockQty', label: 'Stock Qty', width: 90 },
  { key: 'stockStatus', label: 'Stock Status', width: 120 },
  { key: 'remarks', label: 'Remarks', width: 420 },
]

const ROW_KEYS = [
  'jobNo',
  'majorSystem',
  'subSystem',
  'component',
  'jobTitle',
  'basis',
  'interval',
  'lastDone',
  'nextDue',
  'status',
  'critical',
  'classRelated',
  'department',
  'responsible',
  'linkedPartNo',
  'stockQty',
  'stockStatus',
  'remarks',
]

const RAW_PLAN_ROWS = `
GEN-PMS-001	Main Propulsion Engine (MAN B&W 6S60ME-C)	(System-wide)	(System-wide)	Annual Class / General Survey - Main Propulsion Engine (MAN B&W 6S60ME-C)	Calendar	12 Months	2025-10-06	2026-10-06	OK	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-002	Main Propulsion Engine (MAN B&W 6S60ME-C)	Fuel Injection System	Fuel Injector / Injection Valve	Inspect & Overhaul - Fuel Injector / Injection Valve	Running Hours	2000 Hrs	32604 Hrs	34604 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-FI-001	8	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Fuel Injection System > Fuel Injector / Injection Valve
GEN-PMS-003	Main Propulsion Engine (MAN B&W 6S60ME-C)	Fuel Injection System	Fuel Injector / Injection Valve	Renew - Injector Nozzle	Running Hours	1000 Hrs	33295 Hrs	34295 Hrs	OK	N	N	Engine Department	3rd Engineer	GEN-ME-FI-001	8	In Stock	Spare: Injector Nozzle (MAN B&W)
GEN-PMS-004	Main Propulsion Engine (MAN B&W 6S60ME-C)	Fuel Injection System	Fuel Injector / Injection Valve	Condition Monitoring / Vibration Check - Fuel Injector / Injection Valve	Calendar	3 Months	2026-05-16	2026-08-15	Overdue	N	N	Engine Department	4th Engineer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Fuel Injection System > Fuel Injector / Injection Valve
GEN-PMS-005	Main Propulsion Engine (MAN B&W 6S60ME-C)	Fuel Injection System	Fuel Injection Pump	Inspect & Overhaul - Fuel Injection Pump	Running Hours	3000 Hrs	29831 Hrs	32831 Hrs	OK	N	N	Engine Department	3rd Engineer	GEN-ME-FP-001	10	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Fuel Injection System > Fuel Injection Pump
GEN-PMS-006	Main Propulsion Engine (MAN B&W 6S60ME-C)	Fuel Injection System	Fuel Injection Pump	Renew - Plunger & Barrel	Running Hours	1500 Hrs	31198 Hrs	32698 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-FP-001	10	In Stock	Spare: Plunger & Barrel (MAN B&W)
GEN-PMS-007	Main Propulsion Engine (MAN B&W 6S60ME-C)	Fuel Injection System	Fuel Injection Pump	Condition Monitoring / Vibration Check - Fuel Injection Pump	Calendar	3 Months	2026-07-26	2026-10-25	OK	N	N	Engine Department	2nd Engineer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Fuel Injection System > Fuel Injection Pump
GEN-PMS-008	Main Propulsion Engine (MAN B&W 6S60ME-C)	Cylinder Unit	Cylinder Liner	Inspect & Overhaul - Cylinder Liner	Running Hours	3000 Hrs	30954 Hrs	33954 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-CL-001	7	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Cylinder Unit > Cylinder Liner
GEN-PMS-009	Main Propulsion Engine (MAN B&W 6S60ME-C)	Cylinder Unit	Cylinder Liner	Renew - Cylinder Liner	Running Hours	1500 Hrs	32412 Hrs	33912 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-CL-001	7	In Stock	Spare: Cylinder Liner (MAN B&W)
GEN-PMS-010	Main Propulsion Engine (MAN B&W 6S60ME-C)	Cylinder Unit	Cylinder Liner	Condition Monitoring / Vibration Check - Cylinder Liner	Calendar	3 Months	2026-06-06	2026-09-05	Due Soon	N	N	Engine Department	Electrical Officer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Cylinder Unit > Cylinder Liner
GEN-PMS-011	Main Propulsion Engine (MAN B&W 6S60ME-C)	Cylinder Unit	Piston Assembly	Inspect & Overhaul - Piston Assembly	Running Hours	12000 Hrs	20835 Hrs	32835 Hrs	OK	Y	N	Engine Department	Chief Engineer	GEN-ME-PA-001	5	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Cylinder Unit > Piston Assembly
GEN-PMS-012	Main Propulsion Engine (MAN B&W 6S60ME-C)	Cylinder Unit	Piston Assembly	Renew - Piston Crown	Running Hours	7500 Hrs	27949 Hrs	35449 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-PA-001	5	In Stock	Spare: Piston Crown (MAN B&W)
GEN-PMS-013	Main Propulsion Engine (MAN B&W 6S60ME-C)	Cylinder Unit	Piston Assembly	Condition Monitoring / Vibration Check - Piston Assembly	Calendar	3 Months	2026-06-05	2026-09-04	Due Soon	N	N	Engine Department	2nd Engineer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Cylinder Unit > Piston Assembly
GEN-PMS-014	Main Propulsion Engine (MAN B&W 6S60ME-C)	Cylinder Unit	Cylinder Cover	Inspect & Overhaul - Cylinder Cover	Running Hours	12000 Hrs	22231 Hrs	34231 Hrs	OK	Y	N	Engine Department	Chief Engineer	GEN-ME-CC-001	12	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Cylinder Unit > Cylinder Cover
GEN-PMS-015	Main Propulsion Engine (MAN B&W 6S60ME-C)	Cylinder Unit	Cylinder Cover	Renew - Exhaust Valve Spindle	Running Hours	8000 Hrs	24411 Hrs	32411 Hrs	Overdue	N	N	Engine Department	3rd Engineer	GEN-ME-CC-001	12	In Stock	Spare: Exhaust Valve Spindle (MAN B&W)
GEN-PMS-016	Main Propulsion Engine (MAN B&W 6S60ME-C)	Cylinder Unit	Cylinder Cover	Condition Monitoring / Vibration Check - Cylinder Cover	Calendar	3 Months	2026-07-28	2026-10-27	OK	N	N	Engine Department	4th Engineer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Cylinder Unit > Cylinder Cover
GEN-PMS-017	Main Propulsion Engine (MAN B&W 6S60ME-C)	Turbocharger	Rotor & Bearings	Inspect & Overhaul - Rotor & Bearings	Running Hours	2000 Hrs	33060 Hrs	35060 Hrs	OK	N	N	Engine Department	4th Engineer	GEN-ME-TC-001	1	Low Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Turbocharger > Rotor & Bearings
GEN-PMS-018	Main Propulsion Engine (MAN B&W 6S60ME-C)	Turbocharger	Rotor & Bearings	Renew - Radial Bearing Set	Running Hours	1000 Hrs	33638 Hrs	34638 Hrs	OK	N	N	Engine Department	4th Engineer	GEN-ME-TC-001	1	Low Stock	Spare: Radial Bearing Set (MAN B&W)
GEN-PMS-019	Main Propulsion Engine (MAN B&W 6S60ME-C)	Turbocharger	Rotor & Bearings	Condition Monitoring / Vibration Check - Rotor & Bearings	Calendar	3 Months	2026-05-31	2026-08-30	Due Soon	N	N	Engine Department	4th Engineer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Turbocharger > Rotor & Bearings
GEN-PMS-020	Main Propulsion Engine (MAN B&W 6S60ME-C)	Turbocharger	Compressor & Turbine Side	Inspect & Overhaul - Compressor & Turbine Side	Running Hours	4000 Hrs	31827 Hrs	35827 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-TC-004	8	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Turbocharger > Compressor & Turbine Side
GEN-PMS-021	Main Propulsion Engine (MAN B&W 6S60ME-C)	Turbocharger	Compressor & Turbine Side	Renew - Compressor Wheel Cleaning Nozzle	Running Hours	2500 Hrs	31781 Hrs	34281 Hrs	OK	N	N	Engine Department	Electrical Officer	GEN-ME-TC-004	8	In Stock	Spare: Compressor Wheel Cleaning Nozzle (MAN B&W)
GEN-PMS-022	Main Propulsion Engine (MAN B&W 6S60ME-C)	Turbocharger	Compressor & Turbine Side	Condition Monitoring / Vibration Check - Compressor & Turbine Side	Calendar	3 Months	2026-07-27	2026-10-26	OK	N	N	Engine Department	Electrical Officer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Turbocharger > Compressor & Turbine Side
GEN-PMS-023	Main Propulsion Engine (MAN B&W 6S60ME-C)	Crankshaft & Running Gear	Main Bearing	Inspect & Overhaul - Main Bearing	Running Hours	4000 Hrs	26954 Hrs	30954 Hrs	Overdue	N	N	Engine Department	3rd Engineer	GEN-ME-CS-001	5	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Crankshaft & Running Gear > Main Bearing
GEN-PMS-024	Main Propulsion Engine (MAN B&W 6S60ME-C)	Crankshaft & Running Gear	Main Bearing	Renew - Main Bearing Shell (Upper)	Running Hours	2000 Hrs	30222 Hrs	32222 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-CS-001	5	In Stock	Spare: Main Bearing Shell (Upper) (MAN B&W)
GEN-PMS-025	Main Propulsion Engine (MAN B&W 6S60ME-C)	Crankshaft & Running Gear	Main Bearing	Condition Monitoring / Vibration Check - Main Bearing	Calendar	3 Months	2026-06-30	2026-09-29	OK	N	N	Engine Department	2nd Engineer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Crankshaft & Running Gear > Main Bearing
GEN-PMS-026	Main Propulsion Engine (MAN B&W 6S60ME-C)	Crankshaft & Running Gear	Crosshead Bearing	Inspect & Overhaul - Crosshead Bearing	Running Hours	2000 Hrs	34926 Hrs	36926 Hrs	OK	N	N	Engine Department	3rd Engineer	GEN-ME-CH-001	9	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Crankshaft & Running Gear > Crosshead Bearing
GEN-PMS-027	Main Propulsion Engine (MAN B&W 6S60ME-C)	Crankshaft & Running Gear	Crosshead Bearing	Renew - Bottom End Bearing Shell	Running Hours	1000 Hrs	35123 Hrs	36123 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-CH-001	9	In Stock	Spare: Bottom End Bearing Shell (MAN B&W)
GEN-PMS-028	Main Propulsion Engine (MAN B&W 6S60ME-C)	Lubricating Oil System	LO Pump	Inspect & Overhaul - LO Pump	Running Hours	4000 Hrs	27019 Hrs	31019 Hrs	Overdue	N	N	Engine Department	4th Engineer	GEN-ME-LO-001	5	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Lubricating Oil System > LO Pump
GEN-PMS-029	Main Propulsion Engine (MAN B&W 6S60ME-C)	Lubricating Oil System	LO Pump	Renew - Gear Set / Impeller	Running Hours	2500 Hrs	30645 Hrs	33145 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-LO-001	5	In Stock	Spare: Gear Set / Impeller (MAN B&W)
GEN-PMS-030	Main Propulsion Engine (MAN B&W 6S60ME-C)	Lubricating Oil System	LO Pump	Condition Monitoring / Vibration Check - LO Pump	Calendar	3 Months	2026-07-03	2026-10-02	OK	N	N	Engine Department	2nd Engineer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Lubricating Oil System > LO Pump
GEN-PMS-031	Main Propulsion Engine (MAN B&W 6S60ME-C)	Lubricating Oil System	LO Cooler & Filter	Inspect & Overhaul - LO Cooler & Filter	Running Hours	3000 Hrs	32696 Hrs	35696 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-ME-LO-004	9	In Stock	Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Lubricating Oil System > LO Cooler & Filter
GEN-PMS-032	Main Propulsion Engine (MAN B&W 6S60ME-C)	Lubricating Oil System	LO Cooler & Filter	Renew - Cooler Plate / Gasket Set	Running Hours	2000 Hrs	31896 Hrs	33896 Hrs	Due Soon	N	N	Engine Department	2nd Engineer	GEN-ME-LO-004	9	In Stock	Spare: Cooler Plate / Gasket Set (MAN B&W)
GEN-PMS-033	Main Propulsion Engine (MAN B&W 6S60ME-C)	Lubricating Oil System	LO Cooler & Filter	Condition Monitoring / Vibration Check - LO Cooler & Filter	Calendar	3 Months	2026-07-11	2026-10-10	OK	N	N	Engine Department	Electrical Officer				Linked component: Main Propulsion Engine (MAN B&W 6S60ME-C) > Lubricating Oil System > LO Cooler & Filter
GEN-PMS-034	Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	(System-wide)	(System-wide)	Annual Class / General Survey - Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	Calendar	12 Months	2026-05-03	2027-05-03	OK	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-035	Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	Fuel System	Injector & Fuel Pump	Inspect & Overhaul - Injector & Fuel Pump	Running Hours	12000 Hrs	11212 Hrs	23212 Hrs	OK	Y	N	Engine Department	Chief Engineer	GEN-AE-FS-001	4	In Stock	Linked component: Auxiliary Diesel Generators (3 x Yanmar 6EY26W) > Fuel System > Injector & Fuel Pump
GEN-PMS-036	Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	Fuel System	Injector & Fuel Pump	Renew - Injector Nozzle	Running Hours	8000 Hrs	13291 Hrs	21291 Hrs	Due Soon	N	N	Engine Department	4th Engineer	GEN-AE-FS-001	4	In Stock	Spare: Injector Nozzle (Yanmar)
GEN-PMS-037	Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	Fuel System	Injector & Fuel Pump	Condition Monitoring / Vibration Check - Injector & Fuel Pump	Calendar	3 Months	2026-07-14	2026-10-13	OK	N	N	Engine Department	2nd Engineer				Linked component: Auxiliary Diesel Generators (3 x Yanmar 6EY26W) > Fuel System > Injector & Fuel Pump
GEN-PMS-038	Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	Cooling Water System	Pumps & Cooler	Inspect & Overhaul - Pumps & Cooler	Running Hours	12000 Hrs	13822 Hrs	25822 Hrs	OK	Y	N	Engine Department	Chief Engineer	GEN-AE-CW-001	2	In Stock	Linked component: Auxiliary Diesel Generators (3 x Yanmar 6EY26W) > Cooling Water System > Pumps & Cooler
GEN-PMS-039	Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	Cooling Water System	Pumps & Cooler	Renew - FW Pump Mechanical Seal	Running Hours	5500 Hrs	15372 Hrs	20872 Hrs	Due Soon	N	N	Engine Department	3rd Engineer	GEN-AE-CW-001	2	In Stock	Spare: FW Pump Mechanical Seal (Yanmar)
GEN-PMS-040	Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	Cooling Water System	Pumps & Cooler	Condition Monitoring / Vibration Check - Pumps & Cooler	Calendar	3 Months	2026-06-06	2026-09-05	Due Soon	N	N	Engine Department	4th Engineer				Linked component: Auxiliary Diesel Generators (3 x Yanmar 6EY26W) > Cooling Water System > Pumps & Cooler
GEN-PMS-041	Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	Turbocharger	Bearing & Cartridge	Inspect & Overhaul - Bearing & Cartridge	Running Hours	16000 Hrs	15627 Hrs	31627 Hrs	OK	Y	N	Engine Department	Chief Engineer	GEN-AE-TC-001	10	In Stock	Linked component: Auxiliary Diesel Generators (3 x Yanmar 6EY26W) > Turbocharger > Bearing & Cartridge
GEN-PMS-042	Auxiliary Diesel Generators (3 x Yanmar 6EY26W)	Turbocharger	Bearing & Cartridge	Renew - Bearing Cartridge Kit	Running Hours	10500 Hrs	12211 Hrs	22711 Hrs	OK	N	N	Engine Department	3rd Engineer	GEN-AE-TC-001	10	In Stock	Spare: Bearing Cartridge Kit (Yanmar)
GEN-PMS-043	Auxiliary Boiler (Aalborg)	(System-wide)	(System-wide)	Annual Class / General Survey - Auxiliary Boiler (Aalborg)	Calendar	12 Months	2026-02-16	2027-02-16	OK	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-044	Auxiliary Boiler (Aalborg)	Burner Unit	Burner Assembly	Inspect & Overhaul - Burner Assembly	Running Hours	8000 Hrs	1904 Hrs	9904 Hrs	Due Soon	Y	N	Engine Department	Chief Engineer	GEN-BLR-BN-001	5	In Stock	Linked component: Auxiliary Boiler (Aalborg) > Burner Unit > Burner Assembly
GEN-PMS-045	Auxiliary Boiler (Aalborg)	Burner Unit	Burner Assembly	Renew - Atomizer / Nozzle	Running Hours	5000 Hrs	8421 Hrs	13421 Hrs	OK	N	N	Engine Department	3rd Engineer	GEN-BLR-BN-001	5	In Stock	Spare: Atomizer / Nozzle (Aalborg)
GEN-PMS-046	Auxiliary Boiler (Aalborg)	Burner Unit	Burner Assembly	Condition Monitoring / Vibration Check - Burner Assembly	Calendar	3 Months	2026-07-07	2026-10-06	OK	N	N	Engine Department	3rd Engineer				Linked component: Auxiliary Boiler (Aalborg) > Burner Unit > Burner Assembly
GEN-PMS-047	Auxiliary Boiler (Aalborg)	Feed Water System	Feed Pump & Fittings	Inspect & Overhaul - Feed Pump & Fittings	Running Hours	6000 Hrs	7102 Hrs	13102 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-BLR-FW-001	10	In Stock	Linked component: Auxiliary Boiler (Aalborg) > Feed Water System > Feed Pump & Fittings
GEN-PMS-048	Auxiliary Boiler (Aalborg)	Feed Water System	Feed Pump & Fittings	Renew - Feed Pump Mechanical Seal	Running Hours	4000 Hrs	5817 Hrs	9817 Hrs	Overdue	N	N	Engine Department	3rd Engineer	GEN-BLR-FW-001	10	In Stock	Spare: Feed Pump Mechanical Seal (Aalborg)
GEN-PMS-049	Auxiliary Boiler (Aalborg)	Feed Water System	Feed Pump & Fittings	Condition Monitoring / Vibration Check - Feed Pump & Fittings	Calendar	3 Months	2026-05-20	2026-08-19	Overdue	N	N	Engine Department	4th Engineer				Linked component: Auxiliary Boiler (Aalborg) > Feed Water System > Feed Pump & Fittings
GEN-PMS-050	Steering Gear (Rolls-Royce)	(System-wide)	(System-wide)	Annual Class / General Survey - Steering Gear (Rolls-Royce)	Calendar	12 Months	2026-06-30	2027-06-30	OK	Y	Y	Deck Department	Chief Officer				Class/Statutory survey item
GEN-PMS-051	Steering Gear (Rolls-Royce)	Hydraulic Power Unit	Hydraulic Pump	Function Test & Inspection - Hydraulic Pump	Calendar	1 Month	2026-08-13	2026-09-12	OK	Y	Y	Deck Department	Chief Officer				Linked component: Steering Gear (Rolls-Royce) > Hydraulic Power Unit > Hydraulic Pump
GEN-PMS-052	Steering Gear (Rolls-Royce)	Hydraulic Power Unit	Hydraulic Pump	Overhaul / Renew - Variable Displacement Pump Seal Kit	Counter	500 Operations	269 Operations	769 Operations	Due Soon	N	N	Deck Department	3rd Officer	GEN-STG-HP-001	11	In Stock	Spare: Variable Displacement Pump Seal Kit (Rolls-Royce)
GEN-PMS-053	Steering Gear (Rolls-Royce)	Rudder Actuator	Rotary Vane Actuator	Function Test & Inspection - Rotary Vane Actuator	Calendar	1 Month	2026-08-03	2026-09-02	Due Soon	Y	Y	Deck Department	Chief Officer				Linked component: Steering Gear (Rolls-Royce) > Rudder Actuator > Rotary Vane Actuator
GEN-PMS-054	Steering Gear (Rolls-Royce)	Rudder Actuator	Rotary Vane Actuator	Overhaul / Renew - Vane Seal Kit	Counter	250 Starts	703 Starts	953 Starts	OK	N	N	Deck Department	Bosun	GEN-STG-RV-001	7	In Stock	Spare: Vane Seal Kit (Rolls-Royce)
GEN-PMS-055	Deck Machinery (MacGregor)	(System-wide)	(System-wide)	Annual Class / General Survey - Deck Machinery (MacGregor)	Calendar	12 Months	2025-11-28	2026-11-28	OK	Y	Y	Deck Department	Chief Officer				Class/Statutory survey item
GEN-PMS-056	Deck Machinery (MacGregor)	Windlass / Mooring Winch	Winch Drive	Function Test & Inspection - Winch Drive	Calendar	1 Month	2026-08-15	2026-09-14	OK	N	N	Deck Department	2nd Officer				Linked component: Deck Machinery (MacGregor) > Windlass / Mooring Winch > Winch Drive
GEN-PMS-057	Deck Machinery (MacGregor)	Windlass / Mooring Winch	Winch Drive	Overhaul / Renew - Hydraulic Motor	Counter	500 Starts	262 Starts	762 Starts	Due Soon	N	N	Deck Department	3rd Officer	GEN-DM-WM-001	0	Out of Stock	Spare: Hydraulic Motor (MacGregor)
GEN-PMS-058	Deck Machinery (MacGregor)	Anchor & Chain	Chain Fittings	Function Test & Inspection - Chain Fittings	Calendar	3 Months	2026-06-09	2026-09-08	OK	N	N	Deck Department	3rd Officer				Linked component: Deck Machinery (MacGregor) > Anchor & Chain > Chain Fittings
GEN-PMS-059	Deck Machinery (MacGregor)	Anchor & Chain	Chain Fittings	Overhaul / Renew - Kenter Shackle	Counter	250 Cycles	564 Cycles	814 Cycles	OK	N	N	Deck Department	3rd Officer	GEN-DM-AC-001	9	In Stock	Spare: Kenter Shackle (MacGregor)
GEN-PMS-060	Fresh Water Generator (Alfa Laval)	(System-wide)	(System-wide)	Annual Class / General Survey - Fresh Water Generator (Alfa Laval)	Calendar	12 Months	2026-04-21	2027-04-21	OK	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-061	Fresh Water Generator (Alfa Laval)	Evaporator	Plate Pack	Inspect & Overhaul - Plate Pack	Running Hours	16000 Hrs	1171 Hrs	17171 Hrs	OK	Y	N	Engine Department	Chief Engineer	GEN-FWG-EV-001	0	Out of Stock	Linked component: Fresh Water Generator (Alfa Laval) > Evaporator > Plate Pack
GEN-PMS-062	Fresh Water Generator (Alfa Laval)	Evaporator	Plate Pack	Renew - Titanium Plate Set	Running Hours	9000 Hrs	9168 Hrs	18168 Hrs	OK	N	N	Engine Department	Electrical Officer	GEN-FWG-EV-001	0	Out of Stock	Spare: Titanium Plate Set (Alfa Laval)
GEN-PMS-063	Fresh Water Generator (Alfa Laval)	Ejector / Vacuum System	Ejector Pump	Inspect & Overhaul - Ejector Pump	Running Hours	4000 Hrs	8537 Hrs	12537 Hrs	Due Soon	N	N	Engine Department	4th Engineer	GEN-FWG-EJ-001	12	In Stock	Linked component: Fresh Water Generator (Alfa Laval) > Ejector / Vacuum System > Ejector Pump
GEN-PMS-064	Fresh Water Generator (Alfa Laval)	Ejector / Vacuum System	Ejector Pump	Renew - Mechanical Seal	Running Hours	2000 Hrs	10446 Hrs	12446 Hrs	OK	N	N	Engine Department	4th Engineer	GEN-FWG-EJ-001	12	In Stock	Spare: Mechanical Seal (Alfa Laval)
GEN-PMS-065	Air Compressor - Main & Service (Sperre)	(System-wide)	(System-wide)	Annual Class / General Survey - Air Compressor - Main & Service (Sperre)	Calendar	12 Months	2026-07-16	2027-07-16	OK	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-066	Air Compressor - Main & Service (Sperre)	Compressor Unit	Cylinder Assembly	Inspect & Overhaul - Cylinder Assembly	Running Hours	2000 Hrs	17105 Hrs	19105 Hrs	Overdue	N	N	Engine Department	Electrical Officer	GEN-AC-CU-001	2	Low Stock	Linked component: Air Compressor - Main & Service (Sperre) > Compressor Unit > Cylinder Assembly
GEN-PMS-067	Air Compressor - Main & Service (Sperre)	Compressor Unit	Cylinder Assembly	Renew - Piston Ring Set	Running Hours	1000 Hrs	18381 Hrs	19381 Hrs	OK	N	N	Engine Department	4th Engineer	GEN-AC-CU-001	2	Low Stock	Spare: Piston Ring Set (Sperre)
GEN-PMS-068	Air Compressor - Main & Service (Sperre)	Compressor Unit	Cylinder Assembly	Condition Monitoring / Vibration Check - Cylinder Assembly	Calendar	3 Months	2026-08-08	2026-11-07	OK	N	N	Engine Department	Electrical Officer				Linked component: Air Compressor - Main & Service (Sperre) > Compressor Unit > Cylinder Assembly
GEN-PMS-069	FO & LO Purifiers (Alfa Laval)	(System-wide)	(System-wide)	Annual Class / General Survey - FO & LO Purifiers (Alfa Laval)	Calendar	12 Months	2025-08-14	2026-08-14	Overdue	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-070	FO & LO Purifiers (Alfa Laval)	Bowl Assembly	Separator Bowl	Inspect & Overhaul - Separator Bowl	Running Hours	12000 Hrs	9151 Hrs	21151 Hrs	OK	Y	N	Engine Department	Chief Engineer	GEN-PUR-BW-001	12	In Stock	Linked component: FO & LO Purifiers (Alfa Laval) > Bowl Assembly > Separator Bowl
GEN-PMS-071	FO & LO Purifiers (Alfa Laval)	Bowl Assembly	Separator Bowl	Renew - Gravity Disc Set	Running Hours	6000 Hrs	11625 Hrs	17625 Hrs	OK	N	N	Engine Department	4th Engineer	GEN-PUR-BW-001	12	In Stock	Spare: Gravity Disc Set (Alfa Laval)
GEN-PMS-072	FO & LO Purifiers (Alfa Laval)	Bowl Assembly	Separator Bowl	Condition Monitoring / Vibration Check - Separator Bowl	Calendar	3 Months	2026-08-11	2026-11-10	OK	N	N	Engine Department	Electrical Officer				Linked component: FO & LO Purifiers (Alfa Laval) > Bowl Assembly > Separator Bowl
GEN-PMS-073	Ballast / Bilge / GS Pumps (Framo)	(System-wide)	(System-wide)	Annual Class / General Survey - Ballast / Bilge / GS Pumps (Framo)	Calendar	12 Months	2026-06-09	2027-06-09	OK	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-074	Ballast / Bilge / GS Pumps (Framo)	Centrifugal Pumps	Pump Assembly	Inspect & Overhaul - Pump Assembly	Running Hours	4000 Hrs	14506 Hrs	18506 Hrs	OK	N	N	Engine Department	3rd Engineer	GEN-PMP-CP-001	11	In Stock	Linked component: Ballast / Bilge / GS Pumps (Framo) > Centrifugal Pumps > Pump Assembly
GEN-PMS-075	Ballast / Bilge / GS Pumps (Framo)	Centrifugal Pumps	Pump Assembly	Renew - Mechanical Seal	Running Hours	2500 Hrs	14665 Hrs	17165 Hrs	OK	N	N	Engine Department	3rd Engineer	GEN-PMP-CP-001	11	In Stock	Spare: Mechanical Seal (Framo)
GEN-PMS-076	Ballast / Bilge / GS Pumps (Framo)	Centrifugal Pumps	Pump Assembly	Condition Monitoring / Vibration Check - Pump Assembly	Calendar	3 Months	2026-08-13	2026-11-12	OK	N	N	Engine Department	4th Engineer				Linked component: Ballast / Bilge / GS Pumps (Framo) > Centrifugal Pumps > Pump Assembly
GEN-PMS-077	Fire Fighting System (Skum)	(System-wide)	(System-wide)	Annual Class / General Survey - Fire Fighting System (Skum)	Calendar	12 Months	2025-08-10	2026-08-10	Overdue	Y	Y	Deck Department	Chief Officer				Class/Statutory survey item
GEN-PMS-078	Fire Fighting System (Skum)	Fire Pump	Pump Assembly	Function Test & Inspection - Pump Assembly	Calendar	6 Months	2026-03-14	2026-09-12	Due Soon	Y	Y	Deck Department	Chief Officer				Linked component: Fire Fighting System (Skum) > Fire Pump > Pump Assembly
GEN-PMS-079	Fire Fighting System (Skum)	Fire Pump	Pump Assembly	Overhaul / Renew - Mechanical Seal	Counter	250 Operations	792 Operations	1042 Operations	OK	N	N	Deck Department	Bosun	GEN-FF-FP-001	2	Low Stock	Spare: Mechanical Seal (Skum)
GEN-PMS-080	Fire Fighting System (Skum)	CO2 / Foam System	Release & Nozzles	Function Test & Inspection - Release & Nozzles	Calendar	1 Month	2026-07-24	2026-08-23	Due Soon	Y	Y	Deck Department	Chief Officer				Linked component: Fire Fighting System (Skum) > CO2 / Foam System > Release & Nozzles
GEN-PMS-081	Fire Fighting System (Skum)	CO2 / Foam System	Release & Nozzles	Overhaul / Renew - Cylinder Release Valve	Counter	250 Starts	372 Starts	622 Starts	OK	N	N	Deck Department	Bosun	GEN-FF-CO2-001	7	In Stock	Spare: Cylinder Release Valve (Skum)
GEN-PMS-082	Hatch Cover System (Hydraulic Folding Type - MacGregor)	(System-wide)	(System-wide)	Annual Class / General Survey - Hatch Cover System (Hydraulic Folding Type - MacGregor)	Calendar	12 Months	2026-02-12	2027-02-12	OK	Y	Y	Deck Department	Chief Officer				Class/Statutory survey item
GEN-PMS-083	Hatch Cover System (Hydraulic Folding Type - MacGregor)	Hydraulic System	Hydraulic Cylinder	Function Test & Inspection - Hydraulic Cylinder	Calendar	6 Months	2026-04-17	2026-10-16	OK	N	N	Deck Department	3rd Officer				Linked component: Hatch Cover System (Hydraulic Folding Type - MacGregor) > Hydraulic System > Hydraulic Cylinder
GEN-PMS-084	Hatch Cover System (Hydraulic Folding Type - MacGregor)	Hydraulic System	Hydraulic Cylinder	Overhaul / Renew - Cylinder Seal Kit	Counter	250 Cycles	468 Cycles	718 Cycles	OK	N	N	Deck Department	3rd Officer	GEN-HC-HY-001	10	In Stock	Spare: Cylinder Seal Kit (MacGregor)
GEN-PMS-085	Hatch Cover System (Hydraulic Folding Type - MacGregor)	Cleating System	Cleats & Wedges	Function Test & Inspection - Cleats & Wedges	Calendar	3 Months	2026-05-20	2026-08-19	Overdue	N	N	Deck Department	3rd Officer				Linked component: Hatch Cover System (Hydraulic Folding Type - MacGregor) > Cleating System > Cleats & Wedges
GEN-PMS-086	Hatch Cover System (Hydraulic Folding Type - MacGregor)	Cleating System	Cleats & Wedges	Overhaul / Renew - Rubber Packing (Compression Bar)	Counter	1000 Cycles	1022 Cycles	2022 Cycles	OK	N	N	Deck Department	Bosun	GEN-HC-CL-001	1	Low Stock	Spare: Rubber Packing (Compression Bar) (MacGregor)
GEN-PMS-087	Deck Cranes (4 x Electro-Hydraulic - TTS)	(System-wide)	(System-wide)	Annual Class / General Survey - Deck Cranes (4 x Electro-Hydraulic - TTS)	Calendar	12 Months	2026-04-02	2027-04-02	OK	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-088	Deck Cranes (4 x Electro-Hydraulic - TTS)	Hoist Winch	Winch Assembly	Inspect & Overhaul - Winch Assembly	Running Hours	4000 Hrs	4136 Hrs	8136 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-CR-HW-001	9	In Stock	Linked component: Deck Cranes (4 x Electro-Hydraulic - TTS) > Hoist Winch > Winch Assembly
GEN-PMS-089	Deck Cranes (4 x Electro-Hydraulic - TTS)	Hoist Winch	Winch Assembly	Renew - Brake Lining Set	Running Hours	2000 Hrs	4564 Hrs	6564 Hrs	OK	N	N	Engine Department	4th Engineer	GEN-CR-HW-001	9	In Stock	Spare: Brake Lining Set (TTS)
GEN-PMS-090	Deck Cranes (4 x Electro-Hydraulic - TTS)	Hoist Winch	Winch Assembly	Condition Monitoring / Vibration Check - Winch Assembly	Calendar	3 Months	2026-06-17	2026-09-16	OK	N	N	Engine Department	3rd Engineer				Linked component: Deck Cranes (4 x Electro-Hydraulic - TTS) > Hoist Winch > Winch Assembly
GEN-PMS-091	Deck Cranes (4 x Electro-Hydraulic - TTS)	Slewing Gear	Slew Ring Assembly	Inspect & Overhaul - Slew Ring Assembly	Running Hours	6000 Hrs	3390 Hrs	9390 Hrs	OK	N	N	Engine Department	2nd Engineer	GEN-CR-SL-001	11	In Stock	Linked component: Deck Cranes (4 x Electro-Hydraulic - TTS) > Slewing Gear > Slew Ring Assembly
GEN-PMS-092	Deck Cranes (4 x Electro-Hydraulic - TTS)	Slewing Gear	Slew Ring Assembly	Renew - Slew Bearing	Running Hours	4000 Hrs	3890 Hrs	7890 Hrs	OK	N	N	Engine Department	Electrical Officer	GEN-CR-SL-001	11	In Stock	Spare: Slew Bearing (TTS)
GEN-PMS-093	Cargo Hold Ventilation	(System-wide)	(System-wide)	Annual Class / General Survey - Cargo Hold Ventilation	Calendar	12 Months	2026-06-19	2027-06-19	OK	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-094	Cargo Hold Ventilation	Fan Units	Ventilation Fan	Inspect & Overhaul - Ventilation Fan	Running Hours	16000 Hrs	7447 Hrs	23447 Hrs	OK	Y	N	Engine Department	Chief Engineer	GEN-VT-FN-001	2	Low Stock	Linked component: Cargo Hold Ventilation > Fan Units > Ventilation Fan
GEN-PMS-095	Cargo Hold Ventilation	Fan Units	Ventilation Fan	Renew - Motor Bearing Set	Running Hours	7000 Hrs	15141 Hrs	22141 Hrs	OK	N	N	Engine Department	4th Engineer	GEN-VT-FN-001	2	Low Stock	Spare: Motor Bearing Set (Novenco)
GEN-PMS-096	Cargo Hold Ventilation	Fan Units	Ventilation Fan	Condition Monitoring / Vibration Check - Ventilation Fan	Calendar	3 Months	2026-06-07	2026-09-06	Due Soon	N	N	Engine Department	Electrical Officer				Linked component: Cargo Hold Ventilation > Fan Units > Ventilation Fan
GEN-PMS-097	Ballast Water Treatment System (Alfa Laval PureBallast)	(System-wide)	(System-wide)	Annual Class / General Survey - Ballast Water Treatment System (Alfa Laval PureBallast)	Calendar	12 Months	2025-07-29	2026-07-29	Overdue	Y	Y	Deck Department	Chief Officer				Class/Statutory survey item
GEN-PMS-098	Ballast Water Treatment System (Alfa Laval PureBallast)	Filter & UV Unit	Treatment Unit	Function Test & Inspection - Treatment Unit	Calendar	6 Months	2026-05-04	2026-11-02	OK	N	N	Deck Department	3rd Officer				Linked component: Ballast Water Treatment System (Alfa Laval PureBallast) > Filter & UV Unit > Treatment Unit
GEN-PMS-099	Ballast Water Treatment System (Alfa Laval PureBallast)	Filter & UV Unit	Treatment Unit	Overhaul / Renew - UV Lamp	Counter	250 Starts	214 Starts	464 Starts	Due Soon	N	N	Deck Department	2nd Officer	GEN-BWT-UV-001	4	In Stock	Spare: UV Lamp (Alfa Laval)
GEN-PMS-100	Stores & Consumables	(System-wide)	(System-wide)	Annual Class / General Survey - Stores & Consumables	Calendar	12 Months	2026-06-01	2027-06-01	OK	Y	Y	Engine Department	Chief Engineer				Class/Statutory survey item
GEN-PMS-101	Stores & Consumables	Lubricating Oils	System Oil (Main / Aux Engine Sump)	Stock Check & Replenish - System Oil (Main / Aux Engine Sump)	Calendar	1 Month	2026-08-07	2026-09-06	Due Soon	N	N	Engine Department	3rd Engineer				Linked component: Stores & Consumables > Lubricating Oils > System Oil (Main / Aux Engine Sump)
GEN-PMS-102	Stores & Consumables	Lubricating Oils	System Oil (Main / Aux Engine Sump)	Sample Analysis / Quality Check - System Oil (Main / Aux Engine Sump)	Calendar	3 Months	2026-08-12	2026-11-11	OK	N	N	Engine Department	4th Engineer				Linked component: Stores & Consumables > Lubricating Oils > System Oil (Main / Aux Engine Sump)
GEN-PMS-103	Stores & Consumables	Lubricating Oils	Cylinder Oil (Main Engine)	Stock Check & Replenish - Cylinder Oil (Main Engine)	Calendar	1 Month	2026-08-10	2026-09-09	OK	N	N	Engine Department	Electrical Officer				Linked component: Stores & Consumables > Lubricating Oils > Cylinder Oil (Main Engine)
GEN-PMS-104	Stores & Consumables	Lubricating Oils	Cylinder Oil (Main Engine)	Sample Analysis / Quality Check - Cylinder Oil (Main Engine)	Calendar	3 Months	2026-06-10	2026-09-09	OK	N	N	Engine Department	3rd Engineer				Linked component: Stores & Consumables > Lubricating Oils > Cylinder Oil (Main Engine)
GEN-PMS-105	Stores & Consumables	Lubricating Oils	Turbine & Hydraulic Oils	Stock Check & Replenish - Turbine & Hydraulic Oils	Calendar	1 Month	2026-08-17	2026-09-16	OK	N	N	Engine Department	3rd Engineer				Linked component: Stores & Consumables > Lubricating Oils > Turbine & Hydraulic Oils
GEN-PMS-106	Stores & Consumables	Lubricating Oils	Turbine & Hydraulic Oils	Sample Analysis / Quality Check - Turbine & Hydraulic Oils	Calendar	3 Months	2026-07-07	2026-10-06	OK	N	N	Engine Department	Electrical Officer				Linked component: Stores & Consumables > Lubricating Oils > Turbine & Hydraulic Oils
GEN-PMS-107	Stores & Consumables	Boiler & Cooling Water Chemicals	Boiler Water Treatment	Stock Check & Replenish - Boiler Water Treatment	Calendar	1 Month	2026-07-27	2026-08-26	Due Soon	N	N	Engine Department	Electrical Officer				Linked component: Stores & Consumables > Boiler & Cooling Water Chemicals > Boiler Water Treatment
GEN-PMS-108	Stores & Consumables	Boiler & Cooling Water Chemicals	Boiler Water Treatment	Sample Analysis / Quality Check - Boiler Water Treatment	Calendar	3 Months	2026-06-25	2026-09-24	OK	N	N	Engine Department	3rd Engineer				Linked component: Stores & Consumables > Boiler & Cooling Water Chemicals > Boiler Water Treatment
GEN-PMS-109	Stores & Consumables	Boiler & Cooling Water Chemicals	Cooling Water Treatment (Jacket Water)	Stock Check & Replenish - Cooling Water Treatment (Jacket Water)	Calendar	1 Month	2026-08-06	2026-09-05	Due Soon	N	N	Engine Department	2nd Engineer				Linked component: Stores & Consumables > Boiler & Cooling Water Chemicals > Cooling Water Treatment (Jacket Water)
GEN-PMS-110	Stores & Consumables	Boiler & Cooling Water Chemicals	Cooling Water Treatment (Jacket Water)	Sample Analysis / Quality Check - Cooling Water Treatment (Jacket Water)	Calendar	3 Months	2026-07-09	2026-10-08	OK	N	N	Engine Department	4th Engineer				Linked component: Stores & Consumables > Boiler & Cooling Water Chemicals > Cooling Water Treatment (Jacket Water)
GEN-PMS-111	Stores & Consumables	Cleaning & Purifier Chemicals	Purifier / Tank Cleaning Chemicals	Stock Check & Replenish - Purifier / Tank Cleaning Chemicals	Calendar	1 Month	2026-08-03	2026-09-02	Due Soon	N	N	Engine Department	4th Engineer				Linked component: Stores & Consumables > Cleaning & Purifier Chemicals > Purifier / Tank Cleaning Chemicals
GEN-PMS-112	Stores & Consumables	Cleaning & Purifier Chemicals	Purifier / Tank Cleaning Chemicals	Sample Analysis / Quality Check - Purifier / Tank Cleaning Chemicals	Calendar	3 Months	2026-06-27	2026-09-26	OK	N	N	Engine Department	3rd Engineer				Linked component: Stores & Consumables > Cleaning & Purifier Chemicals > Purifier / Tank Cleaning Chemicals
GEN-PMS-113	Stores & Consumables	Paints & Coatings	Hull & Deck Paints	Stock Check & Replenish - Hull & Deck Paints	Calendar	1 Month	2026-08-06	2026-09-05	Due Soon	N	N	Engine Department	4th Engineer				Linked component: Stores & Consumables > Paints & Coatings > Hull & Deck Paints
GEN-PMS-114	Stores & Consumables	Welding & Gas Stores	Welding Consumables & Gas Cylinders	Stock Check & Replenish - Welding Consumables & Gas Cylinders	Calendar	1 Month	2026-08-19	2026-09-18	OK	N	N	Engine Department	3rd Engineer				Linked component: Stores & Consumables > Welding & Gas Stores > Welding Consumables & Gas Cylinders
GEN-PMS-115	Stores & Consumables	Engine Room General Stores	Gaskets, Packing & Jointing	Stock Check & Replenish - Gaskets, Packing & Jointing	Calendar	1 Month	2026-08-01	2026-08-31	Due Soon	N	N	Engine Department	Electrical Officer				Linked component: Stores & Consumables > Engine Room General Stores > Gaskets, Packing & Jointing
GEN-PMS-116	Stores & Consumables	Engine Room General Stores	Tools, PPE & Cleaning Materials	Stock Check & Replenish - Tools, PPE & Cleaning Materials	Calendar	1 Month	2026-07-26	2026-08-25	Due Soon	N	N	Engine Department	4th Engineer				Linked component: Stores & Consumables > Engine Room General Stores > Tools, PPE & Cleaning Materials
GEN-PMS-117	Stores & Consumables	Safety Stores - LSA	Life Saving Appliances	Stock Check & Replenish - Life Saving Appliances	Calendar	1 Month	2026-08-11	2026-09-10	OK	N	N	Engine Department	4th Engineer				Linked component: Stores & Consumables > Safety Stores - LSA > Life Saving Appliances
GEN-PMS-118	Stores & Consumables	Safety Stores - FFA	Fire Fighting Appliances	Stock Check & Replenish - Fire Fighting Appliances	Calendar	1 Month	2026-08-11	2026-09-10	OK	N	N	Engine Department	4th Engineer				Linked component: Stores & Consumables > Safety Stores - FFA > Fire Fighting Appliances
GEN-PMS-119	Stores & Consumables	Bosun / Deck Stores	Ropes, Wires & Rigging	Stock Check & Replenish - Ropes, Wires & Rigging	Calendar	1 Month	2026-08-12	2026-09-11	OK	N	N	Engine Department	4th Engineer				Linked component: Stores & Consumables > Bosun / Deck Stores > Ropes, Wires & Rigging
GEN-PMS-120	Stores & Consumables	Stationery & General Stores	Record Books & Office Stationery	Stock Check & Replenish - Record Books & Office Stationery	Calendar	1 Month	2026-07-25	2026-08-24	Due Soon	N	N	Engine Department	3rd Engineer				Linked component: Stores & Consumables > Stationery & General Stores > Record Books & Office Stationery
GEN-PMS-121	Stores & Consumables	Provisions & Catering Stores	Dry / Frozen Provisions & Galley Consumables	Stock Check & Replenish - Dry / Frozen Provisions & Galley Consumables	Calendar	1 Month	2026-08-18	2026-09-17	OK	N	N	Engine Department	2nd Engineer				Linked component: Stores & Consumables > Provisions & Catering Stores > Dry / Frozen Provisions & Galley Consumables
`

export const PLAN_ROWS = RAW_PLAN_ROWS.trim()
  .split('\n')
  .map((line) => line.split('\t'))
  .map((values) => Object.fromEntries(ROW_KEYS.map((key, index) => [key, values[index] ?? ''])))
  .map((row) => ({
    ...row,
    jobType: deriveJobType(row),
    priority: derivePriority(row),
  }))

export const JOB_ANALYSIS = [
  { label: 'OK', wo: PLAN_ROWS.filter((row) => row.status === 'OK').length, naj: 0, highlighted: true },
  { label: 'Due Soon', wo: PLAN_ROWS.filter((row) => row.status === 'Due Soon').length, naj: 0 },
  { label: 'Overdue', wo: PLAN_ROWS.filter((row) => row.status === 'Overdue').length, naj: 0 },
  { label: 'Total', wo: PLAN_ROWS.length, naj: 0 },
]

function deriveJobType(row) {
  if (row.classRelated === 'Y' || row.jobTitle.includes('Annual Class / General Survey')) {
    return 'Class Job'
  }
  if (row.jobTitle.includes('Condition Monitoring')) {
    return 'Condition Monitoring'
  }
  if (row.jobTitle.includes('Stock Check') || row.jobTitle.includes('Sample Analysis')) {
    return 'Routine Task'
  }
  if (row.jobTitle.includes('Renew')) {
    return 'Renewal'
  }
  if (row.jobTitle.includes('Inspect') || row.jobTitle.includes('Overhaul') || row.jobTitle.includes('Function Test')) {
    return 'Maintenance'
  }
  return 'Planned Job'
}

function derivePriority(row) {
  if (row.status === 'Overdue') return 'Critical'
  if (row.classRelated === 'Y' || row.critical === 'Y') return 'High'
  if (row.status === 'Due Soon') return 'Medium'
  return 'Low'
}
