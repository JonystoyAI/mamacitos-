import { MexicoState } from '../../types';

export const MEXICO_STATES_AND_MUNICIPALITIES: MexicoState[] = [
  {
    state: "Aguascalientes",
    municipios: ["Aguascalientes", "Asientos", "Calvillo", "Cosío", "Jesús María", "Pabellón de Arteaga", "Rincón de Romos", "San José de Gracia", "Tepezalá", "El Llano", "San Francisco de los Romo"]
  },
  {
    state: "Baja California",
    municipios: ["Ensenada", "Mexicali", "Tecate", "Tijuana", "Playas de Rosarito", "San Quintín", "San Felipe"]
  },
  {
    state: "Baja California Sur",
    municipios: ["Comondú", "Mulegé", "La Paz", "Los Cabos (Cabo San Lucas / San José del Cabo)", "Loreto"]
  },
  {
    state: "Campeche",
    municipios: ["Calkiní", "Campeche", "Carmen (Ciudad del Carmen)", "Champotón", "Hecelchakán", "Hopelchén", "Palizada", "Tenabo", "Escárcega", "Calakmul", "Candelaria", "Seybaplaya", "Dzitbalché"]
  },
  {
    state: "Chiapas",
    municipios: ["Acacoyagua", "Acala", "Acapetahua", "Altamirano", "Amatán", "Amatenango de la Frontera", "Amatenango del Valle", "Angel Albino Corzo", "Arriaga", "Bejucal de Ocampo", "Bella Vista", "Berriozábal", "Bochil", "El Bosque", "Cintalapa", "Coapilla", "Comitán de Domínguez", "La Concordia", "Copainalá", "Bosque de San Cristóbal", "Chiapa de Corzo", "Chiapilla", "Chicoasén", "Chicomuselo", "Chilón", "Escuintla", "Pueblo Nuevo Solistahuacán", "Palenque", "San Cristóbal de las Casas", "Tapachula", "Tuxtla Gutiérrez", "Tonalá", "Villaflores"]
  },
  {
    state: "Chihuahua",
    municipios: ["Ahumada", "Aldama", "Allende", "Aquiles Serdán", "Ascensión", "Balleza", "Batopilas", "Bocoyna", "Buenaventura", "Camargo", "Carichí", "Casas Grandes", "Chihuahua", "Chínipas", "Cuauhtémoc", "Cusihuiriachi", "Delicias", "Guachochi", "Guadalupe y Calvo", "Guazapares", "Guerrero", "Hidalgo del Parral", "Juárez (Ciudad Juárez)", "Madera", "Meoqui", "Ojinaga", "Saucillo", "Urique"]
  },
  {
    state: "Ciudad de México (CDMX)",
    municipios: [
      "Álvaro Obregón", "Azcapotzalco", "Benito Juárez", "Coyoacán", "Cuajimalpa de Morelos",
      "Cuauhtémoc", "Gustavo A. Madero", "Iztacalco", "Iztapalapa", "La Magdalena Contreras",
      "Miguel Hidalgo", "Milpa Alta", "Tláhuac", "Tlalpan", "Venustiano Carranza", "Xochimilco"
    ]
  },
  {
    state: "Coahuila",
    municipios: ["Abasolo", "Acuña", "Allende", "Arteaga", "Candela", "Castaños", "Cuatro Ciénegas", "Escobedo", "Frontera", "General Cepeda", "Guerrero", "Hidalgo", "Jiménez", "Juárez", "Lamadrid", "Matamoros", "Monclova", "Morelos", "Múzquiz", "Nadás", "Nava", "Ocampo", "Parras", "Piedras Negras", "Progreso", "Ramos Arizpe", "Sabinas", "San Buenaventura", "San Pedro", "San Juan de Sabinas", "Saltillo", "Sierra Mojada", "Torreón", "Viesca", "Zaragoza"]
  },
  {
    state: "Colima",
    municipios: ["Armería", "Colima", "Comala", "Coquimatlán", "Cuauhtémoc", "Ixtlahuacán", "Manzanillo", "Minatitlán", "Tecomán", "Villa de Álvarez"]
  },
  {
    state: "Durango",
    municipios: ["Canatlán", "Canelas", "Coneto de Comonfort", "Cuencamé", "Durango", "General Simón Bolívar", "Gómez Palacio", "Guadalupe Victoria", "Guanaceví", "Hidalgo", "Indé", "Lerdo", "Mapimí", "Mezquital", "Nazas", "Nombre de Dios", "Ocampo", "El Oro", "Otáez", "Pánuco de Coronado", "Peñón Blanco", "Poanas", "Pueblo Nuevo", "Rodeo", "San Bernardo", "San Dimas", "San Juan de Guadalupe", "San Juan del Río", "San Luis del Cordero", "San Pedro del Gallo", "Santa Clara", "Santiago Papasquiaro", "Súchil", "Tamazula", "Tepehuanes", "Tlahualilo", "Topia", "Vicente Guerrero"]
  },
  {
    state: "Estado de México",
    municipios: [
      "Acambay", "Acolman", "Aculco", "Almoloya de Alquisiras", "Almoloya de Juárez", "Almoloya del Río", "Amanalco", "Amatepec", "Amecameca", "Apaxco", "Atenco", "Atizapán", "Atizapán de Zaragoza", "Atlacomulco", "Atlautla", "Axapusco", "Ayapango", "Calimaya", "Capulhuac", "Coatepec Harinas", "Cocotitlán", "Coyotepec", "Cuautitlán", "Cuautitlán Izcalli", "Chalco", "Chapa de Mota", "Chapultepec", "Chiautla", "Chicoloapan", "Chiconcuac", "Chimalhuacán", "Donato Guerra", "Ecatepec de Morelos", "Ecatzingo", "Huehuetoca", "Hueypoxtla", "Huixquilucan", "Isidro Fabela", "Ixtapaluca", "Ixtapan de la Sal", "Ixtapan del Oro", "Ixtlahuaca", "Jaltenco", "Jilotepec", "Jilotzingo", "Jiquipilco", "Jocotitlán", "Joquicingo", "Juchitepec", "Lerma", "Malinalco", "Melchor Ocampo", "Metepec", "Mexicaltzingo", "Morelos", "Naucalpan de Juárez", "Nezahualcóyotl", "Nicolas Romero", "Nopaltepec", "Ocoyoacac", "Ocuilan", "El Oro", "Otumba", "Otzoloapan", "Otzolotepec", "Ozumba", "Papalotla", "La Paz", "Polotitlán", "Rayón", "San Antonio la Isla", "San Felipe del Progreso", "San Martín de las Pirámides", "San Mateo Atenco", "San Simón de Guerrero", "Santo Tomás", "Soyaniquilpan de Juárez", "Sultepec", "Tecámac", "Tejupilco", "Temamatla", "Temascalapa", "Temascalcingo", "Temascaltepec", "Temoaya", "Tenancingo", "Tenango del Aire", "Tenango del Valle", "Teoloyucan", "Teotihuacán", "Tepetlaoxtoc", "Tepetlixpa", "Tepotzotlán", "Tequixquiac", "Texcaltitlán", "Texcalyacac", "Texcoco", "Tezoyuca", "Tianguistenco", "Timilpan", "Tlalmanalco", "Tlalnepantla de Baz", "Tlatlaya", "Toluca", "Tonatico", "Tultepec", "Tultitlán", "Valle de Bravo", "Valle de Chalco Solidaridad", "Villa de Allende", "Villa del Carbón", "Villa Guerrero", "Villa Victoria", "Xonacatlán", "Zacazonapan", "Zacualpan", "Zumpahuacán", "Zumpango"
    ]
  },
  {
    state: "Guanajuato",
    municipios: ["Abasolo", "Acámbaro", "San Miguel de Allende", "Apaseo el Alto", "Apaseo el Grande", "Atarjea", "Celaya", "Manuel Doblado", "Comonfort", "Coroneo", "Cortazar", "Cuitzeo", "Doctor Mora", "Dolores Hidalgo C.I.N.", "Guanajuato", "Irapuato", "Jaral del Progreso", "Jerécuaro", "León", "Moroleón", "Ocampo", "Pénjamo", "Pueblo Nuevo", "Purísima del Rincón", "Romita", "Salamanca", "Salvatierra", "San Diego de la Unión", "San Felipe", "San Francisco del Rincón", "San José Iturbide", "San Luis de la Paz", "Santa Cruz de Juventino Rosas", "Santiago Maravatío", "Silao de la Victoria", "Tarandacuao", "Tarimoro", "Tierra Blanca", "Uriangato", "Valle de Santiago", "Victoria", "Villagrán", "Xichú", "Yuriria"]
  },
  {
    state: "Guerrero",
    municipios: ["Acapulco de Juárez", "Ahuacuotzingo", "Ajuchitlán del Progreso", "Alcozauca de Guerrero", "Alpoyeca", "Apaxtla", "Arcelia", "Atenango del Río", "Atlamajalcingo del Monte", "Atlixtac", "Atoyac de Álvarez", "Ayutla de los Libres", "Azoyú", "Coyuca de Benítez", "Coyuca de Catalán", "Cuajinicuilapa", "Cualác", "Cuautepec", "Cuetzala del Progreso", "Cutzamala de Pinzón", "Chilapa de Álvarez", "Chilpancingo de los Bravo", "Florencio Villarreal", "General Canuto A. Neri", "General Heliodoro Castillo", "Huamuxtitlán", "Huitzuco de los Figueroa", "Iguala de la Independencia", "Ometepec", "Petatlán", "Taxco de Alarcón", "Tecpan de Galeana", "Zihuatanejo de Azueta"]
  },
  {
    state: "Hidalgo",
    municipios: ["Acatlán", "Acaxochitlán", "Actopan", "Agua Blanca de Iturbide", "Ajacuba", "Alfajayucan", "Almoloya", "Apan", "El Arenal", "Atitalaquia", "Atlapexco", "Atotonilco el Grande", "Atotonilco de Tula", "Calnali", "Cardonal", "Cuautepec de Hinojosa", "Chapantongo", "Chapulhuacán", "Chilcuautla", "Eloxochitlán", "Emiliano Zapata", "Huautla", "Huazalingo", "Huehuetla", "Huejutla de Reyes", "Huichapan", "Ixmiquilpan", "Jacala de Ledezma", "Jaltocán", "Juárez Hidalgo", "Lolotla", "Metepec", "San Agustín Tlaxiaca", "San Bartolo Tutotepec", "Mineral de la Reforma", "Mineral del Chico", "Mineral del Monte", "Mixquiahuala de Juárez", "Molango de Escamilla", "Nopala de Villagrán", "Pachuca de Soto", "Pisaflores", "Progreso de Obregón", "Mineral de la Reforma", "Tepeapulco", "Tepeji del Río de Ocampo", "Tizayuca", "Tula de Allende", "Tulancingo de Bravo", "Zimapán"]
  },
  {
    state: "Jalisco",
    municipios: ["Acatic", "Acatlán de Juárez", "Ahualulco de Mercado", "Amacueca", "Amatitán", "Ameca", "San Juanito de Escobedo", "Arandas", "El Arenal", "Atemajac de Brizuela", "Atengo", "Atenguillo", "Atotonilco el Alto", "Atoyac", "Autlán de Navarro", "Ayotlán", "Ayutla", "La Barca", "Bolaños", "Cabo Corrientes", "Casimiro Castillo", "Cihuatlán", "Zapotlán el Grande", "Cocula", "Colotlán", "Concepción de Buenos Aires", "Cuautitlán de García Barragán", "Cuautla", "Cuquío", "Chapala", "Chimaltitán", "Chiquilistlán", "Degollado", "Ejutla", "Encarnación de Díaz", "Etzatlán", "El Grullo", "Guachinango", "Guadalajara", "Hostotipaquillo", "Huejúcar", "Huejuquilla el Alto", "La Huerta", "Ixtlahuacán de los Membrillos", "Ixtlahuacán del Río", "Jalostotitlán", "Jamay", "Jocotepec", "Juchitlán", "Lagos de Moreno", "El Limón", "Magdalena", "Santa María del Oro", "La Manzanilla de la Paz", "Mascota", "Mazamitla", "Mexticacán", "Mezquitic", "Mixtlán", "Ocotlán", "Ojuelos de Jalisco", "Pihuamo", "Poncitlán", "Puerto Vallarta", "Villa Purificación", "Quitupan", "El Salto", "San Cristóbal de la Barranca", "San Diego de Alejandría", "San Juan de los Lagos", "San Julián", "San Marcos", "San Martín de Bolaños", "San Martín Hidalgo", "San Miguel el Alto", "Gómez Farías", "San Sebastián del Oeste", "San Gabriel", "Tala", "Talpa de Allende", "Tamazula de Gordiano", "Tapalpa", "Tecalitlán", "Tecolotlán", "Techaluta de Montenegro", "Tenamaxtlán", "Teocaltiche", "Teocuitatlán de Corona", "Tepatitlán de Morelos", "Tequila", "Teuchitlán", "Tizapán el Alto", "Tlajomulco de Zúñiga", "San Pedro Tlaquepaque", "Tolimán", "Tomatlán", "Tonalá", "Tonaya", "Tonila", "Totatiche", "Tototlán", "Tuxcacuesco", "Tuxcueca", "Tuxpan", "Unión de San Antonio", "Unión de Tula", "Valle de Guadalupe", "Valle de Juárez", "San Gabriel", "Villa Corona", "Villa Guerrero", "Villa Hidalgo", "Cañadas de Obregón", "Yahualica de González Gallo", "Zacoalco de Torres", "Zapopan", "Zapotiltic", "Zapotitlán de Vadillo", "Zapotlán del Rey", "Zapotlanejo"]
  },
  {
    state: "Michoacán",
    municipios: ["Acuitzio", "Aguililla", "Álvaro Obregón", "Angamacutiro", "Angangueo", "Apatzingán", "Aporo", "Aquila", "Ario", "Arteaga", "Briseñas", "Buenavista", "Carácuaro", "Coahuayana", "Coalcomán de Vázquez Pallares", "Coeneo", "Contepec", "Copándaro", "Cotija", "Cuitzeo", "Charapan", "Charo", "Chavinda", "Cherán", "Chilchota", "Chinicuila", "Chucándiro", "Churintzio", "Churumuco", "Ecuandureo", "Epitacio Huerta", "Erongarícuaro", "Gabriel Zamora", "Hidalgo", "La Huacana", "Huandacareo", "Huaniqueo", "Huetamo", "Huiramba", "Indaparapeo", "Irimbo", "Ixtlán", "Jacona", "Jiménez", "Jiquilpan", "Juárez", "Jungapeo", "Lagunillas", "Madero", "Maravatío", "Morelia", "Morelos", "Múgica", "Nahuatzen", "Nocupétaro", "Nuevo Parangaricutiro", "Nuevo Urecho", "Numarán", "Ocampo", "Paracho", "Parácuaro", "Pátzcuaro", "Penjamillo", "Peribán", "La Piedad", "Purépero", "Puruándiro", "Queréndaro", "Quiroga", "Cojumatlán de Régules", "Los Reyes", "Sahuayo", "San Lucas", "Santa Ana Maya", "Salvador Escalante", "Senguio", "Tantan, Susupuato", "Tacámbaro", "Tancítaro", "Tangancícuaro", "Tangamandapio", "Tanhuato", "Taretan", "Tarímbaro", "Tepalcatepec", "Tingambato", "Tingüindín", "Tiquicheo de Nicolás Romero", "Tlalpujahua", "Tlazazalca", "Tocumbo", "Tumbiscatío", "Turicato", "Tuxpan", "Tuzantla", "Tzintzuntzan", "Tzitzio", "Uruapan", "Venustiano Carranza", "Villamar", "Vista Hermosa", "Yurécuaro", "Zacapu", "Zamora", "Zináparo", "Zinapécuaro", "Ziracuaretiro", "Zitácuaro", "José Sixto Verduzco"]
  },
  {
    state: "Morelos",
    municipios: ["Amacuzac", "Atlatlahucan", "Axochiapan", "Ayala", "Coatlán del Río", "Cuautla", "Cuernavaca", "Emiliano Zapata", "Huitzilac", "Jantetelco", "Jiutepec", "Jojutla", "Jonacatepec de Leandro Valle", "Mazatepec", "Miacatlán", "Ocuituco", "Puente de Ixtla", "Temixco", "Tepalcingo", "Tepoztlán", "Tetecala", "Tetela del Volcán", "Tlalnepantla", "Tlaltizapán de Zapata", "Tlaquiltenango", "Tlayacapan", "Totolapan", "Xochitepec", "Yautepec", "Yecapixtla", "Zacatepec", "Zacualpan de Amilpas", "Xoxocotla", "Coatetelco", "Hueyapan"]
  },
  {
    state: "Nayarit",
    municipios: ["Acaponeta", "Ahuacatlán", "Amatlán de Cañas", "Compostela", "Huajicori", "Ixtlán del Río", "Jala", "Xalisco", "Del Nayar", "Rosamorada", "Ruíz", "San Blas", "San Pedro Lagunillas", "Santa María del Oro", "Santiago Ixcuintla", "Tecuala", "Tepic", "Tuxpan", "La Yesca", "Bahía de Banderas (Sayulita / Punta Mita)"]
  },
  {
    state: "Nuevo León",
    municipios: ["Abasolo", "Agualeguas", "Los Aldamas", "Allende", "Anáhuac", "Apodaca", "Aramberri", "Bustamante", "Cadereyta Jiménez", "El Carmen", "Cerralvo", "Ciénega de Flores", "China", "Doctor Arroyo", "Doctor Coss", "Doctor González", "Galeana", "García", "General Bravo", "General Escobedo", "General Terán", "General Treviño", "General Zaragoza", "General Zuazua", "Guadalupe", "Los Herreras", "Higueras", "Hualahuises", "Iturbide", "Juárez", "Linares", "Marín", "Melchor Ocampo", "Mier y Noriega", "Mina", "Montemorelos", "Monterrey", "Parás", "Pesquería", "Los Ramones", "Rayones", "Sabinas Hidalgo", "Salinas Victoria", "San Nicolás de los Garza", "San Pedro Garza García", "Santa Catarina", "Santiago", "Vallecillo", "Villaldama"]
  },
  {
    state: "Oaxaca",
    municipios: ["Abejones", "Acatlán de Pérez Figueroa", "Asunción Cacalotepec", "Asunción Cuyotepeji", "Asunción Nochixtlán", "Asunción Ocotlán", "Asunción Tlacolulita", "Ayotzintepec", "El Barrio de la Soledad", "Calpulálpam de Méndez", "Candelaria Loxicha", "Ciénega de Zimatlán", "Ciudad Ixtepec", "Heroica Ciudad de Huajuapan de León", "Juchitán de Zaragoza", "Loma Bonita", "Miahuatlán de Porfirio Díaz", "Oaxaca de Juárez", "Puerto Escondido / San Pedro Mixtepec", "Salina Cruz", "San Juan Bautista Tuxtepec", "San Pedro Pochutla", "Santa Cruz Xoxocotlán", "Santa Lucía del Camino", "Santa María Huatulco", "Santo Domingo Tehuantepec"]
  },
  {
    state: "Puebla",
    municipios: ["Acajete", "Acateno", "Acatlán", "Acatzingo", "Atequexquitla", "Ahuacatlán", "Ahuatlán", "Ahuazotepec", "Ahuehuetitla", "Ajalpan", "Albino Zertuche", "Aljojuca", "Altepexi", "Amixtlán", "Amuzgos", "Amozoc", "Aquixtla", "Atempan", "Atexcal", "Atlixco", "Atoyatempan", "Atlequizayan", "Calpan", "Caltepec", "Camocuautla", "Caxhuacan", "Coatepec", "Coatzingo", "Cohetzala", "Cohuecan", "Coronango", "Coxcatlán", "Coyomeapan", "Coyotepec", "Cuetzalan del Progreso", "Cuautinchán", "Cuautlancingo", "Cuautpan", "Cuayuca de Andrade", "Cuetzalan del Progreso", "Huauchinango", "Izúcar de Matamoros", "Puebla", "San Andrés Cholula", "San Martín Texmelucan", "San Pedro Cholula", "Tehuacán", "Teziutlán", "Xicotepec", "Zacatlán"]
  },
  {
    state: "Querétaro",
    municipios: ["Amealco de Bonfil", "Pinal de Amoles", "Arroyo Seco", "Cadereyta de Montes", "Colón", "Corregidora", "Ezequiel Montes", "Huimilpan", "Jalpan de Serra", "Landa de Matamoros", "El Marqués", "Pedro Escobedo", "Peñamiller", "Pequería", "Santiago de Querétaro", "San Joaquín", "San Juan del Río", "Tequisquiapan", "Tolimán"]
  },
  {
    state: "Quintana Roo",
    municipios: ["Cozumel", "Felipe Carrillo Puerto", "Isla Mujeres", "Othón P. Blanco (Chetumal)", "Benito Juárez (Cancún)", "José María Morelos", "Lázaro Cárdenas", "Solidaridad (Playa del Carmen)", "Tulum", "Bacalar", "Puerto Morelos"]
  },
  {
    state: "San Luis Potosí",
    municipios: ["Ahualulco", "Alaquines", "Aquismón", "Armadillo de los Infante", "Cárdenas", "Catering", "Cedral", "Cerritos", "Cerro de San Pedro", "Ciudad del Maíz", "Ciudad Fernández", "Ciudad Valles", "Coxcatlán", "Charcas", "Ebano", "Guadalcázar", "Huehuetlán", "Lagunillas", "Matehuala", "Mexquitic de Carmona", "Moctezuma", "Rayón", "Rioverde", "Salinas", "San Ciro de Acosta", "San Luis Potosí", "San Martín Chalchicuautla", "Santa Catarina", "Santa María del Río", "Soledad de Graciano Sánchez", "Tamasopo", "Tamazunchale", "Tampacán", "Tampamolón Corona", "Tamuín", "Tanquián de Escobedo", "Tierra Nueva", "Vanegas", "Venado", "Villa de Arriaga", "Villa de Guadalupe", "Villa de la Paz", "Villa de Ramos", "Villa de Reyes", "Villa Hidalgo", "Villa Juárez", "Xilitla", "Zaragoza"]
  },
  {
    state: "Sinaloa",
    municipios: ["Ahome (Los Mochis)", "Angostura", "Badiraguato", "Concordia", "Cosalá", "Culiacán", "Choix", "Elota", "Escuinapa", "El Fuerte", "Guasave", "Mazatlán", "Mocorito", "Rosario", "Salvador Alvarado (Guamúchil)", "San Ignacio", "Sinaloa", "Navolato", "Eldorado", "Juan José Ríos"]
  },
  {
    state: "Sonora",
    municipios: ["Aconchi", "Agua Prieta", "Alamos", "Altar", "Arivechi", "Arizpe", "Atil", "Bacadéhuachi", "Bacanora", "Bacerac", "Bacoachi", "Bácum", "Banámichi", "Baviácora", "Bavispe", "Benjamín Hill", "Caborca", "Cajeme (Ciudad Obregón)", "Cananea", "Carbó", "La Colorada", "Cucurpe", "Cumpas", "Empalme", "Etchojoa", "Fronteras", "Granados", "Guaymas", "Hermosillo", "Huachinera", "Huásabas", "Huatabampo", "Huépac", "Imuris", "Magdalena", "Mazatán", "Moctezuma", "Naco", "Nácori Chico", "Nacozari de García", "Navojoa", "Nogales", "Ónavas", "Opodepe", "Oquitoa", "Pitiquito", "Puerto Peñasco", "Quiriego", "Rayón", "Rosario", "Sahuaripa", "San Felipe de Jesús", "San Javier", "San Luis Río Colorado", "San Miguel de Horcasitas", "San Pedro de la Cueva", "Santa Ana", "Santa Cruz", "Sáric", "Suaqui Grande", "Tepache", "Ures", "Villa Hidalgo", "Villa Pesqueira", "Yécora"]
  },
  {
    state: "Tabasco",
    municipios: ["Balancán", "Cárdenas", "Centla", "Centro (Villahermosa)", "Comalcalco", "Cunduacán", "Emiliano Zapata", "Huimanguillo", "Jalapa", "Jalpa de Méndez", "Jonuta", "Macuspana", "Nacajuca", "Paraíso", "Tacotalpa", "Teapa", "Tenosique"]
  },
  {
    state: "Tamaulipas",
    municipios: ["Abasolo", "Aldama", "Altamira", "Antiguo Morelos", "Burgos", "Bustamante", "Camargo", "Casas", "Ciudad Madero", "Cruillas", "Gómez Farías", "González", "Güémez", "Guerrero", "Gustavo Díaz Ordaz", "Hidalgo", "Jaumave", "Jiménez", "Llera", "Mainero", "El Mante", "Matamoros", "Méndez", "Mier", "Miguel Alemán", "Miquihuana", "Nuevo Laredo", "Nuevo Morelos", "Ocampo", "Padilla", "Palmillas", "Reynosa", "Río Bravo", "San Carlos", "San Fernando", "San Nicolás", "Soto la Marina", "Tampico", "Tula", "Valle Hermoso", "Victoria", "Villagrán", "Xicoténcatl"]
  },
  {
    state: "Tlaxcala",
    municipios: ["Amaxac de Guerrero", "Apetatitlán de Antonio Carvajal", "Atlangatepec", "Atltzayanca", "Apizaco", "Calpulalpan", "El Carmen Tequexquitla", "Cuapiaxtla", "Cuaxomulco", "Chiautempan", "Muñoz de Domingo Arenas", "Españita", "Huamantla", "Hueyotlipan", "Ixtacuixtla de Mariano Matamoros", "Ixtenco", "Mazatecochco de José María Morelos", "Contla de Juan Cuamatzi", "Tepetitla de Lardizábal", "Sanctórum de Lázaro Cárdenas", "Nanacamilpa de Mariano Arista", "Acuamanala de Miguel Hidalgo", "Natívitas", "Panotla", "San Pablo del Monte", "Santa Cruz Tlaxcala", "Tenancingo", "Teolocholco", "Tepeyanco", "Terrenate", "Tetla de la Solidaridad", "Tetlatlahuca", "Tlaxcala", "Tlaxco", "Tocatlán", "Totolac", "Ziltlaltépec de Alcaraz", "Tzompantepec", "Xaloztoc", "Xaltocan", "Xicohtzinco", "Yauhquemehcan", "Zacatelco"]
  },
  {
    state: "Veracruz",
    municipios: ["Acajete", "Acatlán", "Acayucan", "Actopan", "Acula", "Acultzingo", "Camarón de Tejeda", "Alpatláhuac", "Alto Lucero de Gutiérrez Barrios", "Altotonga", "Alvarado", "Amatitlán", "Naranjos Amatlán", "Amatlán de los Reyes", "Angel R. Cabada", "La Antigua", "Apazapan", "Aquila", "Astacinga", "Atlahuilco", "Atzacan", "Atzalan", "Tlaltetela", "Ayahualulco", "Banderilla", "Barreal", "Boca del Río", "Catemaco", "Cazones de Herrera", "Cerro Azul", "Coacoatzintla", "Coatepec", "Coatzacoalcos", "Córdoba", "Cosamaloapan", "Cosoleacaque", "Cuitláhuac", "Fortín", "Jaltipan", "Martínez de la Torre", "Minatitlán", "Misantla", "Orizaba", "Papantla", "Poza Rica de Hidalgo", "San Andrés Tuxtla", "Tuxpan", "Veracruz", "Xalapa"]
  },
  {
    state: "Yucatán",
    municipios: ["Abalá", "Acanceh", "Akil", "Baca", "Bokobá", "Buctzotz", "Cacalchén", "Calotmul", "Cansahcab", "Cantaramayec", "Celestún", "Cenotillo", "Conkal", "Cunamá", "Chacsinkín", "Chankom", "Chapab", "Chemax", "Chicxulub Pueblo", "Chichimilá", "Chikindzonot", "Chocholá", "Chumayel", "Dzan", "Dzemul", "Dzidzantún", "Dzilam de Bravo", "Dzilam González", "Dzitás", "Dzoncauich", "Espita", "Halachó", "Hocabá", "Hoctún", "Homún", "Huhí", "Hunucmá", "Ixil", "Izamal", "Kanasín", "Kantunil", "Kaua", "Kinchil", "Kopomá", "Mama", "Maní", "Maxcanú", "Mayapán", "Mérida", "Mocochá", "Motul", "Muna", "Muxupip", "Opichén", "Oxkutzcab", "Panabá", "Peto", "Progreso", "Quintana Roo", "Rio Lagartos", "Sacalum", "Samahil", "Sanahcat", "San Felipe", "Santa Elena", "Seyé", "Sinanché", "Sotuta", "Sucilá", "Sudzal", "Suma", "Tahdziú", "Tahmek", "Teabo", "Tecoh", "Tekal de Venegas", "Tekantó", "Tekax", "Tekit", "Tekom", "Telchac Pueblo", "Telchac Puerto", "Temax", "Temozón", "Tepakán", "Tetiz", "Teya", "Ticul", "Tixcacalcupul", "Tixkokob", "Tixmehuac", "Tixpéhual", "Tizimín", "Tunkás", "Tzucacab", "Uayma", "Ucú", "Umán", "Valladolid", "Xocchel", "Yaxcabá", "Yaxkukul", "Yobaín"]
  },
  {
    state: "Zacatecas",
    municipios: ["Apozol", "Apulco", "Atolinga", "Benito Juárez", "Calera", "Cañitas de Felipe Pescador", "Concepción del Oro", "Cuauhtémoc", "Chalchihuites", "Fresnillo", "Trinidad García de la Cadena", "Genaro Codina", "General Enrique Estrada", "General Francisco R. Murguía", "El Salvador", "General Pánfilo Natera", "Guadalupe", "Huanusco", "Jalpa", "Jerez", "Jiménez del Teul", "Juan Aldama", "Juchipila", "Loreto", "Luis Moya", "Mazapil", "Melchor Ocampo", "Mezquital del Oro", "Miguel Auza", "Momax", "Monte Escobedo", "Morelos", "Mochitlán", "Noria de Ángeles", "Ojocaliente", "Pánuco", "Pinos", "Río Grande", "Sain Alto", "El Plateado de Joaquín Amaro", "Santa María de la Paz", "Sombrerete", "Susterregón", "Tabasco", "Tepechitlán", "Tepetongo", "Teul de González Ortega", "Tibisay", "Tlaltenango de Sánchez Román", "Valparaíso", "Vetagrande", "Villa de Cos", "Villa García", "Villa González Ortega", "Villa Hidalgo", "Villanueva", "Zacatecas"]
  }
];

/**
 * Returns array of state names alphabetically or in default array order
 */
export const getStatesList = (): string[] => {
  return MEXICO_STATES_AND_MUNICIPALITIES.map(s => s.state);
};

/**
 * Returns array of municipalities for a specified state
 */
export const getMunicipalitiesByState = (stateName: string): string[] => {
  if (!stateName || stateName === 'all') return [];
  const found = MEXICO_STATES_AND_MUNICIPALITIES.find(
    s => s.state.toLowerCase() === stateName.toLowerCase()
  );
  return found ? found.municipios : [];
};

/**
 * Search locations by query across states and municipalities
 */
export const searchLocations = (query: string): { state: string; municipality: string }[] => {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: { state: string; municipality: string }[] = [];

  MEXICO_STATES_AND_MUNICIPALITIES.forEach(st => {
    st.municipios.forEach(m => {
      if (m.toLowerCase().includes(q) || st.state.toLowerCase().includes(q)) {
        results.push({ state: st.state, municipality: m });
      }
    });
  });

  return results.slice(0, 30); // limit to top 30 matches
};

/**
 * Helper to check if a state and municipality combo is valid
 */
export const isValidLocation = (stateName: string, municipalityName: string): boolean => {
  const muns = getMunicipalitiesByState(stateName);
  return muns.some(m => m.toLowerCase() === municipalityName.toLowerCase());
};

/**
 * Format location string nicely
 */
export const formatLocation = (municipality: string, state: string): string => {
  if (!municipality && !state) return 'México';
  if (!municipality) return state;
  if (!state) return municipality;
  return `${municipality}, ${state}`;
};
