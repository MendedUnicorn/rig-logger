import { DateTime } from "luxon";

const onshore = {
  BGO: "Bergen",
  SVG: "Stavanger",
  KSU: "Kristiansund",
  HFT: "Hammerfest",
  FRO: "Florø",
};

// const offshore = {
//   WPH: "West Phoenix",
//   DSY: "Deepsea Yantai",
//   ROV: "Rowan Viking",
//   DSA: "Deepsea Atlantic",
//   STC: "Statfjord C",
//   LER: "Leiv Eiriksson",
//   GFA: "Gullfaks A",
//   DEE: "Songa Dee",
//   GFC: "Gullfaks C",
//   STB: "Statfjord B",
//   WEL: "West Elara",
//   GFB: "Gullfaks B",
//   WAL: "West Alpha",
//   KVB: "Kvitebjørn",
//   BID: "Biedeford Dolphin",
//   SNO: "Snorre A",
//   DSB: "Deepsea Bergen",
//   WHE: "West Hercules",
//   MIT: "Maersk Interceptor",
//   VIS: "Visund",
//   WBO: "West Bollsta",
//   NIG: "Noble Integrator",
//   SCO: "Scarabeo 8",
//   DAB: "Deepsea Aberdeen",
//   BRA: "Brage",
//   NIV: "Noble Invincible",
//   ENA: "Transocean Enabler",
//   ISIN: "Island Innovator",
//   TNG: "Transocean Norge",
// };

const offshore = {
  "24/6": "FPSO Alvheim",
  "7NAV": "Seven Navica",
  "7PELICAN": "Seven Pelican",
  ABC: "ARILD BC",
  ABD: "MV Aberdeen",
  ACF: "Acergy Falcon",
  ACO: "Lewek Connector",
  ACP: "Acergy Piper",
  AEG: "DCV Aegir",
  AEX: "Atlantic Explorer",
  AFS: "Sara",
  AHA: "Aasta Hansteen",
  AKA: "Navion Akarita",
  AKN: "Anna Knutsen",
  ALBA: "Albuskjell  1/6 A",
  ALI: "Alize",
  ALV: "Alvheim",
  ALZ: "CGG Alize",
  AMP: "Amundsen Spirit",
  APACHE: "Apache",
  APT: "Askepott",
  AQUAM: "Aquamarine",
  ARB: "Arbroath",
  ARM: "Armada Kraken",
  ASA: "�sgard A",
  ASB: "�sgard B",
  ASC: "�sgard C",
  ASE: "Akofs Seafarer",
  ASL: "Askeladden",
  AUD: "Audacia",
  AVI: "Acergy Viking",
  "B-11": "Gasbooster B-11",
  BAF: "Balder FPU",
  BAL: "Brent A",
  BALD: "DCV Balder",
  BAR: "Bar",
  BAREA: "Barents Eagle",
  BAT: "FART�Y",
  BBT: "FARTYG",
  BDL: "Bredford Dolphin",
  BDO: "Borgland Dolphin",
  BER: "M/S Bertora",
  BERT: "MS Bertora",
  BGI: "Bergina",
  BID: "Bideford Dolphin",
  BKN: "Bodil Knutsen",
  BLO: "Bleo Holm",
  BOA: "Borga",
  BOC: "BOADEEPC",
  BOR: "Borgila Dolphin",
  BORGLAND: "Borgland Dolphin",
  BOT: "MSV Botnica",
  BPROT: "Bar Protector",
  BRA: "Brage",
  BRB: "Cormorant",
  BRC: "Brent C",
  BRD: "Brent D",
  BREDFORD: "Block 34/5-1s ",
  BRN: "Brent C",
  BRT: "Brent B",
  BRU: "Bruce",
  BSC: "Boa Sub C",
  BUS: "Bucentaur",
  BYA: "Beryl Alpha",
  BYB: "Beryl Bravo",
  BYF: "Byford Dolphin",
  "B�T": "Diverse b�ter",
  CAL: "Safe Caledonia",
  CAO: "Castorone",
  CCE: "geo celtic",
  CCO: "Cso Constructor",
  CDP1: "Frigg CDP1",
  CEC: "Cecilie",
  CIN: "Cosl Innovator",
  CLY: "Clyde",
  COA: "Cormorant A",
  COI: "Cosl Innovator",
  CON: "North Cormorant",
  COP: "Cosl Pioneer",
  COR: "Cormorant A",
  CPR: "Cosl Promoter",
  CRI: "COSL Rival",
  CS7: "Castoro 7",
  CSE: "Castoro Sei",
  CSW: "CSO Seawell",
  CWE: "CSO Wellserver",
  DAB: "Deepsea Aberdeen",
  DAR: "Deep Arctic",
  DBO: "Borgland Dolphin",
  DCY: "Deep Cygnus",
  DEE: "Songa Dee",
  DEEP: "Deep Energy",
  DEL: "Songa Delta",
  DEX: "Deep Explorer",
  DIS: "Dina Star",
  DIV: "DONG Inspection Vessel",
  DIY: "Seaway Discovery",
  DLP: "Draugen B (DLP)",
  DP2: "Frigg DP2",
  DPE: "Seven Pelican",
  DRA: "Draupner",
  DRU: "Draugen",
  DSA: "Deepsea Atlantic",
  DSB: "Deepsea Bergen",
  DSN: "Deepsea Nordkapp",
  DSS: "Deepsea Stavanger",
  DSY: "Deepsea Yantai",
  DUA: "Dunlin A",
  DUN: "Dunnbar",
  E101: "Ensco 101",
  E102: "Ensco 102",
  E70: "Ensco 70",
  E71: "Ensco 71",
  EAG: "Geco Eagel",
  EBE: "Eagle Bergen",
  EDFJ: "Edda Fjord",
  EFA: "Edda Fauna",
  EFL: "Edda Flora",
  EFO: "Edda Fonn",
  EGI: "Edvard Grieg",
  EID: "EIDER",
  EKN: "Elisabeth Knutsen",
  EKOB: "Ekofisk 2/4 B",
  EKOC: "Ekofisk 2/4 C",
  EKOD: "Ekofisk 2/4 D",
  EKOJ: "Ekofisk 2/4 J",
  EKOK: "Ekofisk 2/4 K",
  EKOL: "Ekofisk 2/4 L",
  EKOM: "Ekofisk 2/4 M",
  EKOT: "Ekofisk 2/4 Tank",
  EKOX: "Ekofisk 2/4 X",
  EKOZ: "Ekofiksk 2/4 Z",
  ELDA: "Eldfisk 2/7 A",
  ELDB: "Eldfisk 2/7 B",
  ELDE: "Eldfisk 2/7 E",
  ELDF: "Eldfisk 2/7 FTP",
  ELDS: "Eldfisk 2/7 S",
  EMBL: "Embla 2/7 D",
  ENA: "Transocean Enabler",
  ENC: "Transocean Encourage",
  ESBRAVO: "Esvagt Bravo",
  ESC: "Esvagt Castor",
  ESG: "Esvagt Gamma",
  ESH: "Ernest Shackleton",
  ESK: "Esvagt Kappa STBY fart�y",
  ESR: "Edda Freya",
  ESS: "Esvagt Sigma",
  "ESV-OM": "Esvagt Omega",
  ESVPRO: "Esvagt Protector",
  EVI: "EVI KNUTSEN",
  EVK: "Evi Knutsen",
  "FART�Y": "OCEAN KING",
  FAS: "Far Samson",
  FED: "Floatel Endurance",
  FEN: "MSV Fennica",
  FEX: "Falcon Explorer",
  FKN: "Frida Knutsen",
  FLI: "Flex Installer",
  FRI: "Frigg QP",
  FSA: "Far Saga",
  FSL: "Fugro Saltire",
  FSO: "Far Sovereign",
  FSP: "Floatel Superior",
  FTA: "Forties Alpha",
  FUL: "Fulmar",
  GA1: "SPM1 Lasteb�ye GFA",
  GA2: "SPM2 Lasteb�ye GFA",
  GAG: "Gargano",
  GAN: "Geo Angler",
  GAR: "GERRITA",
  GBL: "Geco Bluefin",
  GCE: "geo celtic",
  GDA: "Geco Diamond",
  GEA: "Geo Atlantic",
  GEB: "Geobay",
  GEC: "Geo Challenger",
  GEF: "Geofjord",
  GEO: "Geo Coral",
  GER: "GERRITA",
  GES: "Geosea",
  GEU: "Geosund",
  GEW: "Geowave Commander",
  GFA: "Gullfaks A",
  GFB: "Gullfaks B",
  GFC: "Gullfaks C",
  GHO: "Geoholm",
  GJO: "Gj�a",
  GKR: "Gina Krog",
  GLITNE: "Glitne",
  GNATCATC: "Gnatcatcher",
  GOL: "Goliat",
  GOR: "Gorm",
  GP3: "Global Producer 3",
  GPA: "Geo Pacific",
  GRA: "Grane",
  GRC: "Grand Canyon",
  GRC3: "Grand Canyon 3",
  GRE: "Grena",
  GROSBEAK: "Grosbeak appraisal",
  GSC: "Global Santa Fee Artic 3",
  GSE: "Geco Searcher",
  GTO: "Geco Topas",
  GTR: "Geco Triton",
  GUD: "Gudrun",
  GVI: "Gro Viking",
  GWA: "Geowave Master",
  GYD: "Gyda",
  "H-7": "Gasbooster H7",
  HAP: "Havila Phoenix",
  HAR: "Harald",
  HARDING: "Harding",
  HAT: "Havila Troll",
  HAVN: "Haven",
  HDA: "Heimdal",
  HEB: "Heidrun B",
  HED: "Hermod",
  HEI: "Heidrun ",
  "HI-FORT": "Highland Fortress",
  HIK: "Hilda Knutsen",
  HKN: "Helene Knutsen",
  HKU: "Hanne Knutsen",
  HOD: "Hod",
  HODB: "HOD B",
  HTR: "HEATHER",
  HUL: "Huldra",
  HUT: "Hutton TLP",
  HY01: "FWT HY01",
  HY02: "FWT HY02",
  HY03: "FWT HY03",
  HY04: "FWT HY04",
  HY05: "FWT HY05",
  HY06: "FWT HY06",
  HY07: "FWT HY07",
  HY08: "FWT HY08",
  HY09: "FWT HY09",
  HY10: "FWT HY10",
  HY11: "FWT HY11",
  IAA: "Ivar Aasen",
  ICL: "Island Clipper",
  "ICL-OUT": "Island Clipper OUT",
  ICR: "Island Crown",
  "ICR-OUT": "Island Crown OUT",
  ILE: "Inger Lene",
  INGAKE: "Inga Kenneth",
  INGLE: "Inger Lene",
  INS: "Yme Inspirer",
  IPA: "Ivan Papanin",
  ISC: "Island Constructor",
  ISD: "Island Diligence",
  "ISD-OUT": "Island Diligence OUT",
  ISF: "Island Frontier",
  ISI: "Island Intervention",
  ISIN: "Island Innovator",
  ISP: "Island Pioneer",
  ISR: "Island Ranger",
  IWE: "Island Wellserver",
  JCA: "Johan Castberg",
  JEKRI: "Jeanette-Kristina",
  JKY: "Jane Kynde",
  JOA: "Jotun A",
  JSF: "Johan Sverdrup Feltsenter",
  JUA: "Juanita",
  JUD: "Judy oilplatform",
  JUKSA: "Barentshavet",
  KAMAR: "Karen Margrethe",
  KRI: "Kristin",
  KSS: "Kommander Subsea",
  KVB: "Kvitebj�rn",
  "L-INS": "Lewek Inspector",
  LB2: "LB200",
  LEE: "Lewek Express",
  LER: "Leiv Eiriksson",
  LIN: "Linus",
  LOR: "Lorelay",
  "LUNO II": "Bredford Dolphin",
  MAG: "WG Magellan",
  MAGE: "MG Magellan",
  MAX: "Maxita",
  MERCATOR: "Fugro Mercator",
  MFO: "Maersk Forza",
  MGA: "Maersk Gallant",
  MGI: "Maersk Giant",
  MGL: "WG Magellan",
  MGN: "Magnus",
  MGU: "Maersk Guardian",
  MIL: "Miller",
  MIR: "Maersk Innovator",
  MIT: "Maersk Interceptor",
  MJU: "Maersk Jutlander",
  MLA: "Martin Linge A",
  MLB: "Martin Linge B",
  MRA: "Mariner A",
  MRC: "Murchison",
  MRE: "Maersk Recorder",
  MRL: "Maersk Reliance",
  MTR: "Montrose",
  NAD: "Northern Admiral",
  NAF: "Navion Fennia",
  NAG: "Navion Anglia",
  NAH: "Navion Hispania",
  NAL: "North Alwyn",
  NAN: "Nansen Spirit",
  NAO: "Navion Oceania",
  NAT: "MT Natura",
  NAVCL: "Navion Clipper",
  NBR: "Navion Britannia",
  NCO: "North Cormorant",
  NEU: "Navion Europa",
  NEV: "North Everest",
  NGE: "Noble George Sauvageau",
  NGT: "North Sea Giant",
  NHI: "NAVION HISPANIA",
  NIC: "Ninian Central",
  NID: "Noble Intrepid",
  NIG: "Noble Integrator",
  NIH: "Ninian North",
  NIN: "Nini",
  NIS: "Ninian South",
  NIV: "Noble Invincible",
  NJA: "Njord A",
  NJB: "Njord B",
  NKT: "NKT Victoria",
  NLN: "Noble Lloyd Noble",
  NMA: "Normand Maximus",
  NME: "Normand Mermaid",
  NMJ: "Normand Jarstein",
  NMV: "Normand Vision",
  NNE: "Norne",
  NNN: "Nytt",
  NNV: "Navion Norvegia",
  NOC: "Normand Cutter",
  NOD: "Normand Draupne",
  NOF: "Normand Flower",
  NOI: "Normand Installer",
  NOM: "Normand Mermaid",
  NOO: "Normand Ocean",
  NOP: "Normand Pioneer",
  NOS: "Nordic Stavanger",
  NOT: "Normand Titan",
  NPR: "Norman Progress",
  NRA: "Normand Ranger",
  NRC: "Normand Clipper",
  NRR: "Noble Reacher",
  NSA: "Navion Saga",
  NSC: "Navion Scandia",
  NSG: "Navion Saga",
  NSU: "Normand Subsea",
  NTO: "Normand Tonjer",
  NTR: "Normand Trym",
  OCA: "Ocean Alliance",
  OCE: "Ocean Explorer",
  OCF: "Ocean Fighter",
  OCH: "Olympic Challenger",
  OCK: "OCEAN KING",
  OCL: "Oceanic Challenger",
  OCO: "Olympic Commander",
  OCS: "Ocean Sky",
  OCTOPUS: "M/V Octopus",
  OEA: "Oceanic",
  OFL: "Ocean Flower",
  OPE: "Ocean Pearl",
  OPR: "Ocean Prince",
  OSC: "Oseberg C",
  OSE: "Oseberg A",
  OSH: "Oseberg H",
  OSO: "Oseberg �st",
  OSP: "Seaway Osprey",
  OSS: "Oseberg S�r",
  OVA: "Ocean Vanguard",
  PCR: "Polycrown",
  PEA: "Peary Spirit",
  PEL: "DSV Seven Pelican(old code)",
  PELI: "Pelican(old code)",
  PEM: "Polar Empress",
  PIB: "Piper B",
  PJA: "Petrojarl 1",
  PJK: "Petrojarl Knarr",
  PL713: "Pingvin",
  POB: "Polarbj�rn",
  POD: "Polar Duke",
  POP: "Polar Prince",
  POR: "Pacific Orca",
  POS: "Pacific Osprey",
  PPE: "Skal ikke brukes Toisa Perseus",
  PPI: "Polar Pioneer",
  PSP: "Pioneering Spirit",
  PVA: "Petrojarl Varg",
  RAC: "Ramform Challenger",
  RAK: "Ramform Viking",
  RAL: "Regalia",
  RAM: "Ramford Explorer",
  RAN: "Randgrid",
  RAS: "Ramform Sovereign",
  RAT: "Ramford Atlas",
  RAV: "Ramform Valiant",
  REL: "RELUME",
  REM: "Rem Ocean",
  RFO: "Rem Foorza",
  RIG: "Rigmar",
  RIN: "Ringhorne",
  RKN: "Ragnhild Knutsen",
  RLM: "RELUME",
  RO1: "Rockwater1",
  ROC: "Roccwater 1",
  ROG: "Rowan Gorilla 6",
  RON: "Rowan Norway",
  ROS: "Rowan Stavanger",
  ROV: "Valaris Viking",
  RS2: "Smith Semi 2 ",
  RST: "Ramform Sterling",
  RTE: "Ramform Tethys",
  RVA: "Ramform Vanguard",
  "S-DAYA1": "Siem Daya 1",
  S7000: "S7000",
  S711: "Sedco 711",
  SAE: "Skandi Acergy",
  SAI: "Saipem 7000",
  SAIP: "Saipem",
  SAK: "Skandi Aker",
  SAL: "Stena Alexita",
  SAN: "S�r Arne Nord",
  SAR: "Syd Arne",
  SAT: "Seven Atlantic",
  SBA: "Siem Barracuda",
  "SBA-OUT": "Siem Barracuda",
  SBE: "Skandi Bergen",
  SBO: "Safe Boreas",
  SBR: "Safe Britannia",
  SCA: "Scarabeo 5",
  SCB: "Scarabeo 6",
  SCI: "Skandi Inspector",
  SCO: "Scarabeo 8",
  SCORPIO: "M/V Scorpio",
  SCP: "Scott Spirit",
  SCS: "SPMC Lasteb�ye STC",
  SDO: "Stena Don",
  SEA: "Seven Eagle",
  SEC: "Seaway Commander",
  SEK: "Glitne",
  SEO: "Seaway Osprey",
  SEP: "Seaway Petrel",
  SEPE: "Seaway Pelican(old code)",
  SER: "Seaway Explorer",
  SES: "Seven Seas",
  SEV: "Seven Viking",
  SEX: "Sovereign Explorer",
  SFA: "Acergy Falcon",
  SFAL: "Seven Falcon",
  SHE: "Stril Hercules",
  SIK: "Siri Knutsen",
  SIPIT: "Silver Pit",
  SIR: "Siri",
  SIS: "Seven Sisters",
  SKA: "Skandi Arctic",
  SKB: "Skandi Beta",
  SKC: "Skandi Carla",
  SKFJ: "MV Skandi Fjord",
  SKI: "Seaway Kingfisher",
  SKN: "Seven Navica",
  SKS: "Skandi Seven",
  SKV: "Skarv FPSO",
  SLB: "Sleipner B",
  SLE: "Sleipner A",
  SME: "Stril Merkur",
  SNA: "Stena Natalita",
  SNB: "Snorre B",
  SNE: "Skandi Neptune",
  SNK: "Sindre Knutsen",
  SNO: "Snorre A",
  SNS: "Skandi Skansen",
  SOC: "Seven Oceans",
  SOL: "Solitaire",
  SPA: "Seven Pacific",
  SPE: "Seaway Petrel",
  SPEL: "Seven Pelican",
  SPI: "Sandpiper",
  SPO: "Stril Poseidon",
  SPR: "Sleipnir",
  SPRO: "Sea Profiler",
  SPY: "Stena Spey",
  SQU: "Seisquest",
  SRA: "Seisranger",
  SSC: "Safe Scandinavia",
  SSE: "Stril Server",
  "SSE-OUT": "Stril Server OUT",
  SSI: "Stena Sirita",
  SSK: "Skandi Skolten",
  SSW: "Stena Seawell",
  STA: "Statfjord A",
  STB: "Statfjord B",
  STC: "Statfjord C",
  STI: "Saltire A",
  SUB: "Havila Subsea",
  SUBC: "Boa SUB C",
  SUP: "Supply",
  SUV: "Subsea Viking",
  "SVI-MER": "Svitzer Mercator",
  SZE: "Safe Zephyrus",
  "S�L�": "S�l�ven",
  TAM: "Tambar",
  TAN: "Tartan",
  TAR: "Transocean Arctic",
  TBG: "BORGA",
  TBR: "Transocean Barents",
  TEA: "Tern Alpha",
  TEN: "Transocean Endurance",
  TEQ: "Transocean Equinox",
  TEST: "TEST Installasjon",
  TEV: "Evita",
  THF: "Thialf",
  THI: "Thistle A",
  THIALF: "Thialf",
  THIX: "Thisted Lufthavn",
  TIDE: "M/V Rollingstone",
  TIROL: "Tideway Rollingstone",
  TJS: "Transocean John Shaw",
  TKN: "Tove Knutsen",
  TKU: "Tordis Knutsen",
  TLD: "Transocean Leader",
  TNES: "Tertnes",
  TNG: "Transocean Norge",
  TOP: "Toisa Puma",
  TOR: "Tor 2/4 E",
  TORIL: "Toril Knutsen",
  TORSVIK: "M/V Torsvik",
  TOYS: "Toysa Perseus",
  TPE: "Toisa Perseus",
  TPO: "Toisa Polaris",
  TRB: "Troll B",
  TRC: "Troll C",
  TRN: "Transocean Nordic",
  TRO: "Troll A",
  TROL: "Viking Trol",
  TRP: "Transocean Prospect",
  TRS: "Transocean Searcher",
  TRT: "TROMS TJELD",
  TRW: "Transocean Winner",
  TRY: "Songa Trym",
  TSB: "Transocean Spitsbergen",
  TTJ: "Troms Tjeld",
  TVI: "evi knutsen",
  TWC: "Transocean Wildcat",
  ULA: "Ula",
  VAL: "Valemon",
  VAR: "Varg",
  VEN: "West Venture",
  VEV: "Veritas Viking",
  VFA: "Veslefrikk A",
  VFB: "Veslefrikk B",
  VFN: "Valhall flanke nord",
  VFS: "Valhall flanke syd",
  VFV: "Valhall Flanke Vest",
  VFW: "Valhall flanke vest",
  VIGDIS: "Borglan Dolphin",
  VIS: "Visund",
  VKN: "Vigdis Knutsen",
  VOL: "Volantis",
  VOS: "Volstad Surveyor",
  VPH: "Valhall PH",
  VQP: "Valhall QP",
  VQU: "VIKING QUEEN",
  VVA: "Veritas Vantage",
  WAL: "West Alpha",
  WBO: "West Bollsta",
  WDE: "West Delta   ",
  WEL: "West Elara",
  WEP: "West Epsilon",
  WEST: "M/V Western Pride",
  "WG MAGEL": "WG Magellan",
  WHE: "West Hercules",
  WILP: "Wilphoenix",
  WMI: "West Mira",
  WMO: "Western Monarch",
  WNA: "West Navion",
  WNG: "West Navigator",
  WPH: "West Phoenix",
  WPR: "Western Pride",
  WRE: "Western Regent",
  WSP: "Western Spirit",
  WVA: "Ocean Vanguard - Benytt kode OVA",
  XBAL: "Balestrand",
  XFOH: "CGG Fohn",
  XJUA: "XJUA",
  XSAF: "Skandi Africa",
  XSAR: "Nordic Sarita",
  XSSP: "Siem Spearfish",
  YME: "YME",
  ZIDANE: "Bredford Dolphin",
  "�LEN": "Westcon yard �lensv�g",
};

export const processCSV = (str, delim = ",") => {
  const headers = str.slice(0, str.indexOf("\n")).split(delim);
  const rows = str.slice(str.indexOf("\r\n") + 1).split("\r\n");
  console.log(rows);
  const rowsReversed = [...rows].reverse();
  let currentTrip = {};
  const trips = [];
  rowsReversed.map((row, i) => {
    const values = row.split(delim);
    if (Object.keys(onshore).includes(values[5])) {
      //means its a new offshore trip - create new object -- checks that the trip "from"-column is onshore
      currentTrip = {
        rig: offshore[values[6]],
        heliport: values[5],
        dateFrom: DateTime.fromFormat(values[1], "dd.LL.yyyy").toISO(),
        heliTimesToRig: { takeoff: values[2], landing: values[3] },
      };
    }
    if (Object.keys(onshore).includes(values[6])) {
      // means its a trip going home and the current trip can be finished and pushed
      currentTrip = {
        ...currentTrip,
        heliTimesToHome: {
          takeoff: values[2],
          landing: values[3],
        },
        dateTo: DateTime.fromFormat(values[1], "dd.LL.yyyy").toISO(),
      };
      trips.push(currentTrip);
      currentTrip = {};
    }

    // console.log({
    //   from: values[1],
    //   to: values[2],
    //   fromPlace: values[5],
    //   toPlace: values[6],
    // });
  });

  console.log("trips", trips);
  return trips;
};
