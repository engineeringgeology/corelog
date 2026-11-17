/* CoreLog Field: interface language, term display and layer descriptions in IT / ES / PT / FR.
   Stored data always stays in English keys, so a log can be switched between languages at any time. */
'use strict';
window.CL = window.CL || {};

(function () {
  const LANGS = [['en', 'English'], ['it', 'Italiano'], ['es', 'Español'], ['pt', 'Português'], ['fr', 'Français']];
  const IDX = { it: 0, es: 1, pt: 2, fr: 3 };
  let lang = 'en';

  // ---------- interface strings: english|it|es|pt|fr ; {0} {1} ... are placeholders ----------
  const UI_ROWS = `
Save|Salva|Guardar|Salvar|Enregistrer
Save and add next|Salva e aggiungi il successivo|Guardar y añadir otro|Salvar e adicionar outro|Enregistrer et ajouter le suivant
Delete|Elimina|Eliminar|Excluir|Supprimer
Close|Chiudi|Cerrar|Fechar|Fermer
Delete this entry?|Eliminare questa voce?|¿Eliminar este registro?|Excluir este registro?|Supprimer cette entrée ?
Back|Indietro|Atrás|Voltar|Retour
Settings|Impostazioni|Ajustes|Configurações|Réglages
Edit|Modifica|Editar|Editar|Modifier
+ Add|+ Aggiungi|+ Añadir|+ Adicionar|+ Ajouter
Licensed|Con licenza|Con licencia|Licenciado|Sous licence
Demo|Demo|Demo|Demo|Démo
Demo mode: up to {0} boreholes, PDF has a watermark.|Modalità demo: massimo {0} sondaggi, il PDF ha una filigrana.|Modo demo: hasta {0} sondeos, el PDF lleva marca de agua.|Modo demo: até {0} sondagens, o PDF tem marca d'água.|Mode démo : {0} sondages maximum, le PDF porte un filigrane.
Activate licence|Attiva la licenza|Activar licencia|Ativar licença|Activer la licence
Untitled|Senza nome|Sin nombre|Sem nome|Sans nom
No project|Nessun progetto|Sin proyecto|Sem projeto|Aucun projet
{0} layers|{0} strati|{0} estratos|{0} camadas|{0} couches
{0} photos|{0} foto|{0} fotos|{0} fotos|{0} photos
backup!|backup!|¡copia!|backup!|sauvegarde !
No boreholes yet|Ancora nessun sondaggio|Aún no hay sondeos|Ainda não há sondagens|Aucun sondage pour l'instant
Tap <b>New borehole</b> to start logging. Everything is saved on this phone and works without signal.|Tocca <b>Nuovo sondaggio</b> per iniziare. Tutto viene salvato su questo telefono e funziona senza segnale.|Pulsa <b>Nuevo sondeo</b> para empezar. Todo se guarda en este teléfono y funciona sin cobertura.|Toque em <b>Nova sondagem</b> para começar. Tudo fica salvo neste celular e funciona sem sinal.|Touchez <b>Nouveau sondage</b> pour commencer. Tout est enregistré sur ce téléphone et fonctionne sans réseau.
New borehole|Nuovo sondaggio|Nuevo sondeo|Nova sondagem|Nouveau sondage
Restore from backup|Ripristina da backup|Restaurar copia de seguridad|Restaurar backup|Restaurer une sauvegarde
Restored {0}|Ripristinato {0}|Restaurado {0}|Restaurado {0}|{0} restauré
Demo allows {0} boreholes. Activate your licence in Settings.|La demo consente {0} sondaggi. Attiva la licenza in Impostazioni.|La demo permite {0} sondeos. Activa tu licencia en Ajustes.|A demo permite {0} sondagens. Ative sua licença em Configurações.|La démo permet {0} sondages. Activez votre licence dans Réglages.
This is not a CoreLog backup file|Questo non è un file di backup CoreLog|Este no es un archivo de copia de CoreLog|Este não é um arquivo de backup do CoreLog|Ce n'est pas un fichier de sauvegarde CoreLog
Borehole {0} already exists on this device. Replace it with the backup?|Il sondaggio {0} esiste già su questo dispositivo. Sostituirlo con il backup?|El sondeo {0} ya existe en este dispositivo. ¿Reemplazarlo con la copia?|A sondagem {0} já existe neste dispositivo. Substituir pelo backup?|Le sondage {0} existe déjà sur cet appareil. Le remplacer par la sauvegarde ?
Info|Info|Info|Info|Infos
Log|Stratigrafia|Columna|Perfil|Coupe
Core|Carote|Testigos|Testemunhos|Carottes
Joints|Giunti|Juntas|Juntas|Joints
Samples|Campioni|Muestras|Amostras|Échantillons
Photos|Foto|Fotos|Fotos|Photos
Export|Esporta|Exportar|Exportar|Exporter
Borehole|Sondaggio|Sondeo|Sondagem|Sondage
Borehole ID|Sigla sondaggio|Código del sondeo|Código da sondagem|Référence du sondage
Project|Progetto|Proyecto|Projeto|Projet
Project no.|N. progetto|N.º de proyecto|N.º do projeto|N° de projet
Client|Committente|Cliente|Cliente|Client
Location / chainage|Località / progressiva|Ubicación / PK|Local / estaca|Localisation / PK
not recorded|non rilevato|no registrado|não registrado|non relevé
Get GPS|Rileva GPS|Obtener GPS|Obter GPS|Relever le GPS
Latitude|Latitudine|Latitud|Latitude|Latitude
Longitude|Longitudine|Longitud|Longitude|Longitude
Ground level ({0})|Quota piano campagna ({0})|Cota del terreno ({0})|Cota do terreno ({0})|Cote du terrain naturel ({0})
from survey or GPS|da rilievo o GPS|de topografía o GPS|de levantamento ou GPS|par levé ou GPS
Inclination (°)|Inclinazione (°)|Inclinación (°)|Inclinação (°)|Inclinaison (°)
Date started|Data inizio|Fecha de inicio|Data de início|Date de début
Date completed|Data fine|Fecha de fin|Data de término|Date de fin
Drilling method|Metodo di perforazione|Método de perforación|Método de perfuração|Méthode de forage
Core / hole size|Diametro carota / foro|Diámetro testigo / taladro|Diâmetro testemunho / furo|Diamètre carotte / forage
Rig|Sonda|Equipo|Sonda|Machine
Contractor|Impresa|Contratista|Empresa de sondagem|Entreprise
Driller|Sondatore|Sondista|Sondador|Sondeur
Logged by|Rilevato da|Descrito por|Descrito por|Décrit par
Final depth ({0})|Profondità finale ({0})|Profundidad final ({0})|Profundidade final ({0})|Profondeur finale ({0})
blank = deepest entry|vuoto = voce più profonda|vacío = dato más profundo|vazio = registro mais profundo|vide = donnée la plus profonde
Description standard|Norma di descrizione|Norma de descripción|Norma de descrição|Norme de description
Depth units|Unità di profondità|Unidades de profundidad|Unidades de profundidade|Unité de profondeur
metres|metri|metros|metros|mètres
feet|piedi|pies|pés|pieds
Groundwater|Acqua di falda|Agua subterránea|Água subterrânea|Eau souterraine
Water first struck ({0})|Prima venuta d'acqua ({0})|Primera aparición de agua ({0})|Primeira ocorrência de água ({0})|Première venue d'eau ({0})
Standing level ({0})|Livello stabilizzato ({0})|Nivel estabilizado ({0})|Nível estabilizado ({0})|Niveau stabilisé ({0})
Water notes|Note sull'acqua|Notas sobre el agua|Notas sobre a água|Notes sur l'eau
e.g. rose to 2.10 m after 20 min|es. risalita a 2.10 m dopo 20 min|p. ej. subió a 2.10 m tras 20 min|ex. subiu para 2.10 m após 20 min|ex. remontée à 2.10 m après 20 min
Remarks|Osservazioni|Observaciones|Observações|Remarques
Piezometer / standpipe|Piezometro / tubo|Piezómetro / tubo|Piezômetro / tubo|Piézomètre / tube
None installed|Nessuno installato|Ninguno instalado|Nenhum instalado|Aucun installé
screen|tratto filtrante|tramo ranurado|filtro|crépine
seal|tampone|sello|selo|bouchon
Water level readings|Letture del livello d'acqua|Lecturas de nivel de agua|Leituras do nível de água|Relevés du niveau d'eau
+ Reading|+ Lettura|+ Lectura|+ Leitura|+ Relevé
No readings|Nessuna lettura|Sin lecturas|Sem leituras|Aucun relevé
Delete borehole|Elimina sondaggio|Eliminar sondeo|Excluir sondagem|Supprimer le sondage
Delete borehole {0} and all its photos? This cannot be undone. Make a backup first if unsure.|Eliminare il sondaggio {0} e tutte le sue foto? Non si può annullare. In caso di dubbio, fai prima un backup.|¿Eliminar el sondeo {0} y todas sus fotos? No se puede deshacer. Si dudas, haz antes una copia de seguridad.|Excluir a sondagem {0} e todas as fotos? Não pode ser desfeito. Na dúvida, faça antes um backup.|Supprimer le sondage {0} et toutes ses photos ? Action irréversible. En cas de doute, faites d'abord une sauvegarde.
GPS not available on this device|GPS non disponibile su questo dispositivo|GPS no disponible en este dispositivo|GPS indisponível neste dispositivo|GPS indisponible sur cet appareil
Locating… (stand still, open sky)|Localizzazione… (stai fermo, cielo aperto)|Localizando… (quieto, a cielo abierto)|Localizando… (fique parado, céu aberto)|Localisation… (restez immobile, ciel dégagé)
±{0} m… improving|±{0} m… in miglioramento|±{0} m… mejorando|±{0} m… melhorando|±{0} m… en amélioration
GPS failed: {0}|GPS non riuscito: {0}|Fallo del GPS: {0}|Falha do GPS: {0}|Échec du GPS : {0}
Allow location for this app in phone settings|Consenti la posizione per questa app nelle impostazioni del telefono|Permite la ubicación para esta app en los ajustes del teléfono|Permita a localização para este app nas configurações do celular|Autorisez la localisation pour cette appli dans les réglages du téléphone
GPS saved (±{0} m)|GPS salvato (±{0} m)|GPS guardado (±{0} m)|GPS salvo (±{0} m)|GPS enregistré (±{0} m)
Piezometer|Piezometro|Piezómetro|Piezômetro|Piézomètre
Type|Tipo|Tipo|Tipo|Type
Pipe diameter|Diametro tubo|Diámetro del tubo|Diâmetro do tubo|Diamètre du tube
Base / tip ({0})|Fondo / punta ({0})|Fondo / punta ({0})|Base / ponta ({0})|Base / pointe ({0})
Stick-up ({0})|Sporgenza dal p.c. ({0})|Altura sobre terreno ({0})|Altura acima do terreno ({0})|Hauteur hors sol ({0})
+ above ground|+ sopra il piano campagna|+ sobre el terreno|+ acima do terreno|+ au-dessus du sol
Screen top ({0})|Inizio filtro ({0})|Techo del ranurado ({0})|Topo do filtro ({0})|Haut de crépine ({0})
Screen bottom ({0})|Fine filtro ({0})|Base del ranurado ({0})|Base do filtro ({0})|Bas de crépine ({0})
Bentonite seal top ({0})|Tetto tampone bentonitico ({0})|Techo del sello de bentonita ({0})|Topo do selo de bentonita ({0})|Haut du bouchon de bentonite ({0})
Seal bottom ({0})|Base tampone ({0})|Base del sello ({0})|Base do selo ({0})|Bas du bouchon ({0})
Notes|Note|Notas|Notas|Notes
filter sand, cover, lockable cap…|sabbia filtrante, pozzetto, tappo con lucchetto…|arena filtrante, arqueta, tapa con candado…|areia filtrante, caixa de proteção, tampa com cadeado…|sable filtrant, capot, bouchon cadenassable…
Water level reading|Lettura del livello d'acqua|Lectura del nivel de agua|Leitura do nível de água|Relevé du niveau d'eau
Date / time|Data / ora|Fecha / hora|Data / hora|Date / heure
Depth to water ({0})|Profondità dell'acqua ({0})|Profundidad del agua ({0})|Profundidade da água ({0})|Profondeur de l'eau ({0})
dip from top of pipe / ground|misura da testa tubo / p.c.|medida desde boca del tubo / terreno|medida do topo do tubo / terreno|mesure depuis le haut du tube / sol
Enter the depth|Inserisci la profondità|Introduce la profundidad|Informe a profundidade|Saisissez la profondeur
tap a layer to edit|tocca uno strato per modificarlo|toca un estrato para editarlo|toque numa camada para editar|touchez une couche pour la modifier
No layers yet. Tap <b>+ Layer</b> and start from the top.|Ancora nessuno strato. Tocca <b>+ Strato</b> e parti dall'alto.|Aún no hay estratos. Pulsa <b>+ Estrato</b> y empieza desde arriba.|Ainda não há camadas. Toque em <b>+ Camada</b> e comece pelo topo.|Aucune couche. Touchez <b>+ Couche</b> et commencez par le haut.
Layer|Strato|Estrato|Camada|Couche
Layer {0}–{1}: "to" must be deeper than "from"|Strato {0}–{1}: "a" deve essere più profondo di "da"|Estrato {0}–{1}: "hasta" debe ser más profundo que "desde"|Camada {0}–{1}: "até" deve ser mais profundo que "de"|Couche {0}–{1} : « à » doit être plus profond que « de »
Overlap at {0}|Sovrapposizione a {0}|Solape en {0}|Sobreposição em {0}|Chevauchement à {0}
Gap {0}|Lacuna {0}|Hueco {0}|Lacuna {0}|Lacune {0}
From ({0})|Da ({0})|Desde ({0})|De ({0})|De ({0})
To ({0})|A ({0})|Hasta ({0})|Até ({0})|À ({0})
Material|Materiale|Material|Material|Matériau
Soil|Terreno|Suelo|Solo|Sol
Rock|Roccia|Roca|Rocha|Roche
Fill / other|Riporto / altro|Relleno / otro|Aterro / outro|Remblai / autre
USCS group|Gruppo USCS|Grupo USCS|Grupo USCS|Groupe USCS
Principal soil type|Frazione principale|Fracción principal|Fração principal|Fraction principale
Secondary constituents|Frazioni secondarie|Fracciones secundarias|Frações secundárias|Fractions secondaires
Consistency|Consistenza|Consistencia|Consistência|Consistance
Relative density|Stato di addensamento|Compacidad|Compacidade|Compacité
Sand size|Granulometria della sabbia|Tamaño de la arena|Granulometria da areia|Granulométrie du sable
Colour|Colore|Color|Cor|Couleur
Moisture|Umidità|Humedad|Umidade|Humidité
Plasticity|Plasticità|Plasticidad|Plasticidade|Plasticité
Grading|Gradazione|Graduación|Graduação|Granulométrie
Particle shape|Forma dei granuli|Forma de las partículas|Forma das partículas|Forme des grains
Structure|Struttura|Estructura|Estrutura|Structure
Rock name|Litotipo|Litología|Litologia|Lithologie
Strength|Resistenza|Resistencia|Resistência|Résistance
Weathering|Alterazione|Meteorización|Alteração|Altération
Grain size|Grana|Tamaño de grano|Granulação|Grain
Structure / bedding|Struttura / stratificazione|Estructura / estratificación|Estrutura / estratificação|Structure / litage
Fracture state|Stato di fratturazione|Grado de fracturación|Grau de fraturamento|État de fracturation
Description|Descrizione|Descripción|Descrição|Description
Additional notes|Note aggiuntive|Notas adicionales|Notas adicionais|Notes complémentaires
e.g. occasional subangular fine gravel of limestone|es. rara ghiaia fine subspigolosa calcarea|p. ej. grava fina subangulosa caliza ocasional|ex. pedregulho fino subanguloso calcário ocasional|ex. rares graviers fins subanguleux calcaires
Graphic legend|Simbolo grafico|Trama gráfica|Hachura gráfica|Figuré graphique
Automatic|Automatico|Automático|Automático|Automatique
Write the description myself|Scrivo io la descrizione|Escribir yo la descripción|Escrever a descrição eu mesmo|Écrire moi-même la description
New layer|Nuovo strato|Nuevo estrato|Nova camada|Nouvelle couche
Layer {0}–{1} {2}|Strato {0}–{1} {2}|Estrato {0}–{1} {2}|Camada {0}–{1} {2}|Couche {0}–{1} {2}
Enter From and To depths|Inserisci le profondità Da e A|Introduce las profundidades Desde y Hasta|Informe as profundidades De e Até|Saisissez les profondeurs De et À
"To" must be deeper than "From"|"A" deve essere più profondo di "Da"|"Hasta" debe ser más profundo que "Desde"|"Até" deve ser mais profundo que "De"|« À » doit être plus profond que « De »
TCR · SCR · RQD calculated automatically (RQD counts pieces ≥ {0})|TCR · SCR · RQD calcolati automaticamente (RQD conta i pezzi ≥ {0})|TCR · SCR · RQD calculados automáticamente (RQD cuenta trozos ≥ {0})|TCR · SCR · RQD calculados automaticamente (RQD conta peças ≥ {0})|TCR · SCR · RQD calculés automatiquement (RQD compte les morceaux ≥ {0})
Run ({0})|Manovra ({0})|Maniobra ({0})|Manobra ({0})|Passe ({0})
No core runs yet.|Ancora nessuna manovra.|Aún no hay maniobras.|Ainda não há manobras.|Aucune passe pour l'instant.
Core run|Manovra|Maniobra|Manobra|Passe
New core run|Nuova manovra|Nueva maniobra|Nova manobra|Nouvelle passe
Run {0}–{1}|Manovra {0}–{1}|Maniobra {0}–{1}|Manobra {0}–{1}|Passe {0}–{1}
Total core recovered ({0})|Carota recuperata totale ({0})|Testigo recuperado total ({0})|Testemunho recuperado total ({0})|Carotte récupérée totale ({0})
all core incl. broken|tutta la carota, anche frantumata|todo el testigo, incluido el roto|todo o testemunho, incluindo quebrado|toute la carotte, y compris fragmentée
Solid core piece lengths ({0})|Lunghezze dei pezzi integri ({0})|Longitudes de trozos enteros ({0})|Comprimentos das peças inteiras ({0})|Longueurs des morceaux entiers ({0})
e.g. 12 8 25 31 4 17|es. 12 8 25 31 4 17|p. ej. 12 8 25 31 4 17|ex. 12 8 25 31 4 17|ex. 12 8 25 31 4 17
full-diameter pieces, separated by spaces|pezzi a diametro pieno, separati da spazi|trozos de diámetro completo, separados por espacios|peças de diâmetro completo, separadas por espaços|morceaux à diamètre complet, séparés par des espaces
Natural fractures (count)|Fratture naturali (numero)|Fracturas naturales (número)|Fraturas naturais (número)|Fractures naturelles (nombre)
exclude drilling breaks; blank = pieces − 1|escludi rotture da perforazione; vuoto = pezzi − 1|excluye roturas de perforación; vacío = trozos − 1|exclua quebras de perfuração; vazio = peças − 1|hors cassures de forage ; vide = morceaux − 1
Solid core total ({0})|Totale carota integra ({0})|Total testigo entero ({0})|Total testemunho inteiro ({0})|Total carotte entière ({0})
optional, overrides pieces|facoltativo, sostituisce i pezzi|opcional, sustituye a los trozos|opcional, substitui as peças|facultatif, remplace les morceaux
Pieces ≥{0} total ({1})|Pezzi ≥{0} totale ({1})|Trozos ≥{0} total ({1})|Peças ≥{0} total ({1})|Morceaux ≥{0} total ({1})
core loss, mechanical breaks, barrel…|perdita di carota, rotture meccaniche, carotiere…|pérdida de testigo, roturas mecánicas, batería…|perda de testemunho, quebras mecânicas, barrilete…|perte de carotte, cassures mécaniques, carottier…
{0} pieces · run {1}|{0} pezzi · manovra {1}|{0} trozos · maniobra {1}|{0} peças · manobra {1}|{0} morceaux · passe {1}
Check From / To|Controlla Da / A|Revisa Desde / Hasta|Verifique De / Até|Vérifiez De / À
Recovered core is longer than the run|La carota recuperata è più lunga della manovra|El testigo recuperado es más largo que la maniobra|O testemunho recuperado é maior que a manobra|La carotte récupérée est plus longue que la passe
Solid core pieces add up to more than the recovered core — check the lengths|I pezzi integri superano la carota recuperata: controlla le lunghezze|Los trozos enteros suman más que el testigo recuperado: revisa las longitudes|As peças inteiras somam mais que o testemunho recuperado: verifique os comprimentos|Les morceaux entiers dépassent la carotte récupérée : vérifiez les longueurs
Discontinuities (EN ISO 14689 / ISRM terms). Dip = angle from core axis normal (0° = perpendicular to core).|Discontinuità (termini EN ISO 14689 / ISRM). Inclinazione = angolo dalla normale all'asse della carota (0° = perpendicolare alla carota).|Discontinuidades (términos EN ISO 14689 / ISRM). Buzamiento = ángulo desde la normal al eje del testigo (0° = perpendicular al testigo).|Descontinuidades (termos EN ISO 14689 / ISRM). Mergulho = ângulo a partir da normal ao eixo do testemunho (0° = perpendicular ao testemunho).|Discontinuités (termes EN ISO 14689 / ISRM). Pendage = angle par rapport à la normale à l'axe de la carotte (0° = perpendiculaire à la carotte).
None recorded.|Nessuna registrata.|Ninguna registrada.|Nenhuma registrada.|Aucune relevée.
Discontinuity|Discontinuità|Discontinuidad|Descontinuidade|Discontinuité
New discontinuity|Nuova discontinuità|Nueva discontinuidad|Nova descontinuidade|Nouvelle discontinuité
Depth ({0})|Profondità ({0})|Profundidad ({0})|Profundidade ({0})|Profondeur ({0})
Dip to core axis normal (°)|Inclinazione rispetto alla normale all'asse (°)|Buzamiento respecto a la normal al eje (°)|Mergulho em relação à normal ao eixo (°)|Pendage par rapport à la normale à l'axe (°)
Count / set (no.)|Numero / famiglia (n.)|Número / familia (n.º)|Número / família (n.º)|Nombre / famille (n°)
per metre or zone|per metro o zona|por metro o zona|por metro ou zona|par mètre ou zone
Spacing|Spaziatura|Espaciado|Espaçamento|Espacement
Roughness|Rugosità|Rugosidad|Rugosidade|Rugosité
Aperture|Apertura|Abertura|Abertura|Ouverture
Infill / coating|Riempimento / patina|Relleno / pátina|Preenchimento / revestimento|Remplissage / enduit
persistence, JRC, slickensides…|persistenza, JRC, strie…|continuidad, JRC, estrías…|persistência, JRC, estrias…|persistance, JRC, stries…
Samples &amp; SPT|Campioni e SPT|Muestras y SPT|Amostras e SPT|Échantillons et SPT
+ Sample|+ Campione|+ Muestra|+ Amostra|+ Échantillon
No samples.|Nessun campione.|Sin muestras.|Sem amostras.|Aucun échantillon.
Field tests|Prove in situ|Ensayos de campo|Ensaios de campo|Essais in situ
+ Test|+ Prova|+ Ensayo|+ Ensaio|+ Essai
No tests.|Nessuna prova.|Sin ensayos.|Sem ensaios.|Aucun essai.
New sample|Nuovo campione|Nueva muestra|Nova amostra|Nouvel échantillon
Sample|Campione|Muestra|Amostra|Échantillon
Top ({0})|Da ({0})|Techo ({0})|Topo ({0})|Haut ({0})
Bottom ({0})|A ({0})|Base ({0})|Base ({0})|Bas ({0})
Sample no. / ref|N. / sigla campione|N.º / ref. de muestra|N.º / ref. da amostra|N° / réf. échantillon
SPT blows per increment|Colpi SPT per tratto|Golpes SPT por tramo|Golpes SPT por trecho|Coups SPT par tranche
N (manual / refusal)|N (manuale / rifiuto)|N (manual / rechazo)|N (manual / impenetrável)|N (manuel / refus)
e.g. 50 for 50/100 mm|es. 50 per 50/100 mm|p. ej. 50 para 50/100 mm|ex. 50 para 50/100 mm|ex. 50 pour 50/100 mm
recovery, SPT(C), refusal 50/25 mm…|recupero, SPT(C), rifiuto 50/25 mm…|recuperación, SPT(C), rechazo 50/25 mm…|recuperação, SPT(C), impenetrável 50/25 mm…|récupération, SPT(C), refus 50/25 mm…
3 × 150 mm (6 in) increments: e.g. 4 6 8 → N = 14|3 tratti da 150 mm (6 in): es. 4 6 8 → N = 14|3 tramos de 150 mm (6 in): p. ej. 4 6 8 → N = 14|3 trechos de 150 mm (6 in): ex. 4 6 8 → N = 14|3 tranches de 150 mm (6 in) : ex. 4 6 8 → N = 14
Seating + test drive, 6 × 75 mm: e.g. 2 3 4 5 6 7 → N = 22|Avviamento + prova, 6 × 75 mm: es. 2 3 4 5 6 7 → N = 22|Asiento + ensayo, 6 × 75 mm: p. ej. 2 3 4 5 6 7 → N = 22|Assentamento + ensaio, 6 × 75 mm: ex. 2 3 4 5 6 7 → N = 22|Amorçage + essai, 6 × 75 mm : ex. 2 3 4 5 6 7 → N = 22
Enter the top depth|Inserisci la profondità iniziale|Introduce la profundidad de techo|Informe a profundidade do topo|Saisissez la profondeur du haut
New field test|Nuova prova in situ|Nuevo ensayo de campo|Novo ensaio de campo|Nouvel essai in situ
Field test|Prova in situ|Ensayo de campo|Ensaio de campo|Essai in situ
Test|Prova|Ensayo|Ensaio|Essai
Result|Risultato|Resultado|Resultado|Résultat
Lugeon stages, readings…|gradini Lugeon, letture…|escalones Lugeon, lecturas…|estágios Lugeon, leituras…|paliers Lugeon, lectures…
Each photo gets a stamp: borehole, box no., depth, date and GPS. Saved at ~300 KB.|Ogni foto riceve un timbro: sondaggio, n. cassetta, profondità, data e GPS. Salvata a ~300 KB.|Cada foto lleva un sello: sondeo, n.º de caja, profundidad, fecha y GPS. Se guarda a ~300 KB.|Cada foto recebe um carimbo: sondagem, n.º da caixa, profundidade, data e GPS. Salva com ~300 KB.|Chaque photo reçoit un tampon : sondage, n° de caisse, profondeur, date et GPS. Enregistrée à ~300 Ko.
Box {0}|Cassetta {0}|Caja {0}|Caixa {0}|Caisse {0}
No photos yet.|Ancora nessuna foto.|Aún no hay fotos.|Ainda não há fotos.|Aucune photo pour l'instant.
Core box photo|Foto cassetta|Foto de caja|Foto da caixa|Photo de caisse
Camera|Fotocamera|Cámara|Câmera|Appareil photo
Box no.|N. cassetta|N.º de caja|N.º da caixa|N° de caisse
Depth from ({0})|Profondità da ({0})|Profundidad desde ({0})|Profundidade de ({0})|Profondeur de ({0})
Depth to ({0})|Profondità a ({0})|Profundidad hasta ({0})|Profundidade até ({0})|Profondeur à ({0})
Tip: shoot straight down, whole box in frame, label board visible. You can also pick an existing photo from the gallery.|Consiglio: scatta dall'alto, cassetta intera nell'inquadratura, cartellino visibile. Puoi anche scegliere una foto dalla galleria.|Consejo: dispara desde arriba, la caja entera en el encuadre y el cartel visible. También puedes elegir una foto de la galería.|Dica: fotografe de cima, a caixa inteira no enquadramento e a etiqueta visível. Também pode escolher uma foto da galeria.|Astuce : photographiez à la verticale, caisse entière dans le cadre, étiquette visible. Vous pouvez aussi choisir une photo de la galerie.
Choose from gallery|Scegli dalla galleria|Elegir de la galería|Escolher da galeria|Choisir dans la galerie
Enter box number and depths|Inserisci numero cassetta e profondità|Introduce el n.º de caja y las profundidades|Informe o n.º da caixa e as profundidades|Saisissez le n° de caisse et les profondeurs
Processing photo…|Elaborazione foto…|Procesando foto…|Processando foto…|Traitement de la photo…
Photo saved ({0} KB)|Foto salvata ({0} KB)|Foto guardada ({0} KB)|Foto salva ({0} KB)|Photo enregistrée ({0} Ko)
Photo failed: {0}|Foto non riuscita: {0}|Error en la foto: {0}|Falha na foto: {0}|Échec de la photo : {0}
Share|Condividi|Compartir|Compartilhar|Partager
Delete this photo?|Eliminare questa foto?|¿Eliminar esta foto?|Excluir esta foto?|Supprimer cette photo ?
never|mai|nunca|nunca|jamais
Borehole log (PDF)|Stratigrafia del sondaggio (PDF)|Registro del sondeo (PDF)|Perfil da sondagem (PDF)|Coupe du sondage (PDF)
A4 log with graphic column, legend, TCR/SCR/RQD, samples, SPT, water, and data tables.|Stratigrafia A4 con colonna grafica, legenda, TCR/SCR/RQD, campioni, SPT, acqua e tabelle dati.|Registro A4 con columna gráfica, leyenda, TCR/SCR/RQD, muestras, SPT, agua y tablas de datos.|Perfil A4 com coluna gráfica, legenda, TCR/SCR/RQD, amostras, SPT, água e tabelas de dados.|Coupe A4 avec colonne graphique, légende, TCR/SCR/RQD, échantillons, SPT, eau et tableaux de données.
Demo: watermark.|Demo: filigrana.|Demo: marca de agua.|Demo: marca d'água.|Démo : filigrane.
Depth per sheet|Profondità per foglio|Profundidad por hoja|Profundidade por folha|Profondeur par feuille
{0} m per sheet ({1})|{0} m per foglio ({1})|{0} m por hoja ({1})|{0} m por folha ({1})|{0} m par feuille ({1})
{0} ft per sheet ({1})|{0} ft per foglio ({1})|{0} ft por hoja ({1})|{0} ft por folha ({1})|{0} ft par feuille ({1})
{0} → {1} log sheets + data tables|{0} → {1} fogli + tabelle dati|{0} → {1} hojas + tablas de datos|{0} → {1} folhas + tabelas de dados|{0} → {1} feuilles + tableaux de données
{0} → 1 log sheet + data tables|{0} → 1 foglio + tabelle dati|{0} → 1 hoja + tablas de datos|{0} → 1 folha + tabelas de dados|{0} → 1 feuille + tableaux de données
Include core photos|Includi le foto delle carote|Incluir fotos de testigos|Incluir fotos dos testemunhos|Inclure les photos des carottes
English translation under each description|Traduzione inglese sotto ogni descrizione|Traducción al inglés bajo cada descripción|Tradução em inglês sob cada descrição|Traduction anglaise sous chaque description
Preview|Anteprima|Vista previa|Visualizar|Aperçu
Save / share|Salva / condividi|Guardar / compartir|Salvar / compartilhar|Enregistrer / partager
Excel &amp; CSV|Excel e CSV|Excel y CSV|Excel e CSV|Excel et CSV
All data in sheets: header, strata, core runs, discontinuities, samples, tests, installation, water levels.|Tutti i dati in fogli: intestazione, strati, manovre, discontinuità, campioni, prove, strumentazione, livelli d'acqua.|Todos los datos en hojas: cabecera, estratos, maniobras, discontinuidades, muestras, ensayos, instalación, niveles de agua.|Todos os dados em planilhas: cabeçalho, camadas, manobras, descontinuidades, amostras, ensaios, instalação, níveis de água.|Toutes les données en feuilles : en-tête, couches, passes, discontinuités, échantillons, essais, équipement, niveaux d'eau.
Backup|Backup|Copia de seguridad|Backup|Sauvegarde
Last backup: <b>{0}</b>. One file with everything incl. photos. Send it to Google Drive, e-mail or WhatsApp. Restore it from the home screen on any phone.|Ultimo backup: <b>{0}</b>. Un solo file con tutto, foto comprese. Invialo a Google Drive, e-mail o WhatsApp. Ripristinalo dalla schermata iniziale su qualsiasi telefono.|Última copia: <b>{0}</b>. Un solo archivo con todo, fotos incluidas. Envíalo a Google Drive, e-mail o WhatsApp. Restáuralo desde la pantalla de inicio en cualquier teléfono.|Último backup: <b>{0}</b>. Um único arquivo com tudo, incluindo fotos. Envie para o Google Drive, e-mail ou WhatsApp. Restaure pela tela inicial em qualquer celular.|Dernière sauvegarde : <b>{0}</b>. Un seul fichier avec tout, photos comprises. Envoyez-le sur Google Drive, par e-mail ou WhatsApp. Restaurez-le depuis l'écran d'accueil sur n'importe quel téléphone.
Back up this borehole|Fai il backup di questo sondaggio|Copia de seguridad de este sondeo|Fazer backup desta sondagem|Sauvegarder ce sondage
Building PDF…|Creazione PDF…|Generando PDF…|Gerando PDF…|Création du PDF…
PDF ready|PDF pronto|PDF listo|PDF pronto|PDF prêt
PDF failed: {0}|PDF non riuscito: {0}|Error en el PDF: {0}|Falha no PDF: {0}|Échec du PDF : {0}
Backup saved|Backup salvato|Copia guardada|Backup salvo|Sauvegarde enregistrée
Licence|Licenza|Licencia|Licença|Licence
Licensed to|Licenza intestata a|Licencia a nombre de|Licenciado para|Licence au nom de
key|chiave|clave|chave|clé
Remove licence from this device|Rimuovi la licenza da questo dispositivo|Quitar la licencia de este dispositivo|Remover a licença deste dispositivo|Retirer la licence de cet appareil
Enter the licence key from your Payhip receipt. Needs internet once, then works offline. One licence = 2 devices.|Inserisci la chiave di licenza dalla ricevuta Payhip. Serve internet una volta, poi funziona offline. Una licenza = 2 dispositivi.|Introduce la clave de licencia del recibo de Payhip. Necesita internet una vez y luego funciona sin conexión. Una licencia = 2 dispositivos.|Informe a chave de licença do recibo do Payhip. Precisa de internet uma vez e depois funciona offline. Uma licença = 2 dispositivos.|Saisissez la clé de licence de votre reçu Payhip. Internet est nécessaire une fois, ensuite tout fonctionne hors ligne. Une licence = 2 appareils.
Licence key|Chiave di licenza|Clave de licencia|Chave de licença|Clé de licence
Name or company shown on logs|Nome o società sulle stratigrafie|Nombre o empresa en los registros|Nome ou empresa nos perfis|Nom ou société sur les coupes
e.g. GeoTech Ltd|es. GeoTech Srl|p. ej. GeoTech S.L.|ex. GeoTech Ltda|ex. GeoTech SARL
Activate|Attiva|Activar|Ativar|Activer
Defaults for new boreholes|Predefiniti per i nuovi sondaggi|Valores por defecto para nuevos sondeos|Padrões para novas sondagens|Valeurs par défaut des nouveaux sondages
Storage|Memoria|Almacenamiento|Armazenamento|Stockage
✅ Protected storage is ON (the phone will not auto-delete your logs).|✅ Memoria protetta ATTIVA (il telefono non cancellerà i tuoi dati).|✅ Almacenamiento protegido ACTIVADO (el teléfono no borrará tus registros).|✅ Armazenamento protegido ATIVO (o celular não apagará seus dados).|✅ Stockage protégé ACTIVÉ (le téléphone ne supprimera pas vos données).
⚠️ Protected storage not granted yet. Install the app to the home screen and make regular backups.|⚠️ Memoria protetta non ancora concessa. Installa l'app nella schermata iniziale e fai backup regolari.|⚠️ Almacenamiento protegido aún no concedido. Instala la app en la pantalla de inicio y haz copias con frecuencia.|⚠️ Armazenamento protegido ainda não concedido. Instale o app na tela inicial e faça backups regulares.|⚠️ Stockage protégé pas encore accordé. Installez l'appli sur l'écran d'accueil et faites des sauvegardes régulières.
Used: {0} MB|Usati: {0} MB|Usado: {0} MB|Usado: {0} MB|Utilisé : {0} Mo
Request protected storage|Richiedi memoria protetta|Solicitar almacenamiento protegido|Solicitar armazenamento protegido|Demander le stockage protégé
Export all boreholes to Excel|Esporta tutti i sondaggi in Excel|Exportar todos los sondeos a Excel|Exportar todas as sondagens para Excel|Exporter tous les sondages vers Excel
About|Informazioni|Acerca de|Sobre|À propos
Terms follow USCS/ASTM D2487-D2488, BS 5930:2015+A1:2020 and EN ISO 14688-1 / 14689. Always check descriptions against the current edition of the standard used on your project.|I termini seguono USCS/ASTM D2487-D2488, BS 5930:2015+A1:2020 e EN ISO 14688-1 / 14689. Verifica sempre le descrizioni con l'edizione vigente della norma usata nel progetto. Le traduzioni dei termini vanno controllate con la versione nazionale della norma.|Los términos siguen USCS/ASTM D2487-D2488, BS 5930:2015+A1:2020 y EN ISO 14688-1 / 14689. Comprueba siempre las descripciones con la edición vigente de la norma del proyecto. Las traducciones deben revisarse con la versión nacional (UNE) de la norma.|Os termos seguem USCS/ASTM D2487-D2488, BS 5930:2015+A1:2020 e EN ISO 14688-1 / 14689. Confira sempre as descrições com a edição vigente da norma do projeto. As traduções devem ser verificadas com a versão nacional da norma.|Les termes suivent USCS/ASTM D2487-D2488, BS 5930:2015+A1:2020 et EN ISO 14688-1 / 14689. Vérifiez toujours les descriptions avec l'édition en vigueur de la norme du projet. Les traductions doivent être contrôlées avec la version nationale (NF) de la norme.
Logged by (your name)|Rilevato da (il tuo nome)|Descrito por (tu nombre)|Descrito por (seu nome)|Décrit par (votre nom)
Standard|Norma|Norma|Norma|Norme
Units|Unità|Unidades|Unidades|Unités
Method|Metodo|Método|Método|Méthode
Language|Lingua|Idioma|Idioma|Langue
Checking…|Verifica…|Comprobando…|Verificando…|Vérification…
Licence activated. Thank you!|Licenza attivata. Grazie!|Licencia activada. ¡Gracias!|Licença ativada. Obrigado!|Licence activée. Merci !
Remove the licence from this device? You can activate it again later.|Rimuovere la licenza da questo dispositivo? Potrai riattivarla in seguito.|¿Quitar la licencia de este dispositivo? Podrás activarla de nuevo más tarde.|Remover a licença deste dispositivo? Você pode ativá-la novamente depois.|Retirer la licence de cet appareil ? Vous pourrez la réactiver plus tard.
Protected storage ON|Memoria protetta attiva|Almacenamiento protegido activado|Armazenamento protegido ativo|Stockage protégé activé
The browser refused. Install the app to the home screen first.|Il browser ha rifiutato. Installa prima l'app nella schermata iniziale.|El navegador lo rechazó. Instala primero la app en la pantalla de inicio.|O navegador recusou. Instale primeiro o app na tela inicial.|Le navigateur a refusé. Installez d'abord l'appli sur l'écran d'accueil.
No boreholes|Nessun sondaggio|Sin sondeos|Sem sondagens|Aucun sondage
Install app|Installa l'app|Instalar app|Instalar app|Installer l'appli
The licence key should look like XXXXX-XXXXX-XXXXX-XXXXX (from your Payhip receipt email).|La chiave deve avere il formato XXXXX-XXXXX-XXXXX-XXXXX (dall'e-mail di ricevuta Payhip).|La clave debe tener el formato XXXXX-XXXXX-XXXXX-XXXXX (del correo de recibo de Payhip).|A chave deve ter o formato XXXXX-XXXXX-XXXXX-XXXXX (do e-mail de recibo do Payhip).|La clé doit avoir la forme XXXXX-XXXXX-XXXXX-XXXXX (e-mail de reçu Payhip).
Online activation is not switched on in this test version yet. You can use the demo mode for now.|L'attivazione online non è ancora attiva in questa versione di prova. Per ora puoi usare la modalità demo.|La activación en línea aún no está habilitada en esta versión de prueba. Por ahora puedes usar el modo demo.|A ativação online ainda não está ligada nesta versão de teste. Por enquanto, use o modo demo.|L'activation en ligne n'est pas encore active dans cette version de test. Utilisez le mode démo pour l'instant.
Activation needs the internet once. Connect to Wi-Fi or mobile data and try again.|L'attivazione richiede internet una volta. Connettiti al Wi-Fi o ai dati mobili e riprova.|La activación necesita internet una vez. Conéctate a Wi-Fi o datos móviles e inténtalo de nuevo.|A ativação precisa de internet uma vez. Conecte-se ao Wi-Fi ou aos dados móveis e tente novamente.|L'activation nécessite internet une fois. Connectez-vous au Wi-Fi ou aux données mobiles et réessayez.
Save failed: {0}|Salvataggio non riuscito: {0}|Error al guardar: {0}|Falha ao salvar: {0}|Échec de l'enregistrement : {0}
finger easily pushed in up to 25 mm; exudes between fingers|il dito penetra facilmente fino a 25 mm; fuoriesce tra le dita|el dedo penetra fácilmente hasta 25 mm; se escurre entre los dedos|o dedo penetra facilmente até 25 mm; escorre entre os dedos|le doigt s'enfonce facilement jusqu'à 25 mm ; flue entre les doigts
finger pushed in up to 10 mm; moulded by light finger pressure|il dito penetra fino a 10 mm; si modella con una leggera pressione|el dedo penetra hasta 10 mm; se moldea con ligera presión|o dedo penetra até 10 mm; moldável com leve pressão|le doigt s'enfonce jusqu'à 10 mm ; se modèle par légère pression
thumb makes impression easily; cannot be moulded by fingers|il pollice lascia facilmente un'impronta; non si modella con le dita|el pulgar marca fácilmente; no se moldea con los dedos|o polegar marca facilmente; não é moldável com os dedos|le pouce marque facilement ; ne se modèle pas avec les doigts
can be indented slightly by thumb; crumbles in rolling|il pollice lascia una leggera impronta; si sbriciola rotolandola|el pulgar marca ligeramente; se desmenuza al rodarla|o polegar marca levemente; esfarela ao rolar|le pouce marque légèrement ; s'effrite au roulage
can be indented by thumbnail; cannot be moulded|l'unghia lascia un'impronta; non si modella|la uña marca; no se moldea|a unha marca; não é moldável|l'ongle marque ; ne se modèle pas
thumbnail indents with difficulty (ASTM D2488)|l'unghia incide con difficoltà (ASTM D2488)|la uña marca con dificultad (ASTM D2488)|a unha marca com dificuldade (ASTM D2488)|l'ongle marque difficilement (ASTM D2488)
< 1 MPa · indented by thumbnail|< 1 MPa · inciso dall'unghia|< 1 MPa · se marca con la uña|< 1 MPa · marcada pela unha|< 1 MPa · rayée à l'ongle
1–5 MPa · crumbles under firm blows of pick|1–5 MPa · si sbriciola con colpi decisi di martello|1–5 MPa · se desmenuza con golpes firmes de piqueta|1–5 MPa · esfarela com golpes firmes de martelo|1–5 MPa · s'effrite sous des coups fermes de marteau
5–25 MPa · shallow indentation by pick point|5–25 MPa · lieve impronta con la punta del martello|5–25 MPa · marca superficial con la punta de la piqueta|5–25 MPa · marca rasa com a ponta do martelo|5–25 MPa · légère empreinte à la pointe du marteau
25–50 MPa · cannot be scraped with knife|25–50 MPa · non si scalfisce con il coltello|25–50 MPa · no se raya con navaja|25–50 MPa · não risca com canivete|25–50 MPa · ne se raye pas au couteau
50–100 MPa · requires more than one blow to fracture|50–100 MPa · serve più di un colpo per romperla|50–100 MPa · requiere más de un golpe para romperse|50–100 MPa · exige mais de um golpe para quebrar|50–100 MPa · plus d'un coup pour la casser
100–250 MPa · many blows of hammer|100–250 MPa · molti colpi di martello|100–250 MPa · muchos golpes de martillo|100–250 MPa · muitos golpes de martelo|100–250 MPa · nombreux coups de marteau
> 250 MPa · only chipped by hammer|> 250 MPa · il martello la scheggia appena|> 250 MPa · el martillo solo la desconcha|> 250 MPa · o martelo apenas lasca|> 250 MPa · le marteau ne fait que l'écailler
Grade I (ISO 0) · no visible sign of weathering|Grado I (ISO 0) · nessun segno visibile di alterazione|Grado I (ISO 0) · sin signos visibles de meteorización|Grau I (ISO 0) · sem sinais visíveis de alteração|Classe I (ISO 0) · aucun signe visible d'altération
Grade II (ISO 1) · discolouration on discontinuities|Grado II (ISO 1) · alterazione del colore sulle discontinuità|Grado II (ISO 1) · decoloración en las discontinuidades|Grau II (ISO 1) · descoloração nas descontinuidades|Classe II (ISO 1) · décoloration sur les discontinuités
Grade III (ISO 2) · less than half decomposed to soil|Grado III (ISO 2) · meno di metà trasformata in terreno|Grado III (ISO 2) · menos de la mitad transformada en suelo|Grau III (ISO 2) · menos da metade decomposta em solo|Classe III (ISO 2) · moins de la moitié décomposée en sol
Grade IV (ISO 3) · more than half decomposed to soil|Grado IV (ISO 3) · più di metà trasformata in terreno|Grado IV (ISO 3) · más de la mitad transformada en suelo|Grau IV (ISO 3) · mais da metade decomposta em solo|Classe IV (ISO 3) · plus de la moitié décomposée en sol
Grade V (ISO 4) · all decomposed, original structure intact|Grado V (ISO 4) · tutta trasformata, struttura originaria intatta|Grado V (ISO 4) · toda transformada, estructura original intacta|Grau V (ISO 4) · toda decomposta, estrutura original intacta|Classe V (ISO 4) · entièrement décomposée, structure d'origine conservée
Grade VI (ISO 5) · structure and fabric destroyed|Grado VI (ISO 5) · struttura e tessitura distrutte|Grado VI (ISO 5) · estructura y fábrica destruidas|Grau VI (ISO 5) · estrutura e textura destruídas|Classe VI (ISO 5) · structure et texture détruites
BOREHOLE LOG|STRATIGRAFIA DEL SONDAGGIO|REGISTRO DEL SONDEO|PERFIL DA SONDAGEM|COUPE DE SONDAGE
Sheet {0} of {1}|Foglio {0} di {1}|Hoja {0} de {1}|Folha {0} de {1}|Feuille {0} sur {1}
Coordinates|Coordinate|Coordenadas|Coordenadas|Coordonnées
Ground level|Quota p.c.|Cota del terreno|Cota do terreno|Cote du TN
Method|Metodo|Método|Método|Méthode
Core / hole dia.|Diam. carota / foro|Diám. testigo / taladro|Diâm. testemunho / furo|Diam. carotte / forage
Inclination|Inclinazione|Inclinación|Inclinação|Inclinaison
Contractor / driller|Impresa / sondatore|Contratista / sondista|Empresa / sondador|Entreprise / sondeur
Final depth|Profondità finale|Profundidad final|Profundidade final|Profondeur finale
Water first struck|Prima venuta d'acqua|Primera aparición de agua|Primeira ocorrência de água|Première venue d'eau
Water standing|Livello stabilizzato|Nivel estabilizado|Nível estabilizado|Niveau stabilisé
Depth\\n({0})|Prof.\\n({0})|Prof.\\n({0})|Prof.\\n({0})|Prof.\\n({0})
Thick.\\n({0})|Spess.\\n({0})|Esp.\\n({0})|Esp.\\n({0})|Ép.\\n({0})
Legend|Legenda|Leyenda|Legenda|Légende
Description of strata|Descrizione stratigrafica|Descripción de los estratos|Descrição das camadas|Description des couches
Water|Acqua|Agua|Água|Eau
Tests\\nSPT N|Prove\\nSPT N|Ensayos\\nSPT N|Ensaios\\nSPT N|Essais\\nSPT N
End of borehole at {0}|Fine sondaggio a {0}|Fin del sondeo a {0}|Fim da sondagem a {0}|Fin du sondage à {0}
LEGEND|LEGENDA|LEYENDA|LEGENDA|LÉGENDE
Water first struck|Prima venuta d'acqua|Primera aparición de agua|Primeira ocorrência de água|Première venue d'eau
Water standing level|Livello stabilizzato|Nivel estabilizado|Nível estabilizado|Niveau stabilisé
TCR total core recovery · SCR solid core recovery · RQD rock quality designation · FI fracture index|TCR recupero totale · SCR recupero carota integra · RQD indice di qualità della roccia · FI indice di fratturazione|TCR recuperación total · SCR recuperación de testigo entero · RQD índice de calidad de la roca · FI índice de fracturación|TCR recuperação total · SCR recuperação de testemunho inteiro · RQD índice de qualidade da rocha · FI índice de fraturamento|TCR récupération totale · SCR récupération de carotte entière · RQD indice de qualité de la roche · FI indice de fracturation
Samples: D disturbed · B bulk · U/ST undisturbed · SS split spoon · C core · W water · ES environmental|Campioni: D rimaneggiato · B in sacco · U/ST indisturbato · SS SPT · C carota · W acqua · ES ambientale|Muestras: D alterada · B saco · U/ST inalterada · SS cuchara SPT · C testigo · W agua · ES ambiental|Amostras: D deformada · B em saco · U/ST indeformada · SS amostrador SPT · C testemunho · W água · ES ambiental|Échantillons : D remanié · B vrac · U/ST intact · SS carottier SPT · C carotte · W eau · ES environnemental
Generated {0}|Generato {0}|Generado {0}|Gerado {0}|Généré {0}
Licensed to {0}|Licenza: {0}|Licencia: {0}|Licença: {0}|Licence : {0}
DEMO VERSION|VERSIONE DEMO|VERSIÓN DEMO|VERSÃO DEMO|VERSION DÉMO
Full stratum descriptions [*]|Descrizioni complete degli strati [*]|Descripciones completas de los estratos [*]|Descrições completas das camadas [*]|Descriptions complètes des couches [*]
Remarks: |Osservazioni: |Observaciones: |Observações: |Remarques :
Core runs|Manovre di carotaggio|Maniobras|Manobras|Passes de carottage
Discontinuities|Discontinuità|Discontinuidades|Descontinuidades|Discontinuités
Samples & SPT|Campioni e SPT|Muestras y SPT|Amostras e SPT|Échantillons et SPT
Installation|Strumentazione|Instalación|Instalação|Équipement
Item|Voce|Elemento|Item|Élément
Value|Valore|Valor|Valor|Valeur
Count|N.|N.º|N.º|Nb
Dip (deg)|Incl. (°)|Buz. (°)|Merg. (°)|Pendage (°)
Infill|Riempimento|Relleno|Preenchimento|Remplissage
Ref.|Sigla|Ref.|Ref.|Réf.
SPT blows|Colpi SPT|Golpes SPT|Golpes SPT|Coups SPT
From|Da|Desde|De|De
To|A|Hasta|Até|À
Recovered ({0})|Recuperata ({0})|Recuperado ({0})|Recuperado ({0})|Récupérée ({0})
Pieces ({0})|Pezzi ({0})|Trozos ({0})|Peças ({0})|Morceaux ({0})
Response zone / screen ({0})|Tratto filtrante ({0})|Tramo ranurado ({0})|Trecho filtrante ({0})|Crépine ({0})
Seal ({0})|Tampone ({0})|Sello ({0})|Selo ({0})|Bouchon ({0})
Tip depth ({0})|Profondità punta ({0})|Profundidad de la punta ({0})|Profundidade da ponta ({0})|Profondeur de la pointe ({0})
Box {0} · {1}|Cassetta {0} · {1}|Caja {0} · {1}|Caixa {0} · {1}|Caisse {0} · {1}
not recorded|non rilevato|no registrado|não registrado|non relevé
yes|sì|sí|sim|oui
no|no|no|não|non
Thickness ({0})|Spessore ({0})|Espesor ({0})|Espessura ({0})|Épaisseur ({0})
Location|Località|Ubicación|Local|Localisation
Scale|Scala|Escala|Escala|Échelle
(continued)|(continua)|(continúa)|(continua)|(suite)
Log data|Dati della stratigrafia|Datos del registro|Dados do perfil|Données de la coupe
Core photographs|Fotografie delle carote|Fotografías de testigos|Fotografias dos testemunhos|Photographies des carottes
Description (English)|Descrizione (inglese)|Descripción (inglés)|Descrição (inglês)|Description (anglais)
`;

  // ---------- parse tables ----------
  const UI = {}; const TPL = [];
  UI_ROWS.trim().split('\n').forEach(line => {
    const p = line.replace(/\\n/g, '\n').split('|'); if (p.length < 5) return;
    const key = p[0]; UI[key] = p.slice(1, 5);
    if (/\{\d\}/.test(key)) {
      const names = []; const re = key.replace(/[.*+?^$()[\]\\]/g, '\\$&').replace(/\{(\d)\}/g, (m, n) => { names.push(+n); return '([\\s\\S]+?)'; });
      TPL.push({ key, re: new RegExp('^' + re + '$'), names });
    }
  });
  const TERM = {}; const NOUN = {}; const USCS = {};
  (CL.I18N_TERMS || '').trim().split('\n').forEach(line => {
    const c = line.indexOf(':'); const cat = line.slice(0, c); const p = line.slice(c + 1).split('|'); if (p.length < 5) return;
    if (cat === 'noun' || cat === 'uscs') {
      (cat === 'noun' ? NOUN : USCS)[p[0]] = p.slice(1, 5).map(x => { const [w, g] = x.split('@'); return { w, g: g || 'm' }; });
    } else { (TERM[cat] = TERM[cat] || {})[p[0]] = p.slice(1, 5); }
  });

  // ---------- core functions ----------
  function T(s, l = lang) {
    if (l === 'en' || s == null || s === '') return s;
    const i = IDX[l]; const k = String(s);
    if (UI[k]) return UI[k][i];
    for (const t of TPL) {
      const m = t.re.exec(k); if (!m) continue;
      let out = UI[t.key][i]; t.names.forEach((n, j) => { out = out.split('{' + n + '}').join(m[j + 1]); });
      return out;
    }
    return k;
  }
  const MARK = {
    it: { '~': ['o', 'a', 'i', 'e'], '^': ['e', 'e', 'i', 'i'], '§': ['', '', '', ''] },
    es: { '~': ['o', 'a', 'os', 'as'], '^': ['', '', 's', 's'], '§': ['', '', 's', 's'] },
    pt: { '~': ['o', 'a', 'os', 'as'], '^': ['', '', 's', 's'], '§': ['', '', 's', 's'] },
    fr: { '~': ['', 'e', 's', 'es'], '^': ['', '', 's', 's'], '§': ['', '', 's', 's'] }
  };
  const gIdx = g => ({ m: 0, f: 1, mp: 2, fp: 3 }[g] || 0);
  function agree(s, g, l) {
    const n = gIdx(g); const mk = MARK[l];
    return s.replace(/\{([^}]*)\}/g, (m, x) => { const f = x.split('/'); return f[n] ?? f[0]; }).replace(/[~^§]/g, c => mk[c][n]);
  }
  // term: category value -> display / agreed text
  function term(cat, v, g = 'm', l = lang) {
    if (!v || l === 'en') return v;
    const t = TERM[cat] && TERM[cat][v]; if (!t) return v;
    return agree(t[IDX[l]], g, l);
  }
  function noun(v, l = lang) { const n = NOUN[v]; return n ? n[IDX[l]] : null; }

  // colour phrase: "di colore grigio chiaro"
  const COL = { it: 'di colore', es: 'de color', pt: 'de cor', fr: 'de couleur' };
  function colour(iv, l) {
    const main = iv.colour, mod = iv.colourMod; if (!main && !mod) return '';
    const i = IDX[l]; const tm = main && TERM.colourMain[main], td = mod && TERM.colourMod[mod];
    let mainW = tm ? tm[i] : (main || ''); const modW = td ? td[i] : (mod || '');
    if (l === 'fr' && /\{/.test(mainW)) { const f = mainW.slice(1, -1).split('/'); mainW = modW ? f[0] : f[1]; }
    return `${COL[l]} ${[mainW, modW].filter(Boolean).join(' ')}`.trim();
  }
  const capF = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  // Layer description in a Romance language. Order: NOUN size/secondary, colour, state, moisture, plasticity/grading/shape, structure.
  function describe(iv, std, l) {
    const D = CL.DATA; const i = IDX[l]; let s = '';
    const A = (cat, v, g) => v ? term(cat, v, g, l) : '';
    if (iv.kind === 'rock') {
      const n = (NOUN[iv.rockName] || NOUN.ROCK)[i]; const g = n.g;
      const head = [n.w, colour(iv, l)].filter(Boolean).join(' ');
      s = [head, A('grain', iv.grain, g), A('rockStructure', iv.rstructure, g), A('weathering', iv.weathering, g), A('strength', iv.strength, g)].filter(Boolean).join(', ');
      if (iv.fracState) s += '. ' + capF(A('fracture', iv.fracState, g));
    } else if (iv.kind === 'soil') {
      let n, sym = '';
      if (std === 'USCS' && USCS[iv.uscs]) { n = USCS[iv.uscs][i]; sym = ` (${iv.uscs})`; }
      else n = (NOUN[iv.principal] || NOUN.SOIL)[i];
      const g = n.g;
      const u = D.uscs.find(x => x[0] === iv.uscs);
      const fine = std === 'USCS' ? (u ? /^(ML|CL|OL|MH|CH|OH|PT|CL-ML)$/.test(u[0]) : false) : ['CLAY', 'SILT', 'PEAT'].includes(iv.principal);
      const coarse = std === 'USCS' ? /^(G|S)/.test(iv.uscs || '') : ['SAND', 'GRAVEL', 'COBBLES', 'BOULDERS'].includes(iv.principal);
      const isSand = std === 'USCS' ? /^S/.test(iv.uscs || '') : iv.principal === 'SAND';
      const graded = std === 'USCS' && /^(GW|GP|SW|SP)/.test(iv.uscs || '');
      const head = [n.w, isSand ? A('sandSize', iv.sandSize, g) : '', A('secondary', iv.secondary, g)].filter(Boolean).join(' ') + sym;
      const state = fine ? A('consistency', iv.consistency, g) : (coarse ? A('density', iv.density, g) : '');
      s = [head, colour(iv, l), state, A('moisture', iv.moisture, g), fine ? A('plasticity', iv.plasticity, g) : '',
        coarse && !graded ? A('grading', iv.grading, g) : '', coarse ? A('shape', iv.shape, g) : '', A('soilStructure', iv.structure, g)].filter(Boolean).join(', ');
    } else s = iv.desc || '';
    if (iv.notes) s += (s ? '. ' : '') + iv.notes.trim();
    return s.replace(/\s+/g, ' ').replace(/[,:]\s*$/, '').trim() + (s && !/[.!?]$/.test(s.trim()) ? '.' : '');
  }

  // gender of the noun currently described (to show picklist terms in the right form)
  function genderOf(iv, std, l = lang) {
    if (l === 'en' || !iv) return 'm'; const i = IDX[l];
    if (iv.kind === 'rock') return ((NOUN[iv.rockName] || NOUN.ROCK)[i]).g;
    if (std === 'USCS' && USCS[iv.uscs]) return USCS[iv.uscs][i].g;
    return ((NOUN[iv.principal] || NOUN.SOIL)[i]).g;
  }
  function nounLabel(v, l = lang) { const n = NOUN[v]; return n && l !== 'en' ? n[IDX[l]].w : v; }
  function uscsLabel(code, en, l = lang) { const n = USCS[code]; return n && l !== 'en' ? n[IDX[l]].w : en; }

  function set(l) { lang = LANGS.some(x => x[0] === l) ? l : 'en'; document.documentElement.lang = lang; }
  function detect() { const n = (navigator.language || 'en').slice(0, 2).toLowerCase(); return IDX[n] !== undefined ? n : 'en'; }

  CL.I18N = {
    LANGS, T, term, noun, nounLabel, uscsLabel, describe, genderOf, set, detect,
    get lang() { return lang; }
  };
})();
