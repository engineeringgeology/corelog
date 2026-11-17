/* CoreLog Field: geotechnical terms in Italian, Spanish, Portuguese and French.
   Row format  category:english|it|es|pt|fr
   Agreement markers (follow the noun being described):
     ~  it o/a/i/e   es/pt o/a/os/as   fr -/e/s/es
     ^  it e/e/i/i   (others: -/-/s/s)
     §  -/-/s/s (it: no change)
     {a/b/c/d}  explicit forms: masc. sg / fem. sg / masc. pl / fem. pl
   Nouns: noun:english|it|es|pt|fr with "WORD@g" where g = m, f, mp or fp. */
'use strict';
window.CL = window.CL || {};
CL.I18N_TERMS = `
noun:CLAY|ARGILLA@f|ARCILLA@f|ARGILA@f|ARGILE@f
noun:SILT|LIMO@m|LIMO@m|SILTE@m|LIMON@m
noun:SAND|SABBIA@f|ARENA@f|AREIA@f|SABLE@m
noun:GRAVEL|GHIAIA@f|GRAVA@f|PEDREGULHO@m|GRAVIER@m
noun:COBBLES|CIOTTOLI@mp|BOLOS@mp|CALHAUS@mp|CAILLOUX@mp
noun:BOULDERS|BLOCCHI@mp|BLOQUES@mp|BLOCOS@mp|BLOCS@mp
noun:PEAT|TORBA@f|TURBA@f|TURFA@f|TOURBE@f
noun:TOPSOIL|TERRENO VEGETALE@m|TIERRA VEGETAL@f|TERRA VEGETAL@f|TERRE VÉGÉTALE@f
noun:MADE GROUND|TERRENO DI RIPORTO@m|RELLENO ANTRÓPICO@m|ATERRO@m|REMBLAI@m
noun:SOIL|TERRENO@m|SUELO@m|SOLO@m|SOL@m
noun:ROCK|ROCCIA@f|ROCA@f|ROCHA@f|ROCHE@f
noun:SANDSTONE|ARENARIA@f|ARENISCA@f|ARENITO@m|GRÈS@m
noun:SILTSTONE|SILTITE@f|LIMOLITA@f|SILTITO@m|SILTITE@f
noun:MUDSTONE|PELITE@f|LODOLITA@f|LAMITO@m|PÉLITE@f
noun:CLAYSTONE|ARGILLITE@f|ARCILLITA@f|ARGILITO@m|ARGILITE@f
noun:SHALE|ARGILLITE FISSILE@f|LUTITA@f|FOLHELHO@m|SCHISTE ARGILEUX@m
noun:LIMESTONE|CALCARE@m|CALIZA@f|CALCÁRIO@m|CALCAIRE@m
noun:DOLOMITE|DOLOMIA@f|DOLOMÍA@f|DOLOMITO@m|DOLOMIE@f
noun:MARL|MARNA@f|MARGA@f|MARGA@f|MARNE@f
noun:CHALK|CRETA@f|CRETA@f|GIZ@m|CRAIE@f
noun:CONGLOMERATE|CONGLOMERATO@m|CONGLOMERADO@m|CONGLOMERADO@m|CONGLOMÉRAT@m
noun:BRECCIA|BRECCIA@f|BRECHA@f|BRECHA@f|BRÈCHE@f
noun:COAL|CARBONE@m|CARBÓN@m|CARVÃO@m|CHARBON@m
noun:GYPSUM|GESSO@m|YESO@m|GIPSITA@f|GYPSE@m
noun:GRANITE|GRANITO@m|GRANITO@m|GRANITO@m|GRANITE@m
noun:GRANODIORITE|GRANODIORITE@f|GRANODIORITA@f|GRANODIORITO@m|GRANODIORITE@f
noun:DIORITE|DIORITE@f|DIORITA@f|DIORITO@m|DIORITE@f
noun:GABBRO|GABBRO@m|GABRO@m|GABRO@m|GABBRO@m
noun:BASALT|BASALTO@m|BASALTO@m|BASALTO@m|BASALTE@m
noun:ANDESITE|ANDESITE@f|ANDESITA@f|ANDESITO@m|ANDÉSITE@f
noun:RHYOLITE|RIOLITE@f|RIOLITA@f|RIOLITO@m|RHYOLITE@f
noun:TUFF|TUFO@m|TOBA@f|TUFO@m|TUF@m
noun:DOLERITE|DOLERITE@f|DOLERITA@f|DOLERITO@m|DOLÉRITE@f
noun:SCHIST|SCISTO@m|ESQUISTO@m|XISTO@m|SCHISTE@m
noun:PHYLLITE|FILLADE@f|FILITA@f|FILITO@m|PHYLLADE@m
noun:SLATE|ARDESIA@f|PIZARRA@f|ARDÓSIA@f|ARDOISE@f
noun:GNEISS|GNEISS@m|GNEIS@m|GNAISSE@m|GNEISS@m
noun:QUARTZITE|QUARZITE@f|CUARCITA@f|QUARTZITO@m|QUARTZITE@m
noun:MARBLE|MARMO@m|MÁRMOL@m|MÁRMORE@m|MARBRE@m
noun:SERPENTINITE|SERPENTINITE@f|SERPENTINITA@f|SERPENTINITO@m|SERPENTINITE@f
noun:FLYSCH|FLYSCH@m|FLYSCH@m|FLYSCH@m|FLYSCH@m
uscs:GW|GHIAIA ben gradata@f|GRAVA bien graduada@f|PEDREGULHO bem graduado@m|GRAVIER bien gradué@m
uscs:GP|GHIAIA mal gradata@f|GRAVA mal graduada@f|PEDREGULHO mal graduado@m|GRAVIER mal gradué@m
uscs:GM|GHIAIA limosa@f|GRAVA limosa@f|PEDREGULHO siltoso@m|GRAVIER limoneux@m
uscs:GC|GHIAIA argillosa@f|GRAVA arcillosa@f|PEDREGULHO argiloso@m|GRAVIER argileux@m
uscs:GW-GM|GHIAIA ben gradata con limo@f|GRAVA bien graduada con limo@f|PEDREGULHO bem graduado com silte@m|GRAVIER bien gradué avec limon@m
uscs:GP-GC|GHIAIA mal gradata con argilla@f|GRAVA mal graduada con arcilla@f|PEDREGULHO mal graduado com argila@m|GRAVIER mal gradué avec argile@m
uscs:SW|SABBIA ben gradata@f|ARENA bien graduada@f|AREIA bem graduada@f|SABLE bien gradué@m
uscs:SP|SABBIA mal gradata@f|ARENA mal graduada@f|AREIA mal graduada@f|SABLE mal gradué@m
uscs:SM|SABBIA limosa@f|ARENA limosa@f|AREIA siltosa@f|SABLE limoneux@m
uscs:SC|SABBIA argillosa@f|ARENA arcillosa@f|AREIA argilosa@f|SABLE argileux@m
uscs:SW-SM|SABBIA ben gradata con limo@f|ARENA bien graduada con limo@f|AREIA bem graduada com silte@f|SABLE bien gradué avec limon@m
uscs:SP-SM|SABBIA mal gradata con limo@f|ARENA mal graduada con limo@f|AREIA mal graduada com silte@f|SABLE mal gradué avec limon@m
uscs:SP-SC|SABBIA mal gradata con argilla@f|ARENA mal graduada con arcilla@f|AREIA mal graduada com argila@f|SABLE mal gradué avec argile@m
uscs:ML|LIMO@m|LIMO@m|SILTE@m|LIMON@m
uscs:CL|ARGILLA di bassa plasticità@f|ARCILLA de baja plasticidad@f|ARGILA de baixa plasticidade@f|ARGILE peu plastique@f
uscs:CL-ML|ARGILLA limosa@f|ARCILLA limosa@f|ARGILA siltosa@f|ARGILE limoneuse@f
uscs:OL|LIMO / ARGILLA organica@m|LIMO / ARCILLA orgánica@m|SILTE / ARGILA orgânica@m|LIMON / ARGILE organique@m
uscs:MH|LIMO elastico@m|LIMO elástico@m|SILTE elástico@m|LIMON très plastique@m
uscs:CH|ARGILLA di alta plasticità@f|ARCILLA de alta plasticidad@f|ARGILA de alta plasticidade@f|ARGILE très plastique@f
uscs:OH|ARGILLA / LIMO organico ad alta plasticità@f|ARCILLA / LIMO orgánico de alta plasticidad@f|ARGILA / SILTE orgânico de alta plasticidade@f|ARGILE / LIMON organique très plastique@f
uscs:PT|TORBA@f|TURBA@f|TURFA@f|TOURBE@f
consistency:very soft|molto moll^|muy bland~|muito mole§|{très mou/très molle/très mous/très molles}
consistency:soft|moll^|bland~|mole§|{mou/molle/mous/molles}
consistency:firm|moderatamente consistent^|firme§|médi~|ferme§
consistency:stiff|consistent^|rígid~|rij~|raide§
consistency:very stiff|molto consistent^|muy rígid~|muito rij~|très raide§
consistency:hard|dur~|dur~|dur~|dur~
density:very loose|molto sciolt~|muy suelt~|muito fof~|très lâche§
density:loose|sciolt~|suelt~|fof~|lâche§
density:medium dense|mediamente addensat~|medianamente dens~|medianamente compact~|moyennement dense§
density:dense|addensat~|dens~|compact~|dense§
density:very dense|molto addensat~|muy dens~|muito compact~|très dense§
moisture:dry|{secco/secca/secchi/secche}|sec~|sec~|{sec/sèche/secs/sèches}
moisture:moist|umid~|húmed~|úmid~|humide§
moisture:wet|bagnat~|muy húmed~|molhad~|mouillé~
moisture:saturated|satur~|saturad~|saturad~|saturé~
plasticity:non-plastic|non {plastico/plastica/plastici/plastiche}|no plástic~|não plástic~|non plastique§
plasticity:low plasticity|di bassa plasticità|de baja plasticidad|de baixa plasticidade|peu plastique§
plasticity:medium plasticity|di media plasticità|de plasticidad media|de média plasticidade|moyennement plastique§
plasticity:high plasticity|di alta plasticità|de alta plasticidad|de alta plasticidade|très plastique§
plasticity:very high plasticity|di plasticità molto alta|de muy alta plasticidad|de plasticidade muito alta|extrêmement plastique§
secondary:slightly sandy|debolmente sabbios~|ligeramente arenos~|pouco arenos~|légèrement {sableux/sableuse/sableux/sableuses}
secondary:sandy|sabbios~|arenos~|arenos~|{sableux/sableuse/sableux/sableuses}
secondary:very sandy|molto sabbios~|muy arenos~|muito arenos~|très {sableux/sableuse/sableux/sableuses}
secondary:slightly gravelly|debolmente ghiaios~|ligeramente gravos~|pouco pedregulhos~|légèrement {graveleux/graveleuse/graveleux/graveleuses}
secondary:gravelly|ghiaios~|gravos~|pedregulhos~|{graveleux/graveleuse/graveleux/graveleuses}
secondary:very gravelly|molto ghiaios~|muy gravos~|muito pedregulhos~|très {graveleux/graveleuse/graveleux/graveleuses}
secondary:slightly silty|debolmente limos~|ligeramente limos~|pouco siltos~|légèrement {limoneux/limoneuse/limoneux/limoneuses}
secondary:silty|limos~|limos~|siltos~|{limoneux/limoneuse/limoneux/limoneuses}
secondary:very silty|molto limos~|muy limos~|muito siltos~|très {limoneux/limoneuse/limoneux/limoneuses}
secondary:slightly clayey|debolmente argillos~|ligeramente arcillos~|pouco argilos~|légèrement {argileux/argileuse/argileux/argileuses}
secondary:clayey|argillos~|arcillos~|argilos~|{argileux/argileuse/argileux/argileuses}
secondary:very clayey|molto argillos~|muy arcillos~|muito argilos~|très {argileux/argileuse/argileux/argileuses}
secondary:slightly sandy gravelly|debolmente sabbios~ e ghiaios~|ligeramente arenos~ y gravos~|pouco arenos~ e pedregulhos~|légèrement {sableux et graveleux/sableuse et graveleuse/sableux et graveleux/sableuses et graveleuses}
secondary:sandy gravelly|sabbios~ e ghiaios~|arenos~ y gravos~|arenos~ e pedregulhos~|{sableux et graveleux/sableuse et graveleuse/sableux et graveleux/sableuses et graveleuses}
secondary:slightly organic|debolmente {organico/organica/organici/organiche}|ligeramente orgánic~|pouco orgânic~|légèrement organique§
secondary:organic|{organico/organica/organici/organiche}|orgánic~|orgânic~|organique§
secondary:with cobbles|con ciottoli|con bolos|com calhaus|avec cailloux
secondary:with boulders|con blocchi|con bloques|com blocos|avec blocs
secondary:with sand|con sabbia|con arena|com areia|avec sable
secondary:with gravel|con ghiaia|con grava|com pedregulho|avec gravier
secondary:with silt|con limo|con limo|com silte|avec limon
secondary:with clay|con argilla|con arcilla|com argila|avec argile
secondary:with organics|con sostanza organica|con materia orgánica|com matéria orgânica|avec matière organique
secondary:trace sand|con tracce di sabbia|con trazas de arena|com traços de areia|avec traces de sable
secondary:trace gravel|con tracce di ghiaia|con trazas de grava|com traços de pedregulho|avec traces de gravier
shape:angular|spigolos~|angulos~|angulos~|{anguleux/anguleuse/anguleux/anguleuses}
shape:subangular|subspigolos~|subangulos~|subangulos~|{subanguleux/subanguleuse/subanguleux/subanguleuses}
shape:subrounded|subarrotondat~|subredondead~|subarredondad~|subarrondi~
shape:rounded|arrotondat~|redondead~|arredondad~|arrondi~
shape:flat|appiattit~|aplanad~|achatad~|aplati~
shape:elongate|allungat~|alargad~|alongad~|allongé~
grading:well graded|ben gradat~|bien graduad~|bem graduad~|bien gradué~
grading:poorly graded|mal gradat~|mal graduad~|mal graduad~|mal gradué~
grading:uniformly graded|uniform^|uniforme§|uniforme§|uniforme§
grading:gap graded|a granulometria discontinua|de granulometría discontinua|de granulometria descontínua|à granulométrie discontinue
sandSize:fine|fine|fina|fina|fin
sandSize:fine to medium|da fine a media|de fina a media|fina a média|fin à moyen
sandSize:medium|media|media|média|moyen
sandSize:medium to coarse|da media a grossa|de media a gruesa|média a grossa|moyen à grossier
sandSize:coarse|grossa|gruesa|grossa|grossier
sandSize:fine to coarse|da fine a grossa|de fina a gruesa|fina a grossa|fin à grossier
soilStructure:homogeneous|{omogeneo/omogenea/omogenei/omogenee}|homogéne~|homogêne~|homogène§
soilStructure:fissured|fessurat~|fisurad~|fissurad~|fissuré~
soilStructure:closely fissured|fittamente fessurat~|muy fisurad~|muito fissurad~|très fissuré~
soilStructure:laminated|laminat~|laminad~|laminad~|lité~
soilStructure:thinly bedded|in strati sottili|en estratos delgados|em camadas finas|en lits minces
soilStructure:interbedded|interstratificat~|interestratificad~|intercalad~|interstratifié~
soilStructure:with sand partings|con sottili livelli sabbiosi|con intercalaciones de arena|com intercalações de areia|avec passées sableuses
soilStructure:with silt laminae|con lamine limose|con láminas de limo|com lâminas de silte|avec lamines limoneuses
soilStructure:with rootlets|con radici|con raicillas|com raízes|avec radicelles
soilStructure:with shell fragments|con frammenti di conchiglie|con fragmentos de conchas|com fragmentos de conchas|avec débris coquilliers
soilStructure:mottled|screziat~|motead~|mosquead~|bariolé~
soilStructure:with organic inclusions|con inclusioni organiche|con inclusiones orgánicas|com inclusões orgânicas|avec inclusions organiques
colourMain:grey|grigio|gris|cinza|{gris/grise}
colourMain:brown|marrone|marrón|marrom|{brun/brune}
colourMain:red|rosso|rojo|vermelha|{rouge/rouge}
colourMain:orange|arancione|naranja|laranja|{orange/orange}
colourMain:yellow|giallo|amarillo|amarela|{jaune/jaune}
colourMain:olive|oliva|oliva|oliva|{olive/olive}
colourMain:green|verde|verde|verde|{vert/verte}
colourMain:blue|blu|azul|azul|{bleu/bleue}
colourMain:pink|rosa|rosa|rosa|{rose/rose}
colourMain:white|bianco|blanco|branca|{blanc/blanche}
colourMain:black|nero|negro|preta|{noir/noire}
colourMain:cream|crema|crema|creme|{crème/crème}
colourMain:buff|beige|beige|bege|{beige/beige}
colourMod:light|chiaro|claro|clara|clair
colourMod:dark|scuro|oscuro|escura|foncé
colourMod:pale|pallido|pálido|pálida|pâle
colourMod:mottled|screziato|moteado|mosqueada|bariolé
colourMod:pinkish|rosato|rosáceo|rosada|rosâtre
colourMod:reddish|rossastro|rojizo|avermelhada|rougeâtre
colourMod:yellowish|giallastro|amarillento|amarelada|jaunâtre
colourMod:orangish|aranciato|anaranjado|alaranjada|orangé
colourMod:brownish|brunastro|parduzco|amarronzada|brunâtre
colourMod:olive|oliva|oliva|oliva|olive
colourMod:greenish|verdastro|verdoso|esverdeada|verdâtre
colourMod:bluish|bluastro|azulado|azulada|bleuâtre
colourMod:greyish|grigiastro|grisáceo|acinzentada|grisâtre
strength:extremely weak|estremamente debol^|extremadamente bland~|extremamente frac~|extrêmement faible§
strength:very weak|molto debol^|muy bland~|muito frac~|très faible§
strength:weak|debol^|bland~|frac~|faible§
strength:medium strong|mediamente resistent^|moderadamente dur~|medianamente resistente§|moyennement résistant~
strength:strong|resistent^|dur~|resistente§|résistant~
strength:very strong|molto resistent^|muy dur~|muito resistente§|très résistant~
strength:extremely strong|estremamente resistent^|extremadamente dur~|extremamente resistente§|extrêmement résistant~
strength:extremely weak (R0)|estremamente debol^ (R0)|extremadamente bland~ (R0)|extremamente frac~ (R0)|extrêmement faible§ (R0)
strength:very weak (R1)|molto debol^ (R1)|muy bland~ (R1)|muito frac~ (R1)|très faible§ (R1)
strength:weak (R2)|debol^ (R2)|bland~ (R2)|frac~ (R2)|faible§ (R2)
strength:medium strong (R3)|mediamente resistent^ (R3)|moderadamente dur~ (R3)|medianamente resistente§ (R3)|moyennement résistant~ (R3)
strength:strong (R4)|resistent^ (R4)|dur~ (R4)|resistente§ (R4)|résistant~ (R4)
strength:very strong (R5)|molto resistent^ (R5)|muy dur~ (R5)|muito resistente§ (R5)|très résistant~ (R5)
strength:extremely strong (R6)|estremamente resistent^ (R6)|extremadamente dur~ (R6)|extremamente resistente§ (R6)|extrêmement résistant~ (R6)
weathering:fresh|{fresco/fresca/freschi/fresche}|san~|{são/sã/sãos/sãs}|sain~
weathering:slightly weathered|debolmente alterat~|ligeramente meteorizad~|pouco alterad~|légèrement altéré~
weathering:moderately weathered|moderatamente alterat~|moderadamente meteorizad~|medianamente alterad~|modérément altéré~
weathering:highly weathered|molto alterat~|muy meteorizad~|muito alterad~|très altéré~
weathering:completely weathered|completamente alterat~|completamente meteorizad~|completamente alterad~|complètement altéré~
weathering:residual soil|suolo residuale|suelo residual|solo residual|sol résiduel
grain:very fine-grained|a grana molto fine|de grano muy fino|de grão muito fino|à grain très fin
grain:fine-grained|a grana fine|de grano fino|de grão fino|à grain fin
grain:medium-grained|a grana media|de grano medio|de grão médio|à grain moyen
grain:coarse-grained|a grana grossa|de grano grueso|de grão grosso|à grain grossier
grain:very coarse-grained|a grana molto grossa|de grano muy grueso|de grão muito grosso|à grain très grossier
rockStructure:massive|massicci~|masiv~|maciç~|{massif/massive/massifs/massives}
rockStructure:thickly bedded|in strati spessi|en estratos gruesos|em camadas espessas|en bancs épais
rockStructure:medium bedded|in strati medi|en estratos medios|em camadas médias|en bancs moyens
rockStructure:thinly bedded|in strati sottili|en estratos delgados|em camadas finas|en bancs minces
rockStructure:very thinly bedded|in strati molto sottili|en estratos muy delgados|em camadas muito finas|en bancs très minces
rockStructure:laminated|laminat~|laminad~|laminad~|lité~
rockStructure:cross-bedded|a stratificazione incrociata|con estratificación cruzada|com estratificação cruzada|à stratification oblique
rockStructure:foliated|foliat~|foliad~|foliad~|folié~
rockStructure:schistose|scistos~|esquistos~|xistos~|{schisteux/schisteuse/schisteux/schisteuses}
rockStructure:banded|a bande|bandead~|bandad~|rubané~
rockStructure:vesicular|vescicolar^|{vesicular/vesicular/vesiculares/vesiculares}|{vesicular/vesicular/vesiculares/vesiculares}|vacuolaire§
rockStructure:brecciated|brecciat~|brechificad~|brechad~|bréchifié~
rockStructure:karstified|carsificat~|karstificad~|carstificad~|karstifié~
rockStructure:porous|poros~|poros~|poros~|{poreux/poreuse/poreux/poreuses}
rockStructure:veined|venat~|con vetas|com veios|veiné~
fracture:unfractured|non fratturat~|no fracturad~|não fraturad~|non fracturé~
fracture:slightly fractured|poco fratturat~|ligeramente fracturad~|pouco fraturad~|peu fracturé~
fracture:moderately fractured|moderatamente fratturat~|moderadamente fracturad~|medianamente fraturad~|moyennement fracturé~
fracture:highly fractured|molto fratturat~|muy fracturad~|muito fraturad~|très fracturé~
fracture:intensely fractured|intensamente fratturat~|intensamente fracturad~|intensamente fraturad~|intensément fracturé~
fracture:non-intact (fragmented)|frammentat~|fragmentad~|fragmentad~|fragmenté~
discType:joint|giunto|diaclasa|diáclase|diaclase
discType:bedding|giunto di strato|plano de estratificación|plano de estratificação|joint de stratification
discType:foliation|foliazione|foliación|foliação|foliation
discType:cleavage|clivaggio|esquistosidad|clivagem|clivage
discType:fault|faglia|falla|falha|faille
discType:shear|superficie di taglio|plano de cizalla|plano de cisalhamento|plan de cisaillement
discType:vein|vena|veta|veio|veine
discType:fracture (drilling-induced)|frattura (da perforazione)|fractura (de perforación)|fratura (de perfuração)|fracture (de forage)
discType:crushed zone|zona cataclastica|zona triturada|zona esmagada|zone broyée
spacing:extremely wide|estremamente ampia|extremadamente separadas|extremamente afastadas|extrêmement espacées
spacing:very wide|molto ampia|muy separadas|muito afastadas|très espacées
spacing:wide|ampia|separadas|afastadas|espacées
spacing:medium|moderata|moderadamente juntas|medianamente afastadas|modérément espacées
spacing:close|ravvicinata|juntas|próximas|rapprochées
spacing:very close|molto ravvicinata|muy juntas|muito próximas|très rapprochées
spacing:extremely close|estremamente ravvicinata|extremadamente juntas|extremamente próximas|extrêmement rapprochées
roughness:rough stepped|scabra a gradini|rugosa escalonada|rugosa escalonada|rugueuse en escalier
roughness:smooth stepped|liscia a gradini|lisa escalonada|lisa escalonada|lisse en escalier
roughness:slickensided stepped|levigata (specchio di faglia) a gradini|pulida (estriada) escalonada|polida (estriada) escalonada|striée (miroir) en escalier
roughness:rough undulating|scabra ondulata|rugosa ondulada|rugosa ondulada|rugueuse ondulée
roughness:smooth undulating|liscia ondulata|lisa ondulada|lisa ondulada|lisse ondulée
roughness:slickensided undulating|levigata (specchio di faglia) ondulata|pulida (estriada) ondulada|polida (estriada) ondulada|striée (miroir) ondulée
roughness:rough planar|scabra planare|rugosa plana|rugosa plana|rugueuse plane
roughness:smooth planar|liscia planare|lisa plana|lisa plana|lisse plane
roughness:slickensided planar|levigata (specchio di faglia) planare|pulida (estriada) plana|polida (estriada) plana|striée (miroir) plane
aperture:tight (closed)|chiusa|cerrada|fechada|fermée
aperture:very narrow < 0.1 mm|molto stretta < 0.1 mm|muy estrecha < 0.1 mm|muito estreita < 0.1 mm|très étroite < 0.1 mm
aperture:narrow 0.1–0.5 mm|stretta 0.1–0.5 mm|estrecha 0.1–0.5 mm|estreita 0.1–0.5 mm|étroite 0.1–0.5 mm
aperture:partly open 0.5–2.5 mm|parzialmente aperta 0.5–2.5 mm|parcialmente abierta 0.5–2.5 mm|parcialmente aberta 0.5–2.5 mm|partiellement ouverte 0.5–2.5 mm
aperture:open 2.5–10 mm|aperta 2.5–10 mm|abierta 2.5–10 mm|aberta 2.5–10 mm|ouverte 2.5–10 mm
aperture:wide > 10 mm|molto aperta > 10 mm|muy abierta > 10 mm|muito aberta > 10 mm|très ouverte > 10 mm
infill:clean|pulita|limpia|limpa|propre
infill:iron-stained|patine di ossidi di ferro|pátinas de óxido de hierro|manchas de óxido de ferro|patine d'oxydes de fer
infill:Mn-stained|patine di ossidi di Mn|pátinas de óxido de Mn|manchas de óxido de Mn|patine d'oxydes de Mn
infill:clay|argilla|arcilla|argila|argile
infill:silt|limo|limo|silte|limon
infill:sand|sabbia|arena|areia|sable
infill:calcite|calcite|calcita|calcita|calcite
infill:quartz|quarzo|cuarzo|quartzo|quartz
infill:gypsum|gesso|yeso|gipsita|gypse
infill:chlorite|clorite|clorita|clorita|chlorite
infill:gouge|riempimento argilloso di faglia (gouge)|salbanda arcillosa (gouge)|preenchimento argiloso de falha (gouge)|remplissage argileux de faille (gouge)
infill:breccia|breccia|brecha|brecha|brèche
sampleType:Disturbed (bag/jar)|Rimaneggiato (sacchetto/barattolo)|Alterada (bolsa/frasco)|Deformada (saco/frasco)|Remanié (sac/bocal)
sampleType:Bulk|Campione in sacco (bulk)|Muestra en saco (bulk)|Amostra em saco (bulk)|Échantillon en vrac
sampleType:Undisturbed (U100/UT)|Indisturbato (U100/UT)|Inalterada (U100/UT)|Indeformada (U100/UT)|Intact (U100/UT)
sampleType:Shelby tube|Fustella Shelby|Tubo Shelby|Tubo Shelby|Tube Shelby
sampleType:Split spoon (SPT)|Campionatore SPT|Cuchara partida (SPT)|Amostrador SPT|Carottier fendu (SPT)
sampleType:Core sample|Campione da carota|Testigo de sondeo|Amostra de testemunho|Échantillon de carotte
sampleType:Water sample|Campione d'acqua|Muestra de agua|Amostra de água|Échantillon d'eau
sampleType:Environmental sample|Campione ambientale|Muestra ambiental|Amostra ambiental|Échantillon environnemental
testType:Pocket penetrometer (kPa)|Penetrometro tascabile (kPa)|Penetrómetro de bolsillo (kPa)|Penetrômetro de bolso (kPa)|Pénétromètre de poche (kPa)
testType:Hand vane Su (kPa)|Scissometro tascabile Su (kPa)|Molinete de mano Su (kPa)|Palheta manual Su (kPa)|Scissomètre de poche Su (kPa)
testType:Lugeon / packer test (Lu)|Prova Lugeon (Lu)|Ensayo Lugeon (Lu)|Ensaio Lugeon (Lu)|Essai Lugeon (Lu)
testType:Point load Is(50) (MPa)|Prova di carico puntuale Is(50) (MPa)|Carga puntual Is(50) (MPa)|Carga pontual Is(50) (MPa)|Charge ponctuelle Is(50) (MPa)
testType:Falling head k (m/s)|Prova a carico variabile k (m/s)|Ensayo de carga variable k (m/s)|Ensaio de carga variável k (m/s)|Essai à charge variable k (m/s)
testType:PID (ppm)|PID (ppm)|PID (ppm)|PID (ppm)|PID (ppm)
testType:Other|Altro|Otro|Outro|Autre
method:Rotary core (double tube)|Carotaggio continuo (doppio carotiere)|Sondeo a rotación (doble tubo)|Sondagem rotativa (barrilete duplo)|Carottage rotatif (double tube)
method:Rotary core (triple tube)|Carotaggio continuo (triplo carotiere)|Sondeo a rotación (triple tubo)|Sondagem rotativa (barrilete triplo)|Carottage rotatif (triple tube)
method:Wireline core|Carotaggio wireline|Sondeo con wireline|Sondagem wireline|Carottage au câble (wireline)
method:Hollow stem auger|Trivella a elica cava|Barrena helicoidal hueca|Trado helicoidal oco|Tarière à axe creux
method:Solid stem auger|Trivella a elica continua|Barrena helicoidal maciza|Trado helicoidal maciço|Tarière à axe plein
method:Cable percussion|Percussione a fune|Percusión con cable|Percussão a cabo|Battage au câble
method:Sonic|Sonica|Sónico|Sônica|Sonique
method:Rotary open hole|Perforazione a distruzione di nucleo|Rotación a destroza|Sondagem rotativa a destruição|Forage destructif rotatif
method:Window sampler|Campionatore a finestra|Tomamuestras de ventana|Amostrador de janela|Carottier à fenêtre
method:Trial pit|Pozzetto esplorativo|Calicata|Poço de inspeção|Fouille de reconnaissance
piezo:Standpipe piezometer|Piezometro a tubo aperto|Piezómetro abierto|Piezômetro de tubo aberto|Piézomètre à tube ouvert
piezo:Standpipe (casagrande)|Piezometro Casagrande|Piezómetro Casagrande|Piezômetro Casagrande|Piézomètre Casagrande
piezo:Monitoring well|Pozzo di monitoraggio|Pozo de control|Poço de monitoramento|Puits de surveillance
piezo:Vibrating wire piezometer|Piezometro a corda vibrante|Piezómetro de cuerda vibrante|Piezômetro de corda vibrante|Piézomètre à corde vibrante
piezo:Gas monitoring well|Pozzo di monitoraggio gas|Pozo de control de gases|Poço de monitoramento de gás|Puits de contrôle des gaz
piezo:Inclinometer casing|Tubo inclinometrico|Tubería inclinométrica|Tubo inclinométrico|Tube inclinométrique
lith:Topsoil|Terreno vegetale|Tierra vegetal|Terra vegetal|Terre végétale
lith:Fill / Made ground|Riporto|Relleno|Aterro|Remblai
lith:Clay|Argilla|Arcilla|Argila|Argile
lith:Silt|Limo|Limo|Silte|Limon
lith:Sand|Sabbia|Arena|Areia|Sable
lith:Gravel|Ghiaia|Grava|Pedregulho|Gravier
lith:Cobbles / Boulders|Ciottoli / Blocchi|Bolos / Bloques|Calhaus / Blocos|Cailloux / Blocs
lith:Peat / Organic|Torba / Organico|Turba / Orgánico|Turfa / Orgânico|Tourbe / Organique
lith:Clayey / silty sand|Sabbia argillosa / limosa|Arena arcillosa / limosa|Areia argilosa / siltosa|Sable argileux / limoneux
lith:Sandy clay / silt|Argilla / limo sabbioso|Arcilla / limo arenoso|Argila / silte arenoso|Argile / limon sableux
lith:Clayey / silty gravel|Ghiaia argillosa / limosa|Grava arcillosa / limosa|Pedregulho argiloso / siltoso|Gravier argileux / limoneux
lith:Sandy gravel|Ghiaia sabbiosa|Grava arenosa|Pedregulho arenoso|Gravier sableux
lith:Sandstone|Arenaria|Arenisca|Arenito|Grès
lith:Siltstone|Siltite|Limolita|Siltito|Siltite
lith:Mudstone / Claystone|Pelite / Argillite|Lodolita / Arcillita|Lamito / Argilito|Pélite / Argilite
lith:Shale|Argillite fissile|Lutita|Folhelho|Schiste argileux
lith:Limestone|Calcare|Caliza|Calcário|Calcaire
lith:Dolomite|Dolomia|Dolomía|Dolomito|Dolomie
lith:Marl|Marna|Marga|Marga|Marne
lith:Conglomerate / Breccia|Conglomerato / Breccia|Conglomerado / Brecha|Conglomerado / Brecha|Conglomérat / Brèche
lith:Chalk|Creta|Creta|Giz|Craie
lith:Coal|Carbone|Carbón|Carvão|Charbon
lith:Granite / Igneous (plutonic)|Granito / Ignea (intrusiva)|Granito / Ígnea (plutónica)|Granito / Ígnea (plutônica)|Granite / Magmatique (plutonique)
lith:Basalt / Igneous (volcanic)|Basalto / Ignea (effusiva)|Basalto / Ígnea (volcánica)|Basalto / Ígnea (vulcânica)|Basalte / Magmatique (volcanique)
lith:Schist / Phyllite|Scisto / Fillade|Esquisto / Filita|Xisto / Filito|Schiste / Phyllade
lith:Gneiss|Gneiss|Gneis|Gnaisse|Gneiss
lith:Quartzite / Marble|Quarzite / Marmo|Cuarcita / Mármol|Quartzito / Mármore|Quartzite / Marbre
lith:Flysch (interbedded)|Flysch (alternanze)|Flysch (alternancias)|Flysch (intercalações)|Flysch (alternances)
lith:Void / Cavity|Vuoto / Cavità|Hueco / Cavidad|Vazio / Cavidade|Vide / Cavité
lith:No recovery / Core loss|Mancato recupero|Sin recuperación|Sem recuperação|Perte de carotte
`;
