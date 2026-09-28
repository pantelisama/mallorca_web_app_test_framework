const categories={
  food:{label:"Φαγητό",icon:"🍽️"},
  wineries:{label:"Οινοποιεία",icon:"🍷"},
  sights:{label:"Αξιοθέατα",icon:"🏛️"},
  beaches:{label:"Παραλίες",icon:"🏖️"},
  experiences:{label:"Εμπειρίες",icon:"✨"},
  instagram:{label:"Φωτογραφίες",icon:"📸"},
  hotels:{label:"Ξενοδοχεία",icon:"🏨"},
  villages:{label:"Χωριά",icon:"🏘️"},
  house:{label:"View & House music",icon:"🎧"},
  live:{label:"Live music",icon:"🎷"},
  nightlife:{label:"Nightlife",icon:"🪩"}
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
  {by:"Pantelis",n:"Bodega Ribas",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLdltF2BBIGftUlHcXFzWjTgGbE4dV6Kw3N4l-hnh7F56rWv6ASR0urNdfaEpeeo3Ai7qO0hvhvgvE7NSWBfz-AcwdaukMikXvbTWMExUG5IfDkqKjB8N64goL-1bTT_y6JvCmy3Zw=w640-h480-k-no",id:"ChIJI0_h7qjBlxIR0Vx327vBTV4",c:[39.6676,2.8144],cat:"wineries",day:"all",type:"Consell · από το 1711",rating:4.9,reviews:438,hours:"Δευ–Σαβ 10:00–18:00, Κυρ κλειστά",tag:"Μόνο με κράτηση",d:"Η παλαιότερη ενεργή bodega της Mallorca, ίδια οικογένεια πάνω από δέκα γενιές. Αρχοντικό του 18ου αιώνα με παλιό βαρελόκελλαρο και νέα πτέρυγα του Rafael Moneo. C/ Muntanya 2."},
  {by:"Pantelis",n:"Bodegues José L. Ferrer",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmOMBKcP17GsMhS40r0-UopEsMBLPNyNk3F6481i-3AnRoGHe4IoOPNf2w-SNIaLyIrtaHs3xjB6nYOOn2e-JBjN23sVPzhIH_WGjq7cRZK32yLfu9R1MVBA4-V8GdZlVl1WtX65hCL_UJqG=w640-h480-k-no",c:[39.6864,2.8347],cat:"wineries",day:"all",type:"Binissalem · από το 1931",rating:4.5,reviews:430,tag:"Θέλει κράτηση",d:"Από τα πιο ιστορικά και γνωστά ονόματα του νησιού, τέσσερις γενιές στην ίδια δουλειά. Πολύ χαρακτηριστικό της οινικής παράδοσης της Mallorca. Conquistador 103."},
  {by:"Pantelis",n:"Macià Batle",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmM-yilsRWONp8L-iCKyMSeeurYATUVCSDZJBbA51_l8uv9jQquWBJiJH2rHLtNkq_FnS_vgqJtkuSHSXqXpOHZXJ_wTaYDLPl0r7zwmXNBKvhwAzp-AyCGTEw-7qFuGIzWEjgWk=w640-h480-k-no",c:[39.6553,2.7672],cat:"wineries",day:"all",type:"Santa Maria del Camí · από το 1856",tag:"Κυριακή κλειστά",d:"Ιστορικό όνομα με σύγχρονο κτίριο του 1996. Ξενάγηση στην παραγωγή και δοκιμή κρασιών με τοπικά προϊόντα. Camí de Coanegra."},
  {by:"Pantelis",n:"Miquel Oliver Vinyes i Bodegues",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmOi3x_T7Oj9emr1yVE42OIM44qUUdEe0LX25tx-xkzUjFd-eSWMRJADmmTw2xwP74_jfeMJ0cQG_WW--yd4QdibIbHPKF3qvqSKqhoTwgEYbfJWsofb1d9r5Y36n13kKqNyzKu8=w640-h480-k-no",c:[39.6137,3.1020],cat:"wineries",day:"all",type:"Petra · από το 1912",tag:"Θέλει κράτηση",d:"Γνωστό ιστορικό όνομα της οικογένειας Oliver, με έμφαση σε ντόπιες ποικιλίες. Στο Petra, ανατολικά, C/ Font 26."},
  // DEIÀ · Google Maps ratings/review counts checked Sep 2026.
  {by:"Pantelis",n:"Cala Deià",q:"Cala Deià, Mallorca, Spain",c:[39.7589,2.6412],cat:"beaches",day:"all",type:"Deià · rocky cove",rating:4.2,reviews:5500,photo:"https://www.barcoscalobra.com/wp-content/uploads/2019/05/Cala-deia-1.jpg",d:"Μικρός βραχώδης όρμος κάτω από το Deià, με καθαρά νερά, βράχια και τα δύο γνωστά παραθαλάσσια εστιατόρια. Ο δρόμος και το parking είναι στενά — καλύτερα νωρίς."},
  {by:"Pantelis",n:"Ca’s Patró March",q:"Ca's Patró March, Cala Deià, Mallorca, Spain",c:[39.7588,2.6411],cat:"food",day:"all",type:"Cala Deià · seafood",rating:4.0,reviews:2115,price:"€€€",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmNXHzGYSOTOwfR0bYUDfw4MmXVUpV0UPknJW4U0a5BebWxLYWRBc_fcjMusPOTDB8E2nIwoUtzaZox4EJWMWc7Zcht9P0aiVqjHaigs337ZH-gsJVndBss3OctpORuEu67Wx4Yk7PhMDiac=w640-h480-k-no",tag:"Καλύτερα με κράτηση",d:"Διάσημο seafood spot ακριβώς πάνω στην Cala Deià, με τραπέζια δίπλα στο νερό και πολύ χαρακτηριστικό σκηνικό. Η κράτηση συνιστάται έντονα."},
  {by:"Pantelis",n:"Ca’n Lluc",q:"Ca'n Lluc, Cala Deià, Mallorca, Spain",c:[39.7587,2.6415],cat:"food",day:"all",type:"Cala Deià · seafood",rating:4.0,reviews:467,price:"€€",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmPVYG_FOv-6vHTVZH9qAVR_FHqrtpGqJUEYJDPcVN1H4qpRKMep5qHa7lYbrecbPoD_U55CmSS1RuQd6Z_c6wr9dyN93UcQS7V4Rr5iNWHP8tw2-ZG5b7T8Ph6mIwLTdNF0rgr3-Q=w640-h480-k-no",tag:"Καλύτερα με κράτηση",d:"Οικογενειακό παραθαλάσσιο chiringuito πάνω στο νερό, με φρέσκο ψάρι και θαλασσινά και πολύ χαλαρό σκηνικό."},
  {by:"Anna",n:"El Camino",q:"El Camino, Palma, Mallorca, Spain",c:[39.5712,2.6472],cat:"food",day:"all",type:"Palma old town · tapas",rating:4.7,reviews:3181,price:"€40–100",hours:"Lunch until 15:45 · dinner from 18:00",tag:"Καλύτερα με κράτηση",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLc480-iM5u00nO3-KIvMthbpZy1kkdGUrdi1Bm0QTUK9pl80ZSwu2u3UDU8sDZDYfCNSXyPp7-BQoraVnTk_Is8HycKFhfOKZYWIII3EelbfTJLtqmslbB68FBpv7hqiA=w640-h480-k-no",d:"Tapas restaurant στο κέντρο της παλιάς πόλης. Δοκίμασε το courgette flower με goat’s cheese."},
  {by:"Anna",n:"Tast Club",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmMTmxmpvOGMEmwcgmz6HlNgIy8r3KE1sk9bUvJUb8B5LIjbtuSFvE_K_aDDgI-VnfI1ILbAlpenaU3vyr4HZbiuCLrgM0FoQnOjRXMUlzH-bdbwY6cZd5Jk3WIqQuFtKmmUgNt7=w640-h480-k-no",q:"Tast Club, Palma, Mallorca, Spain",c:[39.5716,2.6474],cat:"food",day:"all",type:"Palma old town · Spanish & tapas",rating:4.4,reviews:1934,price:"€30–60",hours:"Έως 01:00",tag:"Reservable on Google Maps",d:"Κρυφή είσοδος στην Carrer de Sant Jaume. Ισπανικό restaurant με intimate ατμόσφαιρα."},
  {by:"Anna",n:"DÔME Restaurant and lounge",q:"DÔME Restaurant and lounge, Palma, Mallorca, Spain",c:[39.5713,2.6501],cat:"food",day:"all",type:"Palma old town · restaurant & lounge",rating:4.5,reviews:788,price:"€20–50",hours:"Έως 23:00",tag:"DJ weekends · Reservable on Google Maps",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLejixYPlGlzmqS5_moPHlPUtI6XmqlBhjYFZ1X8zK5NmGt9fVBR8VIj5NEvImKIrmduRwjB9M8w2jcO5W4OUFSe6-3x7glXEcSe6oKkgGgzxxBF4Ys_AYJ5EayeWoKSHq5uWARS3QiGMOI=w640-h480-k-no",d:"Underground restaurant/lounge, με DJ τα weekends."},
  {by:"Anna",n:"Pasta e Pesto",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmO09qZPILmfrUxXC9GEVpZ3iigDQ7GJRvj6Whdi6EVkVxzg0unNv3CBnC_FqkDHSnLc7u0X0cbT1N8jmzNQxQMbMCxlmrt8M7bGDT2A926bZ4_1qZd52PvaJZnluKfrStBa0r6RIGc-I43W=w640-h480-k-no",q:"Pasta e Pesto, Palma, Mallorca, Spain",c:[39.5709,2.65],cat:"food",day:"all",type:"Palma old town · fresh pasta",rating:4.8,reviews:786,price:"€10–20",hours:"Έως 22:30",d:"Φρέσκια pasta που φτιάχνεται μπροστά σου. Κάτσε στον πάγκο."},
  {by:"Anna",n:"Bibap",q:"Bibap, Palma, Mallorca, Spain",c:[39.572,2.649],cat:"food",day:"all",type:"Palma old town · Korean & Asian",rating:4.3,reviews:1656,price:"€20–30",hours:"Έως 22:30",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmP7HQdbMHhTcY6_GQYZB4OzdaLg00B3QvkIi-eO6bwlu42VJutngMTCGJY77mZi2C7CmhBrpdhHOnzHt-qlWQy-9e0VF_OaypShNLCHIRc8LYdpmKIRh5K7B1CDpUwYDX5vFP8cfbNh5ZW2=w640-h480-k-no",d:"Κορεάτικο και ασιατικό. Δοκίμασε το duck bibimbap."},
  {by:"Anna",n:"Restaurante El Cuerno",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmNHqoGtFx5IITAn1bzJNrxI-2cnqwpd15mWgBvCEimfj7hmJOj3UgoWYEeHNXEtGL1TAdYo_m3UUU16NBQdMhHxOAbHoFGMpn2IyHitjjrF2f-yrAOWZpg7ODAwdUIhHgRoHvvrpvB5KlxK=w640-h480-k-no",q:"Restaurante El Cuerno, Palma, Mallorca, Spain",c:[39.5679,2.648],cat:"food",day:"all",type:"Palma old town · Mediterranean",rating:4.2,reviews:696,price:"€20–30",hours:"Έως 23:00",tag:"Reservable on Google Maps",d:"Μεσογειακό restaurant κοντά στον καθεδρικό, γνωστό για τη sangria."},
  {by:"Anna",n:"Bacán",q:"Bacán Specialty Coffee & Brunch, Palma, Mallorca, Spain",c:[39.5705,2.6507],cat:"food",day:"all",type:"Palma old town · coffee & brunch",rating:4.7,reviews:714,price:"€10–20",hours:"Έως 15:00",tag:"Ζήτα τραπέζι στο πίσω patio",d:"Specialty coffee και brunch."},
  {by:"Anna",n:"Fika Farina",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLcoqYDKXoxBpKoiRZ7vn_l2V0NmsxIhDXxUhEf3sH1LDeKqzp6euXmqoAVcAn74xItmc6Pizsd8idMMZaXek5m0s1QtHQ3FHGZNNKKCBdre-OLCypiNHIhI9AlysKTILoBPQ25UndnFMfI3=w640-h480-k-no",q:"Fika Farina, Palma, Mallorca, Spain",c:[39.5693,2.6545],cat:"food",day:"all",type:"Palma · coffee & bakery",rating:4.8,reviews:1871,price:"€1–10",hours:"Έως 20:00",d:"Coffee και bakery. Δοκίμασε cardamom και cinnamon buns."},
  {by:"Anna",n:"La Rosa Vermutería & Colmado",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmP7u77DxxGJatx9aF5rguNM9ALCOwBAEnz-hV61709XS3qRPu_CaaF2GONEfceuHNObiKbzjsW4MNmBifPZ-hD7NLSvXt6pHM9npjUhZO_38_ny9hlRxA_B1x0HwrF3GU7WXdgF=w640-h480-k-no",q:"La Rosa Vermutería & Colmado, Palma, Mallorca, Spain",c:[39.5718,2.6502],cat:"food",day:"all",type:"Palma old town · vermouth bar",rating:4.5,reviews:7727,price:"€20–40",hours:"Έως midnight",tag:"Reservable on Google Maps",d:"Vermouth bar και grill στο Sant Jaume. Δοκίμασε το house vermouth."},
  {by:"Anna",n:"Bar Nicolás",q:"Bar Nicolás, Palma, Mallorca, Spain",c:[39.571,2.65],cat:"food",day:"all",type:"Palma old town · cocktail bar",rating:4.4,reviews:1025,price:"€10–20",hours:"Έως 02:00",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmPa3Vln6hOLFCTJ4sEUqycomPHg7dj1a1oq9LJuXDin9bkgFkvoRijT1FB-P90tQftAeO6ykz9NtLZPussCBdrixi7QwE8uT1bZBC7Y6LYQ5bdV6yGonbZLChG1wArNSAHjVUrVt5AWz63m=w640-h480-k-no",d:"Cocktail bar στην Plaça del Mercat. Δωρεάν popcorn ή crisps με κάθε drink."},
  {by:"Anna",n:"Bar Central",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLcWqFkpcVOpQLpaxhEIuUO3308hB_oJDIBXWLfNpMYieNLw5_M4wkWI7vtfyTWX5Lc0oq3X3PbP-y8idywkswdx4UOP8cbb7SlL2ISXaszsjaxFr9wIhwJxP4A_AN2RdjZLEAoXsU-YuRKB=w640-h480-k-no",q:"Bar Central, Palma, Mallorca, Spain",c:[39.5719,2.6484],cat:"food",day:"all",type:"Palma old town · bar",rating:3.2,reviews:277,price:"€10–20",hours:"Έως 00:30",d:"Bar στην πλατεία, καλό για people-watching."},
  {by:"Anna",n:"Bar Rey Sancho",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLcqsRaKCLXw5gnwvsfm77s5jqx_WFXjy0b7xoeTcJke3CmLjHUmHSyYG2SR6as_2zV3ZGzdZhrBaUtelJG2tRfsdsymOKL1JFQV98kIAQWRYvh66r_xEFJyfh3hoOF_5nZeYfH6r-XXG2I=w640-h480-k-no",q:"Bar Rey Sancho, Palma, Mallorca, Spain",c:[39.5845,2.656],cat:"food",day:"all",type:"Arxiduc · restaurant & natural wine",rating:4.9,reviews:260,price:"€20–30",hours:"Lunch until 15:30 · dinner from 19:30",d:"Restaurant με πολύ καλή επιλογή natural wines, περίπου 15 λεπτά βόρεια από το old town."},
  {by:"Anna",n:"Primo Taquería",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmOuY6mSG_pqFMFEuqX-kBnIBMQlNF9XP8ZsORO1ZkkAJbalz8TNn-9V1fSnMgJosPMFC9nfIcBzbBLhtut-nF_CHI0bpGca6MsARhKOk3wWPbG1HBHYlclnpzTa4NwGhPj8sRbk=w640-h480-k-no",q:"Primo Taquería, Palma, Mallorca, Spain",c:[39.5719,2.6365],cat:"food",day:"all",type:"Santa Catalina · Mexican",rating:4.4,reviews:3327,price:"€20–30",hours:"Έως midnight",tag:"Reservable on Google Maps",d:"Mexican στη Santa Catalina. Τα frozen margaritas είναι δημοφιλή και δυνατά."},
  {by:"Anna",n:"Hotel Hostal Cuba Skybar",q:"Hotel Hostal Cuba Skybar, Palma, Mallorca, Spain",c:[39.5684,2.635],cat:"food",day:"all",type:"Santa Catalina · rooftop bar",rating:3.4,reviews:144,price:"€10–20",hours:"Από 16:30",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmO9yWu43ebbQbRKVuT1IqUxmlwR9m3D6fhnyfRnAO7uajvL5vsQCAnq-gncPS28v6nD4xt8GnL6x2PLpjzZiJZ55n9uNMDC-KdN85He7u_n1I499vE6JvwQtk4scKPwVtArCDjTESDeYl8F=w640-h480-k-no",d:"Rooftop bar με θέα στον καθεδρικό και τον κόλπο. Πήγαινε στο sunset."},
  {by:"Anna",n:"Bacán (Seafront)",q:"Bacán Specialty Coffee, Palma, Mallorca, Spain",c:[39.568,2.64],cat:"food",day:"all",type:"Seafront promenade · specialty coffee",rating:4.9,reviews:117,price:"€1–10",hours:"Έως 15:00",d:"Espresso bar στην παραλιακή, με θέα στη μαρίνα."},
  {by:"Anna",n:"El Olivo",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLf9NIut3XVN1vPfYQmww6u1loJo1pQA-WKSd9aArhfe7dDK8Jz1ffto-1MWCsW73tIWgYfMhO16EMBIKLOqDSwqIPSOCGMfhJ_M-70nljAlQdI165k4AczdB7D4THjQlroQMmblCBpLSDY=w640-h480-k-no",q:"El Olivo, Deià, Mallorca, Spain",c:[39.7482,2.648],cat:"food",day:"all",type:"Deià · fine dining",rating:4.3,reviews:471,price:"€100+",hours:"Dinner from 19:30",tag:"Book ahead for terrace at sunset",d:"Fine dining στο Deià. Η terrace είναι ιδιαίτερα ωραία στο sunset."},
  {by:"Anna",n:"Foradada Mar Restaurant",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmOBDe_uM8GUtiNODyAaPNxlmszkzTaaDF9H-GnmRA_P28yiCg6lSHPYBcItWK1eT_Q2KAxPx69ZCLh-l3iqunlaj0hLHoGMMWw_oTTYWg73d8VIjQFIS81uJGfm4mrAUmV-2XK-QqezSx0Q=w640-h480-k-no",q:"Foradada Mar Restaurant, Son Marroig, Deià, Mallorca, Spain",c:[39.753,2.623],cat:"food",day:"all",type:"Son Marroig · restaurant",rating:4.1,reviews:81,price:"€50–100",hours:"Lunch · closes 16:00",tag:"Reservable on Google Maps",d:"Restaurant κοντά στο Son Marroig, γνωστό για seafood paella."},
  {by:"Anna",n:"Roseta Valldemossa",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLfX0s74bt1dw8UCzLOrWu31lAsM6ZaPExckui1CfMcR5ApGliIOJVJ1C6hbBGc0MSnp_BghS8EsQ31GjTbgKny7SKT1YXaw-WoQTPE9mwGH5HeQ2OrGbXxESGLJoWm0yfk60ALZP9GU5SYQ=w640-h480-k-no",q:"Roseta Valldemossa, Mallorca, Spain",c:[39.7102,2.6227],cat:"food",day:"all",type:"Valldemossa · café & shop",rating:4.7,reviews:114,hours:"Daytime · closes 16:00",d:"Café και shop στη Valldemossa. Το window seat έχει θέα στα βουνά."},
  {by:"Anna",n:"Jumeirah Mallorca",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmNLLbPgzVI-NOybTALGx3_77jKiN9hsoBBQ4HfUSJOCJ3b7og7yuHtWGKYpYTesiBJp3GAp92zZfgRApmMs9wvXRBB7SwPgE7wt09POIw0RFiCzcwhzLb_wKyTETjjJKjQpLb-p9Q=w640-h480-k-no",q:"Jumeirah Mallorca, Port de Sóller, Mallorca, Spain",c:[39.7968,2.696],cat:"food",day:"all",type:"Port de Sóller · 5-star hotel bar",rating:4.6,reviews:1176,d:"5-star hotel bar με πανοραμική θέα στον κόλπο. Sunset drink."},
  {by:"Anna",n:"OCRE Restaurant & Bar, Can Ferrereta",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLdqXTDN4MKmqPPVXgOVuOB4PTv0AL8OeLlfPFNKSZGjhlB73QeQRF1m68dba1RjTUX1oZM2va6MRI0s2nQkgL2Q7izE72nhWMhF_PwcYgaJOH2LGtcisDhX4-LPOJk6lUsO32U=w640-h480-k-no",q:"OCRE Restaurant & Bar, Can Ferrereta, Santanyí, Mallorca, Spain",c:[39.3548,3.129],cat:"food",day:"all",type:"Santanyí · Mediterranean",rating:4.7,reviews:151,hours:"Dinner from 19:00",tag:"Reservable on Google Maps",d:"Mediterranean restaurant στο Can Ferrereta, με outdoor patio."},
  {by:"Anna",n:"Restaurante Es Figueral",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLePPbuRriQd1NFbQDRscIAbOeqdW8UtBHwG0oxhSLe9lZh4lEJesRDPnQtIXmvumwm3jQT1hV3CJQfrSrB4Kh-K-F4g5y2HUyxmD6b1k4GhHsiSPoJRywL-MWOKrjexRtCcyGMvHqu16HpW=w640-h480-k-no",q:"Restaurante Es Figueral, Santanyí, Mallorca, Spain",c:[39.345,3.115],cat:"food",day:"all",type:"Inland · restaurant",rating:4.8,reviews:180,price:"€50–90",hours:"Dinner from 19:00",d:"Garden setting στην ενδοχώρα, με ζώα να κυκλοφορούν στον χώρο."},
  {by:"Anna",n:"Restaurante Paparazzi",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLc1lqXbEE0D6rL2eauJSeokhLSkAI6p5YEk2K2sgeMVK_S74y1SUdT_BIAfSCW3igVgaTO92htJylbpCfEBQXwM4M5KkI2mg1-nA6n5u1Nqu1lemOnsUNU__CA308YvFpR2PS3U=w640-h480-k-no",q:"Restaurante Paparazzi, Cala d'Or, Mallorca, Spain",c:[39.378,3.234],cat:"food",day:"all",type:"Cala d'Or · Mediterranean",rating:4.2,reviews:1438,price:"€20–30",hours:"Έως 23:00",d:"Casual Mediterranean restaurant στην Cala d’Or, με καλό value."},
  {by:"Anna",n:"Roosevelvet Bakery",q:"Rosevelvet Bakery, Palma, Mallorca, Spain",c:[39.5707,2.6553],cat:"food",day:"all",type:"Arxiduc · bakery",d:"Bakery που φαίνεται να βρίσκεται κοντά στο Bar Rey Sancho. Έλεγξε το ωράριο πριν πας."},
  {by:"Anna",n:"Serra de Tramuntana",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLepaBUyJUigMjXzmazdVYMO5RXBv66wsN1c9OuNAiw6pL63OKRd12cjwilxUec57gJp2jidtk_wu0N2-xCGc9L0mji2Ujjm4cFJ4R2o3laW1DjuzC9W3gUJMCvC6ZJbzullmzzLlg=w640-h480-k-no",q:"Serra de Tramuntana, Mallorca, Spain",c:[39.76,2.7],cat:"sights",day:"all",type:"Mountain range · UNESCO",d:"Η Serra de Tramuntana είναι η ορεινή ραχοκοκαλιά της δυτικής Mallorca και το σκηνικό για Deià, Valldemossa, Sóller και Fornalutx."},
  {by:"Web research",n:"La Seu Cathedral",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLfBidg6qndFSbsD_sVMXV2GpqiLXFeVKb2mL7pZAa6QV4JMG9-5_1_i6CIg5ymxajfONqsHVA2DLsevRDqv8x7SqQqElSupZ0UFYwSG-MyXxN0cNMWorK_B2zwIfTezdrrqMsU=w640-h480-k-no",q:"Catedral de Mallorca, Palma, Spain",c:[39.5676,2.6489],cat:"sights",day:"mon",type:"Palma · Gothic cathedral",rating:4.6,reviews:16417,d:"Το πιο χαρακτηριστικό landmark της Palma, πάνω ακριβώς στο waterfront."},
  {by:"Web research",n:"Palau de l’Almudaina",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLcJNXMsQYXdnXBeQlg0tBpOUf5bKUdWBvZQaau2a5C9bESuEQohr3wH6uEWPqIZCcpx0o1fJ9MkmqicvCjYCmwhssV-GTPFDI2GI6WjqJwz3dnj4MBnmPGYZ7FIMxk58nTXJHMi=w640-h480-k-no",q:"Palau de l'Almudaina, Palma, Spain",c:[39.5678,2.6487],cat:"sights",day:"mon",type:"Palma · royal palace",d:"Βασιλικό παλάτι δίπλα στη La Seu, με αυλή και ιστορικά δωμάτια."},
  {by:"Web research",n:"Castell de Bellver",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmNGnBeOOhSaXSLmaeGlKs6MxrFXtUCIYODgbN339RXkblXr8V5GRkPhbejJaCEJXh5_zD9ZNkB7pBo3i2CcE8YjEE0y2lq1a29Bn4Q9JO6nsmKTczohf6yD5huDnyO9hajgrSw39Q=w640-h480-k-no",q:"Castell de Bellver, Palma, Spain",c:[39.5631,2.6198],cat:"sights",day:"mon",type:"Palma · castle & viewpoint",rating:4.5,reviews:26852,d:"Κυκλικό κάστρο πάνω από την Palma με πανοραμική θέα στον κόλπο."},
  {by:"Web research",n:"Arab Baths",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmP-QLzI0zhP0sA0g2KsYj7ikwixfh8sNHHqv--nGwljRPtJ2-Se8ZTC0dY4cKChR8jHjnviVvJseznbrfrsxfNX637HX14eKV1ds_ozBgLcBzd_FZ1FNLUBQ27KSi9o-48FO5TZnNHLtLE=w640-h480-k-no",q:"Banys Àrabs, Palma, Spain",c:[39.5707,2.6503],cat:"sights",day:"mon",type:"Palma · historic baths",d:"Μικρό αλλά ιδιαίτερο κατάλοιπο της αραβικής Palma μέσα στην παλιά πόλη."},
  {by:"Web research",n:"Mirador des Colomer",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmPUYzuN8KaII6D6tBW7Ql8L5PrwKdnKUHeQPX6mmgamNA2SyD_njX2CO0xySYOzCPgVXQyeabtZ11RAhgeN9nKnrTYpusA2QdvKuZ3k-1eaUAQiiomUch8ABdRLYwa4hCRoPQAamlcWXxo=w640-h480-k-no",q:"Mirador des Colomer, Mallorca, Spain",c:[39.9275,3.1983],cat:"sights",day:"sat",type:"Formentor · cliff viewpoint",rating:4.8,reviews:11528,d:"Από τα πιο διάσημα viewpoints του νησιού, πάνω από τους απόκρημνους βράχους του Formentor."},
  {by:"Web research",n:"Talaia d’Albercutx",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmOCZRO4dxt9o-BOsBZiQQhkSYFFDQFvTOYTj4wHFhj_qafzr00MQcwVoWTz0IK1Zw8QWGwS_5USnleNQiEuOeCr2XGvVqgRCs2Tq5h8VxZv4ywCOzYgFsNhLYjQa6_D4GyYYIgClA=w640-h480-k-no",q:"Talaia d'Albercutx, Mallorca, Spain",c:[39.9308,3.2074],cat:"sights",day:"sat",type:"Formentor · historic tower",d:"Παλιός πύργος-παρατηρητήριο με εντυπωσιακή θέα στην ακτογραμμή."},
  {by:"Web research",n:"Sa Calobra",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmN9k26OyytLCOQBg4ZppSuxAHQGSFgj8jxXuvF3SK5rOKaEEHQhfQ73B6dYWXTsWY2Ayh7lD46xETLfMzd_fiC3FlvJC7auxJqim119_ALBYSb38jX2clxSHI9P2LqiirsrW8gF=w640-h480-k-no",q:"Sa Calobra, Mallorca, Spain",c:[39.8504,2.7984],cat:"sights",day:"sat",type:"Tramuntana · scenic road",d:"Διάσημη ορεινή διαδρομή και δραματικό coastal scenery προς το Torrent de Pareis."},
  {by:"Web research",n:"Torrent de Pareis",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmP_pcE1y8mg0v2C2_Yt7lHeIRsSj3czusKN1ZJBZdYTHdgqfXU3ftjvhFPFXoGKH5vIBS2vDrwUe1JopXq4yQu7Js-KF8ZTh0c5B3Bv2NnUMPPHWSb5Q89gp_5pK9L3cBdKtAGz=w640-h480-k-no",q:"Torrent de Pareis, Mallorca, Spain",c:[39.8534,2.8018],cat:"sights",day:"sat",type:"Tramuntana · gorge",d:"Εμβληματικό φαράγγι της Tramuntana, ένα από τα πιο εντυπωσιακά φυσικά τοπία της Mallorca."},
  {by:"Web research",n:"Son Marroig",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmOQIWRYfBz5LfUx3xShyxLI5bQxtyC4gtVnLwjahqpk2BI_wc3QIw4kHR2CEfblil5Hb1Dhw0IzG77dguPU3tynI_1BWAt0vxC8OFNbHjsmil-6DMre238e9MwtcWh3EzcDyEA9=w640-h480-k-no",q:"Son Marroig, Deià, Mallorca, Spain",c:[39.7505,2.6208],cat:"sights",day:"sat",type:"Deià · historic estate & viewpoint",d:"Ιστορικό κτήμα πάνω από τη θάλασσα με θέα στη Sa Foradada."},
  {by:"Web research",n:"Sa Foradada",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmMacmQKdGFMYgUbRoik49yCbUq6hAqGuj4RDjAB4IJs7ffUJke-wfIALUA_PCHJoF2VtHJN6bCYyE1KFHmkQ4so5Nn-JSHw0uXFY6CKqH-4ClWoRQ6uKRdT_dtM6D_uhTQ3jeoUSQ=w640-h480-k-no",q:"Sa Foradada, Deià, Mallorca, Spain",c:[39.7525,2.6200],cat:"sights",day:"sat",type:"Deià · rock viewpoint",d:"Εμβληματικός βράχος με τρύπα στη θάλασσα και κλασικό sunset viewpoint."},
  {by:"Web research",n:"Capdepera Castle",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmNwzajUSZMJn2xDcfQownjGVTHx4cIMAGH5VXDfI8x7Hbig-oocPphErHQQMHUP_HE3AVSXloe_VCtzrK4h4l8ajIMPJjDtJhKU5yO7o98mIV781r-c_0RTpkjBLcjrXJaDCTo=w640-h480-k-no",q:"Castell de Capdepera, Mallorca, Spain",c:[39.7021,3.4337],cat:"sights",day:"all",type:"Castle · medieval fortress",rating:4.5,reviews:9760,d:"Μεσαιωνικό κάστρο πάνω από την Capdepera με θέα προς την ανατολική ακτή."},
  {by:"Web research",n:"Castell d’Alaró",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLcCfU5cfSGsXGFvOV550j7FoSbDfcgnuRasiGb2eutr2mtvnvjsB7fgfAHvQQtTy4ziMS0cI2pyyCHQ6xnUdRpoWjppRuEQSrCfX3YWZSvKahMvTfRBJ_ZJFP7xtLzSc9xSTO_GNchSCn_E=w640-h480-k-no",q:"Castell d'Alaró, Mallorca, Spain",c:[39.7356,2.7872],cat:"sights",day:"all",type:"Castle · mountain hike",rating:4.8,reviews:807,d:"Εντυπωσιακό mountain castle σε κορυφή· θέλει πεζοπορία."},
  {by:"Web research",n:"Cuevas del Drach",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmM3GlktH4RrW9tzT8UQ2xXNF7v8KpgE7a7NmFjZcCSV25fC0NJb-2MTfYKtR-k5DbpHzV6lB_4JnHWLysLJh03S4mPslCcP63AsP01tgicqflWQCruGIrVR1s9hT5ZXYjOssqLC=w640-h480-k-no",q:"Cuevas del Drach, Porto Cristo, Mallorca, Spain",c:[39.5337,3.3295],cat:"experiences",day:"all",type:"Caves · underground lake",rating:4.0,reviews:13614,d:"Μεγάλο σύστημα σπηλαίων με τη λίμνη Martel και μουσική παράσταση μέσα στο σπήλαιο."},
  {by:"Web research",n:"Cuevas de Artà",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmOj1Rf8SbEjYhvnbw0hJ4y0HqCWszmqhE8ZsvLdsklCGx_5KdM0-kzsACuUJPmV0t6M6Akj73wHfJuO0moMTAWL4iJcuQBZ-rdpswnb2fygnOEzetEDbahx5tv33fEXW1o-6X31=w640-h480-k-no",q:"Cuevas de Artà, Mallorca, Spain",c:[39.6567,3.4498],cat:"experiences",day:"all",type:"Caves · guided visit",d:"Εντυπωσιακές σπηλιές με τεράστιους σταλακτίτες και θέα προς την ανατολική ακτή."},
  {by:"Web research",n:"Tren de Sóller",q:"Tren de Sóller, Mallorca, Spain",c:[39.7668,2.7148],cat:"experiences",day:"sat",type:"Vintage railway · Palma–Sóller",d:"Ιστορικό ξύλινο τρένο ανάμεσα σε Palma και Sóller."},
  {by:"Web research",n:"Palma Aquarium",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmPc1vxdRCm8PGsjI6j9sd2RSfPunvh6vIP78svVr0Pi9stNNdpYCdCRwEMb-dCNzEPVqkUfoZb_W-3lS2Fo6RO-LJiSPb7fE9UFU8W8m1zDj_f4THhB_0mBVSDOdBJN2s-1yBSsRApeD-PW=w640-h480-k-no",q:"Palma Aquarium, Mallorca, Spain",c:[39.5375,2.7190],cat:"experiences",day:"all",type:"Aquarium · marine life",rating:4.4,reviews:33516,d:"Μεγάλο aquarium στη Palma, καλή εναλλακτική αν ο καιρός χαλάσει."},
  {by:"Web research",n:"Safari Mallorca",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmOiCccukW29gbZJWKg2npfj6YBkudllz4eeRo_CRKi4KKH7k6pTFpBBeYG7g6g9stjPlmY7rY88V0Xgd70CsT8i-IkQzJmOXb2mJ5PpRGpxpYQcZsMa_IIxmgxn6c0lwlJ2cnSf3OJ9XW2x=w640-h480-k-no",q:"Safari Mallorca, Cala Millor, Mallorca, Spain",c:[39.6045,3.3730],cat:"experiences",day:"all",type:"Safari park · wildlife",rating:3.8,reviews:6276,d:"Safari-style park στην ανατολική Mallorca με ζώα και διαδρομή μέσα στο πάρκο."},
  {by:"Web research",n:"s’Albufereta",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmNZF37FvoCY1ZyVlNhCuQiYJhFhKwaK-0VnyFSBOg5N1C49zJF9UZ2sl38yCsDqlE3pDg4nSiiiERH8L5gg8YIeA4cejNSrVOx0Y6JvIXJUqx44ay21AulNjDioW21vdD0GRR6_MQ=w640-h480-k-no",q:"Reserva Natural de s'Albufereta, Mallorca, Spain",c:[39.8904,3.0870],cat:"experiences",day:"fri",type:"Nature reserve · birds",rating:4.5,reviews:269,d:"Υγροτοπικός βιότοπος κοντά στην Alcúdia, καλός για birdwatching."},
  {by:"Web research",n:"Península de Llevant",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmMRqauHrAczIStZ0g5QhbLWrNv5lom6GL0Ke9delsmSBPkZjqDcSnkNjdu4_NcWuG4JvOowTMs29wv9NVYVD291diLhmprzdtvvPk6fBtY8YIbjuS160eherhZeoFyC15jkojZ77g=w640-h480-k-no",q:"Parc Natural de la Península de Llevant, Artà, Mallorca, Spain",c:[39.7170,3.3420],cat:"experiences",day:"all",type:"Nature park · hiking",rating:4.8,reviews:775,d:"Μεγάλη προστατευόμενη περιοχή με μονοπάτια, ακτές και άγριο τοπίο."},
  {by:"Web research",n:"Es Trenc",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmO55ZMwXGr-9Xrv7_Z609Oq57kWHASyq40VsgcZPZrzVwyT3xP6gD6Yyi6l1MDdygw59XG04-Kmbwh93Xa4h-DfKg7s30W8SRpprbTaBL4Satx5Vci0V72q9G6EAkxwPu_4ZRB-qg=w640-h480-k-no",q:"Es Trenc, Mallorca, Spain",c:[39.3178,2.9946],cat:"beaches",day:"all",type:"South · long natural beach",d:"Μεγάλη φυσική αμμουδιά με διάφανα νερά και αίσθηση πιο άγριας παραλίας."},
  {by:"Web research",n:"Cala Agulla",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmNNpF8tns4YHYzOif8aF3fuHIqr0-zqgPyA2FsUcgcUNkHSsO2fSlpHgf8r593-cT1fmQjzSw4mEl_jistUqE3Qdc7bB6vcUliWhAe08RLx7hPsxmt-xNHIHq4eQ-36xhTRQh7eJA=w640-h480-k-no",q:"Cala Agulla, Mallorca, Spain",c:[39.7207,3.4611],cat:"beaches",day:"all",type:"East · pine-backed beach",d:"Μεγάλη αμμώδης παραλία ανάμεσα σε πεύκα και λόφους."},
  {by:"Web research",n:"Cala Mesquida",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmMw2S1_X7y1eeLvkyyrmgY-FFARS4CKyP8A5w_BmClfCG28baXnruChITWOnCkXaOjkiFGg7AaaIRTyvdSmiHx4whZKLb_KyDSddi77TucYYXjs1Vg4akDBWLN6vKEYW04BBW8=w640-h480-k-no",q:"Cala Mesquida, Mallorca, Spain",c:[39.7388,3.4325],cat:"beaches",day:"all",type:"East · dune beach",d:"Ανοιχτή παραλία με αμμόλοφους και καθαρά νερά."},
  {by:"Web research",n:"Cala Llombards",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmO2xbuhqdMVa1AktORR58qTJ5GBMnr1CDUd_XsB2TZSeNugZr6qnF6Fh8bu-aIm1pNWHBB1liSXxsXAQ-EZn5KcD-UcuGaxPhGdNPyoFEcY7DR-ea_5Fv7rGX00Vm7eRFb3LkA=w640-h480-k-no",q:"Cala Llombards, Mallorca, Spain",c:[39.3164,3.1398],cat:"beaches",day:"all",type:"Southeast · cove",d:"Μικρή τιρκουάζ cala ανάμεσα σε βράχια, κοντά στο Santanyí."},
  {by:"Web research",n:"Caló des Moro",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLfevftPpqnGWpePX2qGMb2MMhWxnDE9c9O6bQi7bZVQIMfw0C5wXXsEH-UBPzA4evqfCVmOsbSCuhnommfCmY9JFHBz2XjXC_Z7kJ9hewhuP0FBbfMpK1PB20JF-IKNQ4re97Rod6sNggnL=w640-h480-k-no",q:"Caló des Moro, Mallorca, Spain",c:[39.3125,3.1197],cat:"beaches",day:"all",type:"Southeast · iconic cove",d:"Μία από τις πιο φωτογραφημένες μικρές calas της Mallorca, με κρυστάλλινα νερά."},
  {by:"Web research",n:"Cala Santanyí",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R6U8XMF2LZhYs1NjJ7X-kTP5T-AJBIaX8dTkcZjsBsJdf5UTPtmaR477gWKHs_FGFjUB0PpMNNK7g-amPJzdji4yKaBEOuGfUSRQeQfHejrqP3cAk4pmCLXPsIVkHQBh0Rnq4W=w640-h480-k-no",q:"Cala Santanyí, Mallorca, Spain",c:[39.3263,3.1451],cat:"beaches",day:"all",type:"Southeast · sandy cove",d:"Εύκολη και οργανωμένη cala κοντά στο Santanyí, με καθαρά νερά."},
  {by:"Web research",n:"Cala Pi",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmN9fUAeHYneoQhdQ0RZReHR3UuCeFE9Rn9ek2dTZEWS8EKjNoQV_kqNbU-xVNEJKMq_-hIE8fEFSgnDbxOpL1KKBvhP873zyLaTtT1d068b8P6LM8-E6mNcEHwUfgkCxGS7tA6-=w640-h480-k-no",q:"Cala Pi, Mallorca, Spain",c:[39.3611,2.8288],cat:"beaches",day:"all",type:"South · narrow cove",rating:4.3,reviews:4101,d:"Στενή, ψηλή cala με πεύκα και καθαρά νερά."},
  {by:"Web research",n:"Cala Tuent",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmP1wLLRwRee_ColOhay6C5TBQbxugGlmBikaJYY-s5q-F_QYv7KIv0k-KITpr4xtIVbFultt5HG7PDo2bNoEqKwGxh4Cg1jZH2QM7tWkfFfGQ_F8dDJ0qXfBfteOcOuxODhHuhd=w640-h480-k-no",q:"Cala Tuent, Mallorca, Spain",c:[39.8214,2.7825],cat:"beaches",day:"sat",type:"Tramuntana · wild cove",d:"Άγρια παραλία κάτω από τα βουνά της Tramuntana."},
  {by:"Web research",n:"Portals Vells",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLeCtfwdtgN4ZiXGVdHs9t6svoCGjLDKX2MLGgzHR3CeIRFJwALJ4FK5EbiljhhL2Erza5eIK8jBeW2iudDklQKZNhvNBVAaNllHW25WnCd-d6rphAwChg92-n9gqP0kfGR4aAyE=w640-h480-k-no",q:"Portals Vells, Mallorca, Spain",c:[39.4872,2.5204],cat:"beaches",day:"all",type:"Southwest · three-finger bay",d:"Μικρός κόλπος με τρεις στενές εισόδους στη θάλασσα, πεύκα και μικρές αμμουδιές."},
  {by:"Web research",n:"Cala Major",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmNGA2iXVFbOyKs9zG2-9WnR9lhiS1ug5hAMAMXT17y4GK1MFJeBhgchQ1JuHHer3MMtZUetlnFjS8S6Oafq1g00yHBAgjLcgCjgGy7vqkAfxMVokNOqQXg4tBDAwccCayuNKRI=w640-h480-k-no",q:"Cala Major, Palma, Spain",c:[39.5530,2.6070],cat:"beaches",day:"mon",type:"Palma · city beach",rating:4.4,reviews:12907,d:"Μεγάλη εύκολη παραλία πολύ κοντά στην Palma."},
  {by:"Web research",n:"S’Amarador",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLd0xz5wBZmXcicSsZ74OYZKBS6s7AmVM9zZGA5FoyEbLmnX7GC2Zl133g1tSww4lwqzxpmINk1rwRgknsCZJnyE1FFG2JO9puX5_fPh6XYlCfyLoNkqR3gUcraq41R36DR12NFX=w640-h480-k-no",q:"S'Amarador, Mallorca, Spain",c:[39.3459,3.1888],cat:"beaches",day:"sun",type:"Mondragó · natural beach",rating:4.5,reviews:1713,d:"Φυσική παραλία μέσα στο Mondragó, με τιρκουάζ νερά και πεύκα."},
  {by:"Web research",n:"Mirador del Pontàs",photo:"https://lh3.googleusercontent.com/grass-cs/ACvplmMmmZoeAVx6f2iUsa7hlPnQJYLyE_AqlNfEF_WTSfcK9d4mhxAHaKoPvbvfqgrvDq8wA6Y3Ha-4bfP1eMO1cF2WOGlIUUTXSBYr_aofNV_Om-PSMGjgtg94ElkIJiO3Y2vGSxg3_wyXtVD2=w640-h480-k-no",q:"Mirador del Pontàs, Cala Santanyí, Mallorca, Spain",c:[39.3267,3.1550],cat:"sights",day:"sun",type:"Cala Santanyí · sea arch viewpoint",rating:4.8,reviews:1715,d:"Θέα στον χαρακτηριστικό βραχώδη θαλάσσιο σχηματισμό Pontàs."},
  {by:"Web research",n:"Punta de n’Amer",photo:"https://lh3.googleusercontent.com/grass-cs/AABkmLd1uLJQx_R8XVGZfqJpwA4AU2suKN2yWWkRBq2XVLE4-5n00TitdH0FxjDgWToAGqa_LMd8DKKIu6N8DCGcQk0KpgMwKeEbfM7-C3xfQW6761V7UTJbk-iGUYcTAB4yQ9W4BdCF0fSqJTYT=w640-h480-k-no",q:"Castell de la Punta de n'Amer, Mallorca, Spain",c:[39.5620,3.3820],cat:"sights",day:"all",type:"Coastal fortress · nature",rating:4.5,reviews:6328,d:"Μικρό κάστρο πάνω σε προστατευμένη χερσόνησο, με μονοπάτι και θάλασσα."},
  // View & house music, Live music, Nightlife, Paella and Seafood (Google Maps coordinates and ratings, 28/09/2026)
  {by:"Pantelis",n:"UM Beach House",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWksuhs-q0yEtGWCyHSkf5ElryYNyVF_9RlewyiuRnr8Dz_0wOGLPdpy0C4dpSZCekqQ9ewxi9uo8s0K8Bj78Fm1vcldKUtKj8ZmFasZ-9cwhLearb4ggEBvJHg6GLHwg0n-uEAhZA=w640-h480-k-no",c:[39.532,2.56028],cat:"house",day:"all",type:"Portals Nous · beach club",rating:4.4,d:"View & house music."},
  {by:"Pantelis",n:"NUSA DUA BEACH CLUB",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlAYtKYLNynQCNeoMUpYwh6b0G6lXC81tXDBh0rtzieHcQxoWStFn7kSCWruxrrZLUwGcAVISLsqDHvRe1vDZTRP_a9uLRBGdBU7YY1FZubKYAkTsL6-fpg0fi40PmUV3HEOmDELAyIRKk6=w640-h480-k-no",c:[39.76984,3.14936],cat:"house",day:"all",type:"Can Picafort · beach club",rating:4.4,d:"View & house music."},
  {by:"Pantelis",n:"Sea Soul Beach Club",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnMHitxIwQbs7Vr1n0lRv_FVYgKR7aLOfRA46L3QrgUwvL5vQXZ3nhe8RJ4-tNOBBr7lAPq8bHuLjw1CjdD0Y9C1vTUKpZFK4zUhX0_kM0VQGnWa9vP0BEx8BnhSlYOtgoMvrpK=w640-h480-k-no",c:[39.83185,3.11942],cat:"house",day:"all",type:"Alcúdia · beach club",rating:3.4,d:"View & house music."},
  {by:"Pantelis",n:"Purobeach Palma",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S-Um4dTAwJHTl1nmtZu7pXchmftmM2A6kEfZz17CiZj8wd2xPHraQQagfACuRlny_YbvbkZ-HfT0DmbyAndUJ5ktJntpQ-JtHLsk3yfAn2I4lQGrWDP8kzsmr_-T_EkicgWjMyRBjsV5Oz=w640-h480-k-no",c:[39.53522,2.70966],cat:"house",day:"all",type:"Palma · beach club",rating:4.2,d:"View & house music."},
  {by:"Pantelis",n:"Purobeach Illetas - Beach Club",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkVX02LrK8WUNXdBNhIUKjUVCm3C3Rj4l69aJ4fXrjwBqhrJYi9M8_oTTAkZqylxCH4HHzT2dR24oxYjOh4XryOv_o9Ypqn0o2LIZL53bLooXf-0_zurQcLzew_0SkgfcBMcmuXJN7YsJ0=w640-h480-k-no",c:[39.53775,2.59159],cat:"house",day:"all",type:"Illetas · beach club",rating:4.4,d:"View & house music."},
  {by:"Pantelis",n:"Arrosseria Sa Cranca",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmQXyS4EUwOd3vHAGlgGX83m_0PX3WL8YjVhOxn3z7aZ9TYUqygrmAaViaaBS2xbYshPABgClIZB2IZE5Wog9it92qKIUfmtMnzzgKevvJtAl4mwFl_Tglem0jkMJj5DRS9EULbPg=w640-h480-k-no",c:[39.56802,2.63054],cat:"food",day:"all",type:"Palma · Paella",rating:4.3,d:"Paella."},
  {by:"Pantelis",n:"Ca n'Eduardo",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkQKFjAp1i1X8ZjYuCk4WmO2X0cQ9-IY7fSQzfmuVTf_2ta9swiMe2H2nTGheAElPmr0uOydDXp51yKR9nUv58yoXc969bIFbQo9JaOMWRBBY1YeX81-KPYS6j-cELKMNzgBjw9=w640-h480-k-no",c:[39.56845,2.64066],cat:"food",day:"all",type:"Palma · Paella",rating:4.2,d:"Paella."},
  {by:"Pantelis",n:"Paella Lover",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWloyrZ85mkUZ3YEFg4EO0b7kfUvbsWX46csXOdlK8baGGVipX86TdxJtec237tkBJECQ7W_kWD9aDM8Lf_y3clqLZk7KXtFQi6lEMetmX-ZMSs5i4eUY_aI99qbV5W1I06Vhj4gnfF6o3UQ=w640-h480-k-no",c:[39.57039,2.65424],cat:"food",day:"all",type:"Palma · Paella",rating:4.9,d:"Paella."},
  {by:"Pantelis",n:"Restaurant la Parada del Mar",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlkXLqIwuXMgAO5Iqzqft8sS9UfOdZS7yaFoJD8pHhhhManmGWaEfEEOYw71DfiywnwOKUaaxYAyISO1O2cXC2ur53jO6OoiTeFVeKliDeeLQbOl4mb29EiNwiE8BkmGs7gXJIY=w640-h480-k-no",c:[39.55193,2.61188],cat:"food",day:"all",type:"Palma · Seafood",rating:4.6,d:"Seafood."},
  {by:"Pantelis",n:"La Balada del Agua del Mar",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9REWO0XH-2WPykhuthaOy7awSOov787owL1QOKClz4-NnHdXhojL2QkiNVspiaWDCrk34eOnCSFzTQX7mZX692CekWcQU7LM4_jyWx6p_AHBGL0OyHqrw34-y0fl20drC6lFQf4=w640-h480-k-no",c:[39.90931,3.08545],cat:"food",day:"all",type:"Pollença · Seafood",rating:4.6,d:"Seafood."},
  {by:"Pantelis",n:"Restaurant Manique",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlQ0fMyTJcY2_uiSapujavIG25hXEr00cIzpyOI5ziTYgLdFPkrQe_CEdw7f18pnhbfD-ZxjWxghLzvV7I3_GpmrvgTsRYx1AH4nS7opGPdKzwvMQMGcOwPkA01eugjDTaTP7tjCA=w640-h480-k-no",c:[39.35349,3.12913],cat:"food",day:"all",type:"Santanyí · Seafood",rating:4.8,d:"Seafood."},
  {by:"Pantelis",n:"Ca'n Manolo Palma",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkDRJRRpnpMkXDqkN85hN2QPl4Uu0j7bXzHUSPNQE34jdwmH9ef6mmRbSBmGQ2lJnykWSgyHX56s2FP-McVH0746wInUoVptLq6PEXRlDpeml7_nEuBmoc3PuloSzGS-cBa2Ltv=w640-h480-k-no",c:[39.56715,2.6283],cat:"food",day:"all",type:"Palma · Seafood",rating:4.6,d:"Seafood."},
  {by:"Pantelis",n:"Restaurante Bonsol",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T8E7BlSjvAI3ZEvVvq89OBIYD8LiEOMMvToPbII8zhd2vJ6Ng7q-AYt0qLhGzKmZPm6aL6IwDfwy1atFxLMYtS4oXd14i1o1WsNaQh5dwKQo9z4PlhVxM-i5z5e06sCMHjFtY=w640-h480-k-no",c:[39.55203,2.69177],cat:"food",day:"all",type:"Palma · Seafood",rating:4.6,d:"Seafood."},
  {by:"Pantelis",n:"Airecel",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TzjytWILNXa98yG8kEoplEwtXQp7dqVAKgiEwRMIPb8Wg4gdAblwEIookiZMwAJ03kb1mTbXGy6iwzjr_Qk4KyUYigDILj_BrpvC_sam79ShtVDVT62FHPG-a1hSwFe-nh48FMdw=w640-h480-k-no",c:[39.79601,2.6976],cat:"live",day:"all",type:"Port de Sóller · Live music",rating:4.7,d:"Piano / live vocals · 18/10."},
  {by:"Pantelis",n:"Randemar",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkp4doVhWyqWM1IGPfHHwMCh66YYd6ML0NkXDRSONh-To-rLJWepeu255AKuBfw6yshmP5cGmeJ07c-qyJUuEqhC6YIdtdQ8i0tbZRLBznaJFc5del2pKhhrAtHR9ZKvFe4nSA_=w640-h480-k-no",c:[39.7938,2.69701],cat:"live",day:"all",type:"Port de Sóller · Live music",rating:4.3,d:"DJs + live music + dinner · regular."},
  {by:"Pantelis",n:"Suculenta",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RfIMwLH9vtgK6OyJ2kr1sXcrI_Van_fMt6Da9Nme9OFKD8L2je9JkNItKJzJrizl42D1rNCfzselIDrVsZGiLe74YpIdVWFQqXpsnmkABYLpX1VSShDdGeYGoyqqaCFUfqwAR4=w640-h480-k-no",c:[39.79584,2.69325],cat:"live",day:"all",type:"Port de Sóller · Live music",rating:4.5,d:"Live local bands + dinner · weekly."},
  {by:"Pantelis",n:"Agapanto",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnTg02Eg9OErOR-UBoWvvDKywuaPvrXuTRO7QmAO_XkL8Ed7Dd2y4_ddJNvgSFJ5piBj9Eyn1XyDDr2lfCB5EFoX4Jev9pFWj37C0ScfmDWfIgbrL0vsdlhGOpzS-91yLvt7ODzi0XtnUvg=w640-h480-k-no",c:[39.79154,2.69029],cat:"live",day:"all",type:"Port de Sóller · Live music",rating:4.7,d:"Vocals / sax / jazz · regular."},
  {by:"Pantelis",n:"Ses Oliveres",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnKbqQJHftPV7cGKgV3TGHSYi4_-6BCi0Bm8FUb3WRMXqcmg6AmVxtEqwqKlTvcTEWYq3otntEMLYwn-8NaTbe55gX8Gkh1fuqsivZg3DMMDSLtWl537YdQAHCNUShQjj682ZU=w640-h480-k-no",c:[39.79405,2.69698],cat:"live",day:"all",type:"Port de Sóller · Live music · Seafood",rating:4.5,d:"Live music + seafood · certain nights."},
  {by:"Pantelis",n:"Albatros",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl_zar4_xhf3ekNB5mK6Dfi5G4XzXVxenblnSXOzCk_sad8IwYvg5rIHFTlpKGNjse1wC-8Uofrj743vN-StEkKdM6aqVQM-tWBf9RxUiFOIVA5U5NRIQDcB5c1-8Dxfu79zy2yily3WacN=w640-h480-k-no",c:[39.79827,2.69454],cat:"live",day:"all",type:"Port de Sóller · Live music",rating:4.0,d:"Guitar / vocals · regular."},
  {by:"Pantelis",n:"Blue Jazz Club",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmCKfZRqfCeJRYpNTs4igAMqF3DKQAc8Jy9QlRhIE2FskzWCInvV1FmhsTu8hIa1M9shJqeF9DFIPAl6w3pNz445N5xV0GGzLfL2U_LNE6lzEzv07Fm_A32yUv68Rdf2-WPdxdS2YjmlrY=w640-h480-k-no",c:[39.57177,2.64228],cat:"live",day:"all",type:"Palma · Live music",rating:4.1,d:"Live jazz stage · regular."},
  {by:"Pantelis",n:"L'Àtic Restaurant",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnDGDFp5qtZ0m4Pj6OKEksfTz0Wuo1O4ZZ3rsj_PhFYQBP5Zh9ceMr0sHY4IZnjYlh3K9uTjiC84DU-g7VxDF2t_oBV8EVjuBIb-2mvoCLspKhd6hWNSUBLDPdKw9N6Cd6VAPz8qw=w640-h480-k-no",c:[39.57182,2.64239],cat:"live",day:"all",type:"Palma · Live music",rating:4.7,d:"Dinner + live jazz stage · regular."},
  {by:"Pantelis",n:"AMØK",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl1X5TDAUOZoLKoYUuib6VJ-8fS188_ryJ5NFH1OwvVgzH_Z05eOGPdoDsespMl3_5ucv56TgRakGy7kq7djEH34MTg_r-9G3GIN4dAHwD-nWhTlT495wGV4r9C45eaUNq0h7PN7IaN0aZr=w640-h480-k-no",c:[39.53606,2.74174],cat:"nightlife",day:"all",type:"Palma · Nightlife",rating:4.1,d:"House / melodic / underground · 17/10 — Denis Sulta + Javi Bora + Kiko Navarro."},
  {by:"Pantelis",n:"R33",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RBDDuvB7nHXxTioS54NiaBE42Wat3kvqOSv790MRgnMQhzI2dQJztPLw2vAPsdJjFPQOn8OrDapn9o0lrUqp7VLcwsJGVZkgcAqf7zoOc-_58zT_yEJjhXXMjNfMecTtTVzQla=w640-h480-k-no",c:[39.59694,2.63139],cat:"nightlife",day:"all",type:"Palma · Nightlife",rating:3.9,d:"Underground house / melodic techno / techno · 17/10 — Ezequiel Arias."},
  {by:"Pantelis",n:"Overclub",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlNDByfnfj2zPjWJDwq4qKqMknDOiUDM8EIPK6ZsjVeV-nh0UIT5IhtIMr4erYQUKG2mUh3tvEP_fZ--85hsaJK0GKtm2k4biGo4PK-cPUeqSNTx2-1MZggupJRYk7bu2XWaDU_8k5-haDB=w640-h480-k-no",c:[39.60341,2.65653],cat:"nightlife",day:"all",type:"Palma · Nightlife",rating:4.0,d:"Melodic house & techno · 17/10 — Mariano Mellino / Mike Gannu / Not Demure."},
  {by:"Pantelis",n:"Selva Club",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmcb4uEQmkc2pUjIggeSeCzJa0NHiqivV7nOYznzmEM7kzTw2MuBcQXm_7BWv9HiLKCFM6qTbcfhGa1HnhLSM0W87GGFeKS-LTBfOpNR8NRYwrvtWK3CmE5VaBmAhgd47XfetNi=w640-h480-k-no",c:[39.60669,2.67126],cat:"nightlife",day:"all",type:"Palma · Nightlife",rating:4.2,d:"Deep house → tech house → techno · 17/10 — RITUALË."},
  {by:"Pantelis",n:"Kaelum Club",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn3WI_GVSDqSwzzFxZq9wi2936tpB_A0IelWiMM-mi6GppdYOaUJUY1ZQyR_v5mNGZinU1Q243eY90qlPHbjpNop_5iZxmzCfzOcI1KEKKA2TqIzY5p2wTAV7JUrIoFh6W_xBek=w640-h480-k-no",c:[39.56982,2.63912],cat:"nightlife",day:"all",type:"Palma · Nightlife",rating:4.1,d:"Electronic / club · Friday–Saturday."},
  {by:"Pantelis",n:"Garden Club Alcudia",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QYWZerF9fpODaZ5WvCP2yTHrOMMLCJIH3yzSn6QouAwkfm5PqbX_ACQHCBOiJnIYM6mGu9Blg73FxXM9W3KvrSzMFf4PUkl_Z56K9oDyUWDOSRIPaPv0OcxKDLq3rUJEQBjtG7uJvXzRnh=w640-h480-k-no",c:[39.84052,3.1217],cat:"nightlife",day:"all",type:"Port d'Alcúdia · Nightlife",rating:4.9,d:"Organic / melodic / progressive house, rooftop + cocktails · 17/10 — VICE, 20:00–04:00."},
  {by:"Pantelis",n:"Outxide Club",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmAmgAVIT_1JssFpSVSUAwNIDZdM04kvKx9WsSlZcHOh5hSqc-I-h4VK9qS1LSBOyix8l7I_yfSQw93lTwH2YNI-PwGrCDTufE8NSw8M9oxaVvn3Bl8nXpZNeTTHLQhFeteFa400DFYW2Qr=w640-h480-k-no",c:[39.83947,3.12034],cat:"nightlife",day:"all",type:"Port d'Alcúdia · Nightlife",rating:4.8,d:"Club / nightlife · Fri–Sat, 23:00–05:30."},
  {by:"Pantelis",n:"Eclypse",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmuExCGZ69p9lJ29mn7Uro46_0BfFfwKh99tSe-Kvd8XjNems_CmGOmNj353ur9kI5ygSPrRcRlgz1F-EnlpcpGQMt1qhrp8N-tODYZ0pBtPuv-KzKxCp5VL_C7APpegAuE0TvH36p-iFk=w640-h480-k-no",c:[39.83947,3.12034],cat:"nightlife",day:"all",type:"Alcúdia · Nightlife",rating:4.8,d:"Club / party · Saturday, 22:30–05:30."},
  {by:"Pantelis",n:"Bell's Disco & Club",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9STgWOzhWrOF7BuwGjd5XkJ0TFcQKdxcsAQNLRplTi6BwZvnCEQ795lW8v8K7q2bCtke3J_JPxkBDDyUAeBnkK-ZlrJ2VBxnXlxAynlfKHtIsgVLUDTfhBH97JnrxSZlBygNV--=w640-h480-k-no",c:[39.83202,3.11627],cat:"nightlife",day:"all",type:"Port d'Alcúdia · Nightlife",rating:4.8,d:"Disco / club · Fri–Sat, 23:30–05:30."},
  {by:"Pantelis",n:"Banana Club Mallorca - Alcudia",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnscoIjE7bg4PHjwpwtdWeFsYSCj9cswor5sUKt9P6GOYUKcPDauwNlVVDJ26PJAATMcekgVaYS0LUeq8T8y--jaqkP8_dkAz4MjZmp1NWqc63XF3LfdPw1QIfGfp74lHEuhxAYMYqJkT4=w640-h480-k-no",c:[39.83955,3.12045],cat:"nightlife",day:"all",type:"Alcúdia · Nightlife",rating:4.6,d:"Reggaeton / commercial · 16/10, 23:00–05:00."},
  {by:"Pantelis",n:"La Nit",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl1i6ODHiR9zB04EAPsUBg3U0X9pGxM36zL8ysRgZL66vhyWP836kRZKoovG5xNr_5MtGiIsLcc0pS7AZ_9x4_USYQUt7ygdiv-Y1LmMdLhYoA4ps1b9khZta4Kc7XGL7o6KMNQ-n4NP3Yd=w640-h480-k-no",c:[39.83965,3.1205],cat:"nightlife",day:"all",type:"Port d'Alcúdia · Nightlife",rating:4.7,d:"Late-night club · daily, 21:30–05:30."},
  {by:"Pantelis",n:"Enjoy Cafe Lounge",photo:"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RmYG7UmJ-9jdnJyZIA9wKTKXWrt4TkyeqVSMkEcKI8Cibt8UOq9lOgiy4BrWukTglFGZAud3w8v36VsKFZahxp48KeV8_6443Cf66auRWfHcHPzP1xJBcSeBJRRons7gbhNKRBLQ=w640-h480-k-no",c:[39.83959,3.1203],cat:"nightlife",day:"all",type:"Port d'Alcúdia · Nightlife",rating:4.6,d:"Cocktails / lounge / nightlife · daily, 18:00–05:30."},
  {by:"Pantelis",n:"COCOA Restaurante / cócteles",photo:"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWly_RZpW1L9xL6nbyLna5s5yglpztCNfUgBVOEG3eY7rLE7N_mhlZYLjY6O5MF1hzM7QCH3RVYPV14cNc_vKBS7ETLi8lYSnnbws28n4upZ01wJgs1uVDUqBq-40uvgHoTFFzD8OStl-6zy=w640-h480-k-no",c:[39.84165,3.12931],cat:"nightlife",day:"all",type:"Alcúdia · Nightlife",rating:4.6,d:"Dinner + cocktails · daily, 10:00–02:00."}
];

// Villages on the day trips. gid = Google place id (used to open the right place in Google Maps).
function village(id,name,gid,c,day,description,rating=null,reviews=null,photo=""){return {id:id,name:name,gid:gid,c:c,day:day,data:{description:description,photos:photo?[photo]:[],rating:rating,reviews:reviews,food:[],sights:[],experiences:[],instagram:[],hotels:[],notes:[],by:"Pantelis",parking:"",route:""}};}
// village("id","Όνομα","Google place id",[lat,lng],"sat|all","Περιγραφή")
// day:"all" = φαίνεται σε όλες τις μέρες, χωρίς να είναι στάση.
const villages=[
  village("fornalutx","Fornalutx","",[39.7822,2.7410],"sat","Ίσως το πιο παραμυθένιο μικρό χωριό του νησιού. Σκαλιστά πέτρινα σοκάκια, 10 λεπτά από το Sóller.",null,null,"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tcja3FSktJW1g1ap-b97AiCgQyZa131JaCkqUnuIIcAxP51slmuFFF5TNUHpvqOOnP3iCPWDpj7XXmVP9LZKxH7_kmdfvCho2TuTLqAVni5aIkSIAoIDXUaNm_DVAPVEAsF1oRLA=w640-h480-k-no"),
  village("valldemossa","Valldemossa","",[39.7115,2.6226],"sat","Πέτρινα σοκάκια, λουλούδια και βουνό γύρω γύρω.",null,null,"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmgcTKF197y54_nCr_UPgkXFWaaisUoC0-MPMSwVbjBoluI8OOm2rzvpcGAOWG6FB3lbPxionPgSus6iTMehqRxK_23zQvzlVA-E8DPnPexcOPnwzLQtutjJ-JHwvC6qsz2BhzDNQ=w640-h480-k-no"),
  village("deia","Deià","",[39.7486,2.6486],"all","Πέτρινο χωριό σκαρφαλωμένο στην πλαγιά, με θέα στη θάλασσα.",4.6,1052,"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkQz0ZUGoQXlMK7E8teDtzQ-mfqQ7VyD-RdXhnqezU3_IdfITZeb3V9TVz0_aKufQbRCYmX4LJMStrRIVNs4flZkhkKXp0CSKclu0KzLHx29qaln2AZ2KgdbPOj4RagV1I7l8r8=w640-h480-k-no"),
  village("soller","Sóller","",[39.7671,2.7158],"sat","Μεγαλύτερο και με περισσότερη ζωή. Συνδυάζει βουνό, χωριό και το Port de Sóller.",null,null,"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QX5QgTm3sHOVj9Puc5oe7u9R-DsW51sO4EI_z0MlyXclDEnMiUzLAr_nwxe-jQuQhtriQ46ipOo_RHxfP3xXHxgJ6JtIWna4w_yBnwv40PFCdzsV3cpOO3Hj8594QP1Sfaar_1XQ=w640-h480-k-no"),
  village("pollenca","Pollença","",[39.8760,3.0176],"sat","Ιστορική πλατεία, Calvari steps και καφές πριν την ανηφόρα προς Formentor.",null,null,"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl2BlHmF2PHSdR5QuqpkRDh1DgLxFTjK62uAnnm-Vb676oRVn3dnt7HbPBo7uWDS70b-CrNH10gwMwn7NVXudCSTOKustt4g-lcef3K040b0Iq69RvdxEdDWH9hCRf5sv1FFw7Cpg=w640-h480-k-no"),
  village("alcudia","Alcúdia Old Town","",[39.8525,3.1192],"fri","Πολύ όμορφο αλλά σε άλλο στιλ: μεσαιωνικό, μέσα στα παλιά τείχη.",null,null,"https://lh3.googleusercontent.com/grass-cs/ACvplmMJmWZrtpAp-4HvEivB16-N3Fr6eocir85cRM066lWr_D7OPICn9L0TuZCs6TR3-CyfAEPv28j8g08flgTCUOQuTQbwcawWvG_NHZ5qd4WCFsQzCWtUHa7xKQjZW0KkGqObE7jF=w640-h480-k-no"),
  village("santanyi","Santanyí","",[39.3545,3.1290],"sun","Χωριό από χρυσαφί πέτρα στα νοτιοανατολικά, κοντά στις calas. Έχει αγορά Τετάρτη και Σάββατο, μέχρι τις 14:00.",null,null,"https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlySEALRv033A48XRXN_QCIVW9-lIfEHYAEJ1uOyL7oyML3NZ9BtUdMtPA3zgxEPhjs6nfAyTyj3gs3Hw99SqGsC67ycTCF_7W2p8LD5LDuunZhNSYNH-q1OUcqRQzDqCUWl1d8=w640-h480-k-no")
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
function ratingHtml(r,n){return n?"<span class='stars'>★ "+r.toFixed(1)+"</span> · "+n.toLocaleString()+" κριτικές":"<span class='stars'>"+r.toFixed(1)+"</span>";}
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
    stops.querySelector(".cat-hint").textContent="Σύρε από τη δεξιά άκρη ή πάτησε το handle.";
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
  drawer.addEventListener("pointerdown",e=>{tracking=true;sx=e.clientX;sy=e.clientY;if(e.pointerType!=="mouse")drawer.setPointerCapture?.(e.pointerId);});
  // Listen on the document: a mouse is not captured (so clicks reach the buttons) and may be released outside the drawer.
  document.addEventListener("pointerup",e=>{
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
