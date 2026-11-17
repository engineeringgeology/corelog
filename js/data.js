/* CoreLog Field — reference picklists (USCS / ASTM D2488, BS 5930:2015, EN ISO 14688-1 / 14689) */
'use strict';
window.CL = window.CL || {};

CL.DATA = {
  standards: {
    USCS: 'USCS / ASTM D2487-D2488',
    BS: 'BS 5930:2015+A1:2020',
    ISO: 'EN ISO 14688-1 / EN ISO 14689'
  },

  // Lithology keys used for the graphic column (pattern drawn in pdf + on screen)
  lith: [
    ['topsoil', 'Topsoil'], ['fill', 'Fill / Made ground'], ['clay', 'Clay'], ['silt', 'Silt'],
    ['sand', 'Sand'], ['gravel', 'Gravel'], ['cobbles', 'Cobbles / Boulders'], ['peat', 'Peat / Organic'],
    ['clayey_sand', 'Clayey / silty sand'], ['sandy_clay', 'Sandy clay / silt'], ['clayey_gravel', 'Clayey / silty gravel'], ['sandy_gravel', 'Sandy gravel'],
    ['sandstone', 'Sandstone'], ['siltstone', 'Siltstone'], ['mudstone', 'Mudstone / Claystone'], ['shale', 'Shale'],
    ['limestone', 'Limestone'], ['dolomite', 'Dolomite'], ['marl', 'Marl'], ['conglomerate', 'Conglomerate / Breccia'],
    ['chalk', 'Chalk'], ['coal', 'Coal'], ['granite', 'Granite / Igneous (plutonic)'], ['basalt', 'Basalt / Igneous (volcanic)'],
    ['schist', 'Schist / Phyllite'], ['gneiss', 'Gneiss'], ['quartzite', 'Quartzite / Marble'], ['flysch', 'Flysch (interbedded)'],
    ['void', 'Void / Cavity'], ['norec', 'No recovery / Core loss']
  ],

  // USCS group symbols with name and default pattern
  uscs: [
    ['GW', 'Well-graded GRAVEL', 'gravel'], ['GP', 'Poorly graded GRAVEL', 'gravel'],
    ['GM', 'Silty GRAVEL', 'clayey_gravel'], ['GC', 'Clayey GRAVEL', 'clayey_gravel'],
    ['GW-GM', 'Well-graded GRAVEL with silt', 'gravel'], ['GP-GC', 'Poorly graded GRAVEL with clay', 'gravel'],
    ['SW', 'Well-graded SAND', 'sand'], ['SP', 'Poorly graded SAND', 'sand'],
    ['SM', 'Silty SAND', 'clayey_sand'], ['SC', 'Clayey SAND', 'clayey_sand'],
    ['SW-SM', 'Well-graded SAND with silt', 'sand'], ['SP-SM', 'Poorly graded SAND with silt', 'sand'], ['SP-SC', 'Poorly graded SAND with clay', 'sand'],
    ['ML', 'SILT', 'silt'], ['CL', 'Lean CLAY', 'clay'], ['CL-ML', 'Silty CLAY', 'clay'], ['OL', 'Organic SILT / CLAY', 'peat'],
    ['MH', 'Elastic SILT', 'silt'], ['CH', 'Fat CLAY', 'clay'], ['OH', 'Organic CLAY / SILT (high plasticity)', 'peat'],
    ['PT', 'PEAT', 'peat']
  ],

  // Fine-soil consistency
  consistency: {
    USCS: ['very soft', 'soft', 'firm', 'stiff', 'very stiff', 'hard'],
    BS: ['very soft', 'soft', 'firm', 'stiff', 'very stiff'],
    ISO: ['very soft', 'soft', 'firm', 'stiff', 'very stiff']
  },
  consistencyHint: {
    'very soft': 'finger easily pushed in up to 25 mm; exudes between fingers', 'soft': 'finger pushed in up to 10 mm; moulded by light finger pressure',
    'firm': 'thumb makes impression easily; cannot be moulded by fingers', 'stiff': 'can be indented slightly by thumb; crumbles in rolling',
    'very stiff': 'can be indented by thumbnail; cannot be moulded', 'hard': 'thumbnail indents with difficulty (ASTM D2488)'
  },
  density: ['very loose', 'loose', 'medium dense', 'dense', 'very dense'],
  densityHint: { 'very loose': 'SPT N60 0–4', 'loose': 'N60 4–10', 'medium dense': 'N60 10–30', 'dense': 'N60 30–50', 'very dense': 'N60 > 50' },
  moisture: ['dry', 'moist', 'wet', 'saturated'],
  plasticity: ['non-plastic', 'low plasticity', 'medium plasticity', 'high plasticity', 'very high plasticity'],

  // BS 5930 / ISO 14688 principal soil types
  principalSoil: ['CLAY', 'SILT', 'SAND', 'GRAVEL', 'COBBLES', 'BOULDERS', 'PEAT', 'TOPSOIL', 'MADE GROUND'],
  principalPattern: { CLAY: 'clay', SILT: 'silt', SAND: 'sand', GRAVEL: 'gravel', COBBLES: 'cobbles', BOULDERS: 'cobbles', PEAT: 'peat', TOPSOIL: 'topsoil', 'MADE GROUND': 'fill' },
  secondary: ['', 'slightly sandy', 'sandy', 'very sandy', 'slightly gravelly', 'gravelly', 'very gravelly',
    'slightly silty', 'silty', 'very silty', 'slightly clayey', 'clayey', 'very clayey',
    'slightly sandy gravelly', 'sandy gravelly', 'slightly organic', 'organic', 'with cobbles', 'with boulders'],
  particleShape: ['', 'angular', 'subangular', 'subrounded', 'rounded', 'flat', 'elongate'],
  grading: ['', 'well graded', 'poorly graded', 'uniformly graded', 'gap graded'],
  sandSize: ['', 'fine', 'fine to medium', 'medium', 'medium to coarse', 'coarse', 'fine to coarse'],
  soilStructure: ['', 'homogeneous', 'fissured', 'closely fissured', 'laminated', 'thinly bedded', 'interbedded', 'with sand partings', 'with silt laminae', 'with rootlets', 'with shell fragments', 'mottled', 'with organic inclusions'],

  // Colour builder
  colourMod: ['', 'light', 'dark', 'pale', 'mottled', 'pinkish', 'reddish', 'yellowish', 'orangish', 'brownish', 'olive', 'greenish', 'bluish', 'greyish'],
  colourMain: ['grey', 'brown', 'red', 'orange', 'yellow', 'olive', 'green', 'blue', 'pink', 'white', 'black', 'cream', 'buff'],

  // Rock
  rockNames: ['SANDSTONE', 'SILTSTONE', 'MUDSTONE', 'CLAYSTONE', 'SHALE', 'LIMESTONE', 'DOLOMITE', 'MARL', 'CHALK',
    'CONGLOMERATE', 'BRECCIA', 'COAL', 'GYPSUM', 'GRANITE', 'GRANODIORITE', 'DIORITE', 'GABBRO', 'BASALT', 'ANDESITE',
    'RHYOLITE', 'TUFF', 'DOLERITE', 'SCHIST', 'PHYLLITE', 'SLATE', 'GNEISS', 'QUARTZITE', 'MARBLE', 'SERPENTINITE', 'FLYSCH'],
  rockPattern: { SANDSTONE: 'sandstone', SILTSTONE: 'siltstone', MUDSTONE: 'mudstone', CLAYSTONE: 'mudstone', SHALE: 'shale', LIMESTONE: 'limestone',
    DOLOMITE: 'dolomite', MARL: 'marl', CHALK: 'chalk', CONGLOMERATE: 'conglomerate', BRECCIA: 'conglomerate', COAL: 'coal', GYPSUM: 'limestone',
    GRANITE: 'granite', GRANODIORITE: 'granite', DIORITE: 'granite', GABBRO: 'granite', BASALT: 'basalt', ANDESITE: 'basalt', RHYOLITE: 'basalt',
    TUFF: 'basalt', DOLERITE: 'basalt', SCHIST: 'schist', PHYLLITE: 'schist', SLATE: 'schist', GNEISS: 'gneiss', QUARTZITE: 'quartzite',
    MARBLE: 'quartzite', SERPENTINITE: 'schist', FLYSCH: 'flysch' },
  // Strength — BS 5930:2015 / EN ISO 14689 (UCS, MPa)
  strength: [
    ['extremely weak', '< 1 MPa · indented by thumbnail'], ['very weak', '1–5 MPa · crumbles under firm blows of pick'],
    ['weak', '5–25 MPa · shallow indentation by pick point'], ['medium strong', '25–50 MPa · cannot be scraped with knife'],
    ['strong', '50–100 MPa · requires more than one blow to fracture'], ['very strong', '100–250 MPa · many blows of hammer'],
    ['extremely strong', '> 250 MPa · only chipped by hammer']
  ],
  // ISRM / ASTM D5878-style for USCS (US practice)
  strengthUS: [
    ['extremely weak (R0)', '0.25–1 MPa'], ['very weak (R1)', '1–5 MPa'], ['weak (R2)', '5–25 MPa'], ['medium strong (R3)', '25–50 MPa'],
    ['strong (R4)', '50–100 MPa'], ['very strong (R5)', '100–250 MPa'], ['extremely strong (R6)', '> 250 MPa']
  ],
  weathering: [
    ['fresh', 'Grade I (ISO 0) · no visible sign of weathering'], ['slightly weathered', 'Grade II (ISO 1) · discolouration on discontinuities'],
    ['moderately weathered', 'Grade III (ISO 2) · less than half decomposed to soil'], ['highly weathered', 'Grade IV (ISO 3) · more than half decomposed to soil'],
    ['completely weathered', 'Grade V (ISO 4) · all decomposed, original structure intact'], ['residual soil', 'Grade VI (ISO 5) · structure and fabric destroyed']
  ],
  grainSize: ['', 'very fine-grained', 'fine-grained', 'medium-grained', 'coarse-grained', 'very coarse-grained'],
  rockStructure: ['', 'massive', 'thickly bedded', 'medium bedded', 'thinly bedded', 'very thinly bedded', 'laminated', 'cross-bedded', 'foliated', 'schistose', 'banded', 'vesicular', 'brecciated', 'karstified', 'porous', 'veined'],
  fractureState: ['', 'unfractured', 'slightly fractured', 'moderately fractured', 'highly fractured', 'intensely fractured', 'non-intact (fragmented)'],

  // Discontinuities
  discType: ['joint', 'bedding', 'foliation', 'cleavage', 'fault', 'shear', 'vein', 'fracture (drilling-induced)', 'crushed zone'],
  spacing: [
    ['extremely wide', '> 2000 mm'], ['very wide', '600–2000 mm'], ['wide', '200–600 mm'], ['medium', '60–200 mm'],
    ['close', '20–60 mm'], ['very close', '6–20 mm'], ['extremely close', '< 6 mm']
  ],
  roughness: ['', 'rough stepped', 'smooth stepped', 'slickensided stepped', 'rough undulating', 'smooth undulating',
    'slickensided undulating', 'rough planar', 'smooth planar', 'slickensided planar'],
  aperture: ['', 'tight (closed)', 'very narrow < 0.1 mm', 'narrow 0.1–0.5 mm', 'partly open 0.5–2.5 mm', 'open 2.5–10 mm', 'wide > 10 mm'],
  infill: ['', 'clean', 'iron-stained', 'Mn-stained', 'clay', 'silt', 'sand', 'calcite', 'quartz', 'gypsum', 'chlorite', 'gouge', 'breccia'],

  // Samples & tests
  sampleTypes: [['D', 'Disturbed (bag/jar)'], ['B', 'Bulk'], ['U', 'Undisturbed (U100/UT)'], ['ST', 'Shelby tube'], ['SS', 'Split spoon (SPT)'],
    ['C', 'Core sample'], ['W', 'Water sample'], ['ES', 'Environmental sample']],
  testTypes: [['PP', 'Pocket penetrometer (kPa)'], ['TV', 'Hand vane Su (kPa)'], ['LU', 'Lugeon / packer test (Lu)'],
    ['PLT', 'Point load Is(50) (MPa)'], ['FH', 'Falling head k (m/s)'], ['PID', 'PID (ppm)'], ['OTHER', 'Other']],
  methods: ['Rotary core (double tube)', 'Rotary core (triple tube)', 'Wireline core', 'Hollow stem auger', 'Solid stem auger',
    'Cable percussion', 'Sonic', 'Rotary open hole', 'Window sampler', 'Trial pit'],
  coreSizes: ['', 'NQ (47.6 mm)', 'HQ (63.5 mm)', 'PQ (85.0 mm)', 'BQ (36.4 mm)', 'NQ3', 'HQ3', 'PQ3', 'T2-101', 'T6-116', 'T6-146', '101 mm', '116 mm', '146 mm']
};
