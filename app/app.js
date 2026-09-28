const categories={
  food:{label:"Φαγητό",icon:"🍽️"},
  wineries:{label:"Οινοποιεία",icon:"🍷"},
  sights:{label:"Αξιοθέατα",icon:"🏛️"},
  beaches:{label:"Παραλίες",icon:"🏖️"},
  experiences:{label:"Εμπειρίες",icon:"✨"},
  instagram:{label:"Φωτογραφίες",icon:"📸"},
  hotels:{label:"Ξενοδοχεία",icon:"🏨"},
  villages:{label:"Χωριά",icon:"🏘️"}
};

// Google Maps stars (rating + review count) are hardcoded per place, as shown on Google Maps.
// Places without a checked Google rating show a plain "Google Maps" link instead of stars.
const RATINGS_AS_OF="Σεπτ. 2026";

// ΠΩΣ ΠΡΟΣΘΕΤΩ ΜΕΡΟΣ (αντίγραψε μια γραμμή και άλλαξέ την):
// {by:"Pantelis", n:"Όνομα", id:"ChIJ... (Google place id, προαιρετικό)", c:[γεωγρ.πλάτος,γεωγρ.μήκος],
//  cat:"food|sights|beaches|experiences|instagram|hotels", day:"fri|sat|sun|mon" ή ["fri","mon"],
//  type:"Είδος · Περιοχή", rating:4.5, reviews:1234, price:"€€", hours:"9:00–17:00",
//  tag:"προειδοποίηση", d:"Η περιγραφή σου."}
const spots=[
  // ΟΙΝΟΠΟΙΕΙΑ · κεντρική Mallorca (DO Binissalem και Pla i Llevant)
  {by:"Pantelis",n:"Bodega Ribas",id:"ChIJI0_h7qjBlxIR0Vx327vBTV4",c:[39.6676,2.8144],cat:"wineries",day:"all",type:"Consell · από το 1711",rating:4.9,reviews:438,hours:"Δευ–Σαβ 10:00–18:00, Κυρ κλειστά",tag:"Μόνο με κράτηση",d:"Η παλαιότερη ενεργή bodega της Mallorca, ίδια οικογένεια πάνω από δέκα γενιές. Αρχοντικό του 18ου αιώνα με παλιό βαρελόκελλαρο και νέα πτέρυγα του Rafael Moneo. C/ Muntanya 2."},
  {by:"Pantelis",n:"Bodegues José L. Ferrer",c:[39.6864,2.8347],cat:"wineries",day:"all",type:"Binissalem · από το 1931",rating:4.5,reviews:430,tag:"Θέλει κράτηση",d:"Από τα πιο ιστορικά και γνωστά ονόματα του νησιού, τέσσερις γενιές στην ίδια δουλειά. Πολύ χαρακτηριστικό της οινικής παράδοσης της Mallorca. Conquistador 103."},
  {by:"Pantelis",n:"Macià Batle",c:[39.6553,2.7672],cat:"wineries",day:"all",type:"Santa Maria del Camí · από το 1856",tag:"Κυριακή κλειστά",d:"Ιστορικό όνομα με σύγχρονο κτίριο του 1996. Ξενάγηση στην παραγωγή και δοκιμή κρασιών με τοπικά προϊόντα. Camí de Coanegra."},
  {by:"Pantelis",n:"Miquel Oliver Vinyes i Bodegues",c:[39.6137,3.1020],cat:"wineries",day:"all",type:"Petra · από το 1912",tag:"Θέλει κράτηση",d:"Γνωστό ιστορικό όνομα της οικογένειας Oliver, με έμφαση σε ντόπιες ποικιλίες. Στο Petra, ανατολικά, C/ Font 26."},
  // DEIÀ · Google Maps ratings/review counts checked Sep 2026.
  {by:"Pantelis",n:"Cala Deià",q:"Cala Deià, Mallorca, Spain",c:[39.7589,2.6412],cat:"beaches",day:"all",type:"Deià · rocky cove",rating:4.2,reviews:5500,photo:"https://www.barcoscalobra.com/wp-content/uploads/2019/05/Cala-deia-1.jpg",d:"Μικρός βραχώδης όρμος κάτω από το Deià, με καθαρά νερά, βράχια και τα δύο γνωστά παραθαλάσσια εστιατόρια. Ο δρόμος και το parking είναι στενά — καλύτερα νωρίς."},
  {by:"Pantelis",n:"Ca’s Patró March",q:"Ca's Patró March, Cala Deià, Mallorca, Spain",c:[39.7588,2.6411],cat:"food",day:"all",type:"Cala Deià · seafood",rating:4.0,reviews:2115,price:"€€€",photo:"https://cdn.travelpal.ai/prod/places/xSIJV5v-UTva-NUGVtjNBhnDldT/photos/google/webp/5e148f5287de7005c48abe84.webp",tag:"Καλύτερα με κράτηση",d:"Διάσημο seafood spot ακριβώς πάνω στην Cala Deià, με τραπέζια δίπλα στο νερό και πολύ χαρακτηριστικό σκηνικό. Η κράτηση συνιστάται έντονα."},
  {by:"Pantelis",n:"Ca’n Lluc",q:"Ca'n Lluc, Cala Deià, Mallorca, Spain",c:[39.7587,2.6415],cat:"food",day:"all",type:"Cala Deià · seafood",rating:4.0,reviews:467,price:"€€",photo:"https://i0.wp.com/maksyboats.com/wpm/wp-content/uploads/2025/05/can-lluc-restaurant-cala-deia-mallorca.webp?resize=825%2C507&ssl=1",tag:"Καλύτερα με κράτηση",d:"Οικογενειακό παραθαλάσσιο chiringuito πάνω στο νερό, με φρέσκο ψάρι και θαλασσινά και πολύ χαλαρό σκηνικό."},
  {by:"Anna",n:"El Camino",q:"El Camino, Palma, Mallorca, Spain",c:[39.5712,2.6472],cat:"food",day:"all",type:"Palma old town · tapas",rating:4.7,reviews:3181,price:"€40–100",hours:"Lunch until 15:45 · dinner from 18:00",tag:"Καλύτερα με κράτηση",photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/c0/1a/ad/caption.jpg?h=500&s=1&w=900",d:"Tapas restaurant στο κέντρο της παλιάς πόλης. Δοκίμασε το courgette flower με goat’s cheese."},
  {by:"Anna",n:"Tast Club",q:"Tast Club, Palma, Mallorca, Spain",c:[39.5716,2.6474],cat:"food",day:"all",type:"Palma old town · Spanish & tapas",rating:4.4,reviews:1934,price:"€30–60",hours:"Έως 01:00",tag:"Reservable on Google Maps",d:"Κρυφή είσοδος στην Carrer de Sant Jaume. Ισπανικό restaurant με intimate ατμόσφαιρα."},
  {by:"Anna",n:"DÔME Restaurant and lounge",q:"DÔME Restaurant and lounge, Palma, Mallorca, Spain",c:[39.5713,2.6501],cat:"food",day:"all",type:"Palma old town · restaurant & lounge",rating:4.5,reviews:788,price:"€20–50",hours:"Έως 23:00",tag:"DJ weekends · Reservable on Google Maps",photo:"https://uh.gsstatic.es/sfAttachPlugin/3214983.jpg",d:"Underground restaurant/lounge, με DJ τα weekends."},
  {by:"Anna",n:"Pasta e Pesto",q:"Pasta e Pesto, Palma, Mallorca, Spain",c:[39.5709,2.65],cat:"food",day:"all",type:"Palma old town · fresh pasta",rating:4.8,reviews:786,price:"€10–20",hours:"Έως 22:30",d:"Φρέσκια pasta που φτιάχνεται μπροστά σου. Κάτσε στον πάγκο."},
  {by:"Anna",n:"Bibap",q:"Bibap, Palma, Mallorca, Spain",c:[39.572,2.649],cat:"food",day:"all",type:"Palma old town · Korean & Asian",rating:4.3,reviews:1656,price:"€20–30",hours:"Έως 22:30",photo:"https://www.traveltozero.com/es/explora/gastronomia/bi-bap-restaurante-palma",d:"Κορεάτικο και ασιατικό. Δοκίμασε το duck bibimbap."},
  {by:"Anna",n:"Restaurante El Cuerno",q:"Restaurante El Cuerno, Palma, Mallorca, Spain",c:[39.5679,2.648],cat:"food",day:"all",type:"Palma old town · Mediterranean",rating:4.2,reviews:696,price:"€20–30",hours:"Έως 23:00",tag:"Reservable on Google Maps",d:"Μεσογειακό restaurant κοντά στον καθεδρικό, γνωστό για τη sangria."},
  {by:"Anna",n:"Bacán",q:"Bacán Specialty Coffee & Brunch, Palma, Mallorca, Spain",c:[39.5705,2.6507],cat:"food",day:"all",type:"Palma old town · coffee & brunch",rating:4.7,reviews:714,price:"€10–20",hours:"Έως 15:00",tag:"Ζήτα τραπέζι στο πίσω patio",d:"Specialty coffee και brunch."},
  {by:"Anna",n:"Fika Farina",q:"Fika Farina, Palma, Mallorca, Spain",c:[39.5693,2.6545],cat:"food",day:"all",type:"Palma · coffee & bakery",rating:4.8,reviews:1871,price:"€1–10",hours:"Έως 20:00",d:"Coffee και bakery. Δοκίμασε cardamom και cinnamon buns."},
  {by:"Anna",n:"La Rosa Vermutería & Colmado",q:"La Rosa Vermutería & Colmado, Palma, Mallorca, Spain",c:[39.5718,2.6502],cat:"food",day:"all",type:"Palma old town · vermouth bar",rating:4.5,reviews:7727,price:"€20–40",hours:"Έως midnight",tag:"Reservable on Google Maps",d:"Vermouth bar και grill στο Sant Jaume. Δοκίμασε το house vermouth."},
  {by:"Anna",n:"Bar Nicolás",q:"Bar Nicolás, Palma, Mallorca, Spain",c:[39.571,2.65],cat:"food",day:"all",type:"Palma old town · cocktail bar",rating:4.4,reviews:1025,price:"€10–20",hours:"Έως 02:00",photo:"https://img3.restaurantguru.com/ca98-Pub-and-bar-Bar-Nicolas-exterior.jpg",d:"Cocktail bar στην Plaça del Mercat. Δωρεάν popcorn ή crisps με κάθε drink."},
  {by:"Anna",n:"Bar Central",q:"Bar Central, Palma, Mallorca, Spain",c:[39.5719,2.6484],cat:"food",day:"all",type:"Palma old town · bar",rating:3.2,reviews:277,price:"€10–20",hours:"Έως 00:30",d:"Bar στην πλατεία, καλό για people-watching."},
  {by:"Anna",n:"Bar Rey Sancho",q:"Bar Rey Sancho, Palma, Mallorca, Spain",c:[39.5845,2.656],cat:"food",day:"all",type:"Arxiduc · restaurant & natural wine",rating:4.9,reviews:260,price:"€20–30",hours:"Lunch until 15:30 · dinner from 19:30",d:"Restaurant με πολύ καλή επιλογή natural wines, περίπου 15 λεπτά βόρεια από το old town."},
  {by:"Anna",n:"Primo Taquería",q:"Primo Taquería, Palma, Mallorca, Spain",c:[39.5719,2.6365],cat:"food",day:"all",type:"Santa Catalina · Mexican",rating:4.4,reviews:3327,price:"€20–30",hours:"Έως midnight",tag:"Reservable on Google Maps",d:"Mexican στη Santa Catalina. Τα frozen margaritas είναι δημοφιλή και δυνατά."},
  {by:"Anna",n:"Hotel Hostal Cuba Skybar",q:"Hotel Hostal Cuba Skybar, Palma, Mallorca, Spain",c:[39.5684,2.635],cat:"food",day:"all",type:"Santa Catalina · rooftop bar",rating:3.4,reviews:144,price:"€10–20",hours:"Από 16:30",photo:"https://static.wixstatic.com/media/37bc90_eaf6f59f4ad9465bbb716599f1ea7d38~mv2.jpg/v1/fill/w_1000,h_1000,al_c,q_85,usm_0.66_1.00_0.01/37bc90_eaf6f59f4ad9465bbb716599f1ea7d38~mv2.jpg",d:"Rooftop bar με θέα στον καθεδρικό και τον κόλπο. Πήγαινε στο sunset."},
  {by:"Anna",n:"Bacán (Seafront)",q:"Bacán Specialty Coffee, Palma, Mallorca, Spain",c:[39.568,2.64],cat:"food",day:"all",type:"Seafront promenade · specialty coffee",rating:4.9,reviews:117,price:"€1–10",hours:"Έως 15:00",d:"Espresso bar στην παραλιακή, με θέα στη μαρίνα."},
  {by:"Anna",n:"El Olivo",q:"El Olivo, Deià, Mallorca, Spain",c:[39.7482,2.648],cat:"food",day:"all",type:"Deià · fine dining",rating:4.3,reviews:471,price:"€100+",hours:"Dinner from 19:30",tag:"Book ahead for terrace at sunset",d:"Fine dining στο Deià. Η terrace είναι ιδιαίτερα ωραία στο sunset."},
  {by:"Anna",n:"Foradada Mar Restaurant",q:"Foradada Mar Restaurant, Son Marroig, Deià, Mallorca, Spain",c:[39.753,2.623],cat:"food",day:"all",type:"Son Marroig · restaurant",rating:4.1,reviews:81,price:"€50–100",hours:"Lunch · closes 16:00",tag:"Reservable on Google Maps",d:"Restaurant κοντά στο Son Marroig, γνωστό για seafood paella."},
  {by:"Anna",n:"Roseta Valldemossa",q:"Roseta Valldemossa, Mallorca, Spain",c:[39.7102,2.6227],cat:"food",day:"all",type:"Valldemossa · café & shop",rating:4.7,reviews:114,hours:"Daytime · closes 16:00",d:"Café και shop στη Valldemossa. Το window seat έχει θέα στα βουνά."},
  {by:"Anna",n:"Jumeirah Mallorca",q:"Jumeirah Mallorca, Port de Sóller, Mallorca, Spain",c:[39.7968,2.696],cat:"food",day:"all",type:"Port de Sóller · 5-star hotel bar",rating:4.6,reviews:1176,d:"5-star hotel bar με πανοραμική θέα στον κόλπο. Sunset drink."},
  {by:"Anna",n:"OCRE Restaurant & Bar, Can Ferrereta",q:"OCRE Restaurant & Bar, Can Ferrereta, Santanyí, Mallorca, Spain",c:[39.3548,3.129],cat:"food",day:"all",type:"Santanyí · Mediterranean",rating:4.7,reviews:151,hours:"Dinner from 19:00",tag:"Reservable on Google Maps",d:"Mediterranean restaurant στο Can Ferrereta, με outdoor patio."},
  {by:"Anna",n:"Restaurante Es Figueral",q:"Restaurante Es Figueral, Santanyí, Mallorca, Spain",c:[39.345,3.115],cat:"food",day:"all",type:"Inland · restaurant",rating:4.8,reviews:180,price:"€50–90",hours:"Dinner from 19:00",d:"Garden setting στην ενδοχώρα, με ζώα να κυκλοφορούν στον χώρο."},
  {by:"Anna",n:"Restaurante Paparazzi",q:"Restaurante Paparazzi, Cala d'Or, Mallorca, Spain",c:[39.378,3.234],cat:"food",day:"all",type:"Cala d'Or · Mediterranean",rating:4.2,reviews:1438,price:"€20–30",hours:"Έως 23:00",d:"Casual Mediterranean restaurant στην Cala d’Or, με καλό value."},
  {by:"Anna",n:"Roosevelvet Bakery",q:"Rosevelvet Bakery, Palma, Mallorca, Spain",c:[39.5707,2.6553],cat:"food",day:"all",type:"Arxiduc · bakery",d:"Bakery που φαίνεται να βρίσκεται κοντά στο Bar Rey Sancho. Έλεγξε το ωράριο πριν πας."},
  {by:"Anna",n:"Serra de Tramuntana",q:"Serra de Tramuntana, Mallorca, Spain",c:[39.76,2.7],cat:"sights",day:"all",type:"Mountain range · UNESCO",d:"Η Serra de Tramuntana είναι η ορεινή ραχοκοκαλιά της δυτικής Mallorca και το σκηνικό για Deià, Valldemossa, Sóller και Fornalutx."},
  {by:"Web research",n:"La Seu Cathedral",q:"Catedral de Mallorca, Palma, Spain",c:[39.5676,2.6489],cat:"sights",day:"mon",type:"Palma · Gothic cathedral",rating:4.6,reviews:16417,d:"Το πιο χαρακτηριστικό landmark της Palma, πάνω ακριβώς στο waterfront."},
  {by:"Web research",n:"Palau de l’Almudaina",q:"Palau de l'Almudaina, Palma, Spain",c:[39.5678,2.6487],cat:"sights",day:"mon",type:"Palma · royal palace",d:"Βασιλικό παλάτι δίπλα στη La Seu, με αυλή και ιστορικά δωμάτια."},
  {by:"Web research",n:"Castell de Bellver",q:"Castell de Bellver, Palma, Spain",c:[39.5631,2.6198],cat:"sights",day:"mon",type:"Palma · castle & viewpoint",rating:4.5,reviews:26852,d:"Κυκλικό κάστρο πάνω από την Palma με πανοραμική θέα στον κόλπο."},
  {by:"Web research",n:"Arab Baths",q:"Banys Àrabs, Palma, Spain",c:[39.5707,2.6503],cat:"sights",day:"mon",type:"Palma · historic baths",d:"Μικρό αλλά ιδιαίτερο κατάλοιπο της αραβικής Palma μέσα στην παλιά πόλη."},
  {by:"Web research",n:"Mirador des Colomer",q:"Mirador des Colomer, Mallorca, Spain",c:[39.9275,3.1983],cat:"sights",day:"sat",type:"Formentor · cliff viewpoint",rating:4.8,reviews:11528,d:"Από τα πιο διάσημα viewpoints του νησιού, πάνω από τους απόκρημνους βράχους του Formentor."},
  {by:"Web research",n:"Talaia d’Albercutx",q:"Talaia d'Albercutx, Mallorca, Spain",c:[39.9308,3.2074],cat:"sights",day:"sat",type:"Formentor · historic tower",d:"Παλιός πύργος-παρατηρητήριο με εντυπωσιακή θέα στην ακτογραμμή."},
  {by:"Web research",n:"Sa Calobra",q:"Sa Calobra, Mallorca, Spain",c:[39.8504,2.7984],cat:"sights",day:"sat",type:"Tramuntana · scenic road",d:"Διάσημη ορεινή διαδρομή και δραματικό coastal scenery προς το Torrent de Pareis."},
  {by:"Web research",n:"Torrent de Pareis",q:"Torrent de Pareis, Mallorca, Spain",c:[39.8534,2.8018],cat:"sights",day:"sat",type:"Tramuntana · gorge",d:"Εμβληματικό φαράγγι της Tramuntana, ένα από τα πιο εντυπωσιακά φυσικά τοπία της Mallorca."},
  {by:"Web research",n:"Son Marroig",q:"Son Marroig, Deià, Mallorca, Spain",c:[39.7505,2.6208],cat:"sights",day:"sat",type:"Deià · historic estate & viewpoint",d:"Ιστορικό κτήμα πάνω από τη θάλασσα με θέα στη Sa Foradada."},
  {by:"Web research",n:"Sa Foradada",q:"Sa Foradada, Deià, Mallorca, Spain",c:[39.7525,2.6200],cat:"sights",day:"sat",type:"Deià · rock viewpoint",d:"Εμβληματικός βράχος με τρύπα στη θάλασσα και κλασικό sunset viewpoint."},
  {by:"Web research",n:"Capdepera Castle",q:"Castell de Capdepera, Mallorca, Spain",c:[39.7021,3.4337],cat:"sights",day:"all",type:"Castle · medieval fortress",rating:4.5,reviews:9760,d:"Μεσαιωνικό κάστρο πάνω από την Capdepera με θέα προς την ανατολική ακτή."},
  {by:"Web research",n:"Castell d’Alaró",q:"Castell d'Alaró, Mallorca, Spain",c:[39.7356,2.7872],cat:"sights",day:"all",type:"Castle · mountain hike",rating:4.8,reviews:807,d:"Εντυπωσιακό mountain castle σε κορυφή· θέλει πεζοπορία."},
  {by:"Web research",n:"Cuevas del Drach",q:"Cuevas del Drach, Porto Cristo, Mallorca, Spain",c:[39.5337,3.3295],cat:"experiences",day:"all",type:"Caves · underground lake",rating:4.0,reviews:13614,d:"Μεγάλο σύστημα σπηλαίων με τη λίμνη Martel και μουσική παράσταση μέσα στο σπήλαιο."},
  {by:"Web research",n:"Cuevas de Artà",q:"Cuevas de Artà, Mallorca, Spain",c:[39.6567,3.4498],cat:"experiences",day:"all",type:"Caves · guided visit",d:"Εντυπωσιακές σπηλιές με τεράστιους σταλακτίτες και θέα προς την ανατολική ακτή."},
  {by:"Web research",n:"Tren de Sóller",q:"Tren de Sóller, Mallorca, Spain",c:[39.7668,2.7148],cat:"experiences",day:"sat",type:"Vintage railway · Palma–Sóller",d:"Ιστορικό ξύλινο τρένο ανάμεσα σε Palma και Sóller."},
  {by:"Web research",n:"Palma Aquarium",q:"Palma Aquarium, Mallorca, Spain",c:[39.5375,2.7190],cat:"experiences",day:"all",type:"Aquarium · marine life",rating:4.4,reviews:33516,d:"Μεγάλο aquarium στη Palma, καλή εναλλακτική αν ο καιρός χαλάσει."},
  {by:"Web research",n:"Safari Mallorca",q:"Safari Mallorca, Cala Millor, Mallorca, Spain",c:[39.6045,3.3730],cat:"experiences",day:"all",type:"Safari park · wildlife",rating:3.8,reviews:6276,d:"Safari-style park στην ανατολική Mallorca με ζώα και διαδρομή μέσα στο πάρκο."},
  {by:"Web research",n:"s’Albufereta",q:"Reserva Natural de s'Albufereta, Mallorca, Spain",c:[39.8904,3.0870],cat:"experiences",day:"fri",type:"Nature reserve · birds",rating:4.5,reviews:269,d:"Υγροτοπικός βιότοπος κοντά στην Alcúdia, καλός για birdwatching."},
  {by:"Web research",n:"Península de Llevant",q:"Parc Natural de la Península de Llevant, Artà, Mallorca, Spain",c:[39.7170,3.3420],cat:"experiences",day:"all",type:"Nature park · hiking",rating:4.8,reviews:775,d:"Μεγάλη προστατευόμενη περιοχή με μονοπάτια, ακτές και άγριο τοπίο."},
  {by:"Web research",n:"Es Trenc",q:"Es Trenc, Mallorca, Spain",c:[39.3178,2.9946],cat:"beaches",day:"all",type:"South · long natural beach",d:"Μεγάλη φυσική αμμουδιά με διάφανα νερά και αίσθηση πιο άγριας παραλίας."},
  {by:"Web research",n:"Cala Agulla",q:"Cala Agulla, Mallorca, Spain",c:[39.7207,3.4611],cat:"beaches",day:"all",type:"East · pine-backed beach",d:"Μεγάλη αμμώδης παραλία ανάμεσα σε πεύκα και λόφους."},
  {by:"Web research",n:"Cala Mesquida",q:"Cala Mesquida, Mallorca, Spain",c:[39.7388,3.4325],cat:"beaches",day:"all",type:"East · dune beach",d:"Ανοιχτή παραλία με αμμόλοφους και καθαρά νερά."},
  {by:"Web research",n:"Cala Llombards",q:"Cala Llombards, Mallorca, Spain",c:[39.3164,3.1398],cat:"beaches",day:"all",type:"Southeast · cove",d:"Μικρή τιρκουάζ cala ανάμεσα σε βράχια, κοντά στο Santanyí."},
  {by:"Web research",n:"Caló des Moro",q:"Caló des Moro, Mallorca, Spain",c:[39.3125,3.1197],cat:"beaches",day:"all",type:"Southeast · iconic cove",d:"Μία από τις πιο φωτογραφημένες μικρές calas της Mallorca, με κρυστάλλινα νερά."},
  {by:"Web research",n:"Cala Santanyí",q:"Cala Santanyí, Mallorca, Spain",c:[39.3263,3.1451],cat:"beaches",day:"all",type:"Southeast · sandy cove",d:"Εύκολη και οργανωμένη cala κοντά στο Santanyí, με καθαρά νερά."},
  {by:"Web research",n:"Cala Pi",q:"Cala Pi, Mallorca, Spain",c:[39.3611,2.8288],cat:"beaches",day:"all",type:"South · narrow cove",rating:4.3,reviews:4101,d:"Στενή, ψηλή cala με πεύκα και καθαρά νερά."},
  {by:"Web research",n:"Cala Tuent",q:"Cala Tuent, Mallorca, Spain",c:[39.8214,2.7825],cat:"beaches",day:"sat",type:"Tramuntana · wild cove",d:"Άγρια παραλία κάτω από τα βουνά της Tramuntana."},
  {by:"Web research",n:"Portals Vells",q:"Portals Vells, Mallorca, Spain",c:[39.4872,2.5204],cat:"beaches",day:"all",type:"Southwest · three-finger bay",d:"Μικρός κόλπος με τρεις στενές εισόδους στη θάλασσα, πεύκα και μικρές αμμουδιές."},
  {by:"Web research",n:"Cala Major",q:"Cala Major, Palma, Spain",c:[39.5530,2.6070],cat:"beaches",day:"mon",type:"Palma · city beach",rating:4.4,reviews:12907,d:"Μεγάλη εύκολη παραλία πολύ κοντά στην Palma."},
  {by:"Web research",n:"S’Amarador",q:"S'Amarador, Mallorca, Spain",c:[39.3459,3.1888],cat:"beaches",day:"sun",type:"Mondragó · natural beach",rating:4.5,reviews:1713,d:"Φυσική παραλία μέσα στο Mondragó, με τιρκουάζ νερά και πεύκα."},
  {by:"Web research",n:"Mirador del Pontàs",q:"Mirador del Pontàs, Cala Santanyí, Mallorca, Spain",c:[39.3267,3.1550],cat:"sights",day:"sun",type:"Cala Santanyí · sea arch viewpoint",rating:4.8,reviews:1715,d:"Θέα στον χαρακτηριστικό βραχώδη θαλάσσιο σχηματισμό Pontàs."},
  {by:"Web research",n:"Punta de n’Amer",q:"Castell de la Punta de n'Amer, Mallorca, Spain",c:[39.5620,3.3820],cat:"sights",day:"all",type:"Coastal fortress · nature",rating:4.5,reviews:6328,d:"Μικρό κάστρο πάνω σε προστατευμένη χερσόνησο, με μονοπάτι και θάλασσα."}
];

// Villages on the day trips. gid = Google place id (used to open the right place in Google Maps).
function village(id,name,gid,c,day,description,rating=null,reviews=null,photo=""){return {id:id,name:name,gid:gid,c:c,day:day,data:{description:description,photos:photo?[photo]:[],rating:rating,reviews:reviews,food:[],sights:[],experiences:[],instagram:[],hotels:[],notes:[],by:"Pantelis",parking:"",route:""}};}
// village("id","Όνομα","Google place id",[lat,lng],"sat|all","Περιγραφή")
// day:"all" = φαίνεται σε όλες τις μέρες, χωρίς να είναι στάση.
const villages=[
  village("fornalutx","Fornalutx","",[39.7822,2.7410],"sat","Ίσως το πιο παραμυθένιο μικρό χωριό του νησιού. Σκαλιστά πέτρινα σοκάκια, 10 λεπτά από το Sóller."),
  village("valldemossa","Valldemossa","",[39.7115,2.6226],"sat","Πέτρινα σοκάκια, λουλούδια και βουνό γύρω γύρω."),
  village("deia","Deià","",[39.7486,2.6486],"all","Πέτρινο χωριό σκαρφαλωμένο στην πλαγιά, με θέα στη θάλασσα.",4.6,1052,"https://www.hola.com/horizon/square/6f8e6754512a-2xk6xtn.jpg?im=Resize%3D%28960%29%2Ctype%3Ddownsize"),
  village("soller","Sóller","",[39.7671,2.7158],"sat","Μεγαλύτερο και με περισσότερη ζωή. Συνδυάζει βουνό, χωριό και το Port de Sóller."),
  village("pollenca","Pollença","",[39.8760,3.0176],"sat","Ιστορική πλατεία, Calvari steps και καφές πριν την ανηφόρα προς Formentor."),
  village("alcudia","Alcúdia Old Town","",[39.8525,3.1192],"fri","Πολύ όμορφο αλλά σε άλλο στιλ: μεσαιωνικό, μέσα στα παλιά τείχη."),
  village("santanyi","Santanyí","",[39.3545,3.1290],"sun","Χωριό από χρυσαφί πέτρα στα νοτιοανατολικά, κοντά στις calas. Έχει αγορά Τετάρτη και Σάββατο, μέχρι τις 14:00.")
];

const areas=[
];

const days=[
  {id:"fri",label:"Παρ 16",title:"Παρασκευή 16 · Airport → Alcúdia",sub:"Νερά → φύση → φαγητό με θέα → Alcúdia",plan:[
    ["Άφιξη","✈️ Airport → rental","Παίρνετε το αυτοκίνητο και ξεκινάτε βόρεια.","experiences","Airport → Playa de Muro"],
    ["Πρώτη στάση","Playa de Muro","Τιρκουάζ νερά, μεγάλη αμμουδιά και πρώτη βουτιά/βόλτα στη θάλασσα.","beaches","Playa de Muro → s'Albufera"],
    ["Φύση","s'Albufera","Μικρή βόλτα στο φυσικό πάρκο και birdwatching.","experiences","s'Albufera → Alcúdia"],
    ["Φαγητό","Port d’Alcúdia","Lunch/seafood δίπλα στη θάλασσα και χαλαρή βόλτα στη μαρίνα.","food","Port d’Alcúdia → Alcúdia Old Town"],
    ["Απόγευμα","Alcúdia Old Town","Μεσαιωνικά τείχη, παλιά σοκάκια και μικρά shops.","villages","Alcúdia"],
    ["Βράδυ","Alcúdia","Sunset και dinner στην παλιά πόλη ή στο port.","food","Μένουμε Alcúdia"]
  ]},
  {id:"sat",label:"Σαβ 17",title:"Σάββατο 17 · Tramuntana Road Trip",sub:"Pollença → Formentor → Sóller → Deià → Valldemossa → Alcúdia",plan:[
    ["Πρωί","Pollença","Calvari steps + Plaça Major + καφές.","villages","Alcúdia → Pollença"],
    ["Πρωί","Formentor","Mirador Es Colomer + Talaia d’Albercutx + scenic drive προς το cap.","sights","Pollença → Formentor"],
    ["Μεσημέρι","Formentor Beach","Παραλία και lunch δίπλα στο νερό.","beaches","Formentor → Sóller"],
    ["Απόγευμα","Sóller","Πλατεία, παλιά πόλη και κάτι γλυκό/παγωτό.","villages","Sóller → Port de Sóller"],
    ["Απόγευμα","Port de Sóller","Λιμάνι, θάλασσα και drink/φαγητό με θέα.","beaches","Port de Sóller → Deià"],
    ["Αργά","Deià","Πέτρινο χωριό + Cala Deià / seafood αν υπάρχει χρόνος.","villages","Deià → Valldemossa"],
    ["Βράδυ","Valldemossa","Βόλτα στα σοκάκια + coca de patata.","villages","Valldemossa → Alcúdia"]
  ]},
  {id:"sun",label:"Κυρ 18",title:"Κυριακή 18 · Alcúdia → Southeast → Palma",sub:"Sunday Market → Coll Baix → Santanyí → Cala Figuera → Mondragó → Cala d’Or → Palma",plan:[
    ["Πρωί","Alcúdia Sunday Market","Αγορά Κυριακής στην παλιά πόλη + medieval walls.","experiences","Alcúdia → Coll Baix"],
    ["Πρωί","Coll Baix","Wild north-coast beach και σύντομη coastal walk.","beaches","Coll Baix → Santanyí"],
    ["Μεσημέρι","Santanyí","Old town, Plaça Major και lunch / shops.","villages","Santanyí → Cala Figuera"],
    ["Μεσημέρι","Cala Figuera","Χαρακτηριστικό fishing harbour για βόλτα και φωτογραφίες.","beaches","Cala Figuera → Cala Mondragó"],
    ["Απόγευμα","Cala Mondragó / S’Amarador","Turquoise beach + σύντομη φύση στο Mondragó.","beaches","Mondragó → Portopetro"],
    ["Αργά απόγευμα","Portopetro","Μικρό φυσικό λιμάνι για drink / ice cream.","villages","Portopetro → Cala d’Or"],
    ["Αργά απόγευμα","Cala d’Or","Marina + μικρές calas πριν την τελευταία διαδρομή.","beaches","Cala d’Or → Palma"],
    ["Βράδυ","Palma","Check-in, dinner και drinks.","food","Μένουμε Palma"]
  ]},
  {id:"mon",label:"Δευ 19",title:"Δευτέρα 19 · Palma → Airport",sub:"Τελευταία Palma → αεροδρόμιο",plan:[
    ["Πρωί","Palma Old Town","Τελευταία βόλτα, Cathedral/Arab Baths και καφές.","villages","Palma"],
    ["Late morning","Mercat de l’Olivar","Breakfast/brunch και τελευταία local γεύση.","food","Palma → Airport"],
    ["Αναχώρηση","✈️ Airport","Rental return και πτήση.","experiences","Palma → Airport"]
  ]}
];
let currentDay="fri";
const leafletReady=typeof window.L!=="undefined";
const map=leafletReady?L.map("map",{zoomControl:true}).setView([39.570,2.648],14):null;
if(leafletReady)L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(map);
const areaLayer=leafletReady?L.layerGroup().addTo(map):null;
if(!leafletReady){const mapEl=document.querySelector("#map");if(mapEl){mapEl.innerHTML="<div class='map-fallback'><strong>Ο χάρτης δεν φόρτωσε</strong><span>Το πρόγραμμα του ταξιδιού είναι κανονικά πιο κάτω.</span></div>";}}
if(leafletReady)areas.forEach(a=>{const poly=L.polygon(a.p,{color:"#18211d",weight:1,fillOpacity:.12});poly.bindPopup("<strong>"+a.icon+" "+a.n+"</strong><br><small>"+a.type+"</small><br>"+a.d);poly.on("click",()=>focusArea(a.id));poly.addTo(areaLayer);});
// Day-trip routes. Each stop's name matches a spot or village above, which supplies stars, tips and the Google Maps link.
// ΠΩΣ ΦΤΙΑΧΝΩ ΔΙΑΔΡΟΜΗ ΜΕΡΑΣ:
// sat:{stops:[{n:"Όνομα στάσης",c:[lat,lng],type:"food|beach|village|sight",size:"long|small"}]}
// Το "long" = μεγάλη στάση (μεγαλύτερη πινέζα). Το όνομα ταιριάζει με μέρος από τη λίστα spots.
const routes={
  fri:{stops:[
    {n:"Airport",c:[39.5517,2.7388],type:"sight",size:"long"},
    {n:"Playa de Muro",c:[39.7942,3.1174],type:"beach",size:"long"},
    {n:"s'Albufera",c:[39.7881,3.1068],type:"sight",size:"long"},
    {n:"Port d’Alcúdia",c:[39.8412,3.1315],type:"beach",size:"long"},
    {n:"Alcúdia Old Town",c:[39.8525,3.1192],type:"village",size:"long"}
  ]},
  sat:{stops:[
    {n:"Alcúdia Old Town",c:[39.8525,3.1192],type:"village",size:"long"},
    {n:"Pollença",c:[39.8760,3.0176],type:"village",size:"long"},
    {n:"Formentor",c:[39.9596,3.2099],type:"sight",size:"long"},
    {n:"Formentor Beach",c:[39.9290,3.1965],type:"beach",size:"long"},
    {n:"Sóller",c:[39.7671,2.7158],type:"village",size:"long"},
    {n:"Port de Sóller",c:[39.7968,2.6960],type:"beach",size:"long"},
    {n:"Deià",c:[39.7486,2.6486],type:"village",size:"long"},
    {n:"Valldemossa",c:[39.7115,2.6226],type:"village",size:"long"},
    {n:"Alcúdia Old Town",c:[39.8525,3.1192],type:"village",size:"long"}
  ]},
  sun:{stops:[
    {n:"Alcúdia Old Town",c:[39.8525,3.1192],type:"village",size:"long"},
    {n:"Coll Baix",c:[39.8730,3.1410],type:"beach",size:"long"},
    {n:"Santanyí",c:[39.3545,3.1290],type:"village",size:"long"},
    {n:"Cala Figuera",c:[39.3300,3.1710],type:"beach",size:"long"},
    {n:"Cala Mondragó",c:[39.3655,3.1860],type:"beach",size:"long"},
    {n:"Portopetro",c:[39.3630,3.2090],type:"village",size:"long"},
    {n:"Cala d’Or",c:[39.3780,3.2340],type:"beach",size:"long"},
    {n:"Palma",c:[39.5696,2.6502],type:"village",size:"long"}
  ]},
  mon:{stops:[
    {n:"Palma Old Town",c:[39.5700,2.6500],type:"village",size:"long"},
    {n:"Mercat de l’Olivar",c:[39.5750,2.6515],type:"sight",size:"long"},
    {n:"Airport",c:[39.5517,2.7388],type:"sight",size:"long"}
  ]}
};
let routeLayer=leafletReady?L.layerGroup():null,routeVisible=false,routeToken=0;
function escAttr(v){return String(v).replace(/&/g,"&amp;").replace(/'/g,"&#39;").replace(/"/g,"&quot;").replace(/</g,"&lt;");}
async function drawRoute(id){
  if(!leafletReady||!routeLayer)return;
  const token=++routeToken;
  routeLayer.clearLayers();
  const r=routes[id]; if(!r) return;
  // Follow the actual road network instead of drawing straight lines between stops.
  const coords=r.stops.map(x=>x.c[1]+","+x.c[0]).join(";");
  let geometry=null;
  const endpoints=[
    "https://router.project-osrm.org/route/v1/driving/",
    "https://routing.openstreetmap.de/routed-car/route/v1/driving/"
  ];
  for(const endpoint of endpoints){
    if(geometry)break;
    try{
      const res=await fetch(endpoint+coords+"?overview=full&geometries=geojson&steps=false");
      if(res.ok){
        const data=await res.json();
        if(data.routes&&data.routes[0]&&data.routes[0].geometry){
          geometry=data.routes[0].geometry.coordinates.map(p=>[p[1],p[0]]);
        }
      }
    }catch(e){}
  }
  // Ignore results from an older request (e.g. the user switched day while routing was loading).
  if(token!==routeToken)return;
  if(geometry){
    L.polyline(geometry,{color:"#146BFF",weight:6,opacity:.95,lineCap:"round",lineJoin:"round"}).addTo(routeLayer);
  }
  r.stops.forEach((x,i)=>{
    const size=x.size==="long"?"large":"small";
    const cls="route-pin route-"+x.type+" route-"+size;
    const iconSize=x.size==="long"?[38,38]:[26,26];
    const anchor=x.size==="long"?[19,19]:[13,13];
    // Numbered pins match the numbered stop cards in the day plan.
    const icon=L.divIcon({className:cls,html:"<span>"+(i+1)+"</span>",iconSize:iconSize,iconAnchor:anchor});
    const marker=L.marker(x.c,{icon:icon}).addTo(routeLayer);
    const p=stopPlace(x);
    marker.bindPopup("<strong>"+(i+1)+". "+x.n+"</strong>"+(p&&p.rating?"<br><span class='stars'>★ "+p.rating.toFixed(1)+"</span>":"")+"<br><a href='"+escAttr(stopUrl(x))+"' target='_blank' rel='noopener'>Google Maps →</a>");
    marker.bindTooltip(x.n,{permanent:true,direction:"top",offset:[0,x.size==="long"?-22:-16],className:"route-label"});
  });
}
function toggleRoute(){if(!routes[currentDay]||!map)return;routeVisible=!routeVisible;if(routeVisible){drawRoute(currentDay);routeLayer.addTo(map);}else{map.removeLayer(routeLayer);}const b=document.querySelector("#route-toggle");if(b){b.textContent=routeVisible?"Κρύψε τη διαδρομή":"Δείξε τη διαδρομή";b.classList.toggle("active",routeVisible);}}

// Google Maps links. A place id (when known) makes Google open exactly that place.
function gmapsUrl(o){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(o.q||(o.n+", Mallorca, Spain"))+(o.id?"&query_place_id="+o.id:"");}
function villageUrl(v){return gmapsUrl({n:v.name,id:v.gid||""});}
function stopPlace(x){return spots.find(s=>s.n===x.n)||villages.find(v=>v.name===x.n)||null;}
function stopUrl(x){const p=stopPlace(x);return p?(p.cat?gmapsUrl(p):villageUrl(p)):gmapsUrl({n:x.n});}
function dirUrl(stops){
  const c=x=>x.c[0]+","+x.c[1];
  const base="https://www.google.com/maps/dir/?api=1&travelmode=driving";
  // A single stop: directions from wherever you are now.
  if(stops.length===1)return base+"&destination="+c(stops[0]);
  const w=stops.slice(1,-1).map(c).join("|");
  return base+"&origin="+c(stops[0])+"&destination="+c(stops[stops.length-1])+(w?"&waypoints="+encodeURIComponent(w):"");
}
// Google Maps takes at most 10 stops per route, so longer days are split into legs that share a stop.
function splitLegs(stops){
  if(stops.length<=10)return [stops];
  const n=Math.ceil((stops.length-1)/9),size=Math.ceil((stops.length-1)/n),legs=[];
  for(let i=0;i<stops.length-1;i+=size)legs.push(stops.slice(i,Math.min(i+size,stops.length-1)+1));
  return legs;
}
function navLinksHtml(day){
  const r=routes[day.id];
  if(r){const legs=splitLegs(r.stops);return legs.map((leg,i)=>"<a class='route-toggle nav-btn' target='_blank' rel='noopener' href='"+escAttr(dirUrl(leg))+"' title='"+escAttr(leg[0].n+" → "+leg[leg.length-1].n)+"'>🧭 Πλοήγηση"+(legs.length>1?" "+(i+1)+"/"+legs.length:"")+"</a>").join("");}
  if(day.nav)return "<a class='route-toggle nav-btn' target='_blank' rel='noopener' href='"+escAttr(dirUrl([day.nav]))+"'>🧭 "+day.nav.n+"</a>";
  return "";
}

const markerLayers={};
Object.keys(categories).forEach(cat=>{markerLayers[cat]=leafletReady?L.layerGroup().addTo(map):null;if(!leafletReady)return;spots.filter(s=>s.cat===cat).forEach(s=>{const icon=L.divIcon({className:"spot-icon",html:"<span>"+categories[cat].icon+"</span>",iconSize:[34,34],iconAnchor:[17,17]});L.marker(s.c,{icon:icon}).addTo(markerLayers[cat]).on("click",()=>window.open(spotData(s).gmap||gmapsUrl(s),"_blank","noopener,noreferrer"));});});
if(leafletReady)villages.forEach(v=>{const icon=L.divIcon({className:"spot-icon",html:"<span>"+categories.villages.icon+"</span>",iconSize:[34,34],iconAnchor:[17,17]});L.marker(v.c,{icon:icon}).addTo(markerLayers.villages).on("click",()=>openVillage(v.id));});
// Spots without an explicit day are Palma places, so only show them on the Palma days.
function spotOnDay(s,dayId){if(s.day==="all")return true;if(Array.isArray(s.day))return s.day.includes(dayId);return s.day?(s.day==="both"||s.day===dayId):(dayId==="fri"||dayId==="mon");}
// Optional Google Maps Platform key (Places API "New"). Restrict it to pantelisama.github.io in Google Cloud.
// Stars and review counts are hardcoded in the data above; the key would only add Google photos.
// Without one, photos come from Wikimedia Commons.
const GOOGLE_MAPS_KEY="";
const ENRICH_STORE="mallorca-enrich-v1";
let enrich={};
try{enrich=JSON.parse(localStorage.getItem(ENRICH_STORE)||"{}")||{};}catch(e){enrich={};}
function saveEnrich(){try{localStorage.setItem(ENRICH_STORE,JSON.stringify(enrich));}catch(e){}}
// Hardcoded stars always win over anything cached from earlier runtime lookups.
// Hardcoded stars win; anything not hardcoded is filled in from Google when a key is set.
function photoFallback(s,i){
  const photos={
    wineries:"https://wine-partners.at/img/containers/assets/clients/baur_au_lac_vins/bodega-ribas/text-images/bodega-ribas-webiste-newsdetail-text-image-c-bodega-ribas-2.png/beb49e9de395b3d168941027b47fc730.png",
    beaches:"https://www.barcoscalobra.com/wp-content/uploads/2019/05/Cala-deia-1.jpg",
    villages:"https://a.travel-assets.com/findyours-php/viewfinder/images/res40/36000/36604.jpg",
    sights:"https://cdn.atrapalo.com/o/event/4931618/1702627.jpg?auto=avif&quality=75&width=1280",
    hotels:"https://cdn.thefork.com/tf-lab/image/upload/f_auto,q_auto,g_auto:subject,w_488,h_488,c_fill/customer/0e3e3480-80df-41bc-aed0-f76d0335d2bf/bba6cef5-5af3-43be-92ef-a5b28e5a6ca1.jpg",
    food:"https://lumaguide.sfo3.digitaloceanspaces.com/media/place_images/2025/07/30/google_place_ChIJry7HVOyTlxIReL37j5Z29n0_photo_1.jpg"
  };
  return photos[s.cat]||photos.food;
}
function spotData(s){const e=enrich[s.n]||{};const i=spots.indexOf(s);return {photo:s.photo||e.photo||photoFallback(s,i),rating:s.rating||e.rating||null,reviews:s.reviews||e.reviews||null,gmap:s.id?"":(e.gmap||"")};}
function ratingHtml(r,n){return "<span class='stars'>★ "+r.toFixed(1)+"</span> · "+(n||0).toLocaleString()+" κριτικές";}
function extraHtml(s){const x=[s.price,s.hours].filter(Boolean);return (x.length?"<p class='spot-extra'>"+x.join(" · ")+"</p>":"")+(s.tag?"<p class='spot-extra spot-flag'>"+s.tag+"</p>":"");}
function spotCardHtml(s){
  const i=spots.indexOf(s);const cat=categories[s.cat];const x=spotData(s);
    const media="<img loading='lazy' src='"+escAttr(x.photo)+"' alt='"+escAttr(s.n)+"' onerror='this.onerror=null;this.src=\""+photoFallback(s,i)+"\"'>";
  const rating=x.rating?ratingHtml(x.rating,x.reviews):"Δες το στο Google Maps";
  return "<article class='spot-card' data-cat='"+s.cat+"' data-spot-index='"+i+"' tabindex='0' role='button'><div class='spot-photo'>"+media+"</div><div class='spot-info'><div class='spot-meta'><div class='spot-cat'>"+cat.icon+" "+cat.label+"</div>"+(s.by?"<span class='finder-tag'>Added by "+s.by+"</span>":"")+"</div><h3>"+s.n+"</h3>"+(s.type?"<p class='spot-type'>"+s.type+"</p>":"")+extraHtml(s)+"<p>"+s.d+"</p><div class='spot-rating'>"+rating+" →</div></div></article>";
}
function planCardHtml(x,i){return "<article class='day-card'><div class='day-number'>"+String(i+1).padStart(2,"0")+"</div><div class='day-content'><div class='time'>"+x[0]+"</div><h3>"+x[1]+"</h3><p>"+x[2]+"</p><span class='tag'>"+categories[x[3]].icon+" "+categories[x[3]].label+"</span><div class='route'>"+x[4]+"</div></div></article>";}
function stopCardHtml(x,i){
  const p=stopPlace(x),s=p&&p.cat?p:null,v=p&&!p.cat?p:null;
  const cat=s?categories[s.cat]:v?categories.villages:{icon:"📍",label:"Stop"};
  const desc=s?s.d:v?v.data.description:(x.d||"");
  return "<article class='day-card stop-card'><div class='day-number'>"+String(i+1).padStart(2,"0")+"</div><div class='day-content'><div class='time'>"+cat.icon+" "+cat.label+(s&&s.type?" · "+s.type:"")+"</div><h3>"+x.n+"</h3>"+(s&&s.rating?"<div class='spot-rating'>"+ratingHtml(s.rating,s.reviews)+"</div>":"")+(s?extraHtml(s):"")+"<p>"+desc+"</p><a class='gmaps-link' href='"+escAttr(stopUrl(x))+"' target='_blank' rel='noopener'>Google Maps →</a></div></article>";
}
async function fetchGooglePlace(s){
  const res=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":GOOGLE_MAPS_KEY,"X-Goog-FieldMask":"places.rating,places.userRatingCount,places.photos,places.googleMapsUri"},body:JSON.stringify({textQuery:s.n+", Mallorca, Spain",maxResultCount:1,locationBias:{circle:{center:{latitude:s.c[0],longitude:s.c[1]},radius:1500}}})});
  if(!res.ok)return null;
  const p=((await res.json()).places||[])[0];if(!p)return null;
  const photo=p.photos&&p.photos[0]?"https://places.googleapis.com/v1/"+p.photos[0].name+"/media?maxWidthPx=640&key="+GOOGLE_MAPS_KEY:"";
  return {photo:photo,rating:p.rating||null,reviews:p.userRatingCount||null,gmap:p.googleMapsUri||""};
}
async function fetchCommonsPhoto(s){
  // Real photos taken at (or right next to) the place's coordinates.
  const url="https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=geosearch&ggscoord="+s.c[0]+"%7C"+s.c[1]+"&ggsradius=250&ggsnamespace=6&ggslimit=10&prop=imageinfo&iiprop=url%7Cmime&iiurlwidth=640";
  const res=await fetch(url);if(!res.ok)return null;
  const pages=Object.values(((await res.json()).query||{}).pages||{}).sort((a,b)=>(a.index||0)-(b.index||0));
  const words=s.n.toLowerCase().split(/[^a-zà-ÿ]+/).filter(w=>w.length>3);
  const imgs=pages.filter(p=>p.imageinfo&&p.imageinfo[0]&&/jpeg|png/.test(p.imageinfo[0].mime)&&p.imageinfo[0].thumburl);
  const best=imgs.find(p=>words.filter(w=>w.length>4).some(w=>p.title.toLowerCase().includes(w)));
  return best?{photo:best.imageinfo[0].thumburl}:null;
}
let enrichQueue=[],enrichRunning=false;
function enrichSpots(list){
  // Load the day being viewed first.
  const todo=list.filter(s=>!enrich[s.n]);
  enrichQueue=todo.concat(enrichQueue.filter(s=>!todo.includes(s)));
  if(enrichRunning||typeof fetch!=="function")return;
  enrichRunning=true;
  (async()=>{
    while(enrichQueue.length){
      const s=enrichQueue.shift();let data=null;
      try{data=GOOGLE_MAPS_KEY?await fetchGooglePlace(s):null;}catch(e){}
      if(!data||!data.photo){try{const c=await fetchCommonsPhoto(s);if(c)data=Object.assign({},data||{},c);}catch(e){}}
      enrich[s.n]=data||{};saveEnrich();
      if(s.village&&data){s.village.data.rating=s.village.data.rating||data.rating;s.village.data.reviews=s.village.data.reviews||data.reviews;}
      const card=s.village?document.querySelector("#plan [data-village='"+s.village.id+"']"):document.querySelector("#plan [data-spot-index='"+spots.indexOf(s)+"']");
      if(card&&data&&!s.village)card.outerHTML=spotCardHtml(s);
    }
    enrichRunning=false;
  })();
}
function ensureEdgeDrawers(route){
  let cat=document.querySelector(".cat-drawer:not(.stop-edge)");
  if(!cat){
    cat=document.createElement("div");cat.className="cat-drawer";
    cat.innerHTML="<div class='cat-panel'><div class='cat-head'><strong>Μέρη στον χάρτη</strong><button class='cat-close' type='button'>×</button></div><div id='filters'></div><p class='cat-hint'>Σύρε από την αριστερή άκρη ή πάτησε το handle.</p></div><button class='cat-toggle' type='button' aria-label='Άνοιξε κατηγορίες'><span class='cat-toggle-icon'>🧭</span><span class='cat-toggle-label'>ΜΕΡΗ</span></button>";
    document.body.appendChild(cat);
    cat.querySelector(".cat-toggle").addEventListener("click",()=>cat.classList.toggle("open"));
    cat.querySelector(".cat-close").addEventListener("click",()=>cat.classList.remove("open"));
    if(typeof installEdgeSwipe==="function")installEdgeSwipe(cat,"left");
  }
  let stops=document.querySelector("#stopDrawer");
  if(!stops){
    stops=cat.cloneNode(true);
    stops.id="stopDrawer";
    stops.classList.add("stop-edge");
    stops.querySelector(".cat-head strong").textContent="Στάσεις στον χάρτη";
    const close=stops.querySelector(".cat-close");
    close.className="cat-close stop-close";
    const filters=stops.querySelector("#filters");
    filters.id="stopFilters";
    const toggle=stops.querySelector(".cat-toggle");
    toggle.className="cat-toggle stop-toggle";
    toggle.setAttribute("aria-label","Άνοιξε στάσεις");
    toggle.querySelector(".cat-toggle-label").textContent="ΣΤΑΣΕΙΣ";
    document.body.appendChild(stops);
  }
  if(stops){
    stops.querySelector("#stopFilters").innerHTML=route
      ?route.stops.map((x,i)=>"<button type='button' class='filter stop-item' data-stop-index='"+i+"'><span class='cat-icon'>"+String(i+1).padStart(2,"0")+"</span><span class='cat-label'>"+escAttr(x.n)+"</span></button>").join("")
      :"<p class='empty-note'>Δεν υπάρχουν στάσεις.</p>";
    if(!stops.dataset.bound){
      stops.dataset.bound="1";
      stops.querySelector(".stop-toggle").addEventListener("click",()=>stops.classList.toggle("open"));
      stops.querySelector(".stop-close").addEventListener("click",()=>stops.classList.remove("open"));
      if(typeof installEdgeSwipe==="function")installEdgeSwipe(stops,"right");
    }
    stops.classList.remove("open");
  }
}
function render(){
const day=days.find(d=>d.id===currentDay)||days[0];
const route=routes[currentDay];
const dayCats=Object.keys(categories);
const daySpots=spots.filter(s=>dayCats.includes(s.cat)&&spotOnDay(s,currentDay));
const dayVillages=villages.filter(v=>dayCats.includes("villages")&&(v.day==="all"||v.day==="both"||v.day===currentDay));
const catCount=k=>k==="villages"?dayVillages.length:daySpots.filter(s=>s.cat===k).length;
document.querySelector("#days").innerHTML=days.map(d=>"<button type='button' class='"+(d.id===currentDay?"active":"")+"' data-day='"+d.id+"'>"+d.label+"</button>").join("");
const filtersHtml=Object.entries(categories).filter(([k])=>catCount(k)>0).map(([k,v])=>"<button type='button' class='filter"+(map&&markerLayers[k]&&map.hasLayer(markerLayers[k])?" active":"")+"' data-cat='"+k+"'><span class='cat-icon'>"+v.icon+"</span><span class='cat-label'>"+v.label+"</span><span class='cat-count'>"+catCount(k)+"</span></button>").join("");
ensureEdgeDrawers(route);
document.querySelector("#filters").innerHTML=filtersHtml;
document.querySelector("h1").textContent=day.title;document.querySelector(".sub").textContent=day.sub;
routeVisible=false;routeToken++;if(map)map.removeLayer(routeLayer);
const planItems=[];
const stopCount=route?route.stops.length:day.plan.length;
const cards=daySpots.map(spotCardHtml).join("");
const villagesHtml=dayVillages.map(v=>{const villagePhoto=v.data.photos&&v.data.photos[0]?v.data.photos[0]:photoFallback({cat:"villages"},0);const media="<img loading='lazy' src='"+escAttr(villagePhoto)+"' alt='"+escAttr(v.name)+"' onerror='this.onerror=null;this.src=photoFallback({cat:'villages'},0)'>";return "<article class='spot-card village-card' data-cat='villages' data-village='"+v.id+"' tabindex='0' role='button'><div class='spot-photo'>"+media+"</div><div class='spot-info'><div class='spot-cat'>🏘️ Χωριά</div><h3>"+v.name+"</h3>"+(v.data.rating?"<div class='spot-rating'>"+ratingHtml(v.data.rating,v.data.reviews)+"</div>":"")+"<p>"+(v.data.description||"Άνοιξέ το για να δεις τα αποθηκευμένα δεδομένα.")+"</p></div></article>";}).join("");
document.querySelector("#plan").innerHTML="<section class='day-panel'><div class='findings-head'><div><h2>"+day.label+" · Πρόγραμμα</h2><p class='day-description'>"+day.sub+"</p>"+(day.note?"<p class='day-note'>"+day.note+"</p>":"")+"</div><div class='day-tools'></div></div><div class='day-grid'></div></section><section class='findings'><div class='findings-head'><h2>"+"Αποθηκευμένα μέρη"+"</h2><span>"+(daySpots.length+dayVillages.length)+" μέρη</span></div><div class='photo-grid'>"+(cards+villagesHtml||"<p class='empty-note'>Δεν υπάρχουν αποθηκευμένα μέρη για αυτή τη μέρα.</p>")+"</div><p class='stars-note'>★ Αστέρια και κριτικές από το Google Maps ("+RATINGS_AS_OF+"). Χάρτης, βενζινάδικα, μάρκετ και τουαλέτες: © OpenStreetMap contributors.</p></section>";

if(route&&map){drawRoute(currentDay);routeLayer.addTo(map);routeVisible=true;}
const pts=daySpots.map(s=>s.c).concat(dayVillages.map(v=>v.c)).concat(route?route.stops.map(x=>x.c):[]);if(map&&pts.length)map.fitBounds(L.latLngBounds(pts),{padding:[40,40]});
enrichSpots(daySpots.concat(dayVillages.map(v=>({n:v.name,c:v.c,village:v}))));
}
function openSpot(i){const s=spots[i];if(!s)return;window.open(spotData(s).gmap||gmapsUrl(s),"_blank","noopener,noreferrer");}
function openVillage(id){const v=villages.find(x=>x.id===id);if(!v)return;const d=v.data||{};let html="<section class='day-panel'><div class='findings-head'><div><h2>🏘️ "+v.name+"</h2><p class='day-description'>"+(d.description||"Χωριό")+"</p></div><div class='day-tools'><a class='route-toggle nav-btn' target='_blank' rel='noopener' href='"+escAttr(villageUrl(v))+"'>Google Maps</a><a class='route-toggle nav-btn' target='_blank' rel='noopener' href='"+escAttr(dirUrl([{c:v.c}]))+"'>🧭 Πλοήγηση</a><button type='button' class='route-toggle' onclick='render()'>Back</button></div></div>";if(d.photos&&d.photos.length)html+="<div class='photo-grid'>"+d.photos.map(p=>"<img loading='lazy' src='"+escAttr(p)+"' alt='"+escAttr(v.name)+"'>").join("")+"</div>";if(d.rating)html+="<div class='spot-rating'>"+ratingHtml(d.rating,d.reviews)+"</div>";[["Φαγητό",d.food],["Αξιοθέατα",d.sights],["Εμπειρίες",d.experiences],["Φωτογραφίες",d.instagram],["Ξενοδοχεία",d.hotels],["Σημειώσεις",d.notes]].forEach(x=>{if(x[1]&&x[1].length)html+="<div class='day-card'><div class='day-content'><div class='time'>"+x[0]+"</div>"+x[1].map(t=>"<p>"+t+"</p>").join("")+"</div></div>";});if(d.parking)html+="<div class='day-card'><div class='day-content'><div class='time'>Parking</div><p>"+d.parking+"</p></div></div>";if(d.route)html+="<div class='day-card'><div class='day-content'><div class='time'>Route</div><p>"+d.route+"</p></div></div>";html+="</section>";document.querySelector("#plan").innerHTML=html;syncCategoryCards();document.querySelector("#plan").scrollIntoView({behavior:"smooth",block:"start"});if(map)map.setView(v.c,14);}
document.addEventListener("click",e=>{const stop=e.target.closest(".stop-item");if(stop){const route=routes[currentDay],x=route&&route.stops[Number(stop.dataset.stopIndex)];if(x&&map)map.setView(x.c,14);const drawer=document.querySelector("#stopDrawer");if(drawer)drawer.classList.remove("open");return;}const day=e.target.closest("#days [data-day]");if(day){currentDay=day.dataset.day;render();return;}const village=e.target.closest("[data-village]");if(village){openVillage(village.dataset.village);return;}const spot=e.target.closest("[data-spot-index]");if(spot){openSpot(Number(spot.dataset.spotIndex));return;}const cat=e.target.closest("#filters [data-cat]");if(cat){toggleCat(cat.dataset.cat,cat);return;}});
document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const spot=e.target.closest("[data-spot-index]");if(spot){e.preventDefault();openSpot(Number(spot.dataset.spotIndex));}});
function focusArea(id){const a=areas.find(x=>x.id===id);if(!a||!map||!leafletReady)return;map.fitBounds(L.latLngBounds(a.p),{padding:[80,80]});L.popup().setLatLng(a.c).setContent("<strong>"+a.icon+" "+a.n+"</strong><br><small>"+a.type+"</small><br>"+a.d).openOn(map);}
function setCatVisible(cat,on){if(!leafletReady||!map||!markerLayers[cat])return;if(on)markerLayers[cat].addTo(map);else map.removeLayer(markerLayers[cat]);const b=document.querySelector("#filters [data-cat='"+cat+"']");if(b)b.classList.toggle("active",on);syncPoiButtons();}
function syncCategoryCards(){document.querySelectorAll("#plan .spot-card[data-cat]").forEach(card=>{const layer=markerLayers[card.dataset.cat];card.style.display=(!map||!leafletReady||!layer||map.hasLayer(layer))?"":"none";});}
function toggleCat(cat){if(!leafletReady||!map||!markerLayers[cat])return;setCatVisible(cat,!map.hasLayer(markerLayers[cat]));syncCategoryCards();}

function installEdgeSwipe(drawer,side){
  let sx=0,sy=0,tracking=false;
  drawer.addEventListener("pointerdown",e=>{tracking=true;sx=e.clientX;sy=e.clientY;drawer.setPointerCapture?.(e.pointerId);});
  drawer.addEventListener("pointerup",e=>{
    if(!tracking)return;tracking=false;const dx=e.clientX-sx,dy=e.clientY-sy;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25){
      if(side==="left"&&dx>0)drawer.classList.add("open");
      if(side==="right"&&dx<0)drawer.classList.add("open");
      if(side==="left"&&dx<0)drawer.classList.remove("open");
      if(side==="right"&&dx>0)drawer.classList.remove("open");
    }
  });
}

function addMapActionControls(){
  if(!map||map._mallorcaActionControl)return;
  const C=L.Control.extend({options:{position:"bottomleft"},onAdd:function(){
    const box=L.DomUtil.create("div","map-actions");
    box.innerHTML="<button type='button' class='map-action route-action' title='Διαδρομή' aria-label='Εμφάνιση διαδρομής'>🛣️</button><button type='button' class='map-action nav-action' title='Πλοήγηση Google Maps' aria-label='Πλοήγηση'>🧭</button>";
    L.DomEvent.disableClickPropagation(box);
    L.DomEvent.on(box,"click",e=>{
      const b=e.target.closest(".map-action");if(!b)return;
      if(b.classList.contains("route-action"))toggleRoute();
      else if(b.classList.contains("nav-action")){const r=routes[currentDay];if(r){const legs=splitLegs(r.stops);window.open(dirUrl(legs[0]),"_blank","noopener,noreferrer");}}
    });
    return box;
  }});
  map.addControl(new C());map._mallorcaActionControl=true;
}
addMapActionControls();


/* ---------- Map layer buttons: fuel / supermarkets / toilets (OpenStreetMap, whole island) + food ---------- */
const POI_TYPES={
  fuel:{label:"Βενζινάδικα",short:"Βενζίνη",one:"Βενζινάδικο",icon:"⛽",color:"#C0392B",test:t=>t.amenity==="fuel"},
  market:{label:"Σούπερ μάρκετ",short:"Μάρκετ",one:"Σούπερ μάρκετ",icon:"🛒",color:"#2F5D4A",test:t=>t.shop==="supermarket"},
  wc:{label:"Τουαλέτες",short:"WC",one:"Τουαλέτα",icon:"🚻",color:"#0E5A70",test:t=>t.amenity==="toilets"},
  // The food button shows/hides the saved food places (same layer as the Food filter chip).
  food:{label:"Φαγητό",short:"Φαγητό",icon:"🍽️",color:"#B7802A"}
};
const OSM_TYPES=Object.keys(POI_TYPES).filter(k=>POI_TYPES[k].test);
const MALLORCA_BBOX="39.25,2.30,39.97,3.48"; // south,west,north,east
const POI_CACHE_KEY="mallorca-poi-v1";
const POI_STATE_KEY="mallorca-poi-on-v2";
const POI_MAX_AGE=7*24*3600*1000; // refresh weekly
const OVERPASS=["https://overpass-api.de/api/interpreter","https://overpass.kumi.systems/api/interpreter"];
const poiLayers={};
let poiOn={fuel:false,market:false,wc:false},poiLoading=null;
try{const s=JSON.parse(localStorage.getItem(POI_STATE_KEY)||"null");if(s)OSM_TYPES.forEach(k=>{poiOn[k]=!!s[k];});}catch(e){}
function savePoiOn(){try{localStorage.setItem(POI_STATE_KEY,JSON.stringify(poiOn));}catch(e){}}
function poiIsOn(k){return k==="food"?!!(map&&markerLayers.food&&map.hasLayer(markerLayers.food)):!!poiOn[k];}
function syncPoiButtons(){
  if(typeof document.querySelectorAll!=="function")return;
  document.querySelectorAll("[data-poi]").forEach(b=>{const on=poiIsOn(b.dataset.poi);b.setAttribute("aria-pressed",on?"true":"false");b.classList.toggle("loading",!!poiLoading&&!poiLayers[b.dataset.poi]&&on&&b.dataset.poi!=="food");});
}
async function fetchPoi(){
  try{const c=JSON.parse(localStorage.getItem(POI_CACHE_KEY));if(c&&Date.now()-c.t<POI_MAX_AGE)return c.items;}catch(e){}
  const q='[out:json][timeout:60];('+
    'nwr["amenity"="fuel"]('+MALLORCA_BBOX+');'+
    'nwr["shop"="supermarket"]('+MALLORCA_BBOX+');'+
    'nwr["amenity"="toilets"]('+MALLORCA_BBOX+');'+
    ');out center tags;';
  let lastErr;
  for(const url of OVERPASS){
    try{
      const r=await fetch(url,{method:"POST",body:"data="+encodeURIComponent(q),headers:{"Content-Type":"application/x-www-form-urlencoded"}});
      if(!r.ok)throw new Error("HTTP "+r.status);
      const j=await r.json();
      const items=j.elements.map(e=>{
        const lat=e.lat!=null?e.lat:(e.center&&e.center.lat),lng=e.lon!=null?e.lon:(e.center&&e.center.lon),t=e.tags||{};
        const type=OSM_TYPES.find(k=>POI_TYPES[k].test(t));
        if(!type||lat==null)return null;
        return {type:type,lat:+lat.toFixed(5),lng:+lng.toFixed(5),name:t.name||t.brand||"",brand:t.brand||"",hours:t.opening_hours||"",fee:t.fee||""};
      }).filter(Boolean);
      try{localStorage.setItem(POI_CACHE_KEY,JSON.stringify({t:Date.now(),items:items}));}catch(e){}
      return items;
    }catch(e){lastErr=e;}
  }
  // Network failed: fall back to an old cache if there is one.
  try{const c=JSON.parse(localStorage.getItem(POI_CACHE_KEY));if(c)return c.items;}catch(e){}
  throw lastErr||new Error("Overpass unavailable");
}
function poiPopup(p){
  const T=POI_TYPES[p.type];
  const nav="https://www.google.com/maps/dir/?api=1&travelmode=driving&destination="+p.lat+","+p.lng;
  const extra=[];
  if(p.brand&&p.brand!==p.name)extra.push(escAttr(p.brand));
  if(p.hours)extra.push(escAttr(p.hours));
  if(p.type==="wc"&&p.fee)extra.push(p.fee==="no"?"Δωρεάν":"Με χρέωση");
  return "<div class='popup-poi'><strong>"+T.icon+" "+escAttr(p.name||T.one)+"</strong>"+(extra.length?"<small>"+extra.join(" | ")+"</small><br>":"")+"<a href='"+nav+"' target='_blank' rel='noopener'>🧭 Πλοήγηση εδώ</a></div>";
}
function makePoiGroup(k){
  const T=POI_TYPES[k];
  if(typeof L.markerClusterGroup!=="function")return L.layerGroup();
  return L.markerClusterGroup({showCoverageOnHover:false,maxClusterRadius:45,iconCreateFunction:c=>L.divIcon({className:"",html:"<div class='poi-cluster' style='background:"+T.color+"'><span>"+T.icon+"</span>"+c.getChildCount()+"</div>",iconSize:[36,36],iconAnchor:[18,18]})});
}
function buildPoiLayers(items){
  OSM_TYPES.forEach(k=>{
    const T=POI_TYPES[k],group=makePoiGroup(k);
    const icon=L.divIcon({className:"poi-pin",html:"<span style='border-color:"+T.color+"'>"+T.icon+"</span>",iconSize:[26,26],iconAnchor:[13,13]});
    items.filter(p=>p.type===k).forEach(p=>group.addLayer(L.marker([p.lat,p.lng],{icon:icon,title:p.name||T.one}).bindPopup(()=>poiPopup(p))));
    poiLayers[k]=group;
  });
}
function applyPoi(k){
  const g=poiLayers[k];if(!g||!map)return;
  if(poiOn[k]){if(!map.hasLayer(g))map.addLayer(g);}
  else if(map.hasLayer(g)){map.closePopup&&map.closePopup();map.removeLayer(g);}
}
function ensurePoi(){
  if(poiLoading)return poiLoading;
  mapToast("Φόρτωση από OpenStreetMap…");
  poiLoading=fetchPoi().then(items=>{
    buildPoiLayers(items);
    const n=k=>items.filter(p=>p.type===k).length;
    mapToast("⛽ "+n("fuel")+" · 🛒 "+n("market")+" · 🚻 "+n("wc")+" σε όλο το νησί");
  }).catch(()=>{
    poiLoading=null;OSM_TYPES.forEach(k=>{poiOn[k]=false;});savePoiOn();
    mapToast("Δεν φορτώθηκαν βενζινάδικα/μάρκετ/τουαλέτες. Δοκίμασε ξανά σε λίγο.");
  }).then(()=>{OSM_TYPES.forEach(applyPoi);syncPoiButtons();});
  syncPoiButtons();
  return poiLoading;
}
function togglePoi(k){
  if(!map||!POI_TYPES[k])return;
  if(k==="food"){setCatVisible("food",!poiIsOn("food"));return;}
  poiOn[k]=!poiOn[k];savePoiOn();syncPoiButtons();
  if(poiLayers[k])applyPoi(k);else if(poiOn[k])ensurePoi();
}
if(map){
  const PoiControl=L.Control.extend({options:{position:"topright"},onAdd:function(){
    const box=L.DomUtil.create("div","poi-control");
    box.setAttribute("aria-label","Εμφάνιση στον χάρτη");
    box.innerHTML=Object.keys(POI_TYPES).map(k=>{const T=POI_TYPES[k];return "<button type='button' class='poi-btn' data-poi='"+k+"' aria-pressed='false' style='--c:"+T.color+"' title='"+T.label+"' aria-label='"+T.label+"'><span>"+T.icon+"</span><b>"+T.short+"</b></button>";}).join("");
    L.DomEvent.disableClickPropagation(box);L.DomEvent.disableScrollPropagation(box);
    L.DomEvent.on(box,"click",e=>{const b=e.target.closest("[data-poi]");if(b)togglePoi(b.dataset.poi);});
    return box;
  }});
  map.addControl(new PoiControl());
  syncPoiButtons();
  if(OSM_TYPES.some(k=>poiOn[k]))ensurePoi();
}

// Live GPS position (works on HTTPS, e.g. GitHub Pages; the phone asks for location permission).
let meMarker=null,meCircle=null,locating=false,followMe=false;
function mapToast(msg){const el=document.querySelector("#map");if(!el)return;let t=el.querySelector(".map-toast");if(!t){t=document.createElement("div");t.className="map-toast";el.appendChild(t);}t.textContent=msg;clearTimeout(mapToast.t);mapToast.t=setTimeout(()=>t.remove(),4000);}
function locateBtn(){return document.querySelector(".locate-btn");}
function startLocate(){
  if(!map)return;
  if(!navigator.geolocation){mapToast("Το GPS δεν είναι διαθέσιμο σε αυτή τη συσκευή.");return;}
  followMe=true;
  if(meMarker){map.setView(meMarker.getLatLng(),Math.max(map.getZoom(),15));}
  if(locating)return;
  locating=true;const b=locateBtn();if(b)b.classList.add("searching");
  map.locate({watch:true,enableHighAccuracy:true,setView:false,maximumAge:10000,timeout:20000});
}
if(map){
  const Locate=L.Control.extend({options:{position:"topleft"},onAdd:function(){const b=L.DomUtil.create("button","locate-btn");b.type="button";b.title="Η θέση μου";b.setAttribute("aria-label","Η θέση μου");b.innerHTML="📍";L.DomEvent.disableClickPropagation(b);L.DomEvent.on(b,"click",startLocate);return b;}});
  map.addControl(new Locate());
  map.on("locationfound",e=>{
    const b=locateBtn();if(b){b.classList.remove("searching");b.classList.add("active");}
    if(!meMarker){
      meCircle=L.circle(e.latlng,{radius:e.accuracy,color:"#146BFF",weight:1,fillOpacity:.12,interactive:false}).addTo(map);
      meMarker=L.marker(e.latlng,{icon:L.divIcon({className:"me-dot",html:"<span></span>",iconSize:[24,24],iconAnchor:[12,12]}),zIndexOffset:1000}).addTo(map).bindPopup("Είσαι εδώ");
    }else{meMarker.setLatLng(e.latlng);meCircle.setLatLng(e.latlng).setRadius(e.accuracy);}
    if(followMe){map.setView(e.latlng,Math.max(map.getZoom(),15));followMe=false;}
  });
  map.on("locationerror",e=>{
    locating=false;const b=locateBtn();if(b)b.classList.remove("searching","active");
    mapToast(e.code===1?"Δεν δόθηκε άδεια τοποθεσίας — ενεργοποίησέ την στις ρυθμίσεις.":"Δεν βρέθηκε η θέση σου.");
  });
}

render();
