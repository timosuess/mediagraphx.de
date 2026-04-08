export type Service = {
  name: string;
  description: string;
};

export type LetterGroup = {
  letter: string;
  services: Service[];
};

export const servicesAZ: LetterGroup[] = [
  {
    letter: "A",
    services: [
      {
        name: "Anzeigen",
        description:
          "Entwicklung, Realisierung und Positionierung Ihrer Werbeanzeige im Firmenerscheinungsbild.",
      },
      {
        name: "Aufkleber",
        description:
          "Vom einfachen Schriftzug bis zur Beschriftung Ihres Firmenwagens oder des gesamten Fuhrparks mit Firmenlogo, Anschrift, Slogan oder sonstigen Motiven. Auch in Sonderformen.",
      },
    ],
  },
  {
    letter: "B",
    services: [
      {
        name: "Bandenwerbung",
        description:
          "Erstellung von Werbebanden (Aluminium) mit dem Aufdruck Ihrer Wahl. Ob fuer die Firmenfassade oder den Sportplatz.",
      },
      {
        name: "Bannerwerbung",
        description:
          "Entwicklung von Bannern fuer die Werbung auf gut besuchten Internet- und Portalseiten. Ob animiert oder als Standbild.",
      },
      {
        name: "Beratung Print & Digital",
        description:
          "Schriften, Farben, Bilder, Druck, Papierauswahl, Weiterverarbeitung und Veredelung. Richtige Medienauswahl von der einfachen Internetseite bis zur Multimedia-Praesenz.",
      },
      {
        name: "Bildbearbeitung",
        description:
          "Professionelle Kompositionen, Retusche und kreative Bildmontagen.",
      },
      {
        name: "Briefbogen",
        description:
          "Neuentwicklung oder Ueberarbeitung nach bestehendem CI. Von Kleinstauflage im Digitaldruck bis zur grossen Auflage im Offset- oder Endlosdruck.",
      },
      {
        name: "Briefumschlaege",
        description:
          "Werbewirksame Briefumschlaege oder Versandtaschen. 1000 DinLang Briefumschlaege ergeben fast 25 qm Werbeflaeche.",
      },
      {
        name: "Broschueren",
        description:
          "Staendige Praesenz Ihrer Firma in Druckform. Stellen Sie Ihre Firma oder Produkte vor und erhoehen Sie Ihren Bekanntheitsgrad.",
      },
      {
        name: "Buchgestaltung",
        description:
          "Entwurf und Gestaltung Ihres Buchcovers. Satz und Layout Ihres Manuskriptes. Auch Vorabauflagen in kleinen Mengen moeglich.",
      },
    ],
  },
  {
    letter: "C",
    services: [
      {
        name: "Chroniken",
        description:
          "Erstellung von Chroniken ueber Familie, Firma oder Vereine. Entstehungsgeschichten, historisch Wertvolles und Parallelen zu Ereignissen.",
      },
      {
        name: "Corporate Identity & Design",
        description:
          "Entwicklung oder Aufarbeitung eines einheitlichen Erscheinungsbildes. Logo, Hausschrift, Hausfarben, Briefbogen, Visitenkarten, Flyer, Kfz-Beschriftung und Firmenkleidung.",
      },
      {
        name: "CD/DVD Cover-Gestaltung",
        description:
          "Erstellung von Cover oder Inlay fuer Ihre CD oder DVD.",
      },
    ],
  },
  {
    letter: "D",
    services: [
      {
        name: "Danksagungen",
        description:
          "Danksagungen fuer alle Anlaesse, auch personalisiert mit Namen und persoenlichen Worten.",
      },
      {
        name: "Datenblaetter",
        description:
          "Erstellung von Datenblaettern Ihrer Maschinen, Fahrzeuge oder Produkte als Drucksache und/oder PDF.",
      },
      {
        name: "Dokumentationen",
        description:
          "Von Ablaeufen, Leitfaeden, Maschinen-Bedienungen bis hin zu Produktspezifikationen.",
      },
      {
        name: "Druckvermittlung",
        description:
          "Endlos-/Offsetdruck fuer grosse Auflagen, Digitaldruck ab 1 Exemplar, Siebdruck fuer Werbeartikel und T-Shirts.",
      },
    ],
  },
  {
    letter: "E",
    services: [
      {
        name: "Einladungen",
        description:
          "Individuelle Einladungen in allen Groessen und Formaten. Fuer Messen, Tag der offenen Tuer und mehr.",
      },
      {
        name: "Eintrittskarten",
        description:
          "Professionelle Eintrittskarten, auch durchnummeriert und mit Abriss.",
      },
      {
        name: "Endlosformulare",
        description:
          "Gestaltung und Produktion jeder Art. Mit oder ohne Lochfuehrung, Mehrfach- oder Durchschreibesaetze.",
      },
      {
        name: "Etiketten",
        description:
          "Flaschen-, Dosen- oder Karton-Etiketten fuer jeden Anlass. Z.B. Flaschen mit eigenem Firmenetikett als Geschenk.",
      },
    ],
  },
  {
    letter: "F",
    services: [
      {
        name: "Fahnen",
        description:
          "Erstellung in allen Groessen fuer die Aussenwirkung Ihrer Firma.",
      },
      {
        name: "Fahrzeugbeschriftung",
        description:
          "Entwicklung und Umsetzung attraktiver Fahrzeugbeschriftungen. Vom Schriftzug bis zur Komplett-Beschriftung des gesamten Fuhrparks.",
      },
      {
        name: "Flyer",
        description:
          "Informations-, Werbe- oder Produktflyer. Beratung zu Formaten, Farben und Bilderwahl.",
      },
      {
        name: "Fotografie",
        description:
          "Portraits, Belegschaft, Produkte, Firmengebaeude, Fahrzeuge. Auch privat: Hochzeit, Geburtstage, Familie. Als Foto oder Poster.",
      },
    ],
  },
  {
    letter: "G",
    services: [
      {
        name: "Geburtsanzeigen",
        description:
          "Geburtsanzeige, Willkommenskarte, Einladung zur Babyparty oder Taufe, Danksagungen.",
      },
      {
        name: "Geschaeftsberichte",
        description:
          "Optisch und grafisch hochwertiger Geschaeftsbericht im Corporate Design. Kommunikation von Erfolgsstrategien und Perspektiven.",
      },
      {
        name: "Geschaeftsausstattungen",
        description:
          "Komplett-Ausstattung im einheitlichen Erscheinungsbild: Briefbogen, Visitenkarten, Stempel und mehr.",
      },
      {
        name: "Give-Aways",
        description:
          "Beratung bei Auswahl und Art der Werbegeschenke. Blocks, Parkscheiben, Feuerzeuge, Kugelschreiber, Kalender - mit Logo bedruckt.",
      },
    ],
  },
  {
    letter: "H",
    services: [
      {
        name: "Hochzeitsausstattungen",
        description:
          "Entwicklung eines Hochzeits-CIs: Einladungen, Gottesdienstablauf, Tisch- und Platzkaertchen, Speise- und Weinkarten, Danksagungen.",
      },
    ],
  },
  {
    letter: "I",
    services: [
      {
        name: "Imagebroschueren",
        description:
          "Steigerung des Bekanntheitsgrades mit eleganter Broschuere im Corporate Design. Hochwertige Veredelung.",
      },
      {
        name: "Internet-Loesungen",
        description:
          "Vom informativen Standard-Auftritt bis zur exklusiven Internetpraesenz. Webseiten, Shopsysteme, Content Management Systeme (CMS).",
      },
    ],
  },
  {
    letter: "J",
    services: [
      {
        name: "Jubilaeums-Drucksachen",
        description:
          "Fuer Kunden, Kollegen und Mitarbeiter: Anzeigen, Broschueren, Chroniken, Poster, Urkunden. Auch fuer Vereine und Doerfer.",
      },
    ],
  },
  {
    letter: "K",
    services: [
      {
        name: "Kalender",
        description:
          "Wand-, 3-Monats-, Tisch- und Taschenkalender mit Logo, Motto oder Slogan. Individuelle Wandkalender fuer Firma, Dorf oder Region.",
      },
      {
        name: "Karten aller Art",
        description:
          "Danksagungen, Einladungs-, Eintritts-, Glueckwunsch-, Hochzeits-, Trauer- und Weihnachtskarten. Individuell nach Ihren Vorstellungen.",
      },
    ],
  },
  {
    letter: "L",
    services: [
      {
        name: "Logoentwicklung",
        description:
          "Logo als Grundlage fuer Ihr Corporate Design. Traeger der Identitaet, kennzeichnet Persoenlichkeit, transportiert Botschaften und weckt Assoziationen. Grosser Erinnerungswert.",
      },
    ],
  },
  {
    letter: "M",
    services: [
      {
        name: "Magnetfolien",
        description:
          "Magnetfolien in unterschiedlichen Staerken und Groessen. Flexibler als Aufkleber, schnell an Fahrzeugen angebracht und entfernt.",
      },
      {
        name: "Mailing",
        description:
          "Personalisiertes Mailing mit Kundenadressen. Werbung, Informationen, neue Produkte, Neuigkeiten oder Aktionen.",
      },
      {
        name: "Mitarbeiterzeitung",
        description:
          "Mitarbeiter ueber Firma und Taetigkeiten informieren. Investitionen, Firmenzahlen, Neuigkeiten und Veraenderungen.",
      },
    ],
  },
  {
    letter: "N",
    services: [
      {
        name: "Namensschilder",
        description:
          "Zum Aufstellen, Anstecken oder mit magnetischen Haltern. Fuer Messen, Fuehrungsebene oder alle Mitarbeiter.",
      },
    ],
  },
  {
    letter: "O",
    services: [
      {
        name: "Overheadpraesentationen",
        description:
          "Erstellung von Praesentationsfolien im Firmen-Erscheinungsbild.",
      },
    ],
  },
  {
    letter: "P",
    services: [
      {
        name: "Plakate & Poster",
        description:
          "Plakatwerbung mit guten, lichtechten Farben und richtigem Papier fuer maximale Wirkung.",
      },
      {
        name: "Postkarten",
        description:
          "Mit eigenen Fotos oder Motivwuenschen - individuell gestaltet.",
      },
      {
        name: "Praesentationsmappen",
        description:
          "Fuer Kunden, mit Veredelung wie gestanztem Logo, Praegung oder Spotlackierung.",
      },
      {
        name: "Preislisten",
        description:
          "Grafische Aufarbeitung von Preislisten fuer Produkte, Dienstleistungen, Miet- oder Verkaufspreise.",
      },
    ],
  },
  {
    letter: "Q",
    services: [
      {
        name: "Qualitaet",
        description:
          "Qualitaet als oberstes Gebot. MediaGraphX steht fuer qualitativ hochwertige Ergebnisse in jedem Projekt.",
      },
    ],
  },
  {
    letter: "R",
    services: [
      {
        name: "Retusche",
        description:
          "Professionelle Bildretusche und kreative Bildbearbeitung fuer perfekte Ergebnisse.",
      },
      {
        name: "Reinzeichnung",
        description:
          "Aufbereitung angelegter Daten fuer den druckspezifischen Einsatz. Farbkonvertierung, Schrifteinbettung und Qualitaetspruefung.",
      },
    ],
  },
  {
    letter: "S",
    services: [
      {
        name: "Schilder aller Art",
        description:
          "Aus Acrylglas, Aluminium, Edelstahl oder Holz. Beschriftung per Aufkleberfolie, gelasert, gefraest oder graviert. Auch beleuchtet.",
      },
      {
        name: "Schreibtischunterlagen",
        description:
          "Ansprechende Gestaltung als dauerhafter Werbeplatz auf jedem Schreibtisch.",
      },
      {
        name: "Speisekarten",
        description:
          "Erstellung oder Ueberarbeitung fuer Restaurant, Hotel oder Kueche.",
      },
      {
        name: "Stempel",
        description:
          "Firmenstempel, Familienstempel, Privatstempel, Vereinsstempel oder Wappenstempel.",
      },
    ],
  },
  {
    letter: "T",
    services: [
      {
        name: "Technische Dokumentationen",
        description:
          "Grafische Aufarbeitung von Anleitungen, Dokumentationen und Datenblaettern. Druck und/oder PDF zum Download.",
      },
    ],
  },
  {
    letter: "U",
    services: [
      {
        name: "Urkunden",
        description:
          "Fuer jeden Anlass: Wettbewerbe, Teilnahmebescheinigungen, Hochzeit, Geburtstag oder Jubilaeum.",
      },
      {
        name: "Unternehmensleitfaeden",
        description:
          "Entwicklung von Leitsaetzen und Leitspruechen. Als Flyer, Mailings oder Poster fuer Empfangshalle und Bueros.",
      },
    ],
  },
  {
    letter: "V",
    services: [
      {
        name: "Verpackungsdesign",
        description:
          "Gestaltung und Realisierung von Produktverpackungen. Hochwertige Verpackung und edle Weiterverarbeitung.",
      },
      {
        name: "Visitenkarten",
        description:
          "Gestaltung gemaess Erscheinungsbild mit Logo, Firmenfarben und -schrift. Beratung zu Papier, Weiterverarbeitung und Veredelung.",
      },
    ],
  },
  {
    letter: "W",
    services: [
      {
        name: "Werbemassnahmen",
        description:
          "Beratung, Entwicklung und Realisierung. Medienauswahl, hochqualitative Umsetzung und Budgetueberwachung.",
      },
      {
        name: "Webseiten",
        description:
          "Vom informativen Standard-Auftritt bis zur exklusiven, animierten Internetpraesenz mit CMS.",
      },
      {
        name: "Werbegeschenke",
        description:
          "Beratung und Beschaffung individueller Werbeartikel - mit Logo, Motto oder Slogan bedruckt.",
      },
    ],
  },
  {
    letter: "X",
    services: [
      {
        name: "eXtravagantes",
        description:
          "Ungewoehnliche Werbemassnahmen oder -geschenke bleiben besser im Gedaechtnis. Werbung muss positiv auffallen um effektiv zu sein.",
      },
    ],
  },
  {
    letter: "Y",
    services: [
      {
        name: "Your Choice",
        description:
          "Sie haben einen Wunsch, der hier nicht aufgefuehrt ist? Sprechen Sie uns an - wir finden eine Loesung.",
      },
    ],
  },
  {
    letter: "Z",
    services: [
      {
        name: "Zeitungen & Zeitschriften",
        description:
          "Gestaltung und Druck von Vereins-, Dorf- oder Mitarbeiterzeitschriften. Von der Idee bis zum fertigen Druck.",
      },
    ],
  },
];
