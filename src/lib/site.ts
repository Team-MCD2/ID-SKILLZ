/**
 * Single source of truth for ID SKILLZ content.
 *
 * Data verified from:
 *   - id-skillz.com (Wayback Machine snapshots Jan 2026)
 *   - RCS Paris registration (SIREN 919 523 480)
 *   - Mentions légales (Sami Hifdi, Bilal Koçhih)
 *   - Google Reviews (verified handles)
 *   - YouTube channel @idskillz (12 official videos)
 */

export const site = {
	name: "ID SKILLZ",
	tagline: "Our Skillz, Your ID — #OSYI",
	taglineFr: "Vos Skillz, Votre ID — #OSYI",
	short: "Agence de communication créative — Site web, Design, Vidéo, 3D.",
	description:
		"ID SKILLZ est une agence de communication créative basée à Paris et Toulouse. Sites internet sur-mesure, identité visuelle, vidéo de marque, modélisation 3D et rendus photoréalistes. Anciennement Mwcrea Agency, depuis 2022.",
	url: "https://id-skillz.com",
	email: "hi@id-skillz.com",
	phone: "+33970703686",
	phoneFormatted: "+33 9 70 70 36 86",
	whatsapp: "+33970703686",
	siren: "919 523 480",
	siret: "919 523 480 00012",
	tva: "FR62919523480",
	rcs: "RCS Paris 919 523 480",
	founded: 2022,
	previously: "Mwcrea Agency",
	addresses: {
		paris: {
			label: "Siège social",
			lines: ["66 avenue des Champs-Élysées", "75008 Paris, France"],
			href: "https://maps.google.com/?q=66+avenue+des+Champs-Elysees+Paris",
		},
		toulouse: {
			label: "Studio",
			lines: ["16 chemin de Garrabot", "31770 Colomiers, France"],
			href: "https://maps.google.com/?q=16+chemin+de+Garrabot+Colomiers",
		},
	},
	team: [
		{ name: "Bilal Koçhih", role: "Président · Direction stratégique" },
		{ name: "Sami Hifdi", role: "Directeur général · Direction créative" },
	],
	socials: {
		instagram: "https://www.instagram.com/idskillz/",
		youtube: "https://www.youtube.com/@idskillz",
		google: "https://maps.google.com/?cid=15893497551796884603",
	},
} as const;

/* ---------------------------------------------------------------------------
 * Navigation
 * ------------------------------------------------------------------------- */
export const nav = [
	{ label: "Expertises", href: "#expertises" },
	{ label: "Services", href: "#services" },
	{ label: "Méthode", href: "#methode" },
	{ label: "Réalisations", href: "#realisations" },
	{ label: "Avis", href: "#avis" },
	{ label: "Contact", href: "#contact" },
] as const;

/* ---------------------------------------------------------------------------
 * Rotating phrases (Websenso-style auto-cycle on the expertises section)
 * ------------------------------------------------------------------------- */
export const rotatingExpertises = [
	"des sites web qui respirent",
	"des identités qui marquent",
	"des vidéos qui captent",
	"des univers 3D qui hypnotisent",
	"des marques qu'on n'oublie pas",
	"vos idées les plus ambitieuses",
] as const;

/* ---------------------------------------------------------------------------
 * Services (4 — Site web, Design, Vidéo, 3D)
 * Content enriched from id-skillz.com Wayback (Jan 2026 snapshot).
 * ------------------------------------------------------------------------- */
export const services = [
	{
		slug: "site-web",
		index: "01",
		title: "Site web",
		eyebrow: "Boostez votre présence en ligne",
		summary:
			"Du site vitrine élégant à la web app sur-mesure, nous construisons des présences en ligne qui convertissent et qui durent.",
		manifesto:
			"Dans un monde où chaque clic compte, votre site est votre vendeur le plus actif. Nous concevons des plateformes pensées pour vos clients, optimisées pour les moteurs, et armées des meilleures pratiques web modernes.",
		offerings: [
			{
				name: "Site Vitrine",
				body: "Site élégant et performant pour présenter votre activité, attirer des prospects qualifiés et exister sur Google.",
				bullets: ["Design éditorial", "SEO technique de base", "Pages clés (Accueil, Services, À propos, Contact)"],
			},
			{
				name: "Site E-Commerce",
				body: "Boutique en ligne complète, intuitive côté client, simple à piloter côté admin. Vendre 24/7, sans friction.",
				bullets: ["Catalogue & gestion stock", "Paiements sécurisés (CB, PayPal, Apple Pay)", "Promos, codes promo, newsletters"],
			},
			{
				name: "Web App / Sur-mesure",
				body: "Outil métier, plateforme SaaS, dashboard interactif. Quand le standard ne suffit pas, nous codons exactement ce dont vous avez besoin.",
				bullets: ["Architecture sur-mesure", "Tableaux de bord & réservations", "Évolutif au rythme de votre business"],
			},
		],
		video: "/media/videos/NA-DECOUVREZ_NOS_SERVICES_ID_SKILLZ_VOTRE_AGENCE_DE_COMMUNICATION.mp4",
		poster: "/media/renders/render-immeuble-terrasse-cafe.jpg",
	},
	{
		slug: "design",
		index: "02",
		title: "Design",
		eyebrow: "Sur Internet, votre image est formée par le design",
		summary:
			"Identité visuelle, supports imprimés, design digital. Nous donnons à votre marque un visage qu'on reconnaît, qu'on aime, qu'on retient.",
		manifesto:
			"Le design n'est pas la décoration de la stratégie : c'est la stratégie elle-même rendue visible. Couleur, typo, composition, iconographie — chaque élément travaille pour vous.",
		offerings: [
			{
				name: "Identité visuelle",
				body: "Logo, charte graphique, déclinaisons. Le squelette visuel sur lequel reposera toute votre communication.",
				bullets: ["Création de logos uniques", "Charte (couleurs, typos, visuels)", "Déclinaisons sur tous supports"],
			},
			{
				name: "Supports imprimés",
				body: "Flyers, brochures, catalogues, packaging, signalétique, vitrophanie. Du print qui valorise vraiment.",
				bullets: ["Flyers, brochures, catalogues", "Affiches & signalétique", "Marketing point-de-vente"],
			},
			{
				name: "Design digital",
				body: "Visuels réseaux sociaux, bannières, menus interactifs, UI/UX pour sites et applications.",
				bullets: ["Réseaux sociaux (post, story, reel)", "Menus boards restaurant", "UI/UX produit (sites & apps)"],
			},
		],
		video: "/media/videos/05-SOS_CHAUFFEUR_-_TEASER.mp4",
		poster: null,
	},
	{
		slug: "video",
		index: "03",
		title: "Vidéo",
		eyebrow: "Captez l'œil, gardez l'attention",
		summary:
			"Tournage, drone, motion design, montage. Des films de marque, teasers et campagnes pensés pour les écrans d'aujourd'hui.",
		manifesto:
			"Une vidéo n'est jamais juste « une vidéo ». C'est une promesse en mouvement, un instant de marque, un argument qui se ressent plus qu'il ne se lit.",
		offerings: [
			{
				name: "Films de marque & teasers",
				body: "Le format roi pour raconter votre histoire en 30, 60 ou 90 secondes.",
				bullets: ["Direction artistique", "Tournage multi-caméras", "Étalonnage & sound design"],
			},
			{
				name: "Couverture événementielle & drone",
				body: "Inaugurations, lancements, rallyes, événements sportifs. Captation live + montage rapide.",
				bullets: ["Pilote drone certifié DGAC", "Captation événementielle 4K", "Live-edit pour réseaux sociaux"],
			},
			{
				name: "Motion design & sport",
				body: "Animation graphique, lower-thirds, intros, vidéos explicatives, contenus athlètes (Sofiane Oumiha, Adidas, Subway…).",
				bullets: ["Motion design 2D/3D", "Vidéos sportives & athlètes", "Versions formats (16:9, 9:16, 1:1)"],
			},
		],
		video: "/media/videos/06-ONIRIS_COMMUNICATION_-_TEASER_COVERING_RALLYE_AICHA_DES_GAZELLES.mp4",
		poster: "/media/renders/render-artisan-boulanger.jpg",
	},
	{
		slug: "3d",
		index: "04",
		title: "3D",
		eyebrow: "Donnez vie à vos idées en volume",
		summary:
			"Modélisation, rendus photoréalistes, animation. De l'avant-projet immobilier au prototype produit, nous matérialisons ce qui n'existe pas encore.",
		manifesto:
			"La 3D n'est plus réservée aux blockbusters et aux constructeurs auto. C'est désormais l'outil le plus puissant pour vendre un bien avant qu'il existe, valider un design, ou raconter un produit.",
		offerings: [
			{
				name: "Modélisation 3D",
				body: "Architecture, immobilier, produits, prototypes, objets et sculptures.",
				bullets: ["Plans 3D intérieurs/extérieurs", "Prototypage produit", "Sculpture & objets fonctionnels"],
			},
			{
				name: "Rendus photoréalistes",
				body: "Visuels HD pour vos campagnes, dossiers de vente, validations clients.",
				bullets: ["Rendu immobilier & architectural", "Visualisation produit marketing", "Présentations haute fidélité"],
			},
			{
				name: "Animation 3D",
				body: "Vidéos explicatives, simulations, parcours interactifs, publicités animées.",
				bullets: ["Présentations interactives", "Vidéos explicatives & pubs", "Projets artistiques animés"],
			},
		],
		video: "/media/videos/NA-Projet_-_3D_-_17_01_2026.mp4",
		poster: "/media/renders/render-immeuble-angle-vue-haute.jpg",
	},
] as const;

/* ---------------------------------------------------------------------------
 * Process — 6 steps (universal, dérivé des 3 versions service du site actuel)
 * ------------------------------------------------------------------------- */
export const process = [
	{
		index: "01",
		title: "Brief & analyse",
		body: "Une réunion (visio, café, ou les deux) pour comprendre votre activité, vos objectifs, votre cible. Aucune ligne de code, aucun pixel ne bouge avant.",
	},
	{
		index: "02",
		title: "Proposition & devis",
		body: "Sur la base de nos échanges, nous vous adressons une proposition stratégique chiffrée, claire et sans surprise. Vous validez, on démarre.",
	},
	{
		index: "03",
		title: "Conception",
		body: "Maquettes, croquis, moodboards, prototypes interactifs. Vous voyez votre projet prendre forme à chaque étape, vous donnez votre feeling.",
	},
	{
		index: "04",
		title: "Production",
		body: "Développement, tournage, modélisation, illustration : nos équipes exécutent avec les meilleurs outils du marché et un souci permanent de la finition.",
	},
	{
		index: "05",
		title: "Livraison & validation",
		body: "Une dernière passe rigoureuse, et on vous remet l'ensemble : code source, fichiers print, masters vidéo, livrables 3D. Vous validez, on met en ligne.",
	},
	{
		index: "06",
		title: "Suivi & maintenance",
		body: "Le projet vit après le launch : maintenance, support, ajustements, optimisations. Nous restons votre partenaire long terme, pas un prestataire de passage.",
	},
] as const;

/* ---------------------------------------------------------------------------
 * Realisations — Portfolio entries
 * ------------------------------------------------------------------------- */
export type ProjectCategory = "site-web" | "design" | "video" | "3d";

export interface Project {
	slug: string;
	title: string;
	client: string;
	category: ProjectCategory;
	year: string;
	summary: string;
	media: { poster?: string; video?: string };
}

export const projects: Project[] = [
	{
		slug: "showreel-2026",
		title: "Showreel agence — Découvrez nos services",
		client: "ID SKILLZ",
		category: "video",
		year: "2026",
		summary: "Notre carte de visite vidéo : un condensé d'1 minute 11 de tout ce que nos équipes savent faire.",
		media: {
			video: "/media/videos/NA-DECOUVREZ_NOS_SERVICES_ID_SKILLZ_VOTRE_AGENCE_DE_COMMUNICATION.mp4",
		},
	},
	{
		slug: "subway-angouleme-drone",
		title: "Subway Angoulême — Captation drone",
		client: "Subway",
		category: "video",
		year: "2025",
		summary: "Vue aérienne du nouveau restaurant Subway d'Angoulême — drone + ground multi-caméras.",
		media: { video: "/media/videos/09-SUBWAY_-_TEASER_DRONE_ANGOULEME.mp4" },
	},
	{
		slug: "subway-inauguration",
		title: "Subway Angoulême — Inauguration",
		client: "Subway",
		category: "video",
		year: "2025",
		summary: "Couverture inauguration : invités, équipe, premiers clients, l'ambiance d'un day-one réussi.",
		media: { video: "/media/videos/10-SUBWAY_-_TEASER_INAUGURATION_ANGOULEME.mp4" },
	},
	{
		slug: "sofiane-oumiha-mondiaux",
		title: "Sofiane Oumiha — Préparation Mondiaux",
		client: "Sofiane Oumiha (boxeur olympique)",
		category: "video",
		year: "2025",
		summary: "Immersion dans la préparation du double médaillé olympique. Lumière, salle, sueur.",
		media: { video: "/media/videos/NA-Sofiane_Oumiah_-_Preparation_mondiaux.mp4" },
	},
	{
		slug: "hadria-bader-monier-adidas",
		title: "Hadria Bader Monier — Capsule Adidas",
		client: "Adidas (athlète Hadria Bader Monier)",
		category: "video",
		year: "2025",
		summary: "Capsule athlète × marque Adidas : portrait, training, attitude.",
		media: { video: "/media/videos/08-HADRIA_BADER_MONIER_-_TEASER_VERSION_ADIDAS.mp4" },
	},
	{
		slug: "oniris-rallye-aicha-gazelles",
		title: "Oniris Communication — Rallye Aïcha des Gazelles",
		client: "Oniris Communication",
		category: "video",
		year: "2025",
		summary: "Covering du Rallye Aïcha des Gazelles : le rallye-raid 100% féminin au cœur du désert marocain.",
		media: { video: "/media/videos/06-ONIRIS_COMMUNICATION_-_TEASER_COVERING_RALLYE_AICHA_DES_GAZELLES.mp4" },
	},
	{
		slug: "recupp-sport-performance",
		title: "Recupp Sport Performance — Teaser",
		client: "Recupp Sport Performance",
		category: "video",
		year: "2025",
		summary: "Lancement de marque : la récup du sportif, en 44 secondes percutantes.",
		media: { video: "/media/videos/07-RECUPP_SPORT_PERFORMANCE_-_TEASER.mp4" },
	},
	{
		slug: "sos-chauffeur",
		title: "SOS Chauffeur — Teaser corporate",
		client: "SOS Chauffeur",
		category: "video",
		year: "2024",
		summary: "Identité de marque vidéo pour le service de chauffeur premium SOS Chauffeur.",
		media: { video: "/media/videos/05-SOS_CHAUFFEUR_-_TEASER.mp4" },
	},
	{
		slug: "the-way",
		title: "THE WAY — Teaser",
		client: "THE WAY",
		category: "video",
		year: "2024",
		summary: "Pilote teaser sur la marque THE WAY : ambiance, geste, tension narrative.",
		media: { video: "/media/videos/NA-THE_WAY_-_TEASER.mp4" },
	},
	{
		slug: "immeuble-angle-3d",
		title: "Programme immobilier — Étude volumétrique",
		client: "Étude privée",
		category: "3d",
		year: "2025",
		summary: "Étude 3D d'un immeuble d'angle brique-blanc : modélisation, matériaux, lumière.",
		media: { poster: "/media/renders/render-immeuble-angle-vue-haute.jpg" },
	},
	{
		slug: "terrasse-cafe-3d",
		title: "Programme mixte — Terrasses & vitrines",
		client: "Étude privée",
		category: "3d",
		year: "2025",
		summary: "Mise en scène 3D d'un programme mixte : commerces en rez-de-chaussée, logements en étages.",
		media: { poster: "/media/renders/render-immeuble-terrasse-cafe.jpg" },
	},
	{
		slug: "artisan-boulanger-3d",
		title: "Artisan Boulanger — Façade",
		client: "Artisan Boulanger",
		category: "3d",
		year: "2025",
		summary: "Pré-visualisation 3D façade boulangerie : rideau métallique sombre + accents brique.",
		media: { poster: "/media/renders/render-artisan-boulanger.jpg" },
	},
	{
		slug: "maison-du-pain-3d",
		title: "Maison du Pain × Pâtissier — Pignon",
		client: "Maison du Pain",
		category: "3d",
		year: "2025",
		summary: "Concept de pignon double-enseigne pour une boulangerie-pâtisserie d'angle.",
		media: { poster: "/media/renders/render-maison-du-pain.jpg" },
	},
	{
		slug: "terrain-basket-3d",
		title: "Terrain de basket urbain — Étude 3D",
		client: "Étude privée",
		category: "3d",
		year: "2025",
		summary: "Animation 3D d'un terrain de basket urbain : matériaux, marquage, mobilier.",
		media: { video: "/media/videos/terrain-basket-3d.mp4" },
	},
	{
		slug: "carrosserie-amd-identite",
		title: "Carrosserie AMD — Identité visuelle",
		client: "Carrosserie AMD",
		category: "design",
		year: "2024",
		summary: "Identité atelier carrosserie : logo blason, déclinaisons NB, communication garage.",
		media: {},
	},
	{
		slug: "eco-synergy-identite",
		title: "Eco Synergy — Identité éco-responsable",
		client: "Eco Synergy",
		category: "design",
		year: "2024",
		summary: "Branding eco / agroalimentaire : logo, packaging, supports salons pro.",
		media: {},
	},
	{
		slug: "hookah-center-identite",
		title: "Hookah Center — Identité éditoriale",
		client: "Hookah Center",
		category: "design",
		year: "2024",
		summary: "Direction artistique épurée NB pour le concept Hookah Center.",
		media: {},
	},
	{
		slug: "mon-boum-streetfood",
		title: "Mon Boum — Le Meilleur du Street-Food",
		client: "Mon Boum",
		category: "design",
		year: "2024",
		summary: "Identité street-food gourmande : logo bicolore, signalétique camion, supports.",
		media: {},
	},
	{
		slug: "reno-bat-identite",
		title: "Reno Bat Invest & Conseil — Identité immobilière",
		client: "Reno Bat Invest & Conseil",
		category: "design",
		year: "2024",
		summary: "Identité visuelle premium pour société d'investissement & rénovation immobilière.",
		media: {},
	},
] as const;

/* ---------------------------------------------------------------------------
 * Clients (logos for the marquee)
 * ------------------------------------------------------------------------- */
/**
 * Clients logos.
 *
 * All entries use `logo: null` by design: the raw PNG files under
 * /media/clients(-mono)/ were corrupt on delivery (blank or unrelated
 * screenshots) so we render every partner through the shared
 * `ClientBadge.astro` component, which draws a branded SVG badge per
 * known brand (Mon Boum oval, Reno Bat buildings, Hookah Center, etc.)
 * and falls back to a clean italic serif label otherwise.
 *
 * When clean brand assets are dropped into `/media/clients/<slug>.svg`
 * later, swap `logo: null` to the path and update `ClientBadge` to
 * prefer the image over the SVG fallback.
 */
export const clients = [
	{ name: "Carrosserie AMD", logo: null, label: "Carrosserie AMD" },
	{ name: "Eco Synergy", logo: null, label: "Eco Synergy" },
	{ name: "Hookah Center", logo: null, label: "Hookah Center" },
	{ name: "Mon Boum", logo: null, label: "Mon Boum" },
	{ name: "Reno Bat Invest & Conseil", logo: null, label: "Reno Bat" },
	{ name: "Subway", logo: null, label: "Subway" },
	{ name: "Adidas", logo: null, label: "Adidas" },
	{ name: "Sofiane Oumiha", logo: null, label: "Sofiane Oumiha" },
	{ name: "Oniris Communication", logo: null, label: "Oniris" },
	{ name: "Recupp Sport", logo: null, label: "Recupp Sport" },
] as const;

/* ---------------------------------------------------------------------------
 * Partner slides — used by PartnersSlideshow component.
 * Mirrors the Websenso pattern: 4 logos × N sets, each set paired with a
 * synchronized editorial phrase. Sets auto-cycle every ~5.5s.
 * Clients may repeat across sets (Adidas / Subway sit at the intersection
 * of two sector clusters in our case).
 * ------------------------------------------------------------------------- */
export const partnerSlides = [
	{
		logos: ["Carrosserie AMD", "Reno Bat Invest & Conseil", "Mon Boum", "Adidas"],
		phrase:
			"Du commerce de proximité aux marques globales — chaque secteur a son tempo, on s'aligne.",
	},
	{
		logos: ["Adidas", "Sofiane Oumiha", "Recupp Sport", "Subway"],
		phrase:
			"Athlètes olympiques, franchises sportives, marques retail — la pression du dimanche soir, on connaît.",
	},
	{
		logos: ["Subway", "Hookah Center", "Eco Synergy", "Oniris Communication"],
		phrase:
			"Restauration, lifestyle, communication — on parle leur langue parce qu'on l'a tous testée.",
	},
] as const;

/* ---------------------------------------------------------------------------
 * Google Reviews — verified handles, copy verbatim from public Google Reviews.
 * ------------------------------------------------------------------------- */
export const reviews = [
	{
		author: "Sandrine Walter",
		handle: "Sandrine Temps Dance",
		rating: 5,
		body: "Je recommande car super travail, rapide et efficace, vraiment très professionnel. Une équipe à l'écoute qui sait mettre vos idées en valeur.",
	},
	{
		author: "SAS JIPROTECH",
		handle: "Client B2B",
		rating: 5,
		body: "Agence qui est à l'écoute et dans l'accompagnement, nous recommandons pleinement.",
	},
	{
		author: "Teddy Benomar",
		handle: "Indépendant",
		rating: 5,
		body: "Je remercie infiniment pour avoir remis mon site internet impeccable. Travail soigné, équipe au top.",
	},
	{
		author: "Crêpe Touch Angoulême",
		handle: "Restaurant",
		rating: 5,
		body: "Équipe formidable, merci pour le travail réalisé. Vivement recommandé.",
	},
	{
		author: "Olivia Maltese",
		handle: "Cliente particulière",
		rating: 5,
		body: "Agence au top du top. Service rapide, professionnel et créatif.",
	},
	{
		author: "Timoté Guillas",
		handle: "Entrepreneur",
		rating: 5,
		body: "Une équipe au top, je recommande !",
	},
	{
		author: "Corentin Maris",
		handle: "Client",
		rating: 5,
		body: "Bonne entreprise, sérieuse et réactive.",
	},
	{
		author: "Malika Lika",
		handle: "Cliente particulière",
		rating: 5,
		body: "Je recommande.",
	},
	{
		author: "Masao",
		handle: "Client",
		rating: 5,
		body: "Parfait !",
	},
] as const;

/* ---------------------------------------------------------------------------
 * FAQ — agrégation des FAQ services du site actuel (10 + 10 + 8 → top 8)
 * ------------------------------------------------------------------------- */
export const faqs = [
	{
		q: "Combien coûte un projet avec ID SKILLZ ?",
		a: "Le tarif dépend du périmètre : site vitrine, e-commerce, identité, vidéo, 3D… Nous établissons un devis personnalisé après une première session de brief de 30 minutes (gratuite et sans engagement).",
	},
	{
		q: "Combien de temps prend un projet ?",
		a: "Un site vitrine : 2 à 4 semaines. Un site e-commerce ou personnalisé : 6 à 8 semaines. Un logo : 5 à 7 jours ouvrés. Un projet 3D : entre 3 jours (modélisation simple) et 4 semaines (animation complète). Nous calons un calendrier précis dès le brief.",
	},
	{
		q: "Mon site sera-t-il responsive et bien référencé ?",
		a: "Oui, tous nos sites sont 100% responsive (mobile, tablette, desktop) et intègrent les meilleures pratiques SEO dès la conception. Si vous souhaitez un référencement plus poussé, nous proposons des prestations dédiées.",
	},
	{
		q: "Pourrai-je modifier le contenu de mon site moi-même ?",
		a: "Absolument. Nous travaillons avec des CMS simples et puissants (WordPress, headless, ou solution sur-mesure) pour que vous gardiez la main sur vos textes, photos et publications.",
	},
	{
		q: "Proposez-vous un service de maintenance ?",
		a: "Oui. Nous proposons des contrats de maintenance mensuels couvrant mises à jour, sécurité, sauvegardes et améliorations continues.",
	},
	{
		q: "Travaillez-vous uniquement avec des entreprises ?",
		a: "Non. Nous accompagnons aussi bien les entreprises que les indépendants, les associations et les particuliers ayant un projet créatif clair.",
	},
	{
		q: "Quels formats de fichiers vais-je recevoir en livraison ?",
		a: "Print : PDF haute résolution, sources Adobe. Digital : PNG, JPG, SVG. Vidéo : MP4 et MOV en HD/4K. 3D : OBJ, FBX, GLB selon usage. Toujours dans des formats utilisables au-delà d'ID SKILLZ.",
	},
	{
		q: "Comment démarrer un projet avec vous ?",
		a: "Le plus simple : appelez-nous au +33 9 70 70 36 86 ou écrivez-nous à hi@id-skillz.com avec un brief de 5 lignes. Nous reviendrons vers vous sous 24 h ouvrées.",
	},
] as const;
