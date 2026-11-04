const timetableMeta = {
  title: "M&PE Department, Guru Nanak Dev Engineering College",
  sourceUrl: "https://me.gndec.ac.in/sites/default/files/july%20to%20dec%202026_groups_days_horizontal%20%281%29.html#table_44",
  sourceLabel: "Official M&PE timetable source",
  period: "July to December 2026",
  generated: "9/7/26 2:09 PM",
  note: "Source terminology and abbreviations are preserved. Verify changes against the official source."
};

const timetableSlots = [
  "08:30-09:30",
  "09:30-10:30",
  "10:30-11:30",
  "11:30-12:30",
  "12:30-01:30",
  "01:30-02:30",
  "02:30-03:30",
  "03:30-04:30"
];

const timetableDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const timetable = {
  MEA: {
    label: "D2MEA",
    rows: [
      [["---"], ["D2 ME A1  D2 ME A2", "MP LAB P  MD&CAD P", "RSD       GPS", "W/S       CAD LAB"], ["---"], ["EVS&S L", "CSP", "F111"], ["D2 ME A2", "AT-I T", "DSB", "HE LAB"]],
      [["D2 ME A1  D2 ME A2", "MD&CAD P  SOM T", "MS        RKS", "CAD LAB   IAR LAB"], ["D2 ME A1  D2 ME A2", "MP LAB P  MD&CAD P", "RSD       GPS", "W/S       CAD LAB"], ["EMM L", "DPD", "F111"], ["D2 ME A1", "MD&CAD P", "MS", "CAD LAB"], ["D2 ME A1  D2 ME A2", "SOM T     MD&CAD P", "RKS       HE LAB", "CAD LAB"]],
      [["D2 ME A1  D2 ME A2", "MD&CAD P  EMM LAB P", "MS        DPD", "CAD LAB   EMM LAB"], ["D2 ME A1  D2 ME A2", "AT-I T    MD&CAD P", "DSB       GPS", "HE LAB    CAD LAB"], ["D2 ME A1  D2 ME A2", "SOM LAB P MP LAB P", "RKS       RSD", "SOM LAB   W/S"], ["D2 ME A1  D2 ME A2", "MD&CAD P  SOM LAB P", "MS        RKS", "CAD LAB   SOM LAB"], ["D2 ME A1  D2 ME A2", "EMM LAB P MD&CAD P", "DPD       GPS", "EMM LAB   CAD LAB"]],
      [["D2 ME A1  D2 ME A2", "MD&CAD P  EMM LAB P", "MS        DPD", "CAD LAB   EMM LAB"], ["EVS&S L", "CSP", "F111"], ["D2 ME A1  D2 ME A2", "SOM LAB P MP LAB P", "RKS       RSD", "SOM LAB   W/S"], ["D2 ME A1  D2 ME A2", "MD&CAD P  SOM LAB P", "MS        RKS", "CAD LAB   SOM LAB"], ["D2 ME A1  D2 ME A2", "EMM LAB P MD&CAD P", "DPD       GPS", "EMM LAB   CAD LAB"]],
      [["-x-"], ["-x-"], ["-x-"], ["-x-"], ["-x-"]],
      [["AT-I L", "DSB", "G11"], ["EMM L", "DPD", "F111"], ["AT-I L", "DSB", "G11"], ["AT-I L", "DSB", "G11"], ["MP L", "RSD", "F111"]],
      [["MP L", "RSD", "F111"], ["MP L", "RSD", "F111"], ["MP L", "RSD", "F111"], ["S&TRW P", "DIS, ASP, SWS", "F110"], ["D2 ME A2, D2 ME A1 D2 ME A3", "MPD T             MPD T", "MS, GPS           SSD", "IAR LAB           EMM LAB"]],
      [["EMM L", "DPD", "F111"], ["SOM L", "RKS", "F111"], ["SOM L", "RKS", "F111"], [], ["SOM L", "RKS", "F111"]]
    ]
  },
  MEB: {
    label: "D2MEB",
    rows: [
      [["D2 ME B1  D2 ME B2  D2 ME B3", "MPD T      MPD T      MPD T", "KPS        CKJ        GSL", "MMC LAB    HE LAB    HT LAB"], ["EVS&S L", "SSB", "F110"], ["D2 ME B1  D2 ME B2", "MD&CAD P  MP LAB P", "GSL        CKJ", "CAD LAB    W/S"], ["MP L", "CKJ", "F110"], ["D2 ME B2", "AT-I T", "HMS", "DOM LAB"]],
      [["S&TRW P", "DIS, LSK, JSG", "F110"], ["EMM L", "GMK", "F110"], ["D2 ME B1  D2 ME B2", "MD&CAD P  MP LAB P", "GSL        CKJ", "CAD LAB    W/S"], ["AT-I L", "HMS", "F111"], ["AT-I L", "HMS", "F110"]],
      [["S&TRW P", "DIS, LSK, JSG", "F110"], ["AT-I L", "HMS", "F110"], ["D2 ME B1", "MD&CAD P", "GSL", "CAD LAB"], ["EMM L", "GMK", "F110"], ["MP L", "CKJ", "F110"]],
      [["-x-"], ["-x-"], ["-x-"], ["-x-"], ["-x-"]],
      [["D2 ME B1  D2 ME B2", "MD&CAD P  SOM T", "GSL        JSG", "CAD LAB    HT LAB"], ["SOM L", "JSG", "F110"], ["MP L", "CKJ", "F110"], ["SOM L", "JSG", "F110"], ["EMM L", "GMK", "F110"]],
      [["D2 ME B1  D2 ME B2", "MD&CAD P  EMM LAB P", "GSL        GMK", "CAD LAB    EMM LAB"], ["D2 ME B1  D2 ME B2", "MP LAB P   SOM LAB P", "CKJ        MSB", "W/S        SOM LAB"], ["D2 ME B1  D2 ME B2", "EMM LAB P  MD&CAD P", "GMK        DPD", "EMM LAB    CAD LAB"], ["D2 ME B1  D2 ME B2", "SOM LAB P  MD&CAD P", "MSB        DPD", "SOM LAB    CAD LAB"], ["EVS&S L", "SSB", "F110"]],
      [["D2 ME B1  D2 ME B2", "MD&CAD P  EMM LAB P", "GSL        GMK", "CAD LAB    EMM LAB"], ["D2 ME B1  D2 ME B2", "MP LAB P   SOM LAB P", "CKJ        MSB", "W/S        SOM LAB"], ["D2 ME B1  D2 ME B2", "EMM LAB P  MD&CAD P", "GMK        DPD", "EMM LAB    CAD LAB"], ["D2 ME B1  D2 ME B2", "SOM LAB P  MD&CAD P", "MSB        DPD", "SOM LAB    CAD LAB"], ["SOM L", "JSG", "F110"]],
      [["MP L", "CKJ", "F110"], ["D2 ME B1", "AT-I T", "HMS", "F110"], ["D2 ME B2", "MD&CAD P", "DPD", "CAD LAB"], ["D2 ME B2", "MD&CAD P", "DPD", "CAD LAB"], ["D2 ME B1", "SOM T", "JSG", "G11A"]]
    ]
  }
};
